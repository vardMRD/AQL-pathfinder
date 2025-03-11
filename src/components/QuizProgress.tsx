"use client";

import React from "react";
import { Progress } from "./ui/progress";
import { Check, Circle } from "lucide-react";

interface QuizProgressProps {
  totalQuestions: number;
  currentQuestion: number;
  completedQuestions: number[];
}

const QuizProgress = ({
  totalQuestions = 5,
  currentQuestion = 1,
  completedQuestions = [0],
}: QuizProgressProps) => {
  // Calculate progress percentage
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full bg-background p-4 rounded-lg shadow-sm border border-border">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Quiz Progress</h3>
          <span className="text-xs text-muted-foreground">
            {currentQuestion} of {totalQuestions}
          </span>
        </div>

        <Progress value={progressPercentage} className="h-2" />

        <div className="flex justify-between items-center mt-2">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i + 1 === currentQuestion
                    ? "bg-primary text-primary-foreground"
                    : completedQuestions.includes(i)
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {completedQuestions.includes(i) ? (
                  <Check className="h-4 w-4" />
                ) : i + 1 === currentQuestion ? (
                  <span className="text-xs font-medium">{i + 1}</span>
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              <span className="text-xs mt-1 text-muted-foreground">
                Q{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
