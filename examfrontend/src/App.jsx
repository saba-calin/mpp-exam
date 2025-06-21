import {BrowserRouter, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.jsx";
import ViewCandidate from "./pages/ViewCandidate.jsx";


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/candidate/:id" element={<ViewCandidate />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
