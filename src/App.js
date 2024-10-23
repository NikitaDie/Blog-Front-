import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/">
                      <Route index element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/home" element={<Home />} />
                      <Route
                          path="/new"
                          element={
                              <RequireAuth>
                                <CreatePost />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="/edit/:id"
                          element={
                              <RequireAuth>
                                  <CreatePost />
                              </RequireAuth>
                          }
                      />
                      <Route
                          path="/post/:id"
                          element={
                              <RequireAuth>
                                  <Post />
                              </RequireAuth>
                          }
                      />
                      {/*<Route path="*" element={<NoPage />} />*/}
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
