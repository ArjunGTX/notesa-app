import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  ArchivesProvider,
  AuthProvider,
  NotesProvider,
  SideNavProvider,
  TrashProvider,
} from "./contexts";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SideNavProvider>
          <NotesProvider>
            <ArchivesProvider>
              <TrashProvider>
                <App />
              </TrashProvider>
            </ArchivesProvider>
          </NotesProvider>
        </SideNavProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
