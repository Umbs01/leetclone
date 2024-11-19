"use client"; 
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const Playground = dynamic(() => import("@/components/playground"), { ssr: false });
const Button = dynamic(() => import("@/components/Button"), { ssr: false });
const Header = dynamic(() => import("@/components/header"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: false });
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Test() {
  const [isClient, setIsClient] = useState(false);
  const [queryParams, setQueryParams] = useState({ name: "", point: "", level: "", status: "" });
  const [testCases, setTestCases] = useState([
    { input: "Input 1", output: "Output 1" },
    { input: "Input 2", output: "Output 2" },
    { input: "Input 3", output: "Output 3" }
  ]);
  const searchParams = useSearchParams(); 

  useEffect(() => {
    setIsClient(true);
    setQueryParams({
      name: searchParams.get("name") || "",
      point: searchParams.get("point") || "",
      level: searchParams.get("level") || "",
      status: searchParams.get("status") || "",
    });

    const id = searchParams.get("id");
    if (id) {
      fetch(`http://161.246.5.48:3777/problems/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const fetchedTestCases = data.test_cases || [];
          setTestCases(fetchedTestCases.length ? fetchedTestCases : [
            { input: "Input 1", output: "Output 1" },
            { input: "Input 2", output: "Output 2" },
            { input: "Input 3", output: "Output 3" }
          ]);
        })
        .catch((error) => console.error("Error fetching test case data:", error));
    }
  }, [searchParams]);

  const handleClick = () => alert("Button clicked");

  if (!isClient) {
    return null; 
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
              <div className="w-full bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme text-center py-2 px-4 rounded-lg">Python</div>
              <Button extra="w-full border-light_theme dark:border-dark_theme hover:dark:bg-dark_theme hover:bg-light_theme" onClick={handleClick} label="Hint" variant="primary" size="md" />
              <Button extra="w-full border-light_theme dark:border-dark_theme hover:dark:bg-dark_theme hover:bg-light_theme" onClick={handleClick} label="Run" variant="primary" size="md" />
            </div>
            <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
              <Playground />
            </div>
          </div>
          <div className="w-[50%] h-screen border border-dark-grey border-light_theme dark:border-dark_theme flex flex-col">
            <Tabs defaultValue="details" className="flex flex-col h-full w-full">
              <TabsList className="flex justify-center">
                <TabsTrigger className="w-1/3 h-10 dark:text-white" value="details">Description</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10 dark:text-white" value="testcases">Test Case Example</TabsTrigger>
                <TabsTrigger className="w-1/3 h-10 dark:text-white" value="submit">Submit</TabsTrigger>
              </TabsList>
              <div className="flex-grow overflow-y-auto" style={{ height: "calc(100vh - 55px)" }}>
                <TabsContent value="details">
                  <h1 className="text-3xl m-2 dark:text-white">Problem Title</h1>
                  <div id="tags" className="flex m-2 h-10">
                    <div className="border-light_theme dark:border-dark_theme text-primary-foreground dark:text-white rounded-full px-10 py-1.5 mr-2 border">Difficulty: {queryParams.level}</div>
                    <div className="border-light_theme dark:border-dark_theme text-primary-foreground dark:text-white rounded-full px-2 py-1.5 mr-2 border">Some tags</div>
                  </div>
                  <div id="description" className="m-4 dark:text-white">
                    <p>{queryParams.name}</p>
                  </div>
                  <div id="score" className="m-4 dark:text-white">
                    <h2 className="font-bold">score</h2>
                    <p>Points: {queryParams.point}</p>
                  </div>
                  <div id="input" className="m-4 dark:text-white">
                    <h2 className="font-bold">Input</h2>
                    <p>{testCases[0]?.input}</p>
                  </div>
                  <div id="output" className="m-4 dark:text-white">
                    <h2 className="font-bold">output</h2>
                    <p>{testCases[0]?.output}</p>
                  </div>
                </TabsContent>
                <TabsContent value="testcases">
                  <h1 className="text-3xl m-2 dark:text-white">Example Testcases</h1>
                  <div id="testcases" className="m-4">
                    {testCases.map((testCase, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="w-1/2 dark:text-white">
                          <h2 className="font-bold">Input</h2>
                          <pre>{testCase.input}</pre>
                        </div>
                        <div className="w-1/2 dark:text-white">
                          <h2 className="font-bold">Output</h2>
                          <pre>{testCase.output}</pre>
                        </div>
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
