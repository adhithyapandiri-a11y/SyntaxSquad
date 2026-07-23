"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center text-center p-6">
      <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        System Exception Encountered
      </h1>
      <p className="text-sm text-slate-500 max-w-md mt-2">
        An unexpected runtime error occurred. RoomZen AI recovery engine is
        active.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Button variant="primary" onClick={() => reset()}>
          <RefreshCw className="w-4 h-4 mr-1.5" /> Try Again
        </Button>
        <Link href="/dashboard/admin">
          <Button variant="outline">
            <Home className="w-4 h-4 mr-1.5" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
