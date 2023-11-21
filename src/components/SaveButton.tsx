"use client";
import { useFormStatus } from "react-dom";

const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="border bg-green-400 rounded-md py-2 px-4">
      {pending ? "Saving..." : "Save"}
    </button>
  );
};

export default SaveButton;
