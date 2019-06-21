import React, { useState } from "react";
import Upload from "../../upload/Upload";

import "./DatPer.css";

const DatPer = () => {
  const [firstFileUploaded, setfirstFileUploaded] = useState(false);
  const [title, setTitle] = useState("Upload File Number #1 To Validate");

  const onFirstFileReady = () => {
    setfirstFileUploaded(true);
    setTitle("Upload File Number #2 To Validate");
  };

  return (
    <div>
      <div className="AppDatPer">
        <h4 className="display-4 text-center mt-5" style={{ fontSize: 40 }}>
          <i className="fas fa-cloud-upload-alt" /> Data Percistence Upload
        </h4>

        <div className="Card  mt-4 mb-3">
          <Upload title={title} onFirstFileReady={onFirstFileReady} />
        </div>
        {firstFileUploaded && (
          <div className="Card mb-3">
            <Upload />
          </div>
        )}
        {/* <Message/> */}
      </div>
    </div>
  );
};

export default DatPer;
