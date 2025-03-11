"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  Video,
  Code,
} from "lucide-react";
import ModuleQuiz from "./ModuleQuiz";
import PathwayUnlock from "./PathwayUnlock";

interface ContentSection {
  id: string;
  title: string;
  type: "video" | "text" | "interactive";
  duration: string;
  completed: boolean;
  content: React.ReactNode;
}

interface LearningModuleProps {
  title?: string;
  description?: string;
  sections?: ContentSection[];
  progress?: number;
  estimatedTime?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  currentSection?: number;
  showQuiz?: boolean;
  showPathwayUnlock?: boolean;
  onComplete?: () => void;
  onSectionComplete?: (sectionId: string) => void;
  onQuizComplete?: (score: number, totalQuestions: number) => void;
  onPathwaySelect?: (pathwayId: string) => void;
}

const LearningModule = ({
  title = "Introduction to Adaptive Learning",
  description = "Learn how adaptive learning systems personalize education based on individual needs and preferences.",
  sections = [
    {
      id: "s1",
      title: "What is Adaptive Learning?",
      type: "video",
      duration: "5:30",
      completed: true,
      content: (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
              alt="Adaptive Learning Video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="icon" className="rounded-full h-16 w-16">
                <Play className="h-8 w-8" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Video Transcript</h3>
            <p className="text-muted-foreground">
              In this video, we explore the fundamental concepts of adaptive
              learning and how it revolutionizes the educational experience by
              tailoring content to individual learners.
            </p>
            <div className="p-4 bg-muted/30 rounded-md">
              <p className="italic text-sm">
                "Adaptive learning is an educational method which uses computer
                algorithms to orchestrate the interaction with the learner and
                deliver customized resources and learning activities to address
                the unique needs of each learner..."
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "s2",
      title: "Benefits of Personalized Learning Paths",
      type: "text",
      duration: "10:00",
      completed: true,
      content: (
        <div className="space-y-6">
          <p>
            Personalized learning paths offer numerous advantages over
            traditional one-size-fits-all educational approaches. By tailoring
            content to individual strengths, weaknesses, and preferences,
            learners can achieve better outcomes in less time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Improved Engagement
              </h4>
              <p className="text-sm text-muted-foreground">
                Content matched to your interests and learning style keeps you
                motivated and reduces dropout rates.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Faster Mastery
              </h4>
              <p className="text-sm text-muted-foreground">
                Focus on areas where you need improvement while quickly
                advancing through familiar concepts.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Reduced Frustration
              </h4>
              <p className="text-sm text-muted-foreground">
                Appropriate difficulty levels prevent both boredom and
                overwhelming challenges.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Better Retention
              </h4>
              <p className="text-sm text-muted-foreground">
                Information presented in your preferred learning style improves
                long-term memory and recall.
              </p>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg">
            <h4 className="font-medium mb-2">Research Highlight</h4>
            <p className="text-sm">
              A 2022 study found that students using adaptive learning platforms
              showed 23% better knowledge retention and completed courses 31%
              faster than those using traditional methods.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "s3",
      title: "Practical Application: Your First Adaptive Module",
      type: "interactive",
      duration: "15:00",
      completed: false,
      content: (
        <div className="space-y-6">
          <p>
            Now let's put theory into practice by exploring how an adaptive
            module works. This interactive exercise will demonstrate how the
            system responds to your choices and performance.
          </p>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/30 p-4 border-b">
              <h4 className="font-medium">
                Interactive Exercise: Learning Style Identification
              </h4>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm">
                Complete the following activities to help the system identify
                your preferred learning style. The system will adapt future
                content based on your interactions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Video className="h-8 w-8 text-primary" />
                    <h5 className="font-medium">Visual Example</h5>
                    <p className="text-xs text-muted-foreground">
                      Watch a short video demonstration
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <h5 className="font-medium">Text Explanation</h5>
                    <p className="text-xs text-muted-foreground">
                      Read a detailed written explanation
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Code className="h-8 w-8 text-primary" />
                    <h5 className="font-medium">Hands-on Exercise</h5>
                    <p className="text-xs text-muted-foreground">
                      Try a practical interactive example
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button>Continue</Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ],
  progress = 65,
  estimatedTime = "30 mins",
  difficulty = "beginner",
  currentSection = 2,
  showQuiz = false,
  showPathwayUnlock = false,
  onComplete = () => {},
  onSectionComplete = () => {},
  onQuizComplete = () => {},
  onPathwaySelect = () => {},
}: LearningModuleProps) => {
  const [activeSection, setActiveSection] = useState(currentSection);
  const [activeTab, setActiveTab] = useState<string>("content");
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Handle section navigation
  const handleNextSection = () => {
    if (activeSection < sections.length - 1) {
      onSectionComplete(sections[activeSection].id);
      setActiveSection(activeSection + 1);
    } else {
      setActiveTab("quiz");
    }
  };

  const handlePreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    setQuizScore(percentage);
    onQuizComplete(score, total);
    setModuleCompleted(true);

    // Show pathway unlock if score is good enough
    if (percentage >= 70) {
      setActiveTab("pathways");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-background">
      <Card className="w-full border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    difficulty === "beginner"
                      ? "outline"
                      : difficulty === "intermediate"
                        ? "secondary"
                        : "default"
                  }
                  className="capitalize"
                >
                  {difficulty}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {estimatedTime}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold mt-2">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {progress}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2 w-32" />
            </div>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 border-b">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Quiz
              </TabsTrigger>
              {moduleCompleted && (
                <TabsTrigger
                  value="pathways"
                  className="flex items-center gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Next Steps
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="content" className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center">
                    {activeSection + 1}
                  </span>
                  <h2 className="text-xl font-semibold">
                    {sections[activeSection].title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {sections[activeSection].duration}
                </div>
              </div>

              <div className="mb-8">{sections[activeSection].content}</div>

              <div className="flex justify-between mt-8 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handlePreviousSection}
                  disabled={activeSection === 0}
                >
                  Previous
                </Button>
                <Button onClick={handleNextSection}>
                  {activeSection < sections.length - 1 ? "Next" : "Take Quiz"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="p-6">
            <ModuleQuiz
              title={`${title} - Knowledge Check`}
              description="Test your understanding of the concepts covered in this module."
              onComplete={handleQuizComplete}
            />
          </TabsContent>

          <TabsContent value="pathways" className="p-0">
            <PathwayUnlock
              quizScore={quizScore}
              onSelectPathway={onPathwaySelect}
              onContinue={onComplete}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default LearningModule;
