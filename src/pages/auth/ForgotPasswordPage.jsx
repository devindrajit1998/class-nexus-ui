
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, ArrowLeft, Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    setIsSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center">
            <GraduationCap className="h-10 w-10 text-indigo-600" />
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
            Forgot your password?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-6">
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <AlertDescription className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>Password reset link sent! Check your email.</span>
              </AlertDescription>
            </Alert>
            <p className="text-sm text-center text-slate-600 dark:text-slate-400">
              Didn't receive an email? Check your spam folder or{" "}
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                try again
              </button>
            </p>
            <div className="text-center mt-6">
              <Link 
                to="/auth/login" 
                className="flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          placeholder="your.email@example.com" 
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-6">
              <Link 
                to="/auth/login" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
