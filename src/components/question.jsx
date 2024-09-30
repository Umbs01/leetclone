"use client"; 
import { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';

const QuestionComponent = () => {
    const [questions, setQuestions] = useState([]); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = {
                    data: [
                        {name: "What is React What is React What is ReactWhat is React What is React What is React?", point: 100 , level: "fundametal", status: "wating"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "wating" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "wating"},
                        {name: "What is React?", point: 100 , level: "fundametal", status: "done"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "done" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "done"},                        
                        {name: "What is React?", point: 100 , level: "fundametal", status: "wating"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "wating" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "wating"},                        
                        {name: "What is React?", point: 100 , level: "fundametal", status: "wating"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "done" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "done"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "done" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "done"},
                        {name: "What is React?", point: 100 , level: "fundametal", status: "wating"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "wating" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "done"},                        
                        {name: "What is React?", point: 100 , level: "fundametal", status: "wating"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "wating" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "done"},                        
                        {name: "What is React?", point: 100 , level: "fundametal", status: "wating"},
                        {name: "Explain useEffect Hook", point: 300, level: "medium", status: "wating" },
                        {name: "What are props?", point: 400, level: "difficult" , status: "done"},
                    ],
                };

                setQuestions(response.data);
            } catch (e) {
                console.error("Error fetching questions", e);
            }
        };

        fetchQuestions(); 
    }, []);  

    const questionElements = [];

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        let statusClass = ""; 
        let pointClass = ""; 
        let levelClass = "";
        let name = question.name;
        if(question.name.length > 70){
            question.name = question.name.slice(0,70) + "...";
        }
        // if(question.name.slice(0,30))
        if (question.status === "done") {
            statusClass = "mr-14 text-green-500"; 
            pointClass = "mr-12"
            if(question.level === "fundametal"){
                levelClass = "mr-8 text-Fundametal"
            }else if(question.level === "medium"){
                levelClass = "mr-10 text-Medium"
            }else if(question.level === "difficult"){
                levelClass = "mr-10 text-Difficult"
            }
        }else{
            statusClass = "mr-12 text-red-500";
            pointClass = "mr-12"
            if(question.level === "fundametal"){
                levelClass = "mr-8 text-Fundametal"
            }else if(question.level === "medium"){
                levelClass = "mr-10 text-Medium"
            }else if(question.level === "difficult"){
                levelClass = "mr-10 text-Difficult"
            }
        }

        // if(question.point.toString().length === 3){
        //     pointClass = "mr-6";
        // }
    
        questionElements.push(
            <Link href={`/question/${question.name}`} key={question.name}>
                <div className="question-block p-4 text-white bg-element rounded-3xl hover:bg-gray-100 transition duration-200 cursor-pointer mt-4">
                    <span className="ml-10 text-xl">{i + 1}</span>
                    <span className="ml-24 text-xl font-semibold">{question.name}</span>
                    <div className={`text-xl float-end ${statusClass}`}>{question.status}</div>
                    <div className={`text-xl float-end ${pointClass}`}>{question.point} points</div>
                    <div className={`float-end text-xl ${levelClass}`}>{question.level}</div>
                </div>
            </Link>
        );
    }
    

    return (
        <>
            <div>
                <span className="text-white ml-6 text-2xl">Number</span>
                <span className="text-white ml-12 text-2xl">Name</span>
                <span className="text-white mr-16 float-end text-2xl">status</span>
                <span className="text-white mr-16 float-end text-2xl">Point</span>
                <span className="text-white mr-20 float-end text-2xl">Level</span>

            </div>
            {questionElements}
        </>
    );
};

export default QuestionComponent;
