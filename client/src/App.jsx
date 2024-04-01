import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import AdminLayout from "./layouts/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import AdminProjects from "./pages/AdminProjects";
import AdminUpdate from "./pages/AdminUpdate";
import AddProjects from "./pages/AddProjects";
import AdminHome from "./pages/AdminHome";
import AdminProjectUpdate from "./pages/AdminProjectUpdate";
import Error from "./pages/Error";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/add" element={<AddProjects />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          <Route path="projects/:id/edit" element={<AdminProjectUpdate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
