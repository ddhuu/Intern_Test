import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import "./navbar.css";
import { useAppStore } from "../../store/useAppStore";
import Subscribe from "../Subcribe/Subscribe";

export const NavBar = () => {
  const { setModal } = useAppStore();
  const handleModalOpen = () => {
    setModal(true, <Subscribe />);
  };
  return (
    <>
      <div className="navBar">
        <div className="title">
          <h1>Weather Dashboard</h1>
        </div>
        <div className="nav-item">
          <div className="icon" onClick={handleModalOpen}>
            <CiMail size={40} />
          </div>
        </div>
      </div>
    </>
  );
};
