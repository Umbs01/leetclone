'use client';

import Playground from "@/components/playground";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestcaseAdd from "@/components/questiondata/TestcaseAdd";
import TestcaseDescription from "@/components/questiondata/TestcaseDescription";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

async function submitProblem(descriptionData, testcaseData, solution) {
  try {
    // Transform testcaseData to required format
    const formattedTestCases = testcaseData
      .filter(test => test.input && test.output) // Only include non-empty test cases
      .map(test => ({
        input: test.input,
        output: test.output
      }));

    // Get student_id from token
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const decoded = jwtDecode(token);
    const student_id = decoded.sub;
    
    // Construct the problem data object
    const problemData = {
      title: descriptionData.title || '',
      description: descriptionData.description || '',
      difficulty: descriptionData.selectedTag || 'easy',
      points: parseInt(descriptionData.point) || 0,
      hint: "",
      tags: [""],
      hint_cost: 0,
      test_cases: formattedTestCases,
      input_format: descriptionData.input_format || 'string',
      output_format: descriptionData.output_format || 'string',
      author: student_id, //implement how to get author (student_id) 
      status: "",
      solves: 0,
      hidden_test_cases: [{}],
      solution: solution,
      template: "",
      starter: ""
    };

    // for debugging
    console.log('Description Data:', descriptionData);
    console.log('Test Case Data:', testcaseData);
    console.log('Solution:', solution);
    console.log('Formatted Test Cases:', formattedTestCases);
    console.log('Full Request Body:', JSON.stringify(problemData, null, 2));


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

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error submitting problem:', error);
    throw error;
  }
}

function TestCase() {
  // const [descriptionData, setDescriptionData] = useState(""); // State for Description tab
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

  const handleSubmit = async () => {
    try {
      const result = await submitProblem(descriptionData, testcaseData, solutionCode);
      console.log('Problem created successfully:', result);
      alert('Problem created successfully!');
    } catch (error) {
      console.error('Failed to create problem:', error);
      alert('Failed to create problem.' + error.message);
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
            <div className="flex bg-primary text-primary-foreground space-x-3 py-1 pl-1">
              <div className="w-full sm:w-[30%] bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme text-center py-2 px-4 rounded-lg">
                Python
              </div>
            </div>
            <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
              <Playground
                onCodeChange={(code) => setSolutionCode(code)}
              />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme dark:text-white flex flex-col">
            <Tabs defaultValue="details" className="flex flex-col h-full w-full">
              <TabsList className="flex justify-center pt-5 pr-2">
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
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCase;
