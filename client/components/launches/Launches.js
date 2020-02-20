import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQry {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export default function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  // const [launches, setLaunches]

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.info(data);

  return (
    <div>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {data.launches.map(launch => (
        <LaunchItem
          key={launch.flight_number}
          launch={{
            flightNumber: launch.flight_number,
            missionName: launch.mission_name,
            launchDateLocal: launch.launch_date_local,
            launchSuccess: launch.launch_success,
          }}
        />
      ))}
    </div>
  );
}
