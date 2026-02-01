import { QueryClient } from "@tanstack/react-query";
import { getNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

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
            <NoteDetailsClient />
        </div>
    )
}

export default Note;