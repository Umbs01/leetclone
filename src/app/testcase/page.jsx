'use client';

import Playground from "@/components/playground";
import Button from "@/components/button";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestcaseAdd from "@/components/questiondata/TestcaseAdd"
import TestcaseDescriptioin from "@/components/questiondata/TestcaseDescrition"

function TestCase() {
  const handleClick = () => {
    alert("button clicked");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar section (left-most) */}
      <div id="left" className="w-[20%] p-4 border-r border-light_theme dark:border-dark_theme">
        <div className="sticky top-0">
          <Sidebar />
        </div>
      </div>

      {/* Middle and right sections wrapped in a single div */}
      <div id="right" className="w-[80%]  overflow-y-auto">
        {/* Header section (spanning both middle and right sections) */}
        <Header />

        <div className="flex flex-grow">
          {/* Middle section (next to sidebar) */}
          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme  dark:text-white flex flex-col">
            
            <div className="flex  bg-primary text-primary-foreground space-x-3 py-1 pl-1">

              {/* <Button extra="w-full border-light_theme dark:border-dark_theme w-[30%] bg-light_theme dark:bg-dark_theme " onClick={handleClick} label="Python" variant="primary" size="md" /> */}
              <div className="w-full sm:w-[30%] bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme text-center py-2 px-4 rounded-lg">Python</div>
              {/* <Button extra="w-full border-light_theme dark:border-dark_theme" onClick={handleClick} label="Hint" variant="primary" size="md" />
              <Button extra="w-full border-light_theme dark:border-dark_theme" onClick={handleClick} label="Submit" variant="primary" size="md" /> */}
            </div>
            <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
              <Playground />
            </div>
          </div>

          {/* Right section (far-right side) */}
          <div className="w-[50%] h-screen border border-light_theme dark:border-dark_theme  dark:text-white  flex flex-col">
            <div className="flex justify-center items-center bg-primary text-primary-foreground space-x-0 py-0">
              <Tabs defaultValue="details" className="flex flex-col h-full w-full">
                <TabsList className="flex justify-center pt-5 pr-2">
                  <TabsTrigger className="w-1/3 h-10" value="details">Description</TabsTrigger>
                  <TabsTrigger className="w-1/3 h-10" value="testcases"> + Add Test Case</TabsTrigger>
                  <button className="w-1/3 h-10 py-2 px-4 rounded-lg  bg-light_theme dark:bg-dark_theme border border-light_theme dark:border-dark_theme" value="submit">Submit</button>
                </TabsList>
                <div className="flex-grow overflow-y-auto" style={{ height: "calc(100vh - 55px)" }}>
                  <TabsContent value="details">
                    <TestcaseDescriptioin/>
                  </TabsContent>

                  {/* Testcase Add */}
                  <TabsContent value="testcases">
                    <TestcaseAdd/>
                  </TabsContent>


                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCase;
