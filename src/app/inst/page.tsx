"use client";
import React from "react";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function Page(req: any) {
  const [manualRedirect, setManualRedirect] = useState(false);

  useEffect(() => {
    console.log("redirecting");
    setTimeout(() => {
      setManualRedirect(true);
    }, 1500);
  }, []);

  const router = useRouter();
  //get the query params

  // get the search type
  const searchType = req.searchParams.u ? "u" : "p";

  // search value
  const searchParam = req.searchParams.u || req.searchParams.p;

  if (!searchParam) {
    router.back();
  }
  // get the device type
  const deviceType = isMobile ? "mobile" : "desktop";

  // redirect to the correct page
  if (deviceType === "mobile") {
    openApp();
  } else {
    openWeb();
  }

  function deepLinkBuilder() {
    // build the deeplink
    if (deviceType === "mobile") {
      const query = `instagram://${searchType === "u" ? "user?username=" : "media?id="}${searchParam}`;
      console.log(query);
      return query;
    } else {
      const query = `https://instagram.com/${searchType === "u" ? searchParam : "p/" + searchParam}`;
      console.log(query);
      return query;
    }
  }

  function openApp() {
    // open the app
    try {
      router.push(deepLinkBuilder());
    } catch (e) {
      // redirect to the web
      toast.error("Instagram app not found, redirecting to web");

      setTimeout(() => {
        openWeb();
      }, 1000);
    }
  }

  function openWeb() {
    router.push(deepLinkBuilder());
  }

  return (
    <>
      <div className="redirect-page flex justify-center items-center w-full h-screen p-4">
        <div className="container max-w-4xl text-center">
          <h1>
            {searchType === "u"
              ? "You are getting redirected to @" + searchParam
              : "You are getting redirected to Instagram"}
          </h1>

          <div className={manualRedirect === true ? "manual-redirect active" : "manual-redirect"}>
            <p> If you are not redirected yet please click this button </p>
            <button
              onClick={() => {
                openApp();
              }}
            >
              Redirect manually
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Page;
