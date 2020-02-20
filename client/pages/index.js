import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import Head from "next/head";
import APOLLO_CLIENT from "../graphql/config";
import logo from "../images/logo.svg";
import Launches from "../components/launches/Launches";
import LaunchDetails from "../components/launches/LaunchDetails";
import Styles from "./index.module.css";
// import Nav from "../components/nav";

export default function Home() {
  return (
    <>
      <Head>
        <title>SpaceX launches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Nav /> */}

      <ApolloProvider client={APOLLO_CLIENT}>
        <div className="container">
          <h1 className="title">Welcome To Apollo Launches!</h1>
          <img src={logo} alt="spaceX" />

          <Launches />
        </div>
      </ApolloProvider>
      {/* <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
      `}</style> */}
    </>
  );
}
