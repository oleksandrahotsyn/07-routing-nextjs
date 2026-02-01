import NoteList from "@/components/NoteList/NoteList";
import { getNotes } from "@/lib/api";


async function Notes() {
  const data = await getNotes();

  return (<main>
    <NoteList notes={data.notes} />
  </main>
        
  );
}

export default Notes;
