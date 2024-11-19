'use client';
import React, { useState } from 'react';

const TagSelector = ({ selectedTag, handleSelect }) => {
  return (
    <div className="flex justify-between items-center space-x-2 m-2 h-10">
      {/* Tag 1: Easy */}
      <button
        className={`w-1/3 border-light_theme dark:border-dark_theme rounded-full px-4 py-1 border text-center transition-colors 
          ${selectedTag === 'easy' ? 'bg-Fundametal dark:text-white  text-black' : 'bg-primary text-primary-foreground hover:bg-Fundametal hover:dark:text-white  '}`}
        onClick={() => handleSelect('easy')}
      >
        Easy
      </button>

      {/* Tag 2: Medium */}
      <button
        className={`w-1/3 border-light_theme dark:border-dark_theme rounded-full px-4 py-1 border text-center transition-colors 
          ${selectedTag === 'medium' ? 'bg-Medium dark:text-white  text-black' : 'bg-primary text-primary-foreground hover:bg-Medium hover:dark:text-white '}`}
        onClick={() => handleSelect('medium')}
      >
        Medium
      </button>

      {/* Tag 3: Difficulty */}
      <button
        className={`w-1/3 border-light_theme dark:border-dark_theme rounded-full px-4 py-1 border text-center transition-colors 
          ${selectedTag === 'difficulty' ? 'bg-Difficult dark:text-white  text-black' : 'bg-primary text-primary-foreground hover:bg-Difficult hover:dark:text-white  '}`}
        onClick={() => handleSelect('difficulty')}
      >
        Difficulty
      </button>
    </div>
  );
};

function TestcaseDescriptioin() {
  // State to track the selected tag
  const [selectedTag, setSelectedTag] = useState(null);

  // Handler to set the selected tag (ignores clicks on already selected tag)
  const handleSelect = (tag) => {
    if (tag !== selectedTag) {
      setSelectedTag(tag);
    }
  };

  return (
    <>
      <form
        action="Description" // Optional: You can remove this if you don't need any form submission
        className="dark:text-white  text-black p-6 rounded border border-light_theme dark:border-dark_theme m-2 mt-4"
        onSubmit={(e) => e.preventDefault()} // Prevent form submission to stay on the same page
      >
        {/* Problem Title Field */}
        <div id="ProblemTitle" className="m-2">
          <div className="block justify-between">
            <div className="w-2/3">
              <label htmlFor="input" className="font-bold">Problem Title:</label>
              <input
                type="text"
                id="input"
                name="input"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
              />
            </div>

            {/* Tag Selector Component */}
            <TagSelector selectedTag={selectedTag} handleSelect={handleSelect} />

            {/* point */}
            <div className="w-1/3 pl-2 mt-4">
              <label htmlFor="Point" className="font-bold">Point:</label>
              <input
                id="Point"
                name="Point"
                rows="4"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
                placeholder="Enter Point here..."
              />
            </div>

            <div className="w-2/3 pl-2 mt-4">
              <label htmlFor="Hint" className="font-bold">Hint:</label>
              <textarea
                id="hint"
                name="hint"
                rows="2"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
                placeholder="Enter hint here..."
              />
            </div>
            
            {/* Description Field */}
            <div className="w-2/3 pl-2 mt-4">
              <label htmlFor="description" className="font-bold">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full border border-gray-300 rounded p-2 mt-2 text-black"
                placeholder="Enter description here..."
              />
            </div>
            {/* Hint Field */}

          </div>
        </div>
      </form>
    </>
  );
}

export default TestcaseDescriptioin;
