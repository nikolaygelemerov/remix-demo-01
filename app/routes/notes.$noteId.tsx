import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getStoredNotes } from "~/data/notes";
import { NoteDetails, noteDetailsLinks } from "~/components";
import { useCatch } from "@remix-run/react";
import type { FC } from "react";
import { useMemo } from "react";

export default function NotePreview() {
  return <NoteDetails />;
}

NotePreview.displayName = "NotePreview";

// "loader" is executed on the server only
export const loader: LoaderFunction = async ({ params }) => {
  const notes = await getStoredNotes();

  const selectedNote = notes.find((note) => note.id === params.noteId);

  if (!selectedNote) {
    throw json(
      { message: `Could not find note for id ${params.noteId}` },
      { status: 404 }
    );
  }

  return selectedNote;
};

export const meta: MetaFunction = ({ data, params }) => {
  return {
    title: data.title,
    description: `Manage your note ${params.noteId}`,
  };
};

// BE error handling
// Catches an error thrown from the BE (loader)
export const CatchBoundary: FC = () => {
  const caughtResponse = useCatch();

  const message = useMemo(
    () => caughtResponse.data?.message || "Data not found!",
    [caughtResponse.data?.message]
  );

  return (
    <main>
      <p className="info-message">{message}</p>
    </main>
  );
};

export function links() {
  return [...noteDetailsLinks()];
}
