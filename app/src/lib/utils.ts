// Path: src/components/ui/button.tsx
// Modified/Imported from classwork codebase

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
