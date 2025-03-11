"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { CheckCircle, XCircle, ArrowRight, HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

interface ModuleQuizProps {
  title?: string;
  description?: string;
  questions?: QuizQuestion[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

const ModuleQuiz = ({
  title = "Module Knowledge Check",
  description = "Test your understanding of the concepts covered in this module.",
  questions = [
    {
      id: "q1",
      question: "What is the primary benefit of adaptive learning?",
      options: [
        { id: "q1a", text: "It's cheaper to implement", isCorrect: false },
        {
          id: "q1b",
          text: "It personalizes content to individual learning needs",
          isCorrect: true,
        },
        {
          id: "q1c",
          text: "It requires less content creation",
          isCorrect: false,
        },
        {
          id: "q1d",
          text: "It eliminates the need for instructors",
          isCorrect: false,
        },
      ],
      explanation:
        "Adaptive learning systems personalize the educational experience by adjusting content difficulty and presentation based on individual learner performance and preferences.",
    },
    {
      id: "q2",
      question:
        "Which of the following is a key component of gamified learning?",
      options: [
        { id: "q2a", text: "Mandatory daily assignments", isCorrect: false },
        {
          id: "q2b",
          text: "Standardized testing procedures",
          isCorrect: false,
        },
        { id: "q2c", text: "Achievement badges and rewards", isCorrect: true },
        {
          id: "q2d",
          text: "Elimination of challenging content",
          isCorrect: false,
        },
      ],
      explanation:
        "Gamified learning incorporates game elements like achievement badges, points, and rewards to increase engagement and motivation.",
    },
    {
      id: "q3",
      question:
        "How do personality assessments enhance the learning experience?",
      options: [
        {
          id: "q3a",
          text: "They make learning more difficult",
          isCorrect: false,
        },
        {
          id: "q3b",
          text: "They help tailor content to individual traits and preferences",
          isCorrect: true,
        },
        {
          id: "q3c",
          text: "They eliminate the need for practical exercises",
          isCorrect: false,
        },
        {
          id: "q3d",
          text: "They replace traditional learning methods entirely",
          isCorrect: false,
        },
      ],
      explanation:
        "Personality assessments help identify individual learning styles, preferences, and strengths, allowing for more targeted and effective educational content.",
    },
  ],
  onComplete = () => {},
}: ModuleQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
      const correctAnswers = questions.filter((q) => {
        const selectedOption = q.options.find(
          (opt) => opt.id === selectedAnswers[q.id],
        );
        return selectedOption?.isCorrect;
      }).length;
      onComplete(correctAnswers, questions.length);
    }
  };

  const isAnswerSelected =
    currentQuestion && selectedAnswers[currentQuestion.id];
  const isAnswerCorrect =
    currentQuestion &&
    isAnswerSelected &&
    currentQuestion.options.find(
      (opt) => opt.id === selectedAnswers[currentQuestion.id],
    )?.isCorrect;

  const calculateScore = () => {
    const correctAnswers = questions.filter((q) => {
      const selectedOption = q.options.find(
        (opt) => opt.id === selectedAnswers[q.id],
      );
      return selectedOption?.isCorrect;
    }).length;

    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
    };
  };

  const score = calculateScore();

  if (showResults) {
    return (
      <Card className="w-full max-w-3xl mx-auto bg-background">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quiz Results
          </CardTitle>
          <CardDescription className="text-center">
            You scored {score.correct} out of {score.total} ({score.percentage}
            %)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center mb-6">
            <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-primary/20">
              <div className="text-3xl font-bold">{score.percentage}%</div>
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 100 100"
              >
                <circle
                  className="text-primary/20"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - score.percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Performance Summary</h3>
            <div className="grid gap-2">
              {score.percentage >= 80 ? (
                <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/20 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Excellent! You've mastered this module.</span>
                </div>
              ) : score.percentage >= 60 ? (
                <div className="flex items-center gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-md">
                  <CheckCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <span>Good job! You understand most of the concepts.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 rounded-md">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span>You might need to review this module again.</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
              setShowResults(false);
              setShowExplanation(false);
            }}
            className="mr-2"
          >
            Retry Quiz
          </Button>
          <Button variant="outline">Back to Module</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-background">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>{title}</CardTitle>
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-medium">{currentQuestion.question}</h3>

          <RadioGroup
            value={selectedAnswers[currentQuestion.id]}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => {
              const isSelected =
                selectedAnswers[currentQuestion.id] === option.id;
              const showCorrectness = isSelected && showExplanation;

              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex items-center space-x-2 rounded-md border p-4 cursor-pointer transition-colors",
                    isSelected && "border-primary",
                    showCorrectness &&
                      option.isCorrect &&
                      "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                    showCorrectness &&
                      !option.isCorrect &&
                      "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
                  )}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <span className="text-base">{option.text}</span>
                  {showCorrectness && option.isCorrect && (
                    <CheckCircle className="ml-auto h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                  {showCorrectness && !option.isCorrect && (
                    <XCircle className="ml-auto h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </label>
              );
            })}
          </RadioGroup>
        </div>

        {showExplanation && currentQuestion.explanation && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <div className="flex items-start gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300">
                  Explanation
                </h4>
                <p className="text-blue-700 dark:text-blue-200">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!showExplanation ? (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!isAnswerSelected}
          >
            Check Answer
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout with justify-between
        )}

        <Button
          onClick={handleNextQuestion}
          disabled={!isAnswerSelected}
          className="flex items-center gap-1"
        >
          {currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "Finish Quiz"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleQuiz;
