import React from "react";
import FileUpload from "./FileUpload";

import "./DatAcc.css";

const DatAcc = () => (
  <div className="AppDatAcc">
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <i className="fas fa-cloud-upload-alt" /> Data Acceptance Upload
      </h4>

      <FileUpload />
    </div>
  </div>
);

export default DatAcc;
