"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Caught error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center calc-h text-center p-4 pt-17">
      <h1 className="text-2xl font-bold mb-4">Unexpected Error!</h1>
      <p className="mb-6">{error.message}</p>
      <Button
        onClick={() => reset()}
        className="bg-black text-white px-8 py-5 rounded-lg hover:bg-gray-800 duration-300 cursor-pointer text-lg"
      >
        Try Again
      </Button>
    </div>
  );
}
