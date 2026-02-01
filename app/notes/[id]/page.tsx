import { QueryClient } from "@tanstack/react-query";
import { getNote } from "@/lib/api";


interface NoteProps{
    params: Promise<{id: string}>
}

async function Note({ params }: NoteProps) {
    const { id } = await params;

    const queryClient = new QueryClient();

    queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getNote(id)
    })

    return (
        <div>
            <h1>note</h1>
        </div>
    )
}

export default Note;