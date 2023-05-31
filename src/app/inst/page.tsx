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
  if (deviceType === "mobile") {
    openApp(user);
  } else {
    openWeb(user);
  }

  function openApp(user: string) {
    window.location.href = "instagram://user?username=" + user;
  }

  function openWeb(user: string) {
    window.location.href = "https://www.instagram.com/" + user;
  }

  return <div>{<h1>{user ? "Redirecting to " + user : "Unknown"}</h1>}</div>;
}

export default Page;
