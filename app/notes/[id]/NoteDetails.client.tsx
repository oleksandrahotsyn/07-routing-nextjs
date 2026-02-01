"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

import { getNote } from "@/lib/api";
import { useState } from "react";

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

   const handleEdit = () => {
     setIsEdit(true);
  };
  return (
    <div>
      <button onClick={handleEdit}>Edit</button>
      {isEdit ? (<form>
        <div> <input type="text" placeholder="Title"/> </div>
        <div> <textarea name="" id="" placeholder="Content"></textarea> </div>
        <button>Submit</button>
      </form>) : ( <>
          <h1> {data?.title} </h1>
          <p> {data?.content} </p></>
      )}
    </div>
  );
}

export default NoteDetailsClient;