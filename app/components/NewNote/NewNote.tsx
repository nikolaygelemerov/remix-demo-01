import { memo, useEffect, useMemo } from "react";
import {
  Form,
  useTransition as useNavigation,
  useActionData,
} from "@remix-run/react";

import styles from "./NewNote.css";

export const NewNote = memo(() => {
  const navigation = useNavigation();

  const data = useActionData();

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  useEffect(() => {
    if (data?.message) {
      throw new Error("Invalid title!");
    }
  }, [data?.message]);

  return (
    <Form method="post" id="note-form">
      {data?.message ? <p>{data.message}</p> : null}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
});

NewNote.displayName = "NewNote";

export function newNoteLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
