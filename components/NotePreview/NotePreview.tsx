
"use client";

import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

type NotePreviewProps = {
  note: Note;
  onBack?: () => void;
};

export default function NotePreview({ note, onBack }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        {onBack && (
          <button className={css.backBtn} onClick={onBack} type="button">
            ← Back
          </button>
        )}

        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag} title={note.tag}>
            {note.tag}
          </span>
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}