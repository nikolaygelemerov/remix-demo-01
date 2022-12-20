import { Link } from "@remix-run/react";
import type { FC } from "react";
import { memo } from "react";

import type { Note } from "~/types";

import styles from "./NoteList.css";

interface NoteListProps {
  notes: Note[];
}

export const NoteList: FC<NoteListProps> = memo(({ notes }) => {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <Link to={note.id}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p>{note.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
});

NoteList.displayName = "NoteList";

export function noteListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
