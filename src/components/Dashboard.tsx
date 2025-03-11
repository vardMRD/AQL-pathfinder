"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { TooltipProvider } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Map,
  BarChart,
  Award,
  Settings,
  BookOpen,
  Plus,
  Search,
  Bell,
  User,
} from "lucide-react";

// Import sub-components
import LearningPathwayMap from "./LearningPathwayMap";
import ProgressStats from "./ProgressStats";
import AchievementBadges from "./AchievementBadges";
import LearningPreferences from "./LearningPreferences";
import ModuleCard from "./ModuleCard";

interface DashboardProps {
  userName?: string;
  userAvatar?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  recentModules?: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    estimatedTime: string;
    status: "locked" | "unlocked" | "completed";
  }>;
  notifications?: number;
}

const Dashboard = ({
  userName = "Alex Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  activeTab = "overview",
  onTabChange = () => {},
  recentModules = [
    {
      id: "m1",
      title: "Introduction to Programming",
      description: "Learn the basics of programming concepts and logic.",
      difficulty: "beginner",
      estimatedTime: "2 hours",
      status: "completed",
    },
    {
      id: "m2",
      title: "Web Development Fundamentals",
      description: "Explore HTML, CSS, and JavaScript basics.",
      difficulty: "beginner",
      estimatedTime: "4 hours",
      status: "unlocked",
    },
    {
      id: "m3",
      title: "Data Structures",
      description: "Learn about arrays, linked lists, and more.",
      difficulty: "intermediate",
      estimatedTime: "5 hours",
      status: "unlocked",
    },
  ],
  notifications = 3,
}: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPreferences, setShowPreferences] = useState(false);

  const handleModuleClick = (moduleId: string) => {
    console.log(`Module ${moduleId} clicked`);
    // Navigate to module or show module details
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Aql Academy</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search modules..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <span className="hidden md:inline text-sm font-medium">
                {userName}
              </span>
              <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-full w-full p-1 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Tabs Navigation */}
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={onTabChange}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger
                value="overview"
                className="flex items-center justify-center gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="pathway"
                className="flex items-center justify-center gap-2"
              >
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Pathway</span>
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="flex items-center justify-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="flex items-center justify-center gap-2"
              >
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
            </TabsList>

            <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Preferences</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <LearningPreferences onSave={() => setShowPreferences(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Tab Contents */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Welcome Card */}
              <Card className="col-span-2 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle>Welcome back, {userName}!</CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">
                        Your Omani Entrepreneurship Journey
                      </h3>
                      <p className="text-muted-foreground">
                        Continue building your business skills or explore new
                        entrepreneurial modules.
                      </p>
                      <div className="flex gap-3 mt-4">
                        <Button className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Continue Business Learning
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Map className="h-4 w-4" />
                          View Pathway
                        </Button>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 hidden md:block">
                      <img
                        src={userAvatar}
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Progress Stats Card */}
              <div className="col-span-1">
                <ProgressStats />
              </div>
            </div>

            {/* Recent Modules */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Business Modules</h2>
                <Button variant="ghost" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Explore More</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <TooltipProvider>
                  {recentModules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      title={module.title}
                      description={module.description}
                      difficulty={module.difficulty}
                      estimatedTime={module.estimatedTime}
                      status={module.status}
                      onClick={() => handleModuleClick(module.id)}
                    />
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pathway" className="min-h-[600px]">
            <LearningPathwayMap />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <Card className="bg-white h-full">
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <div className="p-6">
                    {/* Placeholder for a more detailed progress chart */}
                    <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Detailed progress charts and analytics
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-primary/10 rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold">24</h3>
                        <p className="text-sm text-muted-foreground">
                          Modules Completed
                        </p>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold">87%</h3>
                        <p className="text-sm text-muted-foreground">
                          Average Score
                        </p>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold">42h</h3>
                        <p className="text-sm text-muted-foreground">
                          Total Time Spent
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-span-1">
                <ProgressStats />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="min-h-[600px]">
            <AchievementBadges />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
