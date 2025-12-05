import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolve a thumbnail value to a local image path.
 * If the provided thumbnail is already a local path under /images/ it is returned as-is.
 * Otherwise we fall back to the app placeholder image so external URLs are avoided in the UI.
 */
export function getLocalThumbnail(thumbnail?: string) {
  if (!thumbnail) return '/images/placeholder.svg';
  const trimmed = thumbnail.trim();
  if (trimmed.startsWith('/images/') || trimmed.startsWith('images/')) return trimmed;
  // Any other value (including http/https) falls back to the placeholder.
  return '/images/placeholder.svg';
}
