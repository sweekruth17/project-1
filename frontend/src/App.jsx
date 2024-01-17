import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Ticket from "./Components/Ticket";

import StartPage from "./Components/StartPage";
import Layout from "./Components/Layout";

import Agent from "./Components/Agent";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<StartPage />} />
        <Route path="agent" element={<Agent />} />
        <Route path="Ticket" element={<Ticket />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
