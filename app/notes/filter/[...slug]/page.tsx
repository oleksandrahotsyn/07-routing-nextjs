import { getNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

interface NotesByTagProps{
    params: Promise<{ slug: string[] }>
}


async function NotesByTag( {params}: NotesByTagProps)
{
    const { slug } = await params;
    const tag = slug[0] === "all" ? undefined : slug[0];
    const data = await getNotes(tag);

    if (data.notes.length === 0) {
        return (
            <div>
                <p>No notes found</p>
            </div>
        )
    }
    return <NoteList notes={data.notes} />
}

export default NotesByTag;