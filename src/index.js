import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  ArchivesProvider,
  AuthProvider,
  LabelsProvider,
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
                <LabelsProvider>
                  <App />
                </LabelsProvider>
              </TrashProvider>
            </ArchivesProvider>
          </NotesProvider>
        </SideNavProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
