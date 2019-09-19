import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dropzone.css';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragOver(evt) {
    evt.preventDefault();

    if (this.props.disabled) return;

    this.setState({ hightlight: true });
  }

  onDragLeave() {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();

    if (this.props.disabled) return;

    // const files = event.dataTransfer.files;
    console.log('event is: ' + event);
    console.log('event.dataTransfer.files is: ' + event.dataTransfer.files);
    if (this.props.onFilesAdded) {
      // const array = this.fileListToArray(files);
      this.props.onFilesAdded(event.dataTransfer.files);
    }
    this.setState({ hightlight: false });
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    console.log('evt is: ' + evt);
    console.log('evt.target.files is: ' + evt.target.files);
    // const files = evt.target.files;
    if (this.props.onFilesAdded) {
      // const array = this.fileListToArray(files);
      this.props.onFilesAdded(evt.target.files);
    }
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <img
          alt='upload'
          className='Icon'
          src='baseline-cloud_upload-24px.svg'
        />
        <input
          ref={this.fileInputRef}
          className='FileInput'
          type='file'
          // multiple
          onChange={this.onFilesAdded}
          accept='.xml'
        />
        <span>Upload Files</span>
      </div>
    );
  }
}

Dropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Dropzone;
