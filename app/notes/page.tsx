import NoteList from "@/components/NoteList/NoteList";
import { getNotes } from "@/lib/api";


async function Notes() {
  const data = await getNotes();

  return (
        <NoteList notes={data.notes} />
  );
}

export default Notes;
