"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold">Erreur 404</h1>
      <p className="text-gray-500 mt-2">
        Nous n&apos;avons pas ce que vous cherchez.
      </p>
      <div className="mt-6 flex">
        <Button
          type="submit"
          className="flex-1"
          onClick={() => handleBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
      </div>
    </div>
  );
}
