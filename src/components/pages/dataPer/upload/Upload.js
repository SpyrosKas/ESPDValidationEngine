import React, { Fragment, useState } from "react";
import Dropzone from "../dropzone/Dropzone";
import Progress from "../Progress";
import Message from "../../../Message";
import axios from "axios";

import "./Upload.css";

const Upload = ({ title, onFirstFileReady }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);

  const disabled = file ? false : true;

  const onFilesAdded = e => {
    // setFile(files[0]);
    // setFilename(files[0].name);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          // setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setSuccessfullUploaded(true);
      onFirstFileReady();

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  const onDelete = e => {
    e.preventDefault();

    setFile("");
    setFilename("Choose File");
  };

  return (
    <Fragment>
      <div className="Upload">
        {message ? <Message msg={message} /> : null}
        <span className="Title">{title}</span>
        <form className="Form" onSubmit={onSubmit}>
          <div className="Content">
            <div>
              <Dropzone
                onFilesAdded={onFilesAdded}
                disabled={uploading || successfullUploaded}
              />
            </div>
            <div className="Files">
              <div key={file.name} className="Row">
                <span className="Filename">
                  {filename}
                  {!successfullUploaded && (
                    <img
                      className="DeleteIcon"
                      alt="delete"
                      src="baseline-delete-24px.svg"
                      style={{
                        opacity: file ? 0.5 : 0
                      }}
                      onClick={onDelete}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete Item"
                    />
                  )}
                </span>

                {/* {renderProgress(file)} */}
              </div>
              <div className="ProgressWrapper">
                <Progress percentage={uploadPercentage} />
                <img
                  className="CheckIcon"
                  alt="done"
                  src="baseline-check_circle-24px.svg"
                  style={{
                    opacity: successfullUploaded ? 0.5 : 0
                  }}
                />
              </div>
              <div className="Actions">
                <input
                  disabled={disabled}
                  type="submit"
                  // value={successfullUploaded ? "Clear" : "Upload"}
                  value="Upload"
                  className={"btn btn-primary btn-block mt-4"}
                  aria-disabled="true"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Upload;
