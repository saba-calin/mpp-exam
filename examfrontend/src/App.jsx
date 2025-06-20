import {BrowserRouter, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.jsx";


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route>
                    <Route path="/" element={<Home />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
