'use client';

import Playground from "@/components/playground";
import Button from "@/components/Button";

function App() {
  const handleClick = () => {
    alert("button clicked");
  }
  return (
    <div className="flex">
      <div className="w-1/2 h-screen border border-border rounded">
        <div className="flex justify-center items-center bg-primary text-primary-foreground space-x-3">
          <Button extra="w-full" onClick={handleClick} label="Click me" varient="primary" size="md" />
          <Button extra="w-full" onClick={handleClick} label="Hint" varient="primary" size="md" />
          <Button extra="w-full" onClick={handleClick} label="Submit" varient="primary" size="md" />
        </div>
        <div style={{ height: "calc(  100vh - 44px)" }} className="overflow-scroll rounded">
          <Playground />
        </div>
      </div>
      <div className="w-0 h-screen border border-border flex-grow">
        <a>a</a>
      </div>
    </div>
  );
}
export default App;
