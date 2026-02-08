import { getNote } from "@/lib/api";

interface NotePreviewsProps{
    params: Promise<{id:string}>
}

async function NotePreview({ params }: NotePreviewsProps) {
    const { id } = await params;
    const note = await getNote(id);

    return (
        <>
            <h2>{note.title}</h2>
            <p> {note.content} </p>
            <p> {note.createdAt} </p>
        </>
    );
}

export default NotePreview;