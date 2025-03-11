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
import { ArrowRight, User, Mail, Lock } from "lucide-react";

interface UserRegistrationProps {
  personalityResults?: any;
  onComplete: (userData: UserData) => void;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}

const UserRegistration = ({
  personalityResults,
  onComplete,
}: UserRegistrationProps) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (userData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, you would send this data to your backend
      // For now, we'll just pass it to the parent component
      onComplete(userData);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Create Your Account
        </CardTitle>
        <CardDescription>
          Save your results and continue your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={userData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

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
              value={userData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={userData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="flex items-center gap-2"
            >
              <Lock className="h-4 w-4 text-muted-foreground" />
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full gap-2">
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <p>
          Already have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default UserRegistration;
