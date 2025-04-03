import React from "react"
import logo from "../../img/avivavoz_logo_white.png";
import './Footer.scss';

const Footer = () => (
    <footer className="footer page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
            <img
              alt=""
              src={logo}
              className="d-inline-block align-top"
            />
            <p className="mt-2 mb-0 color-white" style={{ fontSize: '1.2rem' }}>
        <strong>A Viva Voz Coaching LLC</strong> &nbsp;|&nbsp; Puerto Rico &nbsp;|&nbsp; Educando con propósito, desde el corazón de tu voz.
      </p>
        </div>

    </footer>
);

export default Footer