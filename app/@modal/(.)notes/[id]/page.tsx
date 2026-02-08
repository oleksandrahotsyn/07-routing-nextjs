import { getNote } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";

interface NotePreviewsProps{
    params: Promise<{id:string}>
}

async function NotePreviews({ params }: NotePreviewsProps) {
    const { id } = await params;
    const note = await getNote(id);
    const createdDate = note.createdAt
    ? new Date(note.createdAt).toLocaleString()
    : "";
    
    return (
        <NotePreview >
            <h2>{note.title}</h2>
            <p> {note.content} </p>
            <p> {createdDate} </p>
        </NotePreview>
    );
}

export default NotePreviews;