import React from "react";
import errorHandler from "../helper/errorHandler";

export default function ErrorHandler({ error }: { error: unknown }) {
  const { status, message } = errorHandler(error);
  return (
    <div className="w-full h-full flex items-center  justify-center">
      <h2>{message}</h2>
    </div>
  );
}
