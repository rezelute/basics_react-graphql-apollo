import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import APOLLO_CLIENT from "../../graphql/config";
import LaunchDetails from "../../components/launches/LaunchDetails";
// import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const flightNum = Number(router.query.flightNumber);

  return (
    <>
      {/* <Head>
        <title>SpaceX launch</title>
      </Head> */}

      <ApolloProvider client={APOLLO_CLIENT}>
        <div className="container">
          <h1 className="title">Apollo launch details</h1>
          <LaunchDetails flightNum={flightNum} />

          <Link href="/">
            <a className="btn btn-secondary">Back</a>
          </Link>
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
