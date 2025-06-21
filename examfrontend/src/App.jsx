import {BrowserRouter, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.jsx";
import ViewCandidate from "./pages/ViewCandidate.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import News from "./pages/News.jsx";
import Election from "./pages/Election.jsx";


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/candidate/:id" element={<ViewCandidate />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/election" element={<Election />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
