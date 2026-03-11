import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let _isSafariDesktop: boolean | null = null;

export function isSafariDesktop(): boolean {
  if (_isSafariDesktop !== null) return _isSafariDesktop;
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  _isSafariDesktop = isSafari && !isMobile;
  return _isSafariDesktop;
}