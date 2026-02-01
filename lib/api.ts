import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export type NotesResponse = {
  notes: Note[];
};

export async function getNotes(): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes");
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}
