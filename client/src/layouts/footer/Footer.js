import React from "react";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook,faInstagram,faTiktok,faTelegram } from '@fortawesome/free-brands-svg-icons';
export const Footer = () => {
  return (
    <footer className="footer-wrapper bg-gray-800 text-white p-7">
      <div className="footer-content flex justify-between items-center">
        <div className="footer-left flex space-x-5">
          <div className="footer-logo">
            <img className="mx-auto h-12 w-auto" src={logo} alt="" />
          </div>
          <div className="footer-social">
            <ul className="list-none">
              <li className="mb-2">
                <p className="font-bold uppercase items-center flex">
                  <span className="text-yellow-500 text-lg">vi</span>
                  <span className="text-gray-400 text-lg">ci</span>
                  <span className="text-green-500 text-lg">mo</span>
                </p>
              </li>
              <li className="mb-2 ml-4 flex items-center space-x-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>nambndpx7@gmail.com</p>
              </li>
              <li className="mb-2 ml-4 flex items-center space-x-2">
                <FontAwesomeIcon icon={faPhone} />
                <p>034 515 5086</p>
              </li>
              <li className="mb-2 ml-4 flex items-center space-x-2">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>Đại Phúc, TP.Bắc Ninh, Tỉnh Bắc Ninh</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
           <ul className="list-none flex space-x-20">
                <li className="mb-2">
                    <a href="#" className="hover:text-green-500 transition text-3xl"><FontAwesomeIcon icon={faFacebook} /></a>
                </li>
                <li className="mb-2">
                    <a href="#" className="hover:text-green-500 transition text-3xl"><FontAwesomeIcon icon={faInstagram} /></a>
                </li>
                <li className="mb-2">
                    <a href="#" className="hover:text-green-500 transition text-3xl"><FontAwesomeIcon icon={faTiktok} /></a>
                </li>
                <li className="mb-2">
                    <a href="#" className="hover:text-green-500 transition text-3xl"><FontAwesomeIcon icon={faTelegram} /></a>
                </li>
           </ul>
        </div>
      </div>
    </footer>
  );
};
