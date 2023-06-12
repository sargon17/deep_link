"use client";

import { useState, useEffect } from "react";

// components
import { ToastContainer, toast } from "react-toastify";
import { Select } from "@/components/select";
import { Input } from "@/components/ui/input";

const selectAppList = [
  {
    value: "inst",
    label: "Instagram",
    isActive: true,
    badge: "",
    subElements: [
      {
        value: "u",
        label: "User",
        isActive: true,
        badge: "",
      },
      {
        value: "p",
        label: "Post",
        isActive: true,
        badge: "alpha",
      },
      {
        value: "place",
        label: "Place",
        isActive: false,
        badge: "Soon",
      },
    ],
  },
  {
    value: "facebook",
    label: "Facebook",
    isActive: false,
    badge: "Soon",
  },
  {
    value: "twitter",
    label: "Twitter",
    isActive: false,
    badge: "Soon",
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

export default function Home() {
  const [username, setUsername] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const [currentApp, setCurrentApp] = useState(selectAppList[0] as any);
  const [currentSubElement, setCurrentSubElement] = useState(
    currentApp.subElements && currentApp.subElements[0] ? (currentApp.subElements[0] as any) : {}
  );

  useEffect(() => {
    if (currentApp.subElements) {
      setCurrentSubElement(currentApp.subElements[0]);
    } else {
      setCurrentSubElement({});
    }
  }, [currentApp]);

  useEffect(() => {
    console.log(currentSubElement);
  }, [currentSubElement]);

  const currentAppHandler = (app: string) => {
    if (selectAppList.find((singleApp) => singleApp.value === app)) {
      setCurrentApp(selectAppList.find((singleApp) => singleApp.value === app));
    }
  };

  const getPostId = (url: string) => {
    const urlSplit = url.split("?")[0].split("/")[4];
    return urlSplit;
  };

  const queryBuilder = () => {
    const base = getCurrentPath();
    const page = currentApp.value;
    const search = currentSubElement.value;

    let searchValue = "";
    switch (search) {
      case "u":
        searchValue = username;
        break;
      case "p":
        searchValue = getPostId(postUrl);
        break;
      default:
        break;
    }

    return `${base}${page}?${search}=${searchValue}`;
  };

  const currentSubElementHandler = (subElement: string) => {
    if (
      currentApp.subElements &&
      currentApp.subElements.find((singleSubElement: any) => singleSubElement.value === subElement)
    ) {
      setCurrentSubElement(
        currentApp.subElements.find((singleSubElement: any) => singleSubElement.value === subElement)
      );
    }
  };

  return (
    <>
      <div className="home dark p-6 max-w-7xl mx-auto">
        <h1 className="mb-4">Create your own deeplink redirector</h1>
        <div className="p-6  bg-purple-700 rounded-lg drop-shadow-lg">
          <p className="">
            Create custom deep link redirects effortlessly. Direct users to your social media app or website
            based on their device type with our intuitive tool.
          </p>

          <div className="flex justify-start items-center gap-3 flex-wrap py-4 ">
            <Select
              dataSet={selectAppList}
              defaultVal={selectAppList[0].value}
              updateValue={(app: string) => {
                currentAppHandler(app);
              }}
              placeholder="Select app..."
            />
            {currentApp.subElements && (
              <Select
                dataSet={currentApp.subElements}
                defaultVal={currentSubElement.value}
                updateValue={(subElement: string) => {
                  currentSubElementHandler(subElement);
                }}
                placeholder="Select item..."
              />
            )}
          </div>

          <div className="flex w-full justify-between align-middle items-end gap-3 flex-wrap">
            <div className="input flex flex-col grow">
              {currentSubElement.value == "u" && (
                <>
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2"
                  />
                </>
              )}
              {currentSubElement.value == "p" && (
                <>
                  <label htmlFor="username">Post URL</label>
                  <Input
                    id="postUrl"
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    className="mt-2"
                  />
                </>
              )}
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
              className="result grow h-[40px] flex justify-center items-center bg-purple-700 rounded-md text-purple-100 font-medium text-xs sm:text-sm text-center cursor-copy bg-purple-800 border-purple-800 border active:bg-purple-900 active:border-purple-900 pointer-events-clickable"
              onClick={() => {
                navigator.clipboard.writeText(queryBuilder());
                toast("Copied to clipboard!");
              }}
            >
              {queryBuilder()}
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
