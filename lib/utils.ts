import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) + "k"
    : Math.sign(num) * Math.abs(num);
}