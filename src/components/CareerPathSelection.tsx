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
import {
  Briefcase,
  GraduationCap,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  skillsRequired: string[];
  estimatedTimeToComplete: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  popularity: number;
  selected?: boolean;
}

interface CareerPathSelectionProps {
  paths?: CareerPath[];
  personalityType?: string;
  onPathSelect?: (pathId: string) => void;
  onContinue?: () => void;
}

const CareerPathSelection = ({
  paths = [
    {
      id: "software-dev",
      title: "Software Development",
      description:
        "Build applications and services that power the digital world. Learn programming, software architecture, and development methodologies.",
      matchPercentage: 92,
      skillsRequired: [
        "Problem Solving",
        "Logical Thinking",
        "Attention to Detail",
        "Creativity",
      ],
      estimatedTimeToComplete: "6-12 months",
      difficulty: "intermediate",
      popularity: 4.8,
      selected: true,
    },
    {
      id: "data-science",
      title: "Data Science",
      description:
        "Extract insights from data using statistical analysis, machine learning, and visualization techniques.",
      matchPercentage: 87,
      skillsRequired: [
        "Statistical Analysis",
        "Critical Thinking",
        "Pattern Recognition",
        "Communication",
      ],
      estimatedTimeToComplete: "8-14 months",
      difficulty: "advanced",
      popularity: 4.7,
    },
    {
      id: "ux-design",
      title: "UX/UI Design",
      description:
        "Create intuitive, accessible, and delightful user experiences through research, prototyping, and visual design.",
      matchPercentage: 78,
      skillsRequired: [
        "Empathy",
        "Visual Thinking",
        "Communication",
        "Creativity",
      ],
      estimatedTimeToComplete: "5-10 months",
      difficulty: "intermediate",
      popularity: 4.5,
    },
    {
      id: "product-management",
      title: "Product Management",
      description:
        "Guide product development from conception to launch, balancing user needs with business goals.",
      matchPercentage: 75,
      skillsRequired: [
        "Strategic Thinking",
        "Leadership",
        "Communication",
        "Analytical Skills",
      ],
      estimatedTimeToComplete: "7-12 months",
      difficulty: "intermediate",
      popularity: 4.6,
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      description:
        "Protect systems, networks, and data from digital attacks through security strategies and tools.",
      matchPercentage: 68,
      skillsRequired: [
        "Problem Solving",
        "Attention to Detail",
        "Ethical Thinking",
        "Persistence",
      ],
      estimatedTimeToComplete: "9-15 months",
      difficulty: "advanced",
      popularity: 4.9,
    },
  ],
  personalityType = "Analytical Problem-Solver",
  onPathSelect = () => {},
  onContinue = () => {},
}: CareerPathSelectionProps) => {
  const [selectedPath, setSelectedPath] = React.useState<string>(
    paths.find((path) => path.selected)?.id || "",
  );

  const handlePathSelect = (pathId: string) => {
    setSelectedPath(pathId);
    onPathSelect(pathId);
  };

  // Sort paths by match percentage (highest first)
  const sortedPaths = [...paths].sort(
    (a, b) => b.matchPercentage - a.matchPercentage,
  );

  // Get the currently selected path details
  const selectedPathDetails = paths.find((path) => path.id === selectedPath);

  // Function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Choose Your Learning Path</h1>
        <p className="text-muted-foreground">
          Based on your personality assessment as an{" "}
          <span className="font-medium">{personalityType}</span>, we've
          identified these career paths that match your traits and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Recommended Paths</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              These paths are sorted by how well they match your personality
              profile and assessment results.
            </p>

            <div className="space-y-2">
              {sortedPaths.map((path) => (
                <div
                  key={path.id}
                  className={`p-3 rounded-md cursor-pointer transition-all ${selectedPath === path.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}
                  onClick={() => handlePathSelect(path.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{path.title}</h3>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant={
                            selectedPath === path.id ? "outline" : "secondary"
                          }
                          className="text-xs"
                        >
                          {path.matchPercentage}% Match
                        </Badge>
                      </div>
                    </div>
                    {selectedPath === path.id && (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedPathDetails ? (
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {selectedPathDetails.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {selectedPathDetails.description}
                    </CardDescription>
                  </div>
                  <Badge
                    className={getDifficultyColor(
                      selectedPathDetails.difficulty,
                    )}
                  >
                    {selectedPathDetails.difficulty.charAt(0).toUpperCase() +
                      selectedPathDetails.difficulty.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Path Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-amber-500" />
                        <h4 className="font-medium">Match Strength</h4>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{
                              width: `${selectedPathDetails.matchPercentage}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {selectedPathDetails.matchPercentage}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Based on your personality traits and preferences
                      </p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <h4 className="font-medium">Estimated Time</h4>
                      </div>
                      <p className="text-sm">
                        {selectedPathDetails.estimatedTimeToComplete}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        With consistent learning of 5-10 hours per week
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPathDetails.skillsRequired.map((skill, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="py-1.5">
                              {skill}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              This skill will be developed throughout your
                              learning journey
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Career Opportunities</h3>
                  </div>
                  <p className="text-sm">
                    This learning path prepares you for roles such as{" "}
                    {selectedPathDetails.title} Specialist,
                    {selectedPathDetails.title.includes("Development")
                      ? " Developer"
                      : selectedPathDetails.title.includes("Design")
                        ? " Designer"
                        : " Analyst"}
                    , and related positions in the tech industry.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={() => setSelectedPath("")}>
                  Explore Other Paths
                </Button>
                <Button onClick={onContinue} className="gap-2">
                  Continue with this Path
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <div className="text-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Select a Learning Path
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Choose a career path from the list to see detailed information
                  and begin your personalized learning journey.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathSelection;
