"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Note, NoteTag  } from "@/types/note";
import { getNote } from "@/lib/api";

import NotePreview from "@/components/NotePreview/NotePreview";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "@/components/NotePreview/NotePreview.module.css";

export default function NotePreviewClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();

  const { data } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => getNote(id!), 
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  const [isEdit, setIsEdit] = useState(false);

  const createdDate = data?.createdAt ? new Date(data.createdAt).toLocaleString() : "";

  return (
    <NotePreview>
      <div className={css.item}>
        <div className={css.actions}>
          <button type="button" onClick={() => router.back()}>
            Back
          </button>

          <button className={css.button} type="button" onClick={() => setIsEdit(true)} disabled={!data}>
            Edit
          </button>
        </div>

        {!isEdit && (
          <>
            <h2 className={css.header}>{data?.title}</h2>
            <p className={css.content}>{data?.content}</p>
            <p className={css.tag}>{data?.tag}</p>
            <p className={css.date}>{createdDate}</p>
          </>
        )}

        {isEdit && data && (
          <Modal onClose={() => setIsEdit(false)}>
            <NoteForm
              mode="edit"
              noteId={id!}
              initialValues={{
                title: data.title ?? "",
                content: data.content ?? "",
                tag: (data.tag as NoteTag) ?? "Todo",
              }}
              onCancel={() => setIsEdit(false)}
            />
          </Modal>
        )}
      </div>
    </NotePreview>
  );
}
