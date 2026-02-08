import { getNote } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import css from "@/components/NotePreview/NotePreview.module.css"

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
      <div className={css.item}>
        <h2 className={css.header}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{createdDate}</p>
      </div>
        </NotePreview>
    );
}

export default NotePreviews;