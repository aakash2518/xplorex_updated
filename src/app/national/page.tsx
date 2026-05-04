"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NationalRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/india-trips");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-primary/60">Redirecting to India Trips...</p>
      </div>
    </div>
  );
}
