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

    console.log(data);
    return (
        <>
            <h1>
                Notes By Tag
            </h1>
            <NoteList notes={data.notes} />
        </>
    )
}

export default NotesByTag;