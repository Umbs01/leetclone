// Ensure "use client" is at the top
"use client";

import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Link from 'next/link';
import Playground from "@/components/playground";
import Button from "@/components/Button";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QuestionComponent = () => {
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {
        // Simulating async data fetching
        const fetchQuestions = async () => {
            const response = {
                data: [
                    { name: "What is React?", point: 100, level: "fundamental", status: "waiting" },
                    { name: "Explain useEffect Hook", point: 300, level: "medium", status: "waiting" },
                    { name: "What are props?", point: 400, level: "difficult", status: "waiting" },
                    { name: "What is React?", point: 100, level: "fundamental", status: "done" },
                    { name: "Explain useEffect Hook", point: 300, level: "medium", status: "done" },
                    { name: "What are props?", point: 400, level: "difficult", status: "done" }
                ],
            };

            setQuestions(response.data);
        };

        fetchQuestions();
    }, []);

    return (
        <>
            <div>
                <span className="text-white ml-6 text-2xl">Number</span>
                <span className="text-white ml-12 text-2xl">Name</span>
                <span className="text-white mr-16 float-end text-2xl">Status</span>
                <span className="text-white mr-16 float-end text-2xl">Points</span>
                <span className="text-white mr-20 float-end text-2xl">Level</span>
            </div>
            {questions.map((question, i) => (
                <Link
                    href={{
                        pathname: '/test',
                        query: {
                            name: question.name,
                            point: question.point,
                            level: question.level,
                            status: question.status,
                        },
                    }}
                    key={question.name}
                >
                    <div className="question-block p-4 text-white bg-element rounded-3xl hover:bg-gray-500 transition duration-200 cursor-pointer mt-4">
                        <span className="ml-10 text-xl">{i + 1}</span>
                        <span className="ml-24 text-xl font-semibold">{question.name.length > 70 ? question.name.slice(0, 70) + "..." : question.name}</span>
                        <div className={`text-xl float-end ${question.status === "done" ? "text-green-500" : "text-red-500"} mr-14`}>{question.status}</div>
                        <div className="text-xl float-end mr-12">{question.point} points</div>
                        <div className={`text-xl float-end ${question.level === "fundamental" ? "text-Fundamental" : question.level === "medium" ? "text-Medium" : "text-Difficult"} mr-10`}>{question.level}</div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default QuestionComponent;