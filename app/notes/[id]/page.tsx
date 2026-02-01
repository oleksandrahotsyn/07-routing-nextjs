interface NoteProps{
    params: Promise<{id: string}>
}

async function Note({ params }: NoteProps) {
    const { id } = await params;
    return (
        <div>
            <h1>Note</h1>
        </div>
    )
}

export default Note;