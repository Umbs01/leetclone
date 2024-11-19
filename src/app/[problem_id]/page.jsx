"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { jwtDecode } from "jwt-decode";

// import Normal from "@/public/normal.png"
// import Normal from "../../public/normal.png";


// Dynamically import components (avoiding SSR issues)
const Playground = dynamic(() => import("@/components/playground"), { ssr: false });
const Button = dynamic(() => import("@/components/button"), { ssr: false });
const Header = dynamic(() => import("@/components/header"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: false });
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Test({ params }) {
  const problemId = params.problem_id;
  const [isClient, setIsClient] = useState(false);
  const [queryParams, setQueryParams] = useState({ name: "", point: "", level: "", status: "" });
  const [problemData, setProblemData] = useState({});
  const [code, setCode] = useState("");
  const [result, setResult] = useState([]);
  // 
  const [activeTab, setActiveTab] = useState("details"); 

  const searchParams = useSearchParams(); // Access query params

  useEffect(() => {
    // Update queryParams with searchParams after component mounts
    setIsClient(true);
    setQueryParams({
      name: searchParams.get("name") || "",
      point: searchParams.get("point") || "",
      level: searchParams.get("level") || "",
      status: searchParams.get("status") || "",
    });
  }, [searchParams]);

  useEffect(() => {
    // Fetch problem data from the API
    async function fetchProblemData() {
      try {
        const response = await fetch(`http://161.246.5.48:3777/problems/${problemId}`);
        if (!response.ok) {
          throw new Error(`Error fetching problem: ${response.status}`);
        }
        const data = await response.json();
        setProblemData(data); // Store the fetched data
        setCode(data["starter"]); // Set the starter code
      } catch (error) {
        console.error("Failed to fetch problem data:", error);
      } finally {
        console.log(`Problem data fetched successfully`);
      }
    }

    if (problemId) {
      fetchProblemData();
    }
  }, [problemId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  async function handleRunCode() {
    try {
      const res = await fetch(`http://161.246.5.48:3777/run-code/${problemId}`, {
        method: "POST",
        body: JSON.stringify({ test_cases: problemData.test_cases, code: code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Error running code: ${res.status}`);
      }
      const data = await res.json();
      setResult(data["results"]);
      alert(data["results"]);
      // 
      setActiveTab("testcases"); 
      // fix here
    }
    catch (error) {
      alert(error);
      throw new Error("Error running code");
    }
  }

  async function handleHint() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const res = await fetch(`http://161.246.5.48:3777/problems/hint/${problemId}/?token=${token}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      if (!res.ok) {
        throw new Error(`Error fetching hint: ${res.status}`);
      }
      const data = await res.json();
      alert(data.hint);
    }
    catch (error) {
      throw new Error("Error fetching token");
    }
  }



  async function handleSubmit() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const student_id = decoded.sub;

    const submission_data = {
      code: code,
      problem_id: problemId,
      owner: student_id
    };

    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const res = await fetch(`http://161.246.5.48:3777/submit?token=${token}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(submission_data),
      });
      if (!res.ok) {
        throw new Error(`Error submitting code: ${res.status}`);
      }
      const data = await res.json();
      alert("Submitted successfully");
    }
    catch (error) {
      alert(error);
      throw new Error("Error submitting code");
    }
  }

  if (!isClient) {
    return null; // Render nothing until client-side rendering is confirmed
  }

  return (
    <div className="flex h-screen">
      <div id="left" className="w-[20%] p-4 border-r border-light_theme dark:border-dark_theme">
        <Sidebar />
      </div>
      <div id="right" className="w-[80%] overflow-y-auto">
        <Header />
        <div className="flex flex-grow">
          <div className="w-[50%] h-screen border border-dark-grey border-light_theme dark:border-dark_theme flex flex-col">
            <div className="flex justify-center items-center bg-primary text-primary-foreground dark:text-white space-x-3 py-1 px-1 ">
              <div className="w-full bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme text-center py-2 px-4 rounded-lg">Python 3.11.2</div>
              <Button extra="w-full border-light_theme dark:border-dark_theme hover:dark:bg-dark_theme hover:bg-light_theme" onClick={handleHint} label="Hint" variant="primary" size="md" />
              <Button extra="w-full border-light_theme dark:border-dark_theme hover:dark:bg-dark_theme hover:bg-light_theme" onClick={handleRunCode} label="Run" variant="primary" size="md" />
            </div>
            <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
              <Playground
                starterCode={code}
                theme="dark"
                oncodeChange={handleCodeChange}
              />
            </div>
          </div>
          <div className="w-[50%] h-screen border border-dark-grey border-light_theme dark:border-dark_theme flex flex-col">
            {/* <Tabs defaultValue="details" className="flex flex-col h-full w-full"> */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full w-full">
              <TabsList className="flex justify-center pt-3">
                <TabsTrigger className="w-1/3 h-10 dark:text-white" value="details">Description</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10 dark:text-white" value="testcases">Test Case Example</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10 dark:text-white bg-light_theme dark:bg-dark_theme rounded-lg" value="submit" onClick={handleSubmit} >Submit</TabsTrigger>
                {/* <Button className="w-1/3 h-10 dark:text-white bg-red" value="submit" onClick={handleSubmit}>Submit</Button> */}
                {/* <Button className="w-1/3 h-10 dark:text-white bg-red" value="submit" onClick={handleSubmit}>Submit</Button> */}
              </TabsList>
              <div className="flex-grow overflow-y-auto" style={{ height: "calc(100vh - 55px)" }}>

                <TabsContent value="details">
                  <h1 className="text-3xl m-2 dark:text-white">{problemData?.title}</h1>
                  <div id="tags" className="flex m-2 h-10">
                    <div className="border-light_theme dark:border-dark_theme text-primary-foreground dark:text-white rounded-full px-10 py-1.5 mr-2 border">
                      Difficulty: {problemData?.difficulty} | {problemData?.points} points
                    </div>
                    {/* mapping the tags */}
                    {problemData.tags?.map((tag, index) => (
                      <div key={index} className="border-light_theme dark:border-dark_theme text-primary-foreground dark:text-white rounded-full px-2 py-1.5 mr-2 border">
                        {tag}
                      </div>
                    ))}

                  </div>
                  <div id="description" className="m-4 dark:text-white">
                    <p>{problemData?.description}</p>
                  </div>
                  <div id="input" className="m-4 dark:text-white">
                    <h2 className="font-bold">Input</h2>
                    <p>{problemData?.input_format}</p>
                  </div>
                  <div id="output" className="m-4 dark:text-white">
                    <h2 className="font-bold">output</h2>
                    <p>{problemData?.output_format}</p>
                  </div>
                </TabsContent>

                {/* <TabsContent value="testcases">
                  <h1 className="text-3xl m-2 dark:text-white">Example Testcases</h1>
                  <div id="testcases" className="m-4">
                    {problemData.test_cases?.map((testcase, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="w-1/2 dark:text-white"><h2 className="font-bold">Input</h2><pre>{testcase.input}</pre></div>
                        <div className="w-1/2 dark:text-white"><h2 className="font-bold">Output</h2><pre>{testcase.output}</pre></div>
                      </div>
                    ))}
                  </div>

                  <form action="Case3" className=" dark:text-white  text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2">
                  <h1>Test case 3</h1>
                  <div id="testcase3"  className="m-4">
                    <div className="flex justify-between">
                    <div className="w-1/2">
                      {/* Input Field */}
                      {/* <label htmlFor="input" className="font-bold">Input:</label>
                      <input
                        type="text"
                        id="input"
                        name="input"
                        className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
                      />
                    </div>

                    <div className="w-1/2 pl-2">
                      {/* Output Field */}
                      {/* <label htmlFor="output" className="font-bold">Output:</label>
                      <input
                        type="text"
                        id="output"
                        name="output"
                        className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
                      />
                    </div>
                    </div>
                  </div>
                  </form>

                // </TabsContent> */}

<TabsContent value="testcases">
  <h1 className="text-3xl m-2 dark:text-white">Example Testcases</h1>
  <div id="testcases" className="m-4">
    {problemData.test_cases?.map((testcase, index) => (
      <div key={index} className="flex justify-between">
        <form action="Case3" className="dark:text-white text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2">
          <h1>
            Test case {index + 1}
            {/* <img src="normal.png" alt="Test Case Icon" className="inline-block ml-2 w-8" /> */}
            <img
              src={result.length === 0 ? "normal.png" : result[index] === true ? "true.png" : "false.png"}
              alt="Test Case Icon"
              className="inline-block ml-2 w-6 pb-1"
            />
            </h1>
          <div id={`testcase${index + 1}`} className="m-4">
            <div className="flex justify-between">
              {/* Input Field */}
              <div className="w-1/2 pr-44">
                <label htmlFor="input" className="font-bold">Input:</label>
                <pre className="w-full">{testcase.input}</pre>
              </div>

              {/* Output Field */}
              <div className="w-1/2 pl-44 pr-44">
                <label htmlFor="output" className="font-bold">Output:</label>
                <pre className="w-full">{testcase.output}</pre>
              </div>
            </div>
          </div>
        </form>
      </div>
    ))}
  </div>
</TabsContent>

              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
