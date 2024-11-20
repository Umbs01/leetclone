'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Playground from "@/components/playground_problem";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestcaseAdd from "@/components/questiondata/TestcaseAdd";
import TestcaseDescription from "@/components/questiondata/TestcaseDescription";
import { jwtDecode } from "jwt-decode";
import withAuth from "@/hoc/withAuth";

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
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
  const [templateCode, setTemplateCode] = useState("");
  const [starterCode, setStarterCode] = useState("");
  const [activePlaygroundTab, setActivePlaygroundTab] = useState("solution");


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
        router.push(`/question/${params.problem_id}`);
      }
    }
  }, [router, params.problem_id]);


  // Fetch existing question data
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(`http://161.246.5.48:3777/problems/${params.problem_id}`);
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
        setTemplateCode(data.template || "");
        setStarterCode(data.starter || "");
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching question:', error);
        alert('Error loading question data');
      }
    };

    if (params.problem_id) {
      fetchQuestionData();
    }
  }, [params.problem_id]);

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
          template: templateCode,
          starter: starterCode
        };

        const response = await fetch(`http://161.246.5.48:3777/problems/update/${params.problem_id}`, {
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
        router.push('/question'); // Optional: redirect after successful update
      } catch (error) {
        console.error('Error updating question:', error);
        alert('Failed to update question: ' + error.message);
      }
    } else {
      alert('Please fix form errors before submitting');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`http://161.246.5.48:3777/problems/delete/${params.problem_id}?token=${token}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Problem deleted successfully!');
      router.push('/problems');
    } catch (error) {
      console.error('Error deleting problem:', error);
      alert('Failed to delete problem: ' + error.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
            <Tabs
              defaultValue="solution"
              className="flex flex-col h-full w-full"
              onValueChange={setActivePlaygroundTab}
            >
              <TabsList className="flex justify-center pt-1 pr-2 relative">
                <div
                  className="absolute left-0 right-0 top-0 h-1 dark:bg-[#d08d2d] bg-[#179299] transition-all duration-300"
                  style={{
                    transform: `translateX(${activePlaygroundTab === 'solution' ? '0%' :
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

          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme dark:text-white flex flex-col">
            <Tabs defaultValue="details" className="flex flex-col h-full w-full">
              <TabsList className="flex justify-center pt-5 pr-2 space-x-2">
                <TabsTrigger className="w-1/3 h-10" value="details">Description</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10" value="testcases">+ Add Test Case</TabsTrigger>
                <div className="flex w-1/3 space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 h-10 py-2 px-4 rounded-lg bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme">
                    Update
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="flex-1 h-10 py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600">
                    Delete
                  </button>
                </div>
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
          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete this problem? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={closeDeleteModal}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(UpdateQuestion);