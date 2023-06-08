"use client";

import { useState, useEffect } from "react";

// components
import { ToastContainer, toast } from "react-toastify";
import { Select } from "@/components/select";
import { Input } from "@/components/ui/input";

const selectAppList = [
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
];

const getCurrentPath = () => {
  "use client";
  if (typeof window !== "undefined") {
    return window.location.href;
  } else {
    // if ssr return the correct url based on the environment
    // check if if running in production or development
    if (process.env.NODE_ENV === "production") {
      return process.env.PROD_URL;
    } else {
      return process.env.DEV_URL;
    }
  }
};

const getLink = (username: string) => {
  return getCurrentPath() + "inst?u=" + username;
};

export default function Home() {
  const [username, setUsername] = useState("");

  const [currentApp, setCurrentApp] = useState(selectAppList[0]);

  return (
    <>
      <div className="home dark p-6 max-w-7xl mx-auto">
        <h1 className="mb-4">Create your own deeplink redirector</h1>
        <div className="p-6  bg-purple-700 rounded-lg">
          <p className="">
            This is a simple tool to create your own deeplink redirector. You can use it to redirect your
            users to the app or website based on their device type.
          </p>

          <Select
            dataSet={selectAppList}
            defaultVal={selectAppList[0].value}
            updateValue={setCurrentApp}
            className="dark py-4 "
          />

          <div className="flex w-full justify-between align-middle items-end gap-3">
            <div className="input flex flex-col grow">
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="h-[40px] flex justify-center items-center">
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
              className="result grow h-[40px] flex justify-center items-center bg-purple-700 rounded-md text-purple-100 font-medium text-xs sm:text-sm text-center cursor-pointer bg-purple-800 border-purple-800 border active:bg-purple-900 active:border-purple-900 pointer-events-clickable"
              onClick={() => {
                navigator.clipboard.writeText(getLink(username));
                console.log("copied");
                toast("Copied to clipboard!");
              }}
            >
              {getLink(username)}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        limit={3}
      />
    </>
  );
}
