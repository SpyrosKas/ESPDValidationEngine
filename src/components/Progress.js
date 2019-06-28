import React from "react";
import PropTypes from "prop-types";

const Progress = ({ percentage, hasError }) => {
  return (
    <div className="progress" style={{ width: "100%" }}>
      <div
        className={`progress-bar progress-bar-striped ${
          hasError ? "bg-danger" : "bg-success"
        }`}
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default Progress;
