import './App.css';
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from "./components/RequireAuth";
import SignupForm from "./pages/SignupForm";
import UserActivation from "./pages/UserActivation";
import NoPage from "./pages/NoPage";
import {Bounce, ToastContainer} from "react-toastify";
import React from "react";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/">
                      <Route index element={<Home />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/signup" element={<SignupForm />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/post/:id" element={<Post />}/>
                      <Route path="/activation" element={<UserActivation />}/>
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
                      <Route path="*" element={<NoPage />} />
                  </Route>
              </Routes>
              <ToastContainer
                  position="bottom-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  closeOnClick
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Bounce}
              />
          </BrowserRouter>
      </div>
  );
}

export default App;
