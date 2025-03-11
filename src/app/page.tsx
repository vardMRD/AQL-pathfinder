"use client";

import React, { useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import PersonalityAssessment from "@/components/PersonalityAssessment";
import PersonalizedProfile from "@/components/PersonalizedProfile";
import CareerPathSelection from "@/components/CareerPathSelection";
import Dashboard from "@/components/Dashboard";
import LoginForm from "@/components/LoginForm";
import UserRegistration from "@/components/UserRegistration";
import { getCurrentUser, registerUser } from "@/lib/auth";

export default function Home() {
  const [currentStep, setCurrentStep] = React.useState("welcome");
  const [personalityResults, setPersonalityResults] = React.useState(null);
  const [selectedCareerPath, setSelectedCareerPath] = React.useState("");
  const [userData, setUserData] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserData(currentUser);
      setPersonalityResults(currentUser.personalityResults);
      setCurrentStep("dashboard");
    }
  }, []);

  // Handle starting the assessment from welcome screen
  const handleStartAssessment = () => {
    setCurrentStep("assessment");
  };

  // Handle assessment completion
  const handleAssessmentComplete = (results) => {
    setPersonalityResults(results);
    setCurrentStep("profile");
  };

  // Handle career path selection
  const handleCareerPathSelect = (careerPath) => {
    setSelectedCareerPath(careerPath);
    setCurrentStep("careerPath");
  };

  // Handle continuing to dashboard after career path selection
  const handleContinueToDashboard = () => {
    setCurrentStep("dashboard");
  };

  // Handle user registration
  const handleUserRegistration = (userInfo) => {
    const success = registerUser(userInfo, personalityResults);
    if (success) {
      setUserData(userInfo);
      setCurrentStep("profile");
    }
  };

  // Handle login success
  const handleLoginSuccess = (user) => {
    setUserData(user);
    setPersonalityResults(user.personalityResults);
    setCurrentStep("dashboard");
  };

  // Render the appropriate component based on current step
  const renderStep = () => {
    if (showLogin) {
      return (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      );
    }

    if (showRegister) {
      return (
        <UserRegistration
          onComplete={handleUserRegistration}
          personalityResults={personalityResults}
        />
      );
    }

    switch (currentStep) {
      case "welcome":
        return (
          <WelcomeScreen
            onGetStarted={handleStartAssessment}
            onLogin={() => setShowLogin(true)}
          />
        );
      case "assessment":
        return <PersonalityAssessment onComplete={handleAssessmentComplete} />;
      case "profile":
        return (
          <PersonalizedProfile
            userName={userData?.name || "Learner"}
            onSelectCareerPath={handleCareerPathSelect}
            personalityTraits={
              personalityResults?.traits
                ? [
                    {
                      name: "Analytical",
                      score: personalityResults.traits.analytical || 75,
                      description:
                        "You excel at logical reasoning and critical thinking.",
                      icon: null,
                    },
                    {
                      name: "Creative",
                      score: personalityResults.traits.creative || 65,
                      description:
                        "You have a strong ability to think outside the box.",
                      icon: null,
                    },
                    {
                      name: "Practical",
                      score: personalityResults.traits.practical || 70,
                      description:
                        "You focus on real-world applications and tangible results.",
                      icon: null,
                    },
                    {
                      name: "Social",
                      score: personalityResults.traits.social || 60,
                      description:
                        "You work well with others and value team input.",
                      icon: null,
                    },
                  ]
                : undefined
            }
            learningStyles={
              personalityResults?.learningStyle
                ? [
                    {
                      type: "Visual",
                      percentage: personalityResults.learningStyle.visual || 65,
                      description:
                        "You learn best through images, diagrams, and spatial understanding.",
                    },
                    {
                      type: "Auditory",
                      percentage:
                        personalityResults.learningStyle.auditory || 40,
                      description:
                        "You benefit from lectures, discussions, and verbal instructions.",
                    },
                    {
                      type: "Reading/Writing",
                      percentage:
                        personalityResults.learningStyle.reading || 75,
                      description:
                        "You prefer text-based information and taking notes.",
                    },
                    {
                      type: "Kinesthetic",
                      percentage:
                        personalityResults.learningStyle.kinesthetic || 55,
                      description:
                        "You learn through hands-on activities and practical exercises.",
                    },
                  ]
                : undefined
            }
          />
        );
      case "careerPath":
        return (
          <CareerPathSelection
            personalityType="Analytical Problem-Solver"
            paths={[
              {
                id: "software-dev",
                title: "Software Development",
                description:
                  "Build applications and services that power the digital world.",
                matchPercentage: 92,
                skillsRequired: [
                  "Problem Solving",
                  "Logical Thinking",
                  "Attention to Detail",
                ],
                estimatedTimeToComplete: "6-12 months",
                difficulty: "intermediate",
                popularity: 4.8,
                selected: selectedCareerPath === "Software Development",
              },
              {
                id: "data-science",
                title: "Data Science",
                description:
                  "Extract insights from data using statistical analysis and machine learning.",
                matchPercentage: 87,
                skillsRequired: [
                  "Statistical Analysis",
                  "Critical Thinking",
                  "Pattern Recognition",
                ],
                estimatedTimeToComplete: "8-14 months",
                difficulty: "advanced",
                popularity: 4.7,
                selected: selectedCareerPath === "Data Science",
              },
              {
                id: "ux-design",
                title: "UX/UI Design",
                description:
                  "Create intuitive, accessible, and delightful user experiences.",
                matchPercentage: 78,
                skillsRequired: ["Empathy", "Visual Thinking", "Communication"],
                estimatedTimeToComplete: "5-10 months",
                difficulty: "intermediate",
                popularity: 4.5,
                selected: selectedCareerPath === "UX/UI Design",
              },
            ]}
            onContinue={handleContinueToDashboard}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            activeTab="overview"
            userName={userData?.name || "Learner"}
            userAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.name || "User"}`}
          />
        );
      default:
        return <WelcomeScreen onGetStarted={handleStartAssessment} />;
    }
  };

  return <main className="min-h-screen bg-background">{renderStep()}</main>;
}
