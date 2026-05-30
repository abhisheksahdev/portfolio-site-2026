"use client";

import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import CustomLink from "./custom-link";
import { MusicEqualizer } from "./music-equalizer";
import { NowPlayingSong } from "@/types/spotify";

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {data?.isPlaying && data?.songUrl && <MusicEqualizer />}
      {data?.songUrl ? (
        <div className="flex max-w-full truncate">
          <CustomLink
            showIcon={false}
            className="hover:text-spotify-green max-w-max truncate text-xs"
            href={data.songUrl}
            title={data.title}
          >
            <p>
              {data.title} {`//`} {data.artist}
            </p>
          </CustomLink>
        </div>
      ) : (
        <p className="text-sm">Not playing</p>
      )}
    </div>
  );
}
