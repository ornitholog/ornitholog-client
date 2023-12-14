import logo from "../src/assets/ornitholog-logo-white.svg";
import "../src/styles/Footer.scss";

function Footer() {
  return (
    <footer>
      <img src={logo} alt="logo" />
      <div>
        <em>Copyright &#169; 2023 OrnithoLog</em>
      </div>
      <div>Marco Salvoni and Maya Kilbertus</div>
    </footer>
  );
}

export default Footer;
