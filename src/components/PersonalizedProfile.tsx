"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import { Brain, Briefcase, Sparkles, Award, ChevronRight } from "lucide-react";

interface PersonalityTrait {
  name: string;
  score: number;
  description: string;
  icon?: React.ReactNode;
}

interface LearningStyle {
  type: string;
  percentage: number;
  description: string;
}

interface CareerPath {
  title: string;
  match: number;
  description: string;
  skills: string[];
}

interface PersonalizedProfileProps {
  userName?: string;
  personalityTraits?: PersonalityTrait[];
  learningStyles?: LearningStyle[];
  careerPaths?: CareerPath[];
  onSelectCareerPath?: (careerPath: string) => void;
}

const PersonalizedProfile = ({
  userName = "Alex",
  personalityTraits = [
    {
      name: "Analytical",
      score: 85,
      description: "You excel at logical reasoning and critical thinking.",
      icon: <Brain className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "Creative",
      score: 72,
      description: "You have a strong ability to think outside the box.",
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    },
    {
      name: "Collaborative",
      score: 68,
      description: "You work well with others and value team input.",
      icon: <Award className="h-5 w-5 text-green-500" />,
    },
    {
      name: "Practical",
      score: 78,
      description: "You focus on real-world applications and tangible results.",
      icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    },
  ],
  learningStyles = [
    {
      type: "Visual",
      percentage: 65,
      description:
        "You learn best through images, diagrams, and spatial understanding.",
    },
    {
      type: "Auditory",
      percentage: 40,
      description:
        "You benefit from lectures, discussions, and verbal instructions.",
    },
    {
      type: "Reading/Writing",
      percentage: 75,
      description: "You prefer text-based information and taking notes.",
    },
    {
      type: "Kinesthetic",
      percentage: 55,
      description:
        "You learn through hands-on activities and practical exercises.",
    },
  ],
  careerPaths = [
    {
      title: "Software Development",
      match: 92,
      description:
        "Building applications and systems using programming languages and development tools.",
      skills: ["Problem Solving", "Coding", "System Design", "Debugging"],
    },
    {
      title: "Data Science",
      match: 87,
      description:
        "Analyzing and interpreting complex data to help guide strategic decisions.",
      skills: [
        "Statistics",
        "Machine Learning",
        "Data Visualization",
        "Python",
      ],
    },
    {
      title: "UX/UI Design",
      match: 74,
      description:
        "Creating intuitive, accessible, and visually appealing user interfaces.",
      skills: ["User Research", "Wireframing", "Visual Design", "Prototyping"],
    },
  ],
  onSelectCareerPath = () => {},
}: PersonalizedProfileProps) => {
  // Sort learning styles by percentage (highest first)
  const sortedLearningStyles = [...learningStyles].sort(
    (a, b) => b.percentage - a.percentage,
  );

  // Sort career paths by match percentage (highest first)
  const sortedCareerPaths = [...careerPaths].sort((a, b) => b.match - a.match);

  // Get dominant learning style
  const dominantLearningStyle = sortedLearningStyles[0];

  // Get top personality trait
  const topPersonalityTrait = [...personalityTraits].sort(
    (a, b) => b.score - a.score,
  )[0];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">
              Your Personalized Profile
            </CardTitle>
            <CardDescription className="mt-1">
              Based on your personality assessment, we've created a tailored
              learning profile for you.
            </CardDescription>
          </div>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Profile Complete
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Summary Section */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Hello, {userName}!</h3>
            <p className="text-muted-foreground">
              Your assessment shows you're highly{" "}
              <span className="font-medium text-primary">
                {topPersonalityTrait.name}
              </span>{" "}
              and learn best through{" "}
              <span className="font-medium text-primary">
                {dominantLearningStyle.type}
              </span>{" "}
              methods. We've customized your learning journey to match these
              strengths.
            </p>
          </div>

          {/* Personality Traits Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Your Personality Traits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalityTraits.map((trait, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {trait.icon}
                    <h4 className="font-medium">{trait.name}</h4>
                    <div className="ml-auto">
                      <Badge
                        variant={trait.score > 80 ? "default" : "secondary"}
                        className="ml-auto"
                      >
                        {trait.score}%
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Styles Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Your Learning Style Preferences
            </h3>
            <div className="space-y-4">
              {sortedLearningStyles.map((style, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{style.type}</span>
                    <span className="text-sm text-muted-foreground">
                      {style.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={cn(
                        "h-2.5 rounded-full",
                        index === 0 ? "bg-primary" : "bg-primary/60",
                      )}
                      style={{ width: `${style.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {style.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Career Paths */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Recommended Career Paths
            </h3>
            <div className="space-y-4">
              {sortedCareerPaths.map((career, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border hover:border-primary cursor-pointer transition-all"
                  onClick={() => onSelectCareerPath(career.title)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-lg">{career.title}</h4>
                    <Badge
                      variant={career.match > 85 ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {career.match}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {career.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="bg-muted/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-6 flex justify-between">
        <Button variant="outline">Retake Assessment</Button>
        <Button className="flex items-center gap-1">
          Start Learning Journey
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalizedProfile;
