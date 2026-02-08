interface NotesLayoutProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

function NotesLayout({ sidebar, children }: NotesLayoutProps) {
    return (
        <section>
            <aside>{ sidebar }</aside>
            <main>{ children }</main>
        </section>
    )
}

export default NotesLayout;