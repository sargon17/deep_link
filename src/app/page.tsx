"use client";

import { useState } from "react";

const getCurrentPath = () => {
  if (typeof window !== "undefined") {
    return window.location.href;
  } else {
    return "";
  }
};

const getLink = (username: string) => {
  return getCurrentPath() + "inst?u=" + username;
};

export default function Home({ headersInstance }: any) {
  const [username, setUsername] = useState("");

  return (
    <div className="home">
      <h1>Create your own deeplink redirector</h1>
      <div className="card">
        <p>
          This is a simple tool to create your own deeplink redirector. You can use it to redirect your users
          to the app or website based on their device type.
        </p>
        <div className="deep-link-wrapper">
          <div className="input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.43 5.93005L20.5 12.0001L14.43 18.0701"
                stroke="#4C4960"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.01 12H20.33"
                stroke="#4C4960"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 12H6.97"
                stroke="#4C4960"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="result"
            onClick={() => {
              navigator.clipboard.writeText(getLink(username));
            }}
          >
            {getLink(username)}
          </div>
        </div>
      </div>
    </div>
  );
}
