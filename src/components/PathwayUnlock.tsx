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
import { ArrowRight, Award, Lock, Unlock } from "lucide-react";
import { cn } from "../lib/utils";

interface PathwayUnlockProps {
  title?: string;
  description?: string;
  pathways?: {
    id: string;
    name: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    description: string;
    isUnlocked: boolean;
  }[];
  quizScore?: number;
  onSelectPathway?: (pathwayId: string) => void;
  onContinue?: () => void;
}

const PathwayUnlock = ({
  title = "New Pathways Unlocked!",
  description = "Based on your quiz performance, you've unlocked new learning pathways. Choose which one you'd like to explore next.",
  pathways = [
    {
      id: "p1",
      name: "Advanced Data Structures",
      difficulty: "advanced",
      description:
        "Dive deeper into complex data structures and algorithms for optimization.",
      isUnlocked: true,
    },
    {
      id: "p2",
      name: "Practical Applications",
      difficulty: "intermediate",
      description:
        "Apply your knowledge to real-world scenarios and build practical solutions.",
      isUnlocked: true,
    },
    {
      id: "p3",
      name: "Fundamentals Review",
      difficulty: "beginner",
      description:
        "Strengthen your understanding of core concepts with additional practice.",
      isUnlocked: false,
    },
  ],
  quizScore = 85,
  onSelectPathway = () => {},
  onContinue = () => {},
}: PathwayUnlockProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <Card className="w-full overflow-hidden border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <Badge variant="secondary" className="px-3 py-1">
              Quiz Score: {quizScore}%
            </Badge>
          </div>
          <CardDescription className="mt-2 text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {pathways.map((pathway) => (
              <div
                key={pathway.id}
                className={cn(
                  "relative p-4 rounded-lg border-2 transition-all",
                  pathway.isUnlocked
                    ? "border-primary/40 hover:border-primary cursor-pointer"
                    : "border-muted opacity-70",
                )}
                onClick={() =>
                  pathway.isUnlocked && onSelectPathway(pathway.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {pathway.name}
                      {pathway.isUnlocked ? (
                        <Unlock className="h-4 w-4 text-primary" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pathway.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      pathway.difficulty === "advanced"
                        ? "default"
                        : pathway.difficulty === "intermediate"
                          ? "secondary"
                          : "outline"
                    }
                    className="capitalize"
                  >
                    {pathway.difficulty}
                  </Badge>
                </div>
                {pathway.isUnlocked && (
                  <div className="absolute right-4 bottom-4">
                    <Award className="h-5 w-5 text-primary/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-muted/20">
          <Button variant="outline" onClick={onContinue}>
            Continue Later
          </Button>
          <Button onClick={onContinue} className="gap-2">
            Proceed to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PathwayUnlock;
