"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Time = dynamic(() => import("./Time"), { ssr: false });

type ClockProps = {
  time: number;
};

export default function Clock({ time: initial }: ClockProps) {
  const [time, setTime] = useState(new Date(initial));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-xs tabular-nums">
      <Time time={time} />
    </div>
  );
}
