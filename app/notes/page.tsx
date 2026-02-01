import NoteList from "@/components/NoteList/NoteList";
import { getNotes } from "@/lib/api";
import { HydrationBoundary } from "@tanstack/react-query";

async function Notes() {
  const data = await getNotes();

  return (
    <div>
            <HydrationBoundary state={dehydrate(queryClient)}><NoteList notes={data.notes} /></HydrationBoundary>
      
    </div>
  );
}

export default Notes;
