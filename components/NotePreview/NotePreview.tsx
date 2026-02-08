"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

interface NotePreviewsProps{
    children: React.ReactNode;
}

function NotePreview({ children }: NotePreviewsProps) {
    const router = useRouter();

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

  return () => {
    html.style.overflow = prevHtmlOverflow;
    body.style.overflow = prevBodyOverflow;
    body.style.paddingRight = prevBodyPaddingRight;
  };
}, []);


    const handleClose = () => {
        router.back();
    }

    return (
            <div className={css.overlay} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={css.backBtn} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
    )
}

export default NotePreview;