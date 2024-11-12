// 'use client';

// import Playground from "@/components/playground";
// import Button from "@/components/Button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// function Testcase() {
//   const handleClick = () => {
//     alert("button clicked");
//   }
//   return (
//     <div className="flex">
//       {/* left section */}
//       <div className="w-1/2 h-screen border border-dark-grey rounded">
//         <div className="flex justify-center items-center bg-primary text-primary-foreground space-x-3 py-1">
//           <Button extra="w-full" onClick={handleClick} label="Click me" varient="primary" size="md" />
//           <Button extra="w-full" onClick={handleClick} label="Hint" varient="primary" size="md" />
//           <Button extra="w-full" onClick={handleClick} label="Submit" varient="primary" size="md" />
//         </div>
//         <div style={{ height: "calc(100vh - 55px)" }} className="overflow-scroll rounded">
//           <Playground />
//         </div>
//       </div>
      
//       {/* right section */}
//       <div className="w-1/2 h-screen border border-dark-grey border-l-gray-500 flex flex-col">
//         <div className="flex justify-center items-center bg-primary text-primary-foreground space-x-3 py-1">
//           <Tabs defaultValue="details" className="flex flex-col h-full w-full">
//             <TabsList className="flex justify-center">
//               <TabsTrigger className="w-1/2 h-10" value="details">Details</TabsTrigger>
//               <TabsTrigger className="w-1/2 h-10" value="testcases">Example Testcases</TabsTrigger>
//             </TabsList>
//             <div className="flex-grow overflow" style={{height: "calc(100vh - 55px)"}}>
//               <TabsContent value="details">
//                 <h1 className="text-3xl m-2">Problem Title</h1>
//                 <div id="tags" className="flex m-2 h-10">
//                   <div className="bg-primary text-primary-foreground rounded-full px-10 py-1.5 mr-2 border">Difficulty: </div>
//                   <div className="bg-primary text-primary-foreground rounded-full px-2 py-1.5 mr-2 border">some tags</div>
//                 </div>
//                 <div id="description" className="m-4">
//                   <p>Some description</p>
//                 </div>
//                 <div id="input" className="m-4">
//                   <h2 className="font-bold">Input</h2>
//                   <p>Some input description</p>
//                 </div>
//                 <div id="output" className="m-4">
//                   <h2 className="font-bold">Output</h2>
//                   <p>Some output description</p>  
//                 </div>
//               </TabsContent>
//               <TabsContent value="testcases">
//                 <h1 className="text-3xl m-2">Example Testcases</h1>
//                 <div id="testcases" className="m-4">
//                   <div className="flex justify-between">
//                     <div className="w-1/2">
//                       <h2 className="font-bold">Input</h2>
//                       <pre>some input</pre>
//                     </div>
//                     <div className="w-1/2">
//                       <h2 className="font-bold">Output</h2>
//                       <pre>some output</pre>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </div>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Testcase;
