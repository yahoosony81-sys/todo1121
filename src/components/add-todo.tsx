"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddTodoProps {
    onAdd: (title: string) => Promise<void>;
}

export function AddTodo({ onAdd }: AddTodoProps) {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsLoading(true);
        try {
            await onAdd(title);
            setTitle("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo..."
                className="flex-1"
                disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !title.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add
            </Button>
        </form>
    );
}
