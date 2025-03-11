"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import QuizQuestion from "./QuizQuestion";
import QuizProgress from "./QuizProgress";
import { ArrowRight, CheckCircle } from "lucide-react";
import UserRegistration from "./UserRegistration";

interface PersonalityAssessmentProps {
  onComplete?: (results: PersonalityResults) => void;
  initialStep?: number;
}

interface PersonalityResults {
  traits: {
    analytical: number;
    creative: number;
    practical: number;
    social: number;
  };
  learningStyle: {
    visual: number;
    auditory: number;
    reading: number;
    kinesthetic: number;
  };
  careerAffinity: string[];
}

interface QuizStep {
  id: string;
  type: "intro" | "question" | "results";
  questionType?: "multiple-choice" | "slider" | "text";
  question?: string;
  options?: { id: string; text: string }[];
  trait?:
    | keyof PersonalityResults["traits"]
    | keyof PersonalityResults["learningStyle"];
  category?: "traits" | "learningStyle" | "careerAffinity";
}

const PersonalityAssessment = ({
  onComplete = () => {},
  initialStep = 0,
}: PersonalityAssessmentProps) => {
  // Quiz steps definition
  const quizSteps: QuizStep[] = [
    {
      id: "intro",
      type: "intro",
    },
    {
      id: "q1",
      type: "question",
      questionType: "multiple-choice",
      question: "When solving a complex problem, I prefer to:",
      options: [
        {
          id: "q1a",
          text: "Break it down into logical steps and analyze each component",
        },
        {
          id: "q1b",
          text: "Brainstorm multiple creative solutions and explore possibilities",
        },
        {
          id: "q1c",
          text: "Focus on practical solutions that have worked in the past",
        },
        {
          id: "q1d",
          text: "Discuss it with others to get different perspectives",
        },
      ],
      trait: "analytical",
      category: "traits",
    },
    {
      id: "q2",
      type: "question",
      questionType: "multiple-choice",
      question:
        "When learning something new, I find it easiest to understand when:",
      options: [
        {
          id: "q2a",
          text: "I can see diagrams, charts, or visual demonstrations",
        },
        {
          id: "q2b",
          text: "I can listen to explanations and discuss the topic",
        },
        { id: "q2c", text: "I can read detailed information and take notes" },
        { id: "q2d", text: "I can try it out hands-on and learn by doing" },
      ],
      category: "learningStyle",
    },
    {
      id: "q3",
      type: "question",
      questionType: "slider",
      question: "How much do you enjoy working with data and numbers?",
      trait: "analytical",
      category: "traits",
    },
    {
      id: "q4",
      type: "question",
      questionType: "slider",
      question: "How comfortable are you with ambiguity and open-ended tasks?",
      trait: "creative",
      category: "traits",
    },
    {
      id: "q5",
      type: "question",
      questionType: "multiple-choice",
      question: "Which of these career fields interests you the most?",
      options: [
        { id: "q5a", text: "Technology and Software Development" },
        { id: "q5b", text: "Design and Creative Arts" },
        { id: "q5c", text: "Business and Entrepreneurship" },
        { id: "q5d", text: "Education and Communication" },
        { id: "q5e", text: "Science and Research" },
      ],
      category: "careerAffinity",
    },
    {
      id: "q6",
      type: "question",
      questionType: "multiple-choice",
      question: "In a team project, I naturally tend to take on the role of:",
      options: [
        { id: "q6a", text: "Organizer who plans and structures the work" },
        { id: "q6b", text: "Innovator who generates new ideas" },
        { id: "q6c", text: "Implementer who gets things done" },
        { id: "q6d", text: "Facilitator who ensures everyone is heard" },
      ],
      category: "traits",
    },
    {
      id: "q7",
      type: "question",
      questionType: "slider",
      question:
        "How important is it for you to see practical applications of what you're learning?",
      trait: "practical",
      category: "traits",
    },
    {
      id: "q8",
      type: "question",
      questionType: "slider",
      question:
        "How much do you enjoy collaborating with others versus working independently?",
      trait: "social",
      category: "traits",
    },
    {
      id: "q9",
      type: "question",
      questionType: "multiple-choice",
      question: "Which learning environment do you prefer?",
      options: [
        {
          id: "q9a",
          text: "Structured courses with clear objectives and deadlines",
        },
        {
          id: "q9b",
          text: "Self-paced learning where I can explore topics that interest me",
        },
        {
          id: "q9c",
          text: "Project-based learning with real-world applications",
        },
        {
          id: "q9d",
          text: "Collaborative learning with discussions and group work",
        },
      ],
      category: "learningStyle",
    },
    {
      id: "q10",
      type: "question",
      questionType: "multiple-choice",
      question: "What motivates you most to learn something new?",
      options: [
        {
          id: "q10a",
          text: "Intellectual curiosity and the desire to understand",
        },
        {
          id: "q10b",
          text: "The opportunity to express myself and be creative",
        },
        {
          id: "q10c",
          text: "Gaining practical skills that I can apply immediately",
        },
        { id: "q10d", text: "Connecting with others and sharing knowledge" },
      ],
      category: "traits",
    },
    {
      id: "results",
      type: "results",
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<PersonalityResults>({
    traits: {
      analytical: 0,
      creative: 0,
      practical: 0,
      social: 0,
    },
    learningStyle: {
      visual: 0,
      auditory: 0,
      reading: 0,
      kinesthetic: 0,
    },
    careerAffinity: [],
  });
  const [showRegistration, setShowRegistration] = useState(false);

  const currentStep = quizSteps[currentStepIndex];
  const totalQuestions = quizSteps.filter(
    (step) => step.type === "question",
  ).length;
  const currentQuestionNumber = quizSteps
    .slice(0, currentStepIndex)
    .filter((step) => step.type === "question").length;
  const completedQuestions = Object.keys(answers).map((id) => {
    const index = quizSteps.findIndex((step) => step.id === id);
    return index;
  });

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep.id]: answer,
    }));

    // Process answer based on question category
    if (currentStep.category === "traits" && currentStep.trait) {
      const traitValue = currentStep.questionType === "slider" ? answer : 7;
      setResults((prev) => ({
        ...prev,
        traits: {
          ...prev.traits,
          [currentStep.trait as keyof PersonalityResults["traits"]]:
            prev.traits[
              currentStep.trait as keyof PersonalityResults["traits"]
            ] + traitValue,
        },
      }));
    } else if (currentStep.category === "learningStyle") {
      if (currentStep.questionType === "multiple-choice") {
        const optionIndex =
          currentStep.options?.findIndex((opt) => opt.id === answer) || 0;
        const styleKeys: (keyof PersonalityResults["learningStyle"])[] = [
          "visual",
          "auditory",
          "reading",
          "kinesthetic",
        ];
        const styleKey = styleKeys[optionIndex];

        setResults((prev) => ({
          ...prev,
          learningStyle: {
            ...prev.learningStyle,
            [styleKey]: prev.learningStyle[styleKey] + 10,
          },
        }));
      }
    } else if (currentStep.category === "careerAffinity") {
      const selectedOption = currentStep.options?.find(
        (opt) => opt.id === answer,
      );
      if (selectedOption) {
        setResults((prev) => ({
          ...prev,
          careerAffinity: [...prev.careerAffinity, selectedOption.text],
        }));
      }
    }
  };

  const handleNext = () => {
    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Normalize results
      const normalizedResults = normalizeResults(results);
      onComplete(normalizedResults);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const normalizeResults = (
    results: PersonalityResults,
  ): PersonalityResults => {
    // Simple normalization - in a real app this would be more sophisticated
    const totalTraits = Object.values(results.traits).reduce(
      (sum, val) => sum + val,
      0,
    );
    const totalLearningStyle = Object.values(results.learningStyle).reduce(
      (sum, val) => sum + val,
      0,
    );

    const normalizedTraits = { ...results.traits };
    const normalizedLearningStyle = { ...results.learningStyle };

    if (totalTraits > 0) {
      Object.keys(normalizedTraits).forEach((key) => {
        normalizedTraits[key as keyof typeof normalizedTraits] = Math.round(
          (normalizedTraits[key as keyof typeof normalizedTraits] /
            totalTraits) *
            100,
        );
      });
    }

    if (totalLearningStyle > 0) {
      Object.keys(normalizedLearningStyle).forEach((key) => {
        normalizedLearningStyle[key as keyof typeof normalizedLearningStyle] =
          Math.round(
            (normalizedLearningStyle[
              key as keyof typeof normalizedLearningStyle
            ] /
              totalLearningStyle) *
              100,
          );
      });
    }

    return {
      ...results,
      traits: normalizedTraits,
      learningStyle: normalizedLearningStyle,
    };
  };

  // Render intro step
  if (currentStep.type === "intro") {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Discover Your Entrepreneurial Personality
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Complete this assessment to unlock a personalized entrepreneurial
            journey tailored for Omani youth and business leaders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-3">
              What You'll Discover:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  Your dominant entrepreneurial traits and how they influence
                  your business potential in Oman
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  Your optimal business leadership style and environment
                  preferences
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  Entrepreneurial paths in Oman that align with your natural
                  strengths and interests
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <span>
                  Customized business pathways designed specifically for Omani
                  entrepreneurs
                </span>
              </li>
            </ul>
          </div>
          <div className="text-center text-muted-foreground">
            <p>This assessment takes about 5-7 minutes to complete.</p>
            <p>
              Your answers will help us create a truly personalized learning
              experience.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button size="lg" onClick={handleNext} className="gap-2">
            Begin Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Render results step
  if (currentStep.type === "results") {
    if (showRegistration) {
      return (
        <UserRegistration
          personalityResults={results}
          onComplete={(userData) => {
            // In a real app, you would save the user data and results to your backend
            // For now, we'll just pass the results to the parent component
            onComplete(results);
          }}
        />
      );
    }

    return (
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Assessment Complete!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Thank you for completing the personality assessment. Your
            personalized profile is ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-xl mb-3">
              Your Results Are Ready
            </h3>
            <p className="mb-6">
              We've analyzed your responses and created a personalized learning
              profile for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowRegistration(true)}
                className="gap-2"
              >
                Create Account to Save Results
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onComplete(results)}
                className="gap-2"
              >
                Continue as Guest
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render question step
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-xl">
      <QuizProgress
        totalQuestions={totalQuestions}
        currentQuestion={currentQuestionNumber + 1}
        completedQuestions={completedQuestions}
      />

      <QuizQuestion
        question={currentStep.question || ""}
        questionType={currentStep.questionType || "multiple-choice"}
        options={currentStep.options || []}
        currentQuestion={currentQuestionNumber + 1}
        totalQuestions={totalQuestions}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default PersonalityAssessment;
