import { getTags } from "@/lib/api";
import Link from "next/link";

async function NotesSidebar() {
    const tags = await getTags();
    return (<ul>
        <Link href="/notes/filter/all">All notes</Link>
        {tags.map((tag) => (
            <li key={tag}>
                <Link href={`/notes/filter/${encodeURIComponent(tag.toLowerCase())}`}>{tag}</Link>
            </li>
        )) }
    </ul>)
}

export default NotesSidebar;