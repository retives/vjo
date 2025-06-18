import React from "react";
import "./styles/Footer.css";

function Footer() {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <p className="mb-1 small">© 2025 Vjo! All rights reserved.</p>
                <ul className="list-inline mb-0">
                    <li className="list-inline-item mx-2">
                        <a href="https://instagram.com/srgtkrvvv" target = '_blank' className="text-white text-decoration-none" rel = "noopener noreferrer">Instagram</a>
                    </li>
                    <li className="list-inline-item mx-2">
                        <a href="https://t.me/srgtkrvvv" target = '_blank' className="text-white text-decoration-none" rel = "noopener noreferrer">Telegram</a>
                    </li>
                    <li className="list-inline-item mx-2">
                        <a href="https://www.linkedin.com/in/serhii-tokariev-a37187325/" target = '_blank' className="text-white text-decoration-none" rel = "noopener noreferrer">Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
