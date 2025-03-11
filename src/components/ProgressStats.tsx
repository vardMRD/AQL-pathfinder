"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { BarChart, Activity, Award, Calendar, Clock } from "lucide-react";

interface ProgressStatsProps {
  completionPercentage?: number;
  streakDays?: number;
  modulesCompleted?: number;
  averageScore?: number;
  timeSpent?: number;
  performanceTrend?: Array<{ date: string; score: number }>;
}

const ProgressStats = ({
  completionPercentage = 68,
  streakDays = 12,
  modulesCompleted = 24,
  averageScore = 87,
  timeSpent = 42,
  performanceTrend = [
    { date: "Mon", score: 65 },
    { date: "Tue", score: 72 },
    { date: "Wed", score: 68 },
    { date: "Thu", score: 76 },
    { date: "Fri", score: 82 },
    { date: "Sat", score: 85 },
    { date: "Sun", score: 87 },
  ],
}: ProgressStatsProps) => {
  return (
    <Card className="w-full max-w-[350px] bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <BarChart className="h-5 w-5 text-primary" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Completion */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Completion</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Streak Days */}
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Streak</span>
            </div>
            <p className="mt-1 text-xl font-bold">{streakDays} days</p>
          </div>

          {/* Modules Completed */}
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <p className="mt-1 text-xl font-bold">{modulesCompleted} modules</p>
          </div>

          {/* Average Score */}
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Avg. Score</span>
            </div>
            <p className="mt-1 text-xl font-bold">{averageScore}%</p>
          </div>

          {/* Time Spent */}
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Time Spent</span>
            </div>
            <p className="mt-1 text-xl font-bold">{timeSpent} hrs</p>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Performance Trend
            </span>
          </div>
          <div className="flex h-[60px] items-end justify-between gap-1">
            {performanceTrend.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  className="w-8 bg-primary rounded-t"
                  style={{ height: `${day.score * 0.6}%` }}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressStats;
