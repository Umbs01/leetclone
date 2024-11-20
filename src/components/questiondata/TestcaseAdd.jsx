'use client';

function TestcaseAdd({ testcaseData, setTestcaseData }) {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setTestcaseData((prev) =>
      prev.map((testcase, i) =>
        i === index ? { ...testcase, [name]: value } : testcase
      )
    );
  };

  return (
    <form className="dark:text-white text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2 mt-4">
      <h1>Test Cases</h1>
      {testcaseData.map((testcase, index) => (
        <div className="m-4" key={index}>
          <h2 className="font-bold">Test Case {index + 1}</h2>
          <div className="flex justify-between">
            <div className="w-1/2">
              {/* Input Field */}
              <label htmlFor={`input-${index}`} className="font-bold">
                Input:
              </label>
              <input
                type="text"
                id={`input-${index}`}
                value={testcase.input}
                onChange={(e) => handleChange(index, e)}
                name="input"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>
            <div className="w-1/2 pl-2">
              {/* Output Field */}
              <label htmlFor={`output-${index}`} className="font-bold">
                Output:
              </label>
              <input
                type="text"
                id={`output-${index}`}
                value={testcase.output}
                onChange={(e) => handleChange(index, e)}
                name="output"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>
          </div>
        </div>
      ))}
    </form>
  );
}

export default TestcaseAdd;