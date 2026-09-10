"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/* SwiftUI's scroll and state modifiers as hooks. They stand alone: nothing
   here needs barua.js, so a React app that never loads it still has them. */

export type ScrollGeometry = {
  x: number;
  y: number;
  width: number;
  height: number;
  contentWidth: number;
  contentHeight: number;
  /** 0 at the start, 1 at the end; 0 when there is nothing to scroll. */
  progressX: number;
  progressY: number;
};

function readGeometry(el: HTMLElement | null): ScrollGeometry {
  const page = !el || el === document.documentElement || el === document.body;
  const box = page ? document.documentElement : el;
  const x = page ? window.scrollX : el.scrollLeft;
  const y = page ? window.scrollY : el.scrollTop;
  const width = box.clientWidth, height = box.clientHeight;
  const contentWidth = box.scrollWidth, contentHeight = box.scrollHeight;
  return {
    x, y, width, height, contentWidth, contentHeight,
    progressX: contentWidth > width ? Math.min(1, x / (contentWidth - width)) : 0,
    progressY: contentHeight > height ? Math.min(1, y / (contentHeight - height)) : 0,
  };
}

/**
 * onScrollGeometryChange. Pass a ref to a scroll container, or nothing for
 * the page. Reads are coalesced to one per frame.
 */
export function useScrollGeometry(
  ref?: RefObject<HTMLElement | null>,
  onChange?: (geometry: ScrollGeometry) => void
): ScrollGeometry | null {
  const [geometry, setGeometry] = useState<ScrollGeometry | null>(null);
  useEffect(() => {
    const el = ref?.current ?? null;
    const page = !el || el === document.documentElement || el === document.body;
    const target: Window | HTMLElement = page ? window : el;
    let queued = false;
    const flush = () => {
      queued = false;
      const g = readGeometry(el);
      setGeometry(g);
      onChange?.(g);
    };
    const on = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(flush);
      }
    };
    target.addEventListener("scroll", on, { passive: true });
    const ro = !page && "ResizeObserver" in window ? new ResizeObserver(on) : null;
    if (ro && el) ro.observe(el);
    else window.addEventListener("resize", on);
    flush();
    return () => {
      target.removeEventListener("scroll", on);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", on);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current]);
  return geometry;
}

/** onScrollVisibilityChange: true once this much of the element is on screen. */
export function useVisible(ref: RefObject<Element | null>, { threshold = 0.5 }: { threshold?: number } = {}): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(threshold === 0 ? entry.isIntersecting : entry.intersectionRatio >= threshold);
        }
      },
      { threshold: threshold === 0 ? [0] : [0, threshold] }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, threshold]);
  return visible;
}

export type SnapPosition = {
  /** The id of the child in view, or null when it has none. */
  id: string | null;
  index: number;
  /** Scroll to a child by id or index. */
  to: (target: string | number) => void;
};

/** scrollPosition(id:): which snap child a scrolling container is showing. */
export function useSnapPosition(ref: RefObject<HTMLElement | null>): SnapPosition {
  const [current, setCurrent] = useState<{ id: string | null; index: number }>({ id: null, index: -1 });

  const items = useCallback(() => (ref.current ? Array.from(ref.current.children).filter((c) => !(c as HTMLElement).hidden) : []), [ref]);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const announce = (el: Element | null | undefined) => {
      if (!el) return;
      const list = items();
      const index = list.indexOf(el);
      if (index >= 0) setCurrent({ id: el.id || null, index });
    };
    const nearest = () => {
      const list = items();
      const horizontal = box.scrollWidth > box.clientWidth;
      const origin = box.getBoundingClientRect();
      let best: Element | null = null, distance = Infinity;
      for (const c of list) {
        const r = c.getBoundingClientRect();
        const d = Math.abs(horizontal ? r.left - origin.left : r.top - origin.top);
        if (d < distance) { distance = d; best = c; }
      }
      return best;
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const native = "onscrollsnapchange" in box;
    const onSnap = (e: Event) => {
      const ev = e as Event & { snapTargetInline?: Element; snapTargetBlock?: Element };
      announce(ev.snapTargetInline || ev.snapTargetBlock);
    };
    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => announce(nearest()), 90);
    };
    if (native) box.addEventListener("scrollsnapchange", onSnap);
    else box.addEventListener("onscrollend" in box ? "scrollend" : "scroll", settle, { passive: true });
    announce(nearest());
    return () => {
      box.removeEventListener("scrollsnapchange", onSnap);
      box.removeEventListener("scrollend", settle);
      box.removeEventListener("scroll", settle);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  const to = useCallback(
    (target: string | number) => {
      const list = items();
      const el = typeof target === "number" ? list[target] : list.find((c) => c.id === target);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    },
    [items]
  );

  return { ...current, to };
}

export type HapticKind = "selection" | "impact" | "success" | "warning" | "error";
const HAPTICS: Record<HapticKind, number[]> = {
  selection: [8],
  impact: [16],
  success: [10, 30, 20],
  warning: [25, 40, 25],
  error: [40, 30, 40, 30, 60],
};

/**
 * sensoryFeedback. Android vibrates; iPhone Safari has no vibration API but
 * plays the system haptic when a switch toggles, so one is toggled off
 * screen. Returns false where nothing could be felt.
 */
export function haptic(kind: HapticKind = "selection"): boolean {
  if (typeof navigator === "undefined") return false;
  if (typeof navigator.vibrate === "function") {
    navigator.vibrate(HAPTICS[kind]);
    return true;
  }
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
    let sw = document.getElementById("b-haptic-switch") as HTMLInputElement | null;
    if (!sw) {
      sw = document.createElement("input");
      sw.type = "checkbox";
      sw.id = "b-haptic-switch";
      sw.tabIndex = -1;
      sw.setAttribute("switch", "");
      sw.setAttribute("aria-hidden", "true");
      sw.style.cssText = "position:fixed;inset:auto auto 0 0;width:1px;height:1px;opacity:0;pointer-events:none";
      document.body.appendChild(sw);
    }
    sw.click();
    return true;
  }
  return false;
}

const PERSIST = "barua-persist:";

/**
 * customizationID: state that survives a reload, under a key. Shares its
 * storage with barua.js's data-b-persist, so the two can hand over.
 */
export function usePersistedState<T>(key: string, initial: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(PERSIST + key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(PERSIST + key, JSON.stringify(resolved));
        } catch {}
        return resolved;
      });
    },
    [key]
  );
  return [value, set];
}
