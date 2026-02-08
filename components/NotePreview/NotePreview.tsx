"use client"

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";

interface NotePreviewsProps{
    children: React.ReactNode;
}

function NotePreview({ children }: NotePreviewsProps) {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    }

    return <div className={css.container }>
        {children}
        <button className={css.backBtn } onClick={handleClose}>Close</button>
    </div>
}

export default NotePreview;