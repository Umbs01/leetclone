"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component) {
  return function AuthComponent() {
    // const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      } else {
        setAuthenticated(true);
      }
    //   setLoading(false);
    }, [router]);

    // if (loading) {
    //   return <p>Loading...</p>;
    // }

    return authenticated ? <Component /> : null;
  };
}
