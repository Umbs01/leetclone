"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const QuestionComponent = ({ studentId }) => {
  const [questions, setQuestions] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  // Fetch questions from the server
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://161.246.5.48:3777/questions/");
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

  // Sample data for testing
  useEffect(() => {
    const sampleQuestions = [
      {
        id: "1",
        title: "What is the time complexity of binary search?",
        difficulty: "easy",
        points: 10,
      },
      {
        id: "2",
        title: "Explain the difference between HTTP and HTTPS.",
        difficulty: "medium",
        points: 20,
      },
      {
        id: "3",
        title: "Implement a solution for the Travelling Salesman Problem.",
        difficulty: "hard",
        points: 50,
      },
      {
        id: "4",
        title: "Describe the role of DNS in the internet architecture.",
        difficulty: "medium",
        points: 15,
      },
      {
        id: "5",
        title: "What is a hash function and how is it used in blockchain?",
        difficulty: "easy",
        points: 25,
      },
      {
        id: "6",
        title: "Explain the concept of a linked list.",
        difficulty: "easy",
        points: 10,
      },
      {
        id: "7",
        title: "What is the difference between a stack and a queue?",
        difficulty: "medium",
        points: 20,
      },
      {
        id: "8",
        title: "Implement a solution",
        difficulty: "hard",
        points: 50,
      },
      {
        id: "9",
        title: "Describe the role of DNS",
        difficulty: "medium",
        points: 15,
      },
      {
        id: "10",
        title: "What is a hash function",
        difficulty: "easy",
        points: 25,
      },
      {
        id: "11",
        title: "Explain the concept of a linked list",
        difficulty: "easy",
        points: 10,
      },
      {
        id: "12",
        title: "What is the difference between a stack and a queue",
        difficulty: "medium",
        points: 20,
      },
      {
        id: "13",
        title: "Implement a solution",
        difficulty: "hard",
        points: 50,
      },
      {
        id: "14",
        title: "Describe the role of DNS",
        difficulty: "medium",
        points: 15,
      },
      {
        id: "15",
        title: "What is a hash function",
        difficulty: "easy",
        points: 25,
      },
    ];

    setQuestions(sampleQuestions);
  }, []);

  // Fetch user data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://161.246.5.48:3777/users/${studentId}`);
        const data = await response.json();
        setSolvedProblems(data.solved_problems || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [studentId]);

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
