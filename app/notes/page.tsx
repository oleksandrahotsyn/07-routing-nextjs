import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

const PER_PAGE = 12;

type NotesPageProps = {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const sp = (await searchParams) ?? {};

  const parsedPage = Number.parseInt(sp.page ?? "1", 10);
  const initialPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const initialSearch = (sp.search ?? "").trim();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialPage, PER_PAGE, initialSearch],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage: PER_PAGE,
        search: initialSearch,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={initialPage}
        initialSearch={initialSearch}
        perPage={PER_PAGE}
      />
    </HydrationBoundary>
  );
}
