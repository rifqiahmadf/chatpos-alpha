"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Linkedin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    if (user && !user.emailVerified) {
      toast.error("Please verify your email before logging in.");
    }
  }, [user]);

  const validateEmail = (email: string) => {
    const domain = "@posindonesia.co.id";
    return email.endsWith(domain) && email.length > domain.length;
  };

  const validatePassword = (password: string) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
      return true;
    } else {
      setPasswordStrength("weak");
      return false;
    }
  };

  const validateBackend = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.join("\n") || "Validation failed");
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return false;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Frontend validation
      if (!validateEmail(email)) {
        setError("Email must use the @posindonesia.co.id domain.");
        return;
      }

      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        );
        return;
      }

      if (password !== retypePassword) {
        setError("Passwords do not match.");
        return;
      }

      // Backend validation
      const isValid = await validateBackend(email, password);
      if (!isValid) {
        return;
      }

      // Firebase registration
      await signUp(email, password);
      toast.success(
        "Registration successful! Please check your email for verification."
      );
    } catch (error) {
      // Error is handled by the hook and displayed via toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!validateEmail(email)) {
        setError("Email must use the @posindonesia.co.id domain.");
        return;
      }

      await signIn(email, password);
    } catch (error) {
      // Error is handled by the hook and displayed via toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setEmail("");
    setPassword("");
    setRetypePassword("");
    setPasswordStrength("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-8">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Chatpos Alpha</CardTitle>
          <CardDescription>Login or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@posindonesia.co.id"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Log in"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@posindonesia.co.id"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
                      required
                      disabled={isLoading}
                    />
                    {passwordStrength && (
                      <p
                        className={`text-sm ${
                          passwordStrength === "strong"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        Password strength: {passwordStrength}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="retype-password">Retype Password</Label>
                    <Input
                      id="retype-password"
                      type="password"
                      value={retypePassword}
                      onChange={(e) => setRetypePassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Register"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
      <div className="mt-4 text-center text-sm text-gray-500 flex flex-col items-center">
        <span>Created by Rifqi Ahmad Fauzi - Bagian Data Center & Clouds</span>
        <a
          href="https://www.linkedin.com/in/rifqiahmadf/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full transition-colors duration-200"
        >
          <Linkedin size={16} />
        </a>
      </div>
    </div>
  );
}
