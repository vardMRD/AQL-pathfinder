"use client";

import React, { useState } from "react";
import { Settings, BookOpen, Briefcase, Clock, BarChart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface LearningPreferencesProps {
  onSave?: (preferences: LearningPreferencesData) => void;
  initialPreferences?: LearningPreferencesData;
}

interface LearningPreferencesData {
  learningStyle: {
    visual: number;
    auditory: number;
    reading: number;
    kinesthetic: number;
  };
  pacePreference: string;
  notificationEnabled: boolean;
  careerGoals: string[];
  focusTime: number;
  difficultyPreference: string;
}

const defaultPreferences: LearningPreferencesData = {
  learningStyle: {
    visual: 70,
    auditory: 50,
    reading: 60,
    kinesthetic: 40,
  },
  pacePreference: "balanced",
  notificationEnabled: true,
  careerGoals: ["Software Development", "Data Science"],
  focusTime: 25,
  difficultyPreference: "medium",
};

const LearningPreferences = ({
  onSave = () => {},
  initialPreferences = defaultPreferences,
}: LearningPreferencesProps) => {
  const [preferences, setPreferences] =
    useState<LearningPreferencesData>(initialPreferences);
  const [activeTab, setActiveTab] = useState("learning-style");

  const handleLearningStyleChange = (
    type: keyof typeof preferences.learningStyle,
    value: number[],
  ) => {
    setPreferences((prev) => ({
      ...prev,
      learningStyle: {
        ...prev.learningStyle,
        [type]: value[0],
      },
    }));
  };

  const handlePaceChange = (value: string) => {
    setPreferences((prev) => ({
      ...prev,
      pacePreference: value,
    }));
  };

  const handleNotificationToggle = () => {
    setPreferences((prev) => ({
      ...prev,
      notificationEnabled: !prev.notificationEnabled,
    }));
  };

  const handleCareerGoalChange = (value: string) => {
    setPreferences((prev) => {
      // This is a simplified implementation - in a real app you'd want to handle multiple selections
      return {
        ...prev,
        careerGoals: [value],
      };
    });
  };

  const handleFocusTimeChange = (value: number[]) => {
    setPreferences((prev) => ({
      ...prev,
      focusTime: value[0],
    }));
  };

  const handleDifficultyChange = (value: string) => {
    setPreferences((prev) => ({
      ...prev,
      difficultyPreference: value,
    }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-background">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <CardTitle>Learning Preferences</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="learning-style"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            <TabsTrigger
              value="learning-style"
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Learning Style</span>
            </TabsTrigger>
            <TabsTrigger
              value="career-goals"
              className="flex items-center gap-1"
            >
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Career Goals</span>
            </TabsTrigger>
            <TabsTrigger
              value="pace-settings"
              className="flex items-center gap-1"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Pace & Time</span>
            </TabsTrigger>
            <TabsTrigger value="difficulty" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span className="hidden md:inline">Difficulty</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning-style" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Learning Style Preferences
              </h3>
              <p className="text-sm text-muted-foreground">
                Adjust the sliders to customize how content is presented to you.
              </p>

              <div className="space-y-6 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">
                      Visual Learning
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {preferences.learningStyle.visual}%
                    </span>
                  </div>
                  <Slider
                    value={[preferences.learningStyle.visual]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) =>
                      handleLearningStyleChange("visual", value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Preference for diagrams, charts, and visual demonstrations
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">
                      Auditory Learning
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {preferences.learningStyle.auditory}%
                    </span>
                  </div>
                  <Slider
                    value={[preferences.learningStyle.auditory]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) =>
                      handleLearningStyleChange("auditory", value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Preference for lectures, discussions, and audio content
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">
                      Reading/Writing
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {preferences.learningStyle.reading}%
                    </span>
                  </div>
                  <Slider
                    value={[preferences.learningStyle.reading]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) =>
                      handleLearningStyleChange("reading", value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Preference for text-based materials and note-taking
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">
                      Kinesthetic Learning
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {preferences.learningStyle.kinesthetic}%
                    </span>
                  </div>
                  <Slider
                    value={[preferences.learningStyle.kinesthetic]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) =>
                      handleLearningStyleChange("kinesthetic", value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Preference for hands-on activities and practical exercises
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="career-goals" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Career Goals</h3>
              <p className="text-sm text-muted-foreground">
                Update your career aspirations to receive tailored learning
                recommendations.
              </p>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Primary Career Goal
                  </label>
                  <Select
                    value={preferences.careerGoals[0]}
                    onValueChange={handleCareerGoalChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a career path" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software Development">
                        Software Development
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="UX/UI Design">UX/UI Design</SelectItem>
                      <SelectItem value="Product Management">
                        Product Management
                      </SelectItem>
                      <SelectItem value="Digital Marketing">
                        Digital Marketing
                      </SelectItem>
                      <SelectItem value="Cybersecurity">
                        Cybersecurity
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Current Career Path</h4>
                  <p className="text-sm">
                    {preferences.careerGoals.join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Your learning pathways will be optimized for these career
                    goals.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pace-settings" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pace & Time Settings</h3>
              <p className="text-sm text-muted-foreground">
                Customize how quickly you progress through content and your
                study schedule.
              </p>

              <div className="space-y-6 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Learning Pace</label>
                  <Select
                    value={preferences.pacePreference}
                    onValueChange={handlePaceChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred pace" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relaxed">
                        Relaxed - Take your time
                      </SelectItem>
                      <SelectItem value="balanced">
                        Balanced - Moderate pace
                      </SelectItem>
                      <SelectItem value="accelerated">
                        Accelerated - Move quickly
                      </SelectItem>
                      <SelectItem value="intensive">
                        Intensive - Maximum challenge
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">
                      Focus Session Length
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {preferences.focusTime} minutes
                    </span>
                  </div>
                  <Slider
                    value={[preferences.focusTime]}
                    min={5}
                    max={60}
                    step={5}
                    onValueChange={handleFocusTimeChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended session length before taking a break
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">
                      Learning Reminders
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications for scheduled learning sessions
                    </p>
                  </div>
                  <Switch
                    checked={preferences.notificationEnabled}
                    onCheckedChange={handleNotificationToggle}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="difficulty" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Difficulty Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Set your preferred challenge level for learning content.
              </p>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Content Difficulty
                  </label>
                  <Select
                    value={preferences.difficultyPreference}
                    onValueChange={handleDifficultyChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner - Fundamentals focus
                      </SelectItem>
                      <SelectItem value="easy">
                        Easy - Gentle introduction
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium - Balanced challenge
                      </SelectItem>
                      <SelectItem value="advanced">
                        Advanced - Complex concepts
                      </SelectItem>
                      <SelectItem value="expert">
                        Expert - Cutting-edge material
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Difficulty Impact</h4>
                  <p className="text-sm">
                    Your selected difficulty level affects:
                  </p>
                  <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>Complexity of examples and exercises</li>
                    <li>Depth of theoretical concepts covered</li>
                    <li>Expected prior knowledge</li>
                    <li>Time required to complete modules</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={() => setPreferences(initialPreferences)}
        >
          Reset
        </Button>
        <Button onClick={handleSave}>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default LearningPreferences;
