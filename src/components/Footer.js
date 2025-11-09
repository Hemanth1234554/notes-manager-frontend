import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Made with ❤️ by <span className="highlight">Hemanth Kumar</span> ©{" "}
        {new Date().getFullYear()}
      </p>
      <div className="social-links">
        <a
          href="https://github.com/Hemanth1234554"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/hemanth-kumar-4307a5291"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
