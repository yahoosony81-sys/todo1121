"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { TodoItem } from "./todo-item";
import { AddTodo } from "./add-todo";

interface Todo {
    id: string;
    title: string;
    is_completed: boolean;
    created_at: string;
}

export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from("todos")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setTodos(data || []);
        } catch (err: any) {
            console.error("Error fetching todos:", err);
            setError(err.message || "알 수 없는 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (title: string) => {
        try {
            const { data, error } = await supabase
                .from("todos")
                .insert([{ title }])
                .select()
                .single();

            if (error) throw error;
            setTodos([data, ...todos]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const toggleTodo = async (id: string, isCompleted: boolean) => {
        try {
            // Optimistic update
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...todo, is_completed: isCompleted } : todo
                )
            );

            const { error } = await supabase
                .from("todos")
                .update({ is_completed: isCompleted })
                .eq("id", id);

            if (error) {
                // Revert on error
                fetchTodos();
                throw error;
            }
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            // Optimistic update
            setTodos(todos.filter((todo) => todo.id !== id));

            const { error } = await supabase
                .from("todos")
                .delete()
                .eq("id", id);

            if (error) {
                // Revert on error
                fetchTodos();
                throw error;
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading todos...</div>;
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-background rounded-xl shadow-lg border border-destructive/50">
                <h1 className="text-2xl font-bold mb-4 text-center text-destructive">오류 발생</h1>
                <p className="text-center text-muted-foreground mb-4">{error}</p>
                <div className="text-center text-sm text-muted-foreground">
                    <p>다음 사항을 확인해주세요:</p>
                    <ul className="list-disc list-inside mt-2 text-left inline-block">
                        <li>Supabase에서 "todos" 테이블을 생성했는지 확인해주세요.</li>
                        <li>.env 파일이 올바르게 설정되었는지 확인해주세요.</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-background rounded-xl shadow-lg border">
            <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>
            <AddTodo onAdd={addTodo} />
            <div className="space-y-2">
                {todos.length === 0 ? (
                    <div className="text-center text-muted-foreground py-6">
                        No todos yet. Add one above!
                    </div>
                ) : (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            isCompleted={todo.is_completed}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
