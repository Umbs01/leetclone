"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

const QuestionComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  // Fetch questions from the server
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://161.246.5.48:3777/problems/");
        {
          if (!response.ok) {
            throw new Error("Failed to fetch questions");
          }
          const data = await response.json();
          setQuestions(data);
        }
      } catch (e) {
        console.error("Error fetching questions", e);
      }
    };
    fetchQuestions();
  }, []);

  // Fetch user data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const decoded = jwtDecode(token);
        const student_id = decoded.sub;

        const response = await fetch(`http://161.246.5.48:3777/users/${student_id}?token=${token}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const solvedProblemIds = data.solved_problems.map(problem => problem.problem_id);
        setSolvedProblems(solvedProblemIds);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const questionElements = questions.map((question, index) => {
    const longTitle =
      question.title.length > 70
        ? `${question.title.slice(0, 70)}...`
        : question.title;

    let difficultyClass = "";
    if (question.difficulty === "easy") {
      difficultyClass = "text-green-500";
    } else if (question.difficulty === "medium") {
      difficultyClass = "text-yellow-500";
    } else if (question.difficulty === "hard") {
      difficultyClass = "text-red-500";
    }

    const isSolved = solvedProblems.includes(question.id);
    const statusText = isSolved ? "Done" : "Not Done";
    const statusClass = isSolved ? "text-green-500" : "text-red-500";

    return (
      <Link href={`/question/${question.id}`} key={question.id}>
        <div className="question-block p-4 bg-element rounded-3xl hover:bg-gray-500 transition duration-200 cursor-pointer mt-4 flex items-center justify-between text-white">
          <span className="w-1/12 text-center text-xl">{index + 1}</span>
          <span className="w-4/12 text-xl font-semibold">{longTitle}</span>
          <span className={`w-2/12 text-xl ${difficultyClass} text-center`}>
            {question.difficulty}
          </span>
          <span className="w-2/12 text-xl text-center">
            {question.points} points
          </span>
          <span className={`w-2/12 text-xl ${statusClass} text-center`}>
            {statusText}
          </span>
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4 dark:text-white text-2xl">
        <span className="w-1/12 text-center">Number</span>
        <span className="w-4/12">Name</span>
        <span className="w-2/12 text-center">Difficulty</span>
        <span className="w-2/12 text-center">Point</span>
        <span className="w-2/12 text-center">Status</span>
      </div>
      {questionElements}
    </>
  );
};

export default QuestionComponent;
