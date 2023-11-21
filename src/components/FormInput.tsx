"use client";
import { create } from "@/utils/serverActions";
import { useRef } from "react";
import { useFormStatus, useFormState } from "react-dom";

const FormInput = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(create, null);

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        className="bg-green-500 rounded-lg mt-2 py-2 px-4 w-fit"
        type="submit"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    );
  };

  return (
    <form
      className="flex flex-col"
      action={async (formData: FormData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <input type="text" name="input" className="border p-1 border-gray-800" />

      <SubmitButton />
      {state as string}
    </form>
  );
};

export default FormInput;
