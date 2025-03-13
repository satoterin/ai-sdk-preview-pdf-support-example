import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  question: string;
  answer: string;
}

interface FlashcardProps {
  questions: Question[];
}

export default function Flashcards({ questions }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleToggleAnswer = () => {
    setShowAnswer((prevShowAnswer) => !prevShowAnswer);
  };

  return (
    <Card className="max-w-4xl px-4 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Flashcards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">{questions[currentIndex].question}</h3>
          {showAnswer && <p className="text-md mb-4">{questions[currentIndex].answer}</p>}
          <button onClick={handleToggleAnswer} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <button onClick={handleNext} className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
