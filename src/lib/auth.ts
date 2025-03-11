import { UserData } from "@/components/UserRegistration";

// This is a simple mock implementation for demo purposes
// In a real app, you would use a proper authentication system

interface StoredUserData extends UserData {
  personalityResults: any;
}

export const registerUser = (
  userData: UserData,
  personalityResults: any,
): boolean => {
  try {
    // In a real app, you would send this to your backend
    // For demo purposes, we'll store it in localStorage
    const storedUser: StoredUserData = {
      ...userData,
      personalityResults,
    };

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(
      (user: StoredUserData) => user.email === userData.email,
    );

    if (userExists) {
      return false;
    }

    // Add new user
    existingUsers.push(storedUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(storedUser));

    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};

export const loginUser = (
  email: string,
  password: string,
): StoredUserData | null => {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: StoredUserData) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    }

    return null;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const getCurrentUser = (): StoredUserData | null => {
  try {
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) return null;

    return JSON.parse(userJson);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem("currentUser");
};
