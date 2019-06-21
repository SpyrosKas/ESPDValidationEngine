import React, { Component } from "react";
import Dropzone from "../../dropzoneTest/Dropzone";
import Progress from "../../progressTest/Progress";
import Message from "../../Message";
import axios from "axios";

import "./Upload.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      fileName: "",
      filePath: "",
      message: ""
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    // this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const formData = new FormData();
    formData.append("file", this.state.files[0]);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/validateXML",
        formData,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data"
          // }
          // onUploadProgress: progressEvent => {
          //   setUploadPercentage(
          //     parseInt(
          //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
          //     )
          //   );
          //   // Clear percentage
          //   setTimeout(() => setUploadPercentage(0), 10000);
          // }
        }
      );

      const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });
      this.setState({
        fileName: fileName,
        filePath: filePath,
        message: "File Uploaded",
        successfullUploaded: true,
        uploading: false
      });

      console.log(res);

      // setMessage("File Uploaded");
    } catch (err) {
      console.log(err);

      if (err.response.status === 500) {
        // setMessage("There was a problem with the server");
        this.setState({ message: "There was a problem with the server" });
      } else {
        // setMessage(err.response.data.msg);
        this.setState({ message: err.response.data.msg });
      }
    }
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length <= 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        {this.state.message ? <Message msg={this.state.message} /> : null}
        <span className="Title">Upload Files To Validate</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;
