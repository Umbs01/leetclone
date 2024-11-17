'use client';

function TestcaseAdd(){
    return (
        <div className="h-auto overflow-y-auto">

        <form action="Case1" className=" dark:dark:text-white  text-black   p-6 rounded border border-light_theme dark:border-dark_theme m-2">
          <h1>Test case 1</h1>
          <div id="testcase1"  className="m-4">
            <div className="flex justify-between">
            <div className="w-1/2">
              {/* Input Field */}
              <label htmlFor="input" className="font-bold">Input:</label>
              <input
                type="text"
                id="input"
                name="input"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black "
              />
            </div>

            <div className="w-1/2 pl-2">
              {/* Output Field */}
              <label htmlFor="output" className="font-bold">Output:</label>
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

        {/* <form action="Case2" class="bg-blue-500 dark:text-white  text-black p-6 rounded"> */}
        <form action="Case2" className=" dark:dark:text-white  text-black  text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2">

          <h1>Test case 2</h1>
          <div id="testcase2"  className="m-4">
            <div className="flex justify-between">
            <div className="w-1/2">
              {/* Input Field */}
              <label htmlFor="input" className="font-bold">Input:</label>
              <input
                type="text"
                id="input"
                name="input"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>

            <div className="w-1/2 pl-2">
              {/* Output Field */}
              <label htmlFor="output" className="font-bold">Output:</label>
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

        {/* <form action="Case1" class="bg-blue-500 dark:text-white  text-black p-6 rounded"> */}
        <form action="Case3" className=" dark:text-white  text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2">

          <h1>Test case 3</h1>
          <div id="testcase3"  className="m-4">
            <div className="flex justify-between">
            <div className="w-1/2">
              {/* Input Field */}
              <label htmlFor="input" className="font-bold">Input:</label>
              <input
                type="text"
                id="input"
                name="input"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>

            <div className="w-1/2 pl-2">
              {/* Output Field */}
              <label htmlFor="output" className="font-bold">Output:</label>
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

        {/* <form action="Case2" class="bg-blue-500 dark:text-white  text-black p-6 rounded"> */}
        <form action="Case4" className=" dark:text-white  text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2">

          <h1>Test case 4</h1>
          <div id="testcase4"  className="m-4">
            <div className="flex justify-between">
            <div className="w-1/2">
              {/* Input Field */}
              <label htmlFor="input" className="font-bold">Input:</label>
              <input
                type="text"
                id="input"
                name="input"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>

            <div className="w-1/2 pl-2">
              {/* Output Field */}
              <label htmlFor="output" className="font-bold">Output:</label>
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

        {/* <form action="Case2" class="bg-blue-500 dark:text-white  text-black p-6 rounded"> */}
        <form action="Case5" className=" dark:text-white  text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2">

          <h1>Test case 5</h1>
          <div id="testcase5"  className="m-4">
            <div className="flex justify-between">
            <div className="w-1/2">
              {/* Input Field */}
              <label htmlFor="input" className="font-bold">Input:</label>
              <input
                type="text"
                id="input"
                name="input"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>

            <div className="w-1/2 pl-2">
              {/* Output Field */}
              <label htmlFor="output" className="font-bold">Output:</label>
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
      </div>
    )
}

export default TestcaseAdd