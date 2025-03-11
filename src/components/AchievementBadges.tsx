"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Lock } from "lucide-react";

interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: string;
  dateEarned?: string;
}

interface AchievementBadgesProps {
  badges?: AchievementBadge[];
  title?: string;
}

const AchievementBadges = ({
  badges = [
    {
      id: "1",
      name: "First Steps",
      description: "Complete your first learning module",
      icon: "🏆",
      unlocked: true,
      category: "beginner",
      dateEarned: "2023-05-15",
    },
    {
      id: "2",
      name: "Quick Learner",
      description: "Complete 5 modules in a single week",
      icon: "⚡",
      unlocked: true,
      category: "progress",
      dateEarned: "2023-05-22",
    },
    {
      id: "3",
      name: "Perfect Score",
      description: "Achieve 100% on any module quiz",
      icon: "🎯",
      unlocked: true,
      category: "achievement",
      dateEarned: "2023-06-01",
    },
    {
      id: "4",
      name: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      unlocked: false,
      category: "consistency",
    },
    {
      id: "5",
      name: "Explorer",
      description: "Try modules from 3 different learning paths",
      icon: "🧭",
      unlocked: false,
      category: "exploration",
    },
    {
      id: "6",
      name: "Deep Diver",
      description: "Complete an entire advanced learning path",
      icon: "🤿",
      unlocked: false,
      category: "mastery",
    },
    {
      id: "7",
      name: "Helping Hand",
      description: "Share your learning path with another user",
      icon: "🤝",
      unlocked: false,
      category: "social",
    },
    {
      id: "8",
      name: "Night Owl",
      description: "Complete a module after 10pm",
      icon: "🦉",
      unlocked: true,
      category: "lifestyle",
      dateEarned: "2023-05-18",
    },
    {
      id: "9",
      name: "Early Bird",
      description: "Complete a module before 8am",
      icon: "🐦",
      unlocked: false,
      category: "lifestyle",
    },
  ],
  title = "Achievement Badges",
}: AchievementBadgesProps) => {
  // Group badges by category
  const groupedBadges = badges.reduce<Record<string, AchievementBadge[]>>(
    (acc, badge) => {
      if (!acc[badge.category]) {
        acc[badge.category] = [];
      }
      acc[badge.category].push(badge);
      return acc;
    },
    {},
  );

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedBadges).map(([category, categoryBadges]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-medium capitalize text-muted-foreground">
                {category}
              </h3>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                {categoryBadges.map((badge) => (
                  <TooltipProvider key={badge.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl ${badge.unlocked ? "bg-primary/10" : "bg-muted"}`}
                          >
                            {badge.unlocked ? (
                              <span>{badge.icon}</span>
                            ) : (
                              <Lock className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="mt-2 text-center">
                            <p className="text-xs font-medium truncate max-w-[80px]">
                              {badge.name}
                            </p>
                            {badge.unlocked && (
                              <Badge
                                variant="secondary"
                                className="mt-1 text-[10px]"
                              >
                                Earned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-[200px] text-center"
                      >
                        <p className="font-semibold">{badge.name}</p>
                        <p className="text-xs mt-1">{badge.description}</p>
                        {badge.dateEarned && (
                          <p className="text-xs mt-1 text-muted-foreground">
                            Earned on{" "}
                            {new Date(badge.dateEarned).toLocaleDateString()}
                          </p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
