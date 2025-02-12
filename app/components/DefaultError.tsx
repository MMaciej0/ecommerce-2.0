"use client";

import { startTransition, type FC } from "react";
import { Card } from "./ui/Card";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "../lib/utils";
import Link from "next/link";

interface DefaultErrorProps {
  reset: () => void;
  message?: string | null;
}

const DefaultError: FC<DefaultErrorProps> = ({ message, reset }) => {
  const router = useRouter();

  const handleReload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <Card.Header className="border-b text-xl font-semibold tracking-wide">
          Error
        </Card.Header>
        <Card.Content className="space-y-6">
          <p className="text-center text-lg">
            {message || "Something went wrong."}
          </p>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" onClick={handleReload}>
              Reload Page
            </Button>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Go Home Page
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default DefaultError;
