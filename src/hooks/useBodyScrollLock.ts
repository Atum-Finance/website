"use client";

import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const scrollbarGap = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
