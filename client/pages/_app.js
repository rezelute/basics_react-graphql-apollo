import React from "react";
import "../style/bootstrap.min.css";
import "../style/app.css";

// This default export is required in a new `pages/_app.js` file.
/* eslint-disable react/prop-types */
export default function MyApp({ Component, pageProps }) {
  /* eslint-disable react/jsx-props-no-spreading */
  return <Component {...pageProps} />;
}
