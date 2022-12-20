import { memo } from "react";
import { NavLink } from "@remix-run/react";

import styles from "./MainNavigation.css";

export const MainNavigation = memo(() => {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/notes">My Notes</NavLink>
        </li>
      </ul>
    </nav>
  );
});

MainNavigation.displayName = "MainNavigation";

export function mainNavigationLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
