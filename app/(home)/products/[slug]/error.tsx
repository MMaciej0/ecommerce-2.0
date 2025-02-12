"use client";

import DefaultError from "@/app/components/DefaultError";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <DefaultError message={error.message} reset={reset} />;
};

export default Error;
