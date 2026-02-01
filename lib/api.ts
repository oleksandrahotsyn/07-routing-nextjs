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
  totalPages: number;
};

type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
};

export async function getNotes(): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>(`/notes`);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}

export async function getNote(id:Note["id"]) {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search?.trim() ? { search: search.trim() } : {}),
      ...(tag ? { tag } : {}),
    },
  });

  return data;
}

type CreateNoteParams = {
  title: string;
  content?: string;
  tag: NoteTag;
};

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> {
  const payload = {
    title: title.trim(),
    tag,
    ...(content?.trim() ? { content: content.trim() } : {}),
  };

  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

export async function updateNote(
  id: string,
  payload: { title: string; content: string; tag: string }
) {
  const { data } = await api.patch(`/notes/${id}`, payload);
  return data;
}