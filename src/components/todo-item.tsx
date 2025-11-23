"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
    id: string;
    title: string;
    isCompleted: boolean;
    onToggle: (id: string, isCompleted: boolean) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ id, title, isCompleted, onToggle, onDelete }: TodoItemProps) {
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg mb-2 bg-card shadow-sm">
            <div className="flex items-center gap-3 flex-1">
                <Checkbox
                    checked={isCompleted}
                    onCheckedChange={(checked) => onToggle(id, checked as boolean)}
                    id={`todo-${id}`}
                />
                <label
                    htmlFor={`todo-${id}`}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1",
                        isCompleted && "line-through text-muted-foreground"
                    )}
                >
                    {title}
                </label>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(id)}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
