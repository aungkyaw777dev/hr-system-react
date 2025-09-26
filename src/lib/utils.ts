import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormatter = (date: string): string => {
  const dt = new Date(date);
  return isNaN(dt.getTime())
    ? ""
    : dt.toISOString().split(".")[0].replace("T", " ");
};

export const isEmailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
