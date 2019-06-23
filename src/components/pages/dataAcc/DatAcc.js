import React, { useState } from "react";
import Upload from "../../upload/Upload";

import "./DatAcc.css";

const DatAcc = () => {
  const [firstFileUploaded, setfirstFileUploaded] = useState(false);
  const [title, setTitle] = useState("Upload Xml File To Validate");
  const [componentResults, setcomponentResults] = useState();
  const [doubleUpload, setDoubleUpload] = useState(false);
  const [compEndpoint, setCompEndpoint] = useState("validateDA");

  const [resFilename, setresFilename] = useState("");
  const [resArtefactType, setresArtefactType] = useState("");
  const [resArtefactVersion, setresArtefactVersion] = useState("");
  const [resErrors, setresErrors] = useState();
  const [
    resQualificationApplicationType,
    setresQualificationApplicationType
  ] = useState("");
  const [resValidationStatus, setresValidationStatus] = useState("");
  const [resValidatorResults, setresValidatorResults] = useState([]);
  const [resWarnings, setresWarnings] = useState();

  // const onFirstFileReady = () => {
  //   setfirstFileUploaded(true);
  //   setTitle("Upload File Number #2 To Validate");
  // };

  // I HAD TO CONVERT Data into an Array in order to map through

  const onResponse = res => {
    setcomponentResults([res.data]);
    console.log(res.data.filename);
    console.log(res);
    console.log(res.data.validatorResults);

    setresFilename(res.data.filename);
    setresArtefactType(res.data.artefactType);
    setresArtefactVersion(res.data.artefactVersion);
    setresErrors(res.data.errors);
    setresQualificationApplicationType(res.data.qualificationApplicationType);
    setresValidationStatus(res.data.validationStatus);
    setresValidatorResults(res.data.validatorResults);
    setresWarnings(res.data.warnings);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="detailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="detailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="detailsModalLabel">
                Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                <li className="list-group-item list-group-item-primary">
                  Filename:
                </li>
                <li className="list-group-item list-group-item-light">
                  {resFilename}
                </li>
                <li className="list-group-item list-group-item-secondary">
                  Version:
                </li>
                <li className="list-group-item list-group-item-light">
                  {resArtefactVersion}
                </li>
                <li className="list-group-item list-group-item-info">Type:</li>
                <li className="list-group-item list-group-item-light">
                  {resQualificationApplicationType}
                </li>
                <li className="list-group-item list-group-item-danger">
                  Errors:
                </li>
                <li className="list-group-item list-group-item-light">
                  {resErrors}
                </li>
                <li className="list-group-item list-group-item-warning">
                  Warnings:
                </li>
                <li className="list-group-item list-group-item-light">
                  {resWarnings}
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className={`btn ${
                  resValidationStatus === "SUCCESS"
                    ? "btn-success"
                    : resValidationStatus === "FAIL"
                    ? "btn-danger"
                    : "btn-primary"
                }`}
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#resultsModal"
              >
                Results
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="resultsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="resultsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resultsModalLabel">
                Results
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div
                className={`alert ${
                  resValidationStatus === "SUCCESS"
                    ? "alert-success"
                    : resValidationStatus === "FAIL"
                    ? "alert-danger"
                    : "alert-warning"
                }`}
                role="alert"
              >
                {resValidationStatus}
              </div>
              {resValidatorResults && (
                <ul className="list-group main-ul">
                  {resValidatorResults.map(result => (
                    <li key={result.id}>
                      <div
                        className={`alert ${
                          result.flag === "warning"
                            ? "alert-warning"
                            : "alert-danger"
                        }`}
                        role="alert"
                      >
                        <ul className="list-group">
                          <li className="list-group-item list-group-item-primary">
                            Location:
                          </li>
                          <li className="list-group-item list-group-item-light">
                            {result.location}
                          </li>
                          {result.flag && (
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-secondary">
                                Severity:
                              </li>
                              <li className="list-group-item list-group-item-light">
                                {result.flag}
                              </li>
                            </ul>
                          )}
                          <li className="list-group-item list-group-item-warning">
                            Validator:
                          </li>
                          <li className="list-group-item list-group-item-light">
                            {result.validator}
                          </li>
                          {result.test && (
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-info">
                                Test:
                              </li>
                              <li className="list-group-item list-group-item-light">
                                {result.test}
                              </li>
                            </ul>
                          )}
                          {result.expectedValue && (
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-danger">
                                Expected:
                              </li>
                              <li className="list-group-item list-group-item-light">
                                {result.expectedValue}
                              </li>
                            </ul>
                          )}
                          {result.providedValue && (
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-success">
                                Got:
                              </li>
                              <li className="list-group-item list-group-item-light">
                                {result.providedValue}
                              </li>
                            </ul>
                          )}
                          <li className="list-group-item list-group-item-dark">
                            {result.text}
                          </li>
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#detailsModal"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="AppDatAcc">
        <h4
          className="display-4 text-center mt-5"
          style={{ fontSize: 40, color: "#ececec" }}
        >
          <i className="fas fa-cloud-upload-alt" /> Data Acceptance
        </h4>

        <div className="Card  mt-4 mb-3">
          {/* <Upload title={title} onResponse={onResponse} /> */}
          <Upload
            title={title}
            onResponse={onResponse}
            doubleUpload={doubleUpload}
            compEndpoint={compEndpoint}
          />
        </div>
        {componentResults && (
          <div className="Card  mt-4 mb-3">
            {/* <ArtValForm componentResults={componentResults} /> */}
            <button
              type="button"
              className="btn btn-info"
              data-toggle="modal"
              data-target="#detailsModal"
            >
              Details
            </button>
            <button
              type="button"
              className={`btn ${
                resValidationStatus === "SUCCESS"
                  ? "btn-success"
                  : resValidationStatus === "FAIL"
                  ? "btn-danger"
                  : "btn-primary"
              }`}
              data-toggle="modal"
              data-target="#resultsModal"
            >
              Results
            </button>
          </div>
        )}

        {/* {firstFileUploaded && (
          <div className="Card mb-3">
            <Upload />
          </div>
        )} */}
        {/* <Message/> */}
      </div>
    </div>
  );
};

export default DatAcc;
