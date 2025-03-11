"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizQuestionProps {
  question?: string;
  questionType?: "multiple-choice" | "slider" | "text";
  options?: { id: string; text: string }[];
  currentQuestion?: number;
  totalQuestions?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onAnswer?: (answer: any) => void;
}

const QuizQuestion = ({
  question = "What is your preferred learning style?",
  questionType = "multiple-choice",
  options = [
    { id: "visual", text: "Visual - I learn best through images and diagrams" },
    {
      id: "auditory",
      text: "Auditory - I learn best by listening and discussing",
    },
    {
      id: "reading",
      text: "Reading/Writing - I prefer text-based information",
    },
    {
      id: "kinesthetic",
      text: "Kinesthetic - I learn through hands-on activities",
    },
  ],
  currentQuestion = 1,
  totalQuestions = 10,
  onNext = () => {},
  onPrevious = () => {},
  onAnswer = () => {},
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [sliderValue, setSliderValue] = React.useState<number[]>([5]);
  const [textValue, setTextValue] = React.useState<string>("");

  const handleNext = () => {
    let answer;
    if (questionType === "multiple-choice") {
      answer = selectedOption;
    } else if (questionType === "slider") {
      answer = sliderValue[0];
    } else {
      answer = textValue;
    }
    onAnswer(answer);
    onNext();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm font-medium">
            {Math.round((currentQuestion / totalQuestions) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <CardTitle className="text-xl mt-6">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        {questionType === "multiple-choice" && (
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-3"
          >
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedOption(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <label
                  htmlFor={option.id}
                  className="flex-grow cursor-pointer text-base"
                >
                  {option.text}
                </label>
              </div>
            ))}
          </RadioGroup>
        )}

        {questionType === "slider" && (
          <div className="space-y-6 py-4">
            <Slider
              defaultValue={[5]}
              max={10}
              step={1}
              value={sliderValue}
              onValueChange={setSliderValue}
              className="my-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Not at all</span>
              <span>Somewhat</span>
              <span>Very much</span>
            </div>
            <div className="text-center mt-4">
              <span className="text-xl font-medium">{sliderValue[0]}</span>
              <span className="text-muted-foreground"> / 10</span>
            </div>
          </div>
        )}

        {questionType === "text" && (
          <textarea
            className="w-full border rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type your answer here..."
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            (questionType === "multiple-choice" && !selectedOption) ||
            (questionType === "text" && !textValue.trim())
          }
          className="flex items-center gap-1"
        >
          {currentQuestion === totalQuestions ? "Finish" : "Next"}
          {currentQuestion !== totalQuestions && (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;
