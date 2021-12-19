import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footerclas">
        Copyright ⓒ {year} ahmed ALKATTAN All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
