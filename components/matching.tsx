import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MatchingProps {
  questions: Question[];
}

interface Question {
  question: string;
  answer: string;
}

export default function Matching({ questions }: MatchingProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    if (selectedAnswer) {
      setMatches((prevMatches) => ({
        ...prevMatches,
        [question]: selectedAnswer,
      }));
      setSelectedQuestion(null);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (selectedQuestion) {
      setMatches((prevMatches) => ({
        ...prevMatches,
        [selectedQuestion]: answer,
      }));
      setSelectedQuestion(null);
      setSelectedAnswer(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Matching</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-4">Questions</h3>
            {questions.map((q) => (
              <div
                key={q.question}
                className={`p-2 mb-2 border rounded cursor-pointer ${
                  selectedQuestion === q.question ? "bg-blue-200" : ""
                }`}
                onClick={() => handleQuestionClick(q.question)}
              >
                {q.question}
              </div>
            ))}
          </div>
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-4">Answers</h3>
            {questions.map((q) => (
              <div
                key={q.answer}
                className={`p-2 mb-2 border rounded cursor-pointer ${
                  selectedAnswer === q.answer ? "bg-blue-200" : ""
                }`}
                onClick={() => handleAnswerClick(q.answer)}
              >
                {q.answer}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Matches</h3>
          <ul>
            {Object.entries(matches).map(([question, answer]) => (
              <li key={question} className="mb-2">
                {question} - {answer}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
