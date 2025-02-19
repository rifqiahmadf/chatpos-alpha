"use client";

import { useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  type User,
  type AuthError,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const getErrorMessage = (error: AuthError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please try logging in instead.";
    case "auth/user-not-found":
      return "Email not registered. Please sign up first.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-email":
      return "Invalid email address. Please check and try again.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/invalid-credential":
      return "Invalid email address or password.";
    default:
      return "An error occurred. Please try again.";
  }
};

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error as AuthError));
    }
  }, [error]);

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("User:", user);
    console.log("Email Verified:", user?.emailVerified);

    if (!loading) {
      if (user) {
        // if (user.emailVerified) {
        if (user) {
          if (pathname === "/auth") {
            router.push("/");
          }
        } else {
          if (pathname !== "/auth") {
            router.push("/auth");
            toast.error("Please verify your email before accessing the app.");
          }
        }
      } else if (pathname !== "/auth" && pathname !== "/auth/forgot-password") {
        router.push("/auth");
      }
    }
  }, [user, loading, pathname, router]);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // if (!userCredential.user.emailVerified) {
      //   toast.error("Please verify your email before logging in.");
      //   await firebaseSignOut(auth);
      // } else {
      //   toast.success("Successfully logged in!");
      // }
    } catch (error) {
      const authError = error as AuthError;
      toast.error(getErrorMessage(authError));
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      toast.success(
        "Account created successfully! Please check your email for verification."
      );
      await firebaseSignOut(auth);
    } catch (error) {
      const authError = error as AuthError;
      toast.error(getErrorMessage(authError));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Successfully logged out!");
    } catch (error) {
      const authError = error as AuthError;
      toast.error(getErrorMessage(authError));
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      const authError = error as AuthError;
      toast.error(getErrorMessage(authError));
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
}
