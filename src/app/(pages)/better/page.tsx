import DeleteButton from "@/components/DeleteButton";
import FormInput from "@/components/FormInput";
import SaveButton from "@/components/SaveButton";
import prisma from "@/utils/prismadb";
import { create, deleteItem, edit } from "@/utils/serverActions";

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

const BetterPage = async () => {
  const data = await getData();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border border-lg shadow-xl p-10 w-[40vw]">
        <FormInput />

        {/* todos */}
        <div className="mt-5 flex flex-col gap-y-2">
          {data.map((todo) => (
            <div key={todo.id} className="flex items-center w-full">
              <form className="flex gap-2 w-full" action={edit}>
                <input hidden name="inputId" value={todo.id} readOnly />
                <input
                  type="text"
                  name="input"
                  defaultValue={todo.input}
                  className="border p-2 w-full"
                />

                <SaveButton />
              </form>

              <form action={deleteItem}>
                <input hidden name="inputId" value={todo.id} readOnly />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BetterPage;
