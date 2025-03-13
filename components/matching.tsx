import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MatchingProps {
  questions: Question[];
}

interface Question {
  question: string;
  answer: "A" | "B" | "C" | "D";
}

export default function Matching({ questions }: MatchingProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: "A" | "B" | "C" | "D" }>({});

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

  const handleAnswerClick = (answer: "A" | "B" | "C" | "D") => {
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

  const answerOptions: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Matching</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-4">Questions</h3>
            {questions.map((q, index) => (
              <div
                key={`question-${index}`}
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
            {answerOptions.map((answer, index) => (
              <div
                key={`answer-${index}`}
                className={`p-2 mb-2 border rounded cursor-pointer ${
                  selectedAnswer === answer ? "bg-blue-200" : ""
                }`}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Matches</h3>
          <ul>
            {Object.entries(matches).map(([question, answer]) => (
              <li key={`match-${question}-${answer}`} className="mb-2">
                {question} - {answer}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
