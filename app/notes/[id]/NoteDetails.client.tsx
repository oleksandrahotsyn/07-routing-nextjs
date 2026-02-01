"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  const createdDate = new Date(note.createdAt).toLocaleString();
  const handleGoBack = () => {
    const isSure = confirm("Are you sure?");
    if (isSure) {
      router.back();
    }
  };
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{createdDate ? String(createdDate) : ""}</p>
      </div>
      <button onClick={handleGoBack}>Back</button>
    </div>
  );
}

export default NoteDetailsClient;