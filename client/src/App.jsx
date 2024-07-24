import "./App.css";
import { Home } from "./pages/Home/Home";
import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppStore } from "./store/useAppStore";
import Modal from "./components/Modal/Modal";

function App() {
  const { isShowModal, contenModal } = useAppStore();
  return (
    <>
      {isShowModal && <Modal />}
      <Router>
        <NavBar />
        <Home />
      </Router>
    </>
  );
}

export default App;
