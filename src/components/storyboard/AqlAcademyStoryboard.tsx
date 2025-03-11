import React from "react";
import { WelcomeScreen } from "../WelcomeScreen";

export default function AqlAcademyStoryboard() {
  return (
    <div className="bg-gradient-to-br from-accent via-secondary/30 to-primary/20">
      <WelcomeScreen
        onGetStarted={() => console.log("Get started clicked")}
        onLogin={() => console.log("Login clicked")}
      />
    </div>
  );
}
