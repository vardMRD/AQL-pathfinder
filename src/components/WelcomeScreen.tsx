"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, Brain, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
  appName?: string;
  description?: string;
  features?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const WelcomeScreen = ({
  onGetStarted = () => {},
  onLogin = () => {},
  appName = "Aql Academy",
  description = "Discover your entrepreneurial potential with our personalized learning platform designed specifically for Omani youth and aspiring business leaders.",
  features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Personality Assessment",
      description:
        "Take our free quiz to uncover your entrepreneurial strengths and business potential in Oman's growing economy.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Adaptive Learning",
      description:
        "Experience content tailored to Omani business culture that adapts to your unique goals and learning preferences.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Gamified Experience",
      description:
        "Earn badges and unlock new business pathways as you progress through your entrepreneurial journey in Oman.",
    },
  ],
}: WelcomeScreenProps) => {
  return (
    <div className="w-full min-h-[700px] bg-gradient-to-br from-accent via-secondary/30 to-primary/20 flex flex-col items-center justify-center p-6 md:p-12">
      <div className="max-w-5xl w-full mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {appName}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="text-lg px-8 py-6 h-auto group"
          >
            Start Your Omani Business Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onLogin}
            className="text-lg px-8 py-6 h-auto"
          >
            Log In
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={cn(
                "bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors",
                index === 1 ? "md:transform md:-translate-y-4" : "",
              )}
            >
              <CardHeader>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-6 bg-muted/50 rounded-lg max-w-3xl mx-auto">
          <h3 className="text-lg font-medium mb-2">
            Your Omani entrepreneurship journey begins here
          </h3>
          <p className="text-muted-foreground mb-4">
            Our entrepreneurial assessment takes just 5 minutes and unlocks a
            customized learning experience tailored to Omani business culture
            and market opportunities.
          </p>
          <Button
            variant="outline"
            onClick={onGetStarted}
            className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30"
          >
            Take the Free Assessment
          </Button>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Aql Academy. Entrepreneur Community &
          E-learning Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
