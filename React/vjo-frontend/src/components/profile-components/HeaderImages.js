import React from "react";

function HeaderImages() {
    return (
        <div className="header-images">
            <ul className="image-list">
                <li className="image-list-item">
                    <div className="image-wrapper">
                        <img src="/uploads/images/..." alt="UploadedImage" />
                    </div>
                </li>
                <li className="image-list-item">
                    <div className="image-wrapper">
                        <img src="/uploads/images/..." alt="UploadedImage" />
                    </div>
                </li>
                <li className="image-list-item">
                    <div className="image-wrapper">
                        <img src="/uploads/images/..." alt="UploadedImage" />
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default HeaderImages;