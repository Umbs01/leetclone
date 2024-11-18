'use client';
import React from 'react';

const TagSelector = ({ selectedTag, handleSelect }) => {
  return (
    <div className="flex justify-between items-center space-x-2 m-2 h-10">
      <button
        className={`w-1/3 border-light_theme dark:border-dark_theme rounded-full px-4 py-1 border text-center transition-colors 
          ${selectedTag === 'easy' ? 'bg-Fundametal dark:text-white text-black' : 'bg-primary text-primary-foreground hover:bg-Fundametal hover:dark:text-white '}`}
        onClick={() => handleSelect('easy')}
      >
        Easy
      </button>
      <button
        className={`w-1/3 border-light_theme dark:border-dark_theme rounded-full px-4 py-1 border text-center transition-colors 
          ${selectedTag === 'medium' ? 'bg-Medium dark:text-white text-black' : 'bg-primary text-primary-foreground hover:bg-Medium hover:dark:text-white '}`}
        onClick={() => handleSelect('medium')}
      >
        Medium
      </button>
      <button
        className={`w-1/3 border-light_theme dark:border-dark_theme rounded-full px-4 py-1 border text-center transition-colors 
          ${selectedTag === 'hard' ? 'bg-Difficult dark:text-white text-black' : 'bg-primary text-primary-foreground hover:bg-Difficult hover:dark:text-white '}`}
        onClick={() => handleSelect('hard')}
      >
        Hard
      </button>
    </div>
  );
};

function TestcaseDescription({ descriptionData, setDescriptionData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDescriptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (tag) => {
    setDescriptionData((prev) => ({
      ...prev,
      selectedTag: tag,
    }));
  };

  return (
    <>
      <form
        className="dark:text-white text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2 mt-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div id="ProblemTitle" className="m-2">
          <div className="block justify-between">
            <div className="w-2/3">
              <label htmlFor="title" className="font-bold">
                Problem Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={descriptionData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>

            <TagSelector
              selectedTag={descriptionData.selectedTag}
              handleSelect={handleSelect}
            />

            <div className="w-1/3 pl-2 mt-4">
              <label htmlFor="point" className="font-bold">
                Point:
              </label>
              <input
                id="point"
                name="point"
                type="number"
                value={descriptionData.point}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
                placeholder="Enter Point here..."
              />
            </div>

            <div className="w-2/3 pl-2 mt-4">
              <label htmlFor="description" className="font-bold">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={descriptionData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
                placeholder="Enter description here..."
              />
            </div>
            <div className="w-2/3 pl-2 mt-4">
              <label htmlFor="input_description" className="font-bold">
                Input Description:
              </label>
              <textarea
                name="input_format"
                id="input_description"
                value={descriptionData.input_format}
                onChange={handleChange}
                rows="2"
                className="w-full border border-grey-300 rounded p-2 mt-2 text-black"
                placeholder="Enter input description here..."
              />
            </div>
            <div className="w-2/3 pl-2 mt-4">
              <label htmlFor="output_description" className="font-bold">
                Output Description:
              </label>
              <textarea
                name="output_format"
                id="output_description"
                value={descriptionData.output_format}
                onChange={handleChange}
                rows="2"
                className="w-full border border-grey-300 rounded p-2 mt-2 text-black"
                placeholder="Enter output description here..."
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default TestcaseDescription;

