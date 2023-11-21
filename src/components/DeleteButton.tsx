"use client";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="border bg-rose-400 rounded-md py-2 px-4" type="submit">
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
