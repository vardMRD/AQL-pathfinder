"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Lock,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Award,
} from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  status: "locked" | "unlocked" | "completed";
}

// Inline ModuleCard component instead of importing it
const ModuleCard = ({
  title = "Module Title",
  description = "Module description goes here",
  difficulty = "beginner",
  estimatedTime = "1 hour",
  status = "unlocked",
}: ModuleCardProps) => {
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

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "unlocked":
        return <ArrowRight className="h-5 w-5 text-blue-500" />;
      case "locked":
        return <Lock className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-[300px] h-[200px] p-4 cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        {getStatusIcon(status)}
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
      <div className="mt-auto">
        <div className="flex justify-between items-center">
          <Badge className={`${getDifficultyColor(difficulty)}`}>
            <Star className="h-3 w-3 mr-1" />
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            {estimatedTime}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface PathNode {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  status: "locked" | "unlocked" | "completed";
  position: { x: number; y: number };
  connections: string[];
}

interface LearningPathwayMapProps {
  pathNodes?: PathNode[];
  currentNodeId?: string;
  onNodeSelect?: (nodeId: string) => void;
}

const LearningPathwayMap = ({
  pathNodes = [
    {
      id: "1",
      title: "Introduction to Programming",
      description: "Learn the basics of programming concepts and logic.",
      difficulty: "beginner",
      estimatedTime: "2 hours",
      status: "completed",
      position: { x: 100, y: 100 },
      connections: ["2", "3"],
    },
    {
      id: "2",
      title: "Web Development Fundamentals",
      description: "Explore HTML, CSS, and JavaScript basics.",
      difficulty: "beginner",
      estimatedTime: "4 hours",
      status: "unlocked",
      position: { x: 300, y: 50 },
      connections: ["4"],
    },
    {
      id: "3",
      title: "Data Structures",
      description: "Learn about arrays, linked lists, and more.",
      difficulty: "intermediate",
      estimatedTime: "5 hours",
      status: "unlocked",
      position: { x: 300, y: 150 },
      connections: ["5"],
    },
    {
      id: "4",
      title: "Frontend Frameworks",
      description: "Introduction to React, Vue, and Angular.",
      difficulty: "intermediate",
      estimatedTime: "8 hours",
      status: "locked",
      position: { x: 500, y: 50 },
      connections: ["6"],
    },
    {
      id: "5",
      title: "Algorithms",
      description: "Sorting, searching, and optimization algorithms.",
      difficulty: "advanced",
      estimatedTime: "10 hours",
      status: "locked",
      position: { x: 500, y: 150 },
      connections: ["6"],
    },
    {
      id: "6",
      title: "Capstone Project",
      description: "Apply your knowledge in a comprehensive project.",
      difficulty: "advanced",
      estimatedTime: "15 hours",
      status: "locked",
      position: { x: 700, y: 100 },
      connections: [],
    },
  ],
  currentNodeId = "1",
  onNodeSelect = () => {},
}: LearningPathwayMapProps) => {
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

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "unlocked":
        return <ArrowRight className="h-5 w-5 text-blue-500" />;
      case "locked":
        return <Lock className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Learning Pathway
        </h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Completed</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <ArrowRight className="h-4 w-4 text-blue-500" />
            <span>Available</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Lock className="h-4 w-4 text-gray-500" />
            <span>Locked</span>
          </Badge>
        </div>
      </div>

      <div className="relative w-full h-[600px] border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
        {/* SVG for connection lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {pathNodes.map((node) => {
            return node.connections.map((targetId) => {
              const targetNode = pathNodes.find((n) => n.id === targetId);
              if (!targetNode) return null;

              // Calculate line coordinates
              const x1 = node.position.x + 150; // Add half card width
              const y1 = node.position.y + 100; // Add half card height
              const x2 = targetNode.position.x;
              const y2 = targetNode.position.y + 100; // Add half card height

              // Determine line style based on status
              let strokeStyle = "stroke-gray-300";
              if (
                node.status === "completed" &&
                targetNode.status === "unlocked"
              ) {
                strokeStyle = "stroke-blue-500";
              } else if (
                node.status === "completed" &&
                targetNode.status === "completed"
              ) {
                strokeStyle = "stroke-green-500";
              }

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={`${strokeStyle} stroke-2`}
                  strokeDasharray={targetNode.status === "locked" ? "5,5" : ""}
                />
              );
            });
          })}
        </svg>

        {/* Module cards */}
        {pathNodes.map((node) => (
          <div
            key={node.id}
            className="absolute transition-all duration-300"
            style={{
              left: `${node.position.x}px`,
              top: `${node.position.y}px`,
              opacity: node.status === "locked" ? 0.7 : 1,
              transform: currentNodeId === node.id ? "scale(1.05)" : "scale(1)",
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() =>
                      node.status !== "locked" && onNodeSelect(node.id)
                    }
                  >
                    <ModuleCard
                      title={node.title}
                      description={node.description}
                      difficulty={node.difficulty}
                      estimatedTime={node.estimatedTime}
                      status={node.status}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {node.status === "locked"
                      ? "Complete previous modules to unlock"
                      : node.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Current Progress</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
              <span>
                {pathNodes.filter((node) => node.status === "completed").length}{" "}
                Completed
              </span>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-5 w-5 text-blue-500 mr-1" />
              <span>
                {pathNodes.filter((node) => node.status === "unlocked").length}{" "}
                Available
              </span>
            </div>
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-500 mr-1" />
              <span>
                {pathNodes.filter((node) => node.status === "locked").length}{" "}
                Locked
              </span>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            View Achievements
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningPathwayMap;
