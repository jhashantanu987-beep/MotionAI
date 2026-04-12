// This file defines TypeScript types and interfaces used throughout the application for better type safety.

export interface User {
    id: string;
    name: string;
    avatar: string;
    tags: string[];
}

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: Date;
}

export interface Metric {
    title: string;
    value: number;
    change: number;
}

export interface TimelineEvent {
    id: string;
    title: string;
    date: Date;
    description: string;
}

export interface SidebarState {
    isOpen: boolean;
}

export interface FloatingPanelProps {
    isVisible: boolean;
}