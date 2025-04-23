
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Check } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {
    console.log(values, token);
    // Here you would call your API to reset the password
    setIsSuccess(true);
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  }

  // If no token is provided in URL, show an error
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <GraduationCap className="h-10 w-10 text-indigo-600 mx-auto" />
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
              Invalid Reset Link
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          <div className="text-center mt-6">
            <Button onClick={() => navigate("/auth/forgot-password")}>
              Request New Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <GraduationCap className="h-10 w-10 text-indigo-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
            Reset Your Password
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Enter a new password for your account
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-6">
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <AlertDescription className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>Password successfully reset! Redirecting to login...</span>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
