import React from "react";
import PropTypes from "prop-types";

const Message = ({ msg, hasError }) => {
  return (
    <div
      className={`alert alert-dismissible fade show ${
        hasError ? "alert-danger" : "alert-info"
      }`}
      role="alert"
    >
      {msg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
