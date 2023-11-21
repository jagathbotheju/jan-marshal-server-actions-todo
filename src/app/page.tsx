import prisma from "@/utils/prismadb";
import { revalidatePath } from "next/cache";
import Image from "next/image";

const getData = async () => {
  const data = await prisma.todo.findMany({
    select: {
      id: true,
      input: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export default async function Home() {
  const data = await getData();

  // create
  const create = async (formData: FormData) => {
    "use server";
    const input = formData.get("input") as string;

    await prisma.todo.create({
      data: { input },
    });
    revalidatePath("/");
  };

  // edit
  const edit = async (formData: FormData) => {
    "use server";

    const input = formData.get("input") as string;
    const inputId = formData.get("inputId") as string;

    await prisma.todo.update({
      where: {
        id: inputId,
      },
      data: { input },
    });
    revalidatePath("/");
  };

  // delete
  const deleteItem = async (formData: FormData) => {
    "use server";

    console.log("deleting...");
    const inputId = formData.get("inputId") as string;
    await prisma.todo.delete({
      where: {
        id: inputId,
      },
    });
    revalidatePath("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border border-lg shadow-xl p-10 w-[40vw]">
        <form className="flex flex-col" action={create}>
          <input
            type="text"
            name="input"
            className="border p-1 border-gray-800"
          />

          <button
            className="bg-green-500 rounded-lg mt-2 py-2 px-4 w-fit"
            type="submit"
          >
            Submit
          </button>
        </form>

        {/* todos */}
        <div className="mt-5 flex flex-col gap-y-2">
          {data.map((todo) => (
            <form key={todo.id} className="flex gap-2" action={edit}>
              <input hidden name="inputId" value={todo.id} />
              <input
                type="text"
                name="input"
                defaultValue={todo.input}
                className="border p-2 w-full"
              />

              <button
                type="submit"
                className="border bg-green-400 rounded-md py-2 px-4"
              >
                Save
              </button>
              <button
                className="border bg-rose-400 rounded-md py-2 px-4"
                formAction={deleteItem}
              >
                Delete
              </button>
            </form>
          ))}
        </div>
      </div>
    </main>
  );
}
