"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

import { getNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();

  const {data} = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={css.wrapper}>
      <button type="button" onClick={() => setIsEdit(true)} disabled={!data}>
        Edit
      </button>

{!isEdit && (
        <>
          <h1>{data?.title}</h1>
          <p>{data?.content}</p>
        </>
      )}

      {isEdit && data && (
        <Modal onClose={() => setIsEdit(false)}>
          <NoteForm
            mode="edit"
            noteId={id}
            initialValues={{
              title: data.title ?? "",
              content: data.content ?? "",
              tag: (data as any).tag ?? "Todo",
            }}
            onCancel={() => setIsEdit(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default NoteDetailsClient;