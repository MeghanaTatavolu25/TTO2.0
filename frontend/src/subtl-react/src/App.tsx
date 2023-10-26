import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  Link,
  Routes,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";

export default function App() {
  return (
    // <GoogleOAuthProvider clientId="232558714163-i5uichass680c175mdvciqkmnof6lpt2.apps.googleusercontent.com">
    <GoogleOAuthProvider clientId="393534921626-5ikq0p4a1qotpmeuco6krdn36ahodhi3.apps.googleusercontent.com">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </HashRouter>
    </GoogleOAuthProvider>
  );
}
