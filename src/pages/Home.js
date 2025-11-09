import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    if (token) navigate("/notes");
    else navigate("/register");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>
          Organize your <span className="highlight">thoughts</span> <br /> the
          modern way.
        </h1>
        <p>
          Create, edit, and manage your notes seamlessly with a minimal and elegant interface —
          powered by your own cloud.
        </p>
        <button onClick={handleGetStarted}>Get Started 🚀</button>
      </div>

      {/* Decorative background elements */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>
    </div>
  );
}

export default Home;
