"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Link,
} from "@heroui/react";
import { authClient, signIn } from "@/lib/auth-client"; // আপনার প্রজেক্টের সঠিক পাথ দিন
import toast from "react-hot-toast"; // নোটিফিকেশনের জন্য (যদি ব্যবহার করেন)
export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const isEmailInvalid =
    email.length > 0 && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isEmailInvalid) return; // check age e, setIsLoading(true) er age

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await signIn.email({
        ...loginData,
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
        setIsLoading(false);
        return;
      }

      if (data) {
        toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... handleGoogleLogin

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google sign in failed!");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Decorative Glow Elements */}
      <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            FCB Boraitala
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome Back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">
              FCB
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Sign in to access your dashboard.
          </p>
        </div>

        {/* Google Social Login Button */}
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mb-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.6 3.6 1.7 7.4l3.7 2.9C6.3 7.3 8.9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.4 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.7 6.4C.6 8.6 0 10.2 0 12s.6 3.4 1.7 5.6l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.7-2.3-6.6-5.3L1.7 15C3.6 18.8 7.5 23 12 23z"
            />
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="px-3 text-xs text-slate-500 uppercase">
            Or with email
          </span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Form Component */}
        <Form
          validationBehavior="aria"
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            isInvalid={isEmailInvalid}
            value={email}
            onChange={setEmail}
            className="w-full"
          >
            <Label className="text-xs font-medium text-slate-300 mb-1 block">
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="pervez@fcbarcelona.com"
              className="w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
            />
            <FieldError className="text-red-400 text-xs mt-1">
              {email.length > 0 && isEmailInvalid
                ? "Please enter a valid email format."
                : "Email is required."}
            </FieldError>
          </TextField>

          {/* Password Field */}
          <TextField isRequired name="password" className="w-full">
            <Label className="text-xs font-medium text-slate-300 mb-1 block">
              Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-xl"
            />
            <FieldError className="text-red-400 text-xs mt-1">
              Password is required.
            </FieldError>
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all duration-200 cursor-pointer"
          >
            Sign In
          </Button>
        </Form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 font-medium underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
