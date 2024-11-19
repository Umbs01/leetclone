'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Playground from "@/components/playground";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestcaseAdd from "@/components/questiondata/TestcaseAdd";
import TestcaseDescription from "@/components/questiondata/TestcaseDescription";
import { jwtDecode } from "jwt-decode";

// Reuse the validation hook with slight modifications
export const useProblemFormValidation = (descriptionData, testcaseData, solutionCode) => {
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!descriptionData.title?.trim()) {
      newErrors.title = 'Problem title is required';
    }

    if (!descriptionData.description?.trim()) {
      newErrors.description = 'Problem description is required';
    }

    if (!descriptionData.point || descriptionData.point <= 0) {
      newErrors.point = 'Points must be a positive number';
    }

    if (!descriptionData.input_format?.trim()) {
      newErrors.input_format = 'Input format description is required';
    }

    if (!descriptionData.output_format?.trim()) {
      newErrors.output_format = 'Output format description is required';
    }

    const validTestcases = testcaseData.filter(
      (test) => test.input?.trim() && test.output?.trim()
    );

    if (validTestcases.length === 0) {
      newErrors.testcases = 'At least one test case with input and output is required';
    }

    if (!solutionCode?.trim()) {
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

function UpdateQuestion() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionData, setDescriptionData] = useState({
    title: "",
    description: "",
    selectedTag: "easy",
    point: 0,
    input_format: "",
    output_format: "",
    hint: "",
  });
  const [testcaseData, setTestcaseData] = useState(Array(5).fill({ input: '', output: '' }));
  const [solutionCode, setSolutionCode] = useState("");

  const { 
    errors, 
    showErrors, 
    triggerValidation 
  } = useProblemFormValidation(descriptionData, testcaseData, solutionCode);

  // Fetch existing question data
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(`http://161.246.5.48:3777/problems/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch question data');
        }
        const data = await response.json();
        
        // Update form state with fetched data
        setDescriptionData({
          title: data.title || "",
          description: data.description || "",
          selectedTag: data.difficulty || "easy",
          point: data.points || 0,
          input_format: data.input_format || "",
          output_format: data.output_format || "",
          hint: data.hint || "",
        });

        // Update testcase data if available
        if (data.test_cases && Array.isArray(data.test_cases)) {
          const formattedTestCases = data.test_cases.map(test => ({
            input: test.input || "",
            output: test.output || ""
          }));
          // Fill remaining slots with empty test cases if needed
          while (formattedTestCases.length < 5) {
            formattedTestCases.push({ input: '', output: '' });
          }
          setTestcaseData(formattedTestCases);
        }

        setSolutionCode(data.solution || "");
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching question:', error);
        alert('Error loading question data');
      }
    };

    if (params.id) {
      fetchQuestionData();
    }
  }, [params.id]);

  const handleUpdate = async () => {
    if (triggerValidation()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const decoded = jwtDecode(token);
        const student_id = decoded.sub;

        const formattedTestCases = testcaseData
          .filter(test => test.input && test.output)
          .map(test => ({
            input: test.input,
            output: test.output
          }));

        const updateData = {
          title: descriptionData.title,
          description: descriptionData.description,
          difficulty: descriptionData.selectedTag,
          points: parseInt(descriptionData.point),
          hint: descriptionData.hint,
          tags: [""],
          hint_cost: 0,
          test_cases: formattedTestCases,
          input_format: descriptionData.input_format,
          output_format: descriptionData.output_format,
          author: student_id,
          status: "",
          solves: 0,
          hidden_test_cases: [{}],
          solution: solutionCode,
          template: "",
          starter: ""
        };

        const response = await fetch(`http://161.246.5.48:3777/problems/update/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert('Question updated successfully!');
      } catch (error) {
        console.error('Error updating question:', error);
        alert('Failed to update question: ' + error.message);
      }
    } else {
      alert('Please fix form errors before submitting');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div id="left" className="w-[20%] p-4 border-r border-light_theme dark:border-dark_theme">
        <div className="sticky top-0">
          <Sidebar />
        </div>
      </div>

      <div id="right" className="w-[80%] overflow-y-auto">
        <Header />

        <div className="flex flex-grow">
          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme dark:text-white flex flex-col">
            <div className="flex bg-primary text-primary-foreground space-x-3 py-1 pl-1">
              <div className="w-full sm:w-[30%] bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme text-center py-2 px-4 rounded-lg">
                Python
              </div>
            </div>
            <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
              <Playground
                initialCode={solutionCode}
                onCodeChange={(code) => setSolutionCode(code)}
              />
            </div>
          </div>

          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme dark:text-white flex flex-col">
            <Tabs defaultValue="details" className="flex flex-col h-full w-full">
              <TabsList className="flex justify-center pt-5 pr-2">
                <TabsTrigger className="w-1/3 h-10" value="details">Description</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10" value="testcases">+ Add Test Case</TabsTrigger>
                <button
                  onClick={handleUpdate}
                  className="w-1/3 h-10 py-2 px-4 rounded-lg bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme">
                  Update
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

export default UpdateQuestion;