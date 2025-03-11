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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Mail, Lock, LogIn } from "lucide-react";
import { loginUser } from "@/lib/auth";

interface LoginFormProps {
  onLoginSuccess: (userData: any) => void;
  onRegisterClick: () => void;
}

const LoginForm = ({ onLoginSuccess, onRegisterClick }: LoginFormProps) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate form
    if (!loginData.email || !loginData.password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    // Attempt login
    const user = loginUser(loginData.email, loginData.password);

    if (user) {
      onLoginSuccess(user);
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Log in to continue your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Password
              </Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
              <LogIn className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <p>
          Don't have an account?{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-primary hover:underline"
            onClick={onRegisterClick}
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
