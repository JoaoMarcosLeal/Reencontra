import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateItem from "./pages/CreateItem";
import Profile from "./pages/Profile";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/cadastro" element={<Register/>}/>
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
        <Route path="/item/:id" element={<ProtectedRoute> <ItemDetails/> </ProtectedRoute>}/>
        <Route path="/novo-item" element={<ProtectedRoute> <CreateItem/> </ProtectedRoute>}/>
        <Route path="/perfil" element={<ProtectedRoute> <Profile/> </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
