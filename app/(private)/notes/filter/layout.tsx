interface NotesLayoutProps {
    children: React.ReactNode;
}

function NotesLayout({ children }: NotesLayoutProps) {
    return (
        <section>
            <main>{ children }</main>
        </section>
    )
}

export default NotesLayout;