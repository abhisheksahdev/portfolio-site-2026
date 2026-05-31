import { makeTimeString } from "../helper/get-local-time";
import NowPlaying from "./now-playing";
import NowReading from "./now-reading";
import { CurrentWeather } from "./weather";

export function Taskbar() {
  return (
    <div className="w-screen fixed bottom-0 h-10 border-t-[0.5px] border-gray-800 p-2 flex items-center shadow-2xl text-sm text-gray-400 z-50 bg-background">
      <div className="flex gap-x-5 font-mono">
        <CurrentWeather />
        <NowPlaying />
      </div>
      <div className="flex absolute right-[2vw] gap-x-4">
        <NowReading />
        <div className="font-mono text-xs">{makeTimeString()}</div>
      </div>
    </div>
  );
}
