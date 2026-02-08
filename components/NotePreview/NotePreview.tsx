"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

interface NotePreviewsProps {
  children: React.ReactNode;
}

function NotePreview({ children }: NotePreviewsProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    // 🔒 блокуємо wheel/trackpad скролл на overlay
    const el = overlayRef.current;
    const prevent = (e: Event) => e.preventDefault();

    if (el) {
      el.addEventListener("wheel", prevent, { passive: false });
      el.addEventListener("touchmove", prevent, { passive: false });
    }

    return () => {
      if (el) {
        el.removeEventListener("wheel", prevent as any);
        el.removeEventListener("touchmove", prevent as any);
      }
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
    };
  }, []);

  const handleClose = () => router.back();

  return (
    <div
      ref={overlayRef}
      className={css.overlay}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          className={css.backBtn}
          onClick={(e) => {
            e.stopPropagation(); 
            handleClose();
          }}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default NotePreview;
