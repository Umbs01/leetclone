'use client';

import Playground from "@/components/playground_problem";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestcaseAdd from "@/components/questiondata/TestcaseAdd";
import TestcaseDescription from "@/components/questiondata/TestcaseDescription";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";

export const useProblemFormValidation = (descriptionData, testcaseData, solutionCode) => {
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate Description Data
    if (!descriptionData.title.trim()) {
      newErrors.title = 'Problem title is required';
    }

    if (!descriptionData.description.trim()) {
      newErrors.description = 'Problem description is required';
    }

    if (!descriptionData.point || descriptionData.point <= 0) {
      newErrors.point = 'Points must be a positive number';
    }

    if (!descriptionData.input_format.trim()) {
      newErrors.input_format = 'Input format description is required';
    }

    if (!descriptionData.output_format.trim()) {
      newErrors.output_format = 'Output format description is required';
    }

    // Validate at least one valid test case
    const validTestcases = testcaseData.filter(
      (test) => test.input.trim() && test.output.trim()
    );

    if (validTestcases.length === 0) {
      newErrors.testcases = 'At least one test case with input and output is required';
    }

    // Validate Solution Code
    if (!solutionCode.trim()) {
      newErrors.solution = 'Solution code is required';
    }

    return newErrors;
  };

  const triggerValidation = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setShowErrors(true);
    return Object.keys(validationErrors).length === 0;
  };

  return { 
    errors, 
    showErrors, 
    triggerValidation,
    isValid: Object.keys(validateForm()).length === 0
  };
};

export const submitProblem = async (descriptionData, testcaseData, solution, templateCode, starterCode) => {
  try {
    const formattedTestCases = testcaseData
      .filter(test => test.input && test.output)
      .map(test => ({
        input: test.input,
        output: test.output
      }));

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const decoded = jwtDecode(token);
    const student_id = decoded.sub;
    
    const problemData = {
      title: descriptionData.title || '',
      description: descriptionData.description || '',
      difficulty: descriptionData.selectedTag || 'easy',
      points: parseInt(descriptionData.point) || 0,
      hint: descriptionData.hint || '',
      tags: [""],
      hint_cost: 0,
      test_cases: formattedTestCases,
      input_format: descriptionData.input_format || 'string',
      output_format: descriptionData.output_format || 'string',
      author: student_id,
      status: "",
      solves: 0,
      hidden_test_cases: [{}],
      solution: solution,
      template: templateCode,
      starter: starterCode
    };

    const response = await fetch('http://161.246.5.48:3777/problems/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problemData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error submitting problem:', error);
    throw error;
  }
};

// Error Display Component
const ErrorDisplay = ({ errors, show }) => {
  if (!show || Object.keys(errors).length === 0) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Please fix the following errors:</strong>
      <ul className="mt-2">
        {Object.entries(errors).map(([key, message]) => (
          <li key={key} className="ml-4 list-disc">{message}</li>
        ))}
      </ul>
    </div>
  );
};

function CreateProblem() {
  const [descriptionData, setDescriptionData] = useState({
    title: "",
    description: "",
    selectedTag: "easy",
    point: 0,
    input_format: "",
    output_format: "",
  });
  const [testcaseData, setTestcaseData] = useState(Array(5).fill({ input: '', output: '' }));
  const [solutionCode, setSolutionCode] = useState("");
  const [templateCode, setTemplateCode] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [activePlaygroundTab, setActivePlaygroundTab] = useState("solution");
  const [activeDescriptionTab, setActiveDescriptionTab] = useState("details");
  const router = useRouter();

  const { 
    errors, 
    showErrors, 
    triggerValidation 
  } = useProblemFormValidation(descriptionData, testcaseData, solutionCode);

    // Check if user is admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const admin_role = decoded.role;
      if (admin_role !== "admin") {
        alert("Only admin can access this page");
        router.push("/question");
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (triggerValidation()) {
      try {
        const result = await submitProblem(
          descriptionData, 
          testcaseData, 
          solutionCode, 
          templateCode, 
          starterCode
        );
        console.log('Problem created successfully:', result);
        alert('Problem created successfully!');
      } catch (error) {
        console.error('Failed to create problem:', error);
        alert('Failed to create problem: ' + error.message);
      } 
    } else {
      alert('Please fix form errors before submitting');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div id="left" className="w-[20%] p-4 border-r border-light_theme dark:border-dark_theme">
        <div className="sticky top-0">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div id="right" className="w-[80%] overflow-y-auto">
        <Header />

        <div className="flex flex-grow">
          {/* Playground Section */}
          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme dark:text-white flex flex-col">
            <Tabs 
              defaultValue="solution" 
              className="flex flex-col h-full w-full"
              onValueChange={setActivePlaygroundTab}
            >
              <TabsList className="flex justify-center pt-1 pr-2 relative">
                {/* Active Tab Indicator */}
                <div 
                  className="absolute left-0 right-0 top-0 h-1 dark:bg-[#d08d2d] bg-[#179299] transition-all duration-300"
                  style={{
                    transform: `translateX(${
                      activePlaygroundTab === 'solution' ? '0%' : 
                      activePlaygroundTab === 'template' ? '100%' : 
                      activePlaygroundTab === 'starter' ? '200%' : '0%'
                    })`,
                    width: '33.33%'
                  }}
                />
                <TabsTrigger className="w-1/3 h-10" value="solution">Solution</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10" value="template">Template</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10" value="starter">Starter</TabsTrigger>
              </TabsList>
              <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
                <TabsContent value="solution">
                  <Playground
                    initialCode={solutionCode}
                    onCodeChange={(code) => setSolutionCode(code)}
                  />
                </TabsContent>
                <TabsContent value="template">
                  <Playground
                    initialCode={templateCode}
                    onCodeChange={(code) => setTemplateCode(code)}
                  />
                </TabsContent>
                <TabsContent value="starter">
                  <Playground
                    initialCode={starterCode}
                    onCodeChange={(code) => setStarterCode(code)}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Tabs Section */}
          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme dark:text-white flex flex-col">
            <Tabs 
              defaultValue="details" 
              className="flex flex-col h-full w-full"
              onValueChange={setActiveDescriptionTab}
            >
              <TabsList className="flex justify-center pt-5 pr-2 relative">
                {/* Active Tab Indicator */}
                <div 
                  className="absolute left-0 right-0 top-0 h-1 dark:bg-[#d08d2d] bg-[#179299] transition-all duration-300"
                  style={{
                    transform: `translateX(${
                      activeDescriptionTab === 'details' ? '0%' : 
                      activeDescriptionTab === 'testcases' ? '100%' : '0%'
                    })`,
                    width: '33.33%'
                  }}
                />
                <TabsTrigger className="w-1/3 h-10" value="details">Description</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10" value="testcases">+ Add Test Case</TabsTrigger>
                <button
                  onClick={handleSubmit}
                  className="w-1/3 h-10 py-2 px-4 rounded-lg bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme">
                  Submit
                </button>
              </TabsList>
              <div className="flex-grow overflow-y-auto" style={{ height: "calc(100vh - 55px)" }}>
                <TabsContent value="details">
                  <TestcaseDescription
                    descriptionData={descriptionData}
                    setDescriptionData={setDescriptionData}
                  />
                </TabsContent>
                <TabsContent value="testcases">
                  <TestcaseAdd
                    testcaseData={testcaseData}
                    setTestcaseData={setTestcaseData}
                  />
                </TabsContent>
                <ErrorDisplay errors={errors} show={showErrors} />
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CreateProblem);