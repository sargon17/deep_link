"use client";
import React from "react";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
  const user = req.searchParams.u;

  if (!user) {
    // todo message that the user is not found
  }
  // get the device type
  const deviceType = isMobile ? "mobile" : "desktop";

  // redirect to the correct page
  if (deviceType === "mobile") {
    openApp(user);
  } else {
    openWeb(user);
  }

  function openApp(user: string) {
    // open the app
    try {
      router.push("instagram://user?username=" + user);
    } catch (e) {
      console.log(e);
      // redirect to the web
      setTimeout(() => {
        openWeb(user);
      }, 1000);
    }
  }

  function openWeb(user: string) {
    router.push("https://instagram.com/" + user);
  }

  return (
    <div className="redirect-page">
      <div className="container">
        <h1>{user ? "You are getting redirected to @" + user : "Unknown"}</h1>

        <div className={manualRedirect === true ? "manual-redirect active" : "manual-redirect"}>
          <p> If you are not redirected yet please click this button </p>
          <button
            onClick={() => {
              openApp(user);
            }}
          >
            Redirect manually
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
