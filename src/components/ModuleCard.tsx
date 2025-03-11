"use client";

import React from "react";
import { Clock, BookOpen, Lock, CheckCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { cn } from "../lib/utils";

export interface ModuleCardProps {
  title?: string;
  description?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
  status?: "locked" | "unlocked" | "completed";
  onClick?: () => void;
}

const ModuleCard = ({
  title = "Introduction to Learning Pathways",
  description = "Learn the fundamentals of adaptive learning and how to navigate your personalized journey.",
  difficulty = "beginner",
  estimatedTime = "30 mins",
  status = "unlocked",
  onClick = () => {},
}: ModuleCardProps) => {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    locked: <Lock className="h-5 w-5 text-gray-400" />,
    unlocked: <BookOpen className="h-5 w-5 text-blue-500" />,
    completed: <CheckCircle className="h-5 w-5 text-green-500" />,
  };

  return (
    <Card
      className={cn(
        "w-[300px] h-[200px] flex flex-col transition-all duration-200 hover:shadow-md bg-white",
        status === "locked"
          ? "opacity-70 cursor-not-allowed"
          : "cursor-pointer hover:scale-105",
      )}
      onClick={status !== "locked" ? onClick : undefined}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {statusIcons[status]}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="secondary"
            className={cn("text-xs", difficultyColors[difficulty])}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {estimatedTime}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full">
          {status === "locked" ? (
            <p className="text-xs text-gray-500 italic">
              Complete previous modules to unlock
            </p>
          ) : status === "completed" ? (
            <p className="text-xs text-green-600 font-medium">Completed</p>
          ) : (
            <p className="text-xs text-blue-600 font-medium">Ready to start</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
