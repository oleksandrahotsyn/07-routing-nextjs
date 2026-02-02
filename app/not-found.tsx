"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 300);
  });
  return (
    <div>
      <h1>404 NotFound Page</h1>
      <p>You will be redirect to home page after several second...</p>
    </div>
    // <Link href="/">Go home</Link>
  );
}

export default NotFound;
