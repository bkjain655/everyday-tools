import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
      console.error("Please upgrade your browser to latest version");
      return;
  }
  navigator.clipboard.writeText(text).catch(function(err) {
      console.error('Async: Could not copy text: ', err);
  });
}