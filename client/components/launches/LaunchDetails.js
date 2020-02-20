// import fetch from "isomorphic-unfetch";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export default function LaunchDetails({ flightNum }) {
  // if (isNaN(qry_flightNumber)) {
  //   return <p>Loading...</p>;
  // }

  console.log("flightNum === null: ", Number.isNaN(flightNum));

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: flightNum },
    skip: Number.isNaN(flightNum),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  console.log("data.launch: ", data);
  let flightNumber;
  let launchDate;
  let launchSuccess;
  let launchYear;
  let missionName;
  let rocketId;
  let rocketName;
  let rocketType;

  if (data !== undefined) {
    flightNumber = data.launch.flight_number;
    launchDate = data.launch.launch_date_local;
    launchSuccess = data.launch.launch_success;
    launchYear = data.launch.launch_year;
    missionName = data.launch.mission_name;
    rocketId = data.launch.rocket.rocket_id;
    rocketName = data.launch.rocket.rocket_name;
    rocketType = data.launch.rocket.rocket_type;
  }

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission: {missionName}</span>
      </h1>
      <h2 className="mb-3">Launch details</h2>
      <ul className="list-group">
        <li className="list-group-item">Flight number: {flightNumber}</li>
        <li className="list-group-item">Launch year: {launchYear}</li>
        <li className="list-group-item">
          Launch successful:{" "}
          <span
            className={classNames({
              "text-success": launchSuccess,
              "text-danger": launchSuccess === false,
            })}
          >
            {launchSuccess ? "yes" : "no"}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket details:</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocketId}</li>
        <li className="list-group-item">Rocket name: {rocketName}</li>
        <li className="list-group-item">Rocket type: {rocketType}</li>
      </ul>
      <hr />
    </div>
  );
}

LaunchDetails.propTypes = {
  flightNum: PropTypes.number.isRequired,
};
