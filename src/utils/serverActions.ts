"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prismadb";

// create
export const create = async (prevState: any, formData: FormData) => {
  try {
    const input = formData.get("input") as string;
    await prisma.todo.create({
      data: { input },
    });
    revalidatePath("/better");
  } catch (error) {
    return "Error creating record";
  }
};

// edit
export const edit = async (formData: FormData) => {
  const input = formData.get("input") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: { input },
  });
  revalidatePath("/better");
};

// delete
export const deleteItem = async (formData: FormData) => {
  console.log("deleting...");
  const inputId = formData.get("inputId") as string;
  await prisma.todo.delete({
    where: {
      id: inputId,
    },
  });
  revalidatePath("/better");
};
