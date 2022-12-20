import { Link, useLoaderData } from "@remix-run/react";
import type { FC } from "react";
import { memo } from "react";

import styles from "./NoteDetails.css";
import type { Note } from "~/types";

export const NoteDetails: FC = memo(() => {
  const note = useLoaderData<Note>();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note?.title}</h1>
      </header>
      <p id="note-details-content">{note?.content}</p>
    </main>
  );
});

NoteDetails.displayName = "NoteDetails";

export function noteDetailsLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
