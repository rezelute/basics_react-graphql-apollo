import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Moment from "react-moment";
import Link from "next/link";

export default function LaunchItem({
  launch: { flightNumber, missionName, launchDateLocal, launchSuccess },
}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Mission:{" "}
            <span
              className={classNames({
                "text-success": launchSuccess,
                "text-danger": launchSuccess === false,
                "text-warning": launchSuccess === null,
              })}
            >
              {missionName}
            </span>
          </h4>
          <p>Flight num: {flightNumber}</p>
          <p>
            Date: <Moment format="DD-MM-YYYY HH:mm">{launchDateLocal}</Moment>
          </p>
        </div>
        <div className="col-md-3">
          <Link href={`/launch/${flightNumber}`}>
            <a className="btn btn-secondary">Launch details</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

LaunchItem.propTypes = {
  launch: PropTypes.shape({
    flightNumber: PropTypes.number.isRequired,
    missionName: PropTypes.string.isRequired,
    launchDateLocal: PropTypes.string.isRequired,
    launchSuccess: PropTypes.bool,
  }).isRequired,
};
