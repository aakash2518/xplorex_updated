"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Skeleton className="w-16 h-16 rounded-full mb-6" />
      <Skeleton className="w-48 h-6 rounded-md mb-2" />
      <Skeleton className="w-32 h-4 rounded-md" />
    </div>
  );
}
