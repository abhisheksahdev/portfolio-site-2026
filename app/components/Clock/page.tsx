"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Time = dynamic(() => import("./Time"), { ssr: false });

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-xs">
      <Time time={time} />
    </div>
  );
}
