"use client";
import React from "react";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/navigation";

function Page(req: any) {
  const router = useRouter();
  //get the query params
  const user = req.searchParams.u;

  if (!user) return <div>Invalid URL</div>;
  // get the device type
  const deviceType = isMobile ? "mobile" : "desktop";

  // redirect to the correct page
  // if (deviceType === "mobile") {
  //   openApp(user);
  // } else {
  //   openWeb(user);
  // }

  function openApp(user: string) {
    // open the app
    router.push("instagram://user?username=" + user);
    // redirect to the web
    setTimeout(() => {
      openWeb(user);
    }, 1000);
  }

  function openWeb(user: string) {
    router.push("https://instagram.com/" + user);
  }

  return (
    <div className="redirect-page">
      <div className="container">
        <h1>{user ? "You are getting redirected to @" + user : "Unknown"}</h1>

        <div className="manual-redirect">
          <p> If you are not redirected yet please click this button </p>
          <button> Redirect manually</button>
        </div>
      </div>
    </div>
  );
}

export default Page;
