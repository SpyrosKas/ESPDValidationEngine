import React, { Fragment, useState } from "react";
import Dropzone from "./dropzone/Dropzone";
import Progress from "./Progress";
import Message from "./Message";
import axios from "axios";

import "./upload/Upload.css";

const UploadArrayTest = ({ title, onResponse, doubleUpload }) => {
  const [filesToUpload, setFilesToUpload] = useState([]);
  //   const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFiles, setUploadedFiles] = useState();
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);

  // Upload Button
  const disabled =
    filesToUpload.length < 1 || successfullUploaded ? true : false;

  const onFilesAdded = e => {
    // setFile(files[0]);
    // setFilename(files[0].name);
    // setFile(e.target.files[0]);
    // setFilename(e.target.files[0].name);
    const files = e.target.files;
    console.log(e.target);
    console.log(e.target.files);

    if (doubleUpload) {
      for (var i = 0; i < files.length; i++) {
        // const friba = files.item(i);
        // console.log(friba);
        // setFilesToUpload([...filesToUpload, friba]);
        setFilesToUpload(e.target.files[0]);
      }
    } else {
      const friba = files.item(0);
      const array = [friba];
      setFilesToUpload(array);
    }

    console.log(filesToUpload);

    // setFilesToUpload([...filesToUpload, { files }]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < filesToUpload.length; i++) {
      console.log(filesToUpload[i].name);
      formData.append(`files[]`, filesToUpload[i], filesToUpload[i].name);
    }
    // formData.append("file", file, filename);

    setUploading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/validateXML",
        formData,
        {
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            // setTimeout(() => setUploadPercentage(0), 10000);
          }
        }
      );
      console.log(res);

      // const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      setUploadedFiles(filesToUpload);

      setSuccessfullUploaded(true);

      setMessage("File Uploaded");

      onResponse(res);
    } catch (err) {
      // if (err.response.status === 500) {
      //   setMessage("There was a problem with the server");
      // } else {
      //   setMessage(err.response.data.msg);
      // }
    }
    setUploading(false);
  };

  const onDelete = e => {
    e.preventDefault();
    console.log(e.target.name);
    setFilesToUpload([
      ...filesToUpload.filter(file => file.name !== e.target.name)
    ]);

    // setFile("");
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
              {filesToUpload.map(f => {
                return (
                  <div key={f.name} className="Row">
                    <span className="Filename">
                      {f.name}
                      {!successfullUploaded && (
                        <img
                          name={f.name}
                          className="DeleteIcon"
                          alt="delete"
                          src="baseline-delete-24px.svg"
                          style={{
                            opacity: f ? 0.5 : 0
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
                );
              })}
              {filesToUpload.length > 0 && (
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
              )}
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

export default UploadArrayTest;
