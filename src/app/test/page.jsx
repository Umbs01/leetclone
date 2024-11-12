'use client';
import Playground from "@/components/playground";
import Button from "@/components/Button";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
function Test() {
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
      {/* <div className="flex flex-col flex-grow"> */}
      <div id="right" className="w-[80%]  overflow-y-auto">

        {/* Header section (spanning both middle and right sections) */}
        <Header />
        <div className="flex flex-grow">
          {/* Middle section (next to sidebar) */}
          <div className="w-[50%] h-screen border border-dark-grey border-light_theme dark:border-dark_theme flex flex-col">
            <div className="flex justify-center items-center bg-primary text-primary-foreground dark:text-white   space-x-3 py-1">
              <Button extra="w-full border-light_theme dark:border-dark_theme" onClick={handleClick} label="Click me" variant="primary" size="md" />
              <Button extra="w-full border-light_theme dark:border-dark_theme" onClick={handleClick} label="Hint" variant="primary" size="md" />
              <Button extra="w-full border-light_theme dark:border-dark_theme" onClick={handleClick} label="Submit" variant="primary" size="md" />
            </div>
            <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
              <Playground />
            </div>
          </div>
          {/* Right section (far-right side) */}
          <div className="w-[50%] h-screen border border-dark-grey border-light_theme dark:border-dark_theme flex flex-col">
            <div className="flex justify-center items-center bg-primary text-primary-foreground dark:text-white  space-x-3 py-1">
              <Tabs defaultValue="details" className="flex flex-col h-full w-full">
                <TabsList className="flex justify-center">
                  <TabsTrigger className="w-1/3 h-10" value="details">Description</TabsTrigger>
                  <TabsTrigger className="w-1/3 h-10" value="testcases">Add Test Case</TabsTrigger>
                  <TabsTrigger className="w-1/3 h-10" value="submit">Submit</TabsTrigger>
                </TabsList>
                <div className="flex-grow overflow-y-auto" style={{ height: "calc(100vh - 55px)" }}>
                  <TabsContent value="details">
                    <h1 className="text-3xl m-2">Problem Title</h1>
                    <div id="tags" className="flex m-2 h-10">
                      <div className="border-light_theme dark:border-dark_theme text-primary-foreground dark:text-white  rounded-full px-10 py-1.5 mr-2 border">Difficulty:</div>
                      <div className="border-light_theme dark:border-dark_theme text-primary-foreground dark:text-white  rounded-full px-2 py-1.5 mr-2 border">Some tags</div>
                    </div>
                    <div id="description" className="m-4">
                      <p>Some description</p>
                    </div>
                    <div id="input" className="m-4">
                      <h2 className="font-bold">Input</h2>
                      <p>Some input description</p>
                    </div>
                    <div id="output" className="m-4">
                      <h2 className="font-bold">Output</h2>
                      <p>Some output description</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="testcases">
                    <h1 className="text-3xl m-2">Example Testcases</h1>
                    <div id="testcases" className="m-4">
                      <div className="flex justify-between">
                        <div className="w-1/2">
                          <h2 className="font-bold">Input</h2>
                          <pre>Some input</pre>
                        </div>
                        <div className="w-1/2">
                          <h2 className="font-bold">Output</h2>
                          <pre>Some output</pre>
                        </div>
                      </div>
                    </div>
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
export default Test;