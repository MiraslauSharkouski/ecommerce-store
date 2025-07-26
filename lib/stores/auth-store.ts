import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User } from "../types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          // Simulate login with FakeStore API
          const response = await fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: email,
              password: password,
            }),
          });

          if (response.ok) {
            const token = await response.json();

            // Fetch user data (using user ID 1 for demo)
            const userResponse = await fetch(
              "https://fakestoreapi.com/users/1"
            );
            const userData: User = await userResponse.json();

            set({
              user: userData,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
