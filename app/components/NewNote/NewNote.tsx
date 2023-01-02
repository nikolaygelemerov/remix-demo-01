import { memo, useCallback, useEffect, useMemo } from "react";
import {
  Form,
  useTransition as useNavigation,
  useActionData,
  useFetcher,
} from "@remix-run/react";

import styles from "./NewNote.css";

export const NewNote = memo(() => {
  const navigation = useNavigation();

  const actionData = useActionData();

  console.log("UI NewNote actionData: ", actionData);

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  const fetcher = useFetcher();

  console.log("fetcher.state: ", fetcher.state);

  const onAction = useCallback(async () => {
    try {
      // const formData = new FormData();
      // formData.append("id", new Date().toISOString());
      // formData.append("title", "John Doe");
      // formData.append("content", "Something about John Doe");

      // const data = await fetch("notes", {
      //   method: "POST",
      //   body: formData,
      // });

      fetcher.submit(
        {
          id: new Date().toISOString(),
          title: "John Doe",
          content: "Something about John Doe",
        },
        { method: "post" }
      );
    } catch (error) {}
  }, [fetcher]);

  useEffect(() => {
    if (actionData?.message) {
      throw new Error("Invalid title!");
    }
  }, [actionData?.message]);

  return (
    <>
      <div className="form-actions">
        <button onClick={onAction} type="button">
          Action
        </button>
      </div>
      <Form method="post" id="note-form">
        {actionData?.message ? <p>{actionData.message}</p> : null}
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
    </>
  );
});

NewNote.displayName = "NewNote";

export function newNoteLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
