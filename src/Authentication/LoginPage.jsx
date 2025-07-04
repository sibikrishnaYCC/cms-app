import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseurl from "../../base";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/Components/ui/card.jsx";
import { Input } from "@/Components/ui/input.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { cn } from "@/lib/utils.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${baseurl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(data?.message ?? "Login failed.");
        triggerShake();
      }
    } catch {
      setMessage("Network error, please try again.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <Card
        className={cn(
          "w-full max-w-md backdrop-blur-sm border border-neutral-200 shadow-2xl transition-all duration-300",
          shake && "animate-shake"
        )}
      >
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-neutral-800">
            Welcome Back
          </CardTitle>
          <p className="mt-1 text-center text-sm text-neutral-500">
            Please enter your credentials
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer h-12 rounded-md border border-neutral-300 bg-white px-3 pt-6 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
                placeholder=" "
              />
              <Label
                htmlFor="email"
                className="absolute left-3 top-2 text-xs text-neutral-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
              >
                Email
              </Label>
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="peer h-12 rounded-md border border-neutral-300 bg-white px-3 pt-6 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400"
                placeholder=" "
              />
              <Label
                htmlFor="password"
                className="absolute left-3 top-2 text-xs text-neutral-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
              >
                Password
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="w-full transition-transform duration-200 hover:scale-[1.02] active:scale-95"
              size="sm"
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
            {message && (
              <p
                className={cn(
                  "text-center text-sm",
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {message}
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
