"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { Note } from "@/types/note";
import { getNote } from "@/lib/api";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

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

  return (
    <Modal onClose={() => router.back()}>
      {data ? (
        <NotePreview note={data} onBack={() => router.back()} />
      ) : null}
    </Modal>
  );
}
