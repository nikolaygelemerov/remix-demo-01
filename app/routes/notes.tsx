import type {
  ActionFunction,
  ErrorBoundaryComponent,
  LoaderFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

import { NewNote, newNoteLinks, NoteList, noteListLinks } from "~/components";

import type { Note } from "~/types";

import { getStoredNotes, storeNotes } from "~/data/notes";
import type { FC } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

export default function NotesPage() {
  // triggers data fetching behind the scenes
  // executes "fetch" "GET" after submitting the form
  // no matter if form submission reloads the page or
  // remix Form is used with client side submission
  const notes = useLoaderData<Note[]>();

  useEffect(() => {
    console.log("notes MOUNT");
  }, []);

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

// "loader" is executed on the server only
// Used to retrieve data from DB behind the scenes
export const loader: LoaderFunction = async () => {
  const notes = await getStoredNotes();

  console.log("loader notes: ", notes);

  // Throw BE error with status code
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes!" },
      { status: 404, statusText: "No Notes" }
    );
  }

  return notes;
};

// "action" is executed on the server only
// Handles POST request data on the server
// Writes in DB for example
// Returns certain data consumed by "useActionData" remix hook
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData) as unknown as Note;

  console.log("action noteData: ", noteData);

  // Add BE validation
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long!" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];

  await storeNotes(updatedNotes);

  console.log("Action");

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 300);
  });

  return redirect("/notes");
};

export function meta() {
  return {
    title: "All Notes",
    description: "Manage your notes with ease",
  };
}

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
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
};

// FE error handling
// Catches an error thrown from the FE
// This component handles an error occurred in nested components
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <main className="error">
      <h1>Notes error occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/notes">My Notes</Link>
      </p>
    </main>
  );
};

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
