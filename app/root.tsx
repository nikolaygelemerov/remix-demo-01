import type { MetaFunction, ErrorBoundaryComponent } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Link,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import type { FC } from "react";

import { MainNavigation } from "~/components";
import styles from "~/styles/main.css"; // ~ searches for styles in the app folder

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// BE error handling
// Catches an error thrown from the BE (loader)
export const CatchBoundary: FC = () => {
  const caughtResponse = useCatch();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{caughtResponse.statusText}</h1>
          <p>{caughtResponse.data?.message || "Something went wrong!"}</p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

// FE error handling
// This component handles an error occurred in nested components (global as it is root)
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
