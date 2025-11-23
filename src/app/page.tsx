import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
      <TodoList />
    </main>
  );
}