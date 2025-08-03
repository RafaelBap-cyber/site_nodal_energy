import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to generate unique IDs for React 17 compatibility
let idCounter = 0
export function generateId(): string {
  return `id-${++idCounter}`
}
