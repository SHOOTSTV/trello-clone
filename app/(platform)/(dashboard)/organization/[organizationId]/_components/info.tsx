"use client";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

export const Info = ({ isPro }: { isPro: boolean }) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return <Info.Skeleton />;

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative size-[60px]">
        <Image
          src={organization?.imageUrl || "/default-image.png"}
          alt="Organization"
          height={60}
          width={60}
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 size-3" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative size-[60px]">
        <Skeleton className="absolute size-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />

        <div className="flex items-center">
          <Skeleton className="mr-2 size-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
