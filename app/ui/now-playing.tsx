"use client";

import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import CustomLink from "./custom-link";
import { MusicEqualizer } from "./music-equalizer";
import { NowPlayingSong, RecentlyPlayedSong } from "@/types/spotify";

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>("/api/now-playing", fetcher);
  const { data: recData } = useSWR<RecentlyPlayedSong>(
    "/api/recently-played",
    fetcher,
  );

  const songUrl = data?.isPlaying ? data.songUrl : recData?.songUrl;
  const artist = data?.isPlaying ? data.artist : recData?.artist;
  const title = data?.isPlaying ? data.title : recData?.title;

  return (
    <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
      {data?.isPlaying ? (
        <MusicEqualizer />
      ) : (
        <span className="text-green-500">♪</span>
      )}
      {title && artist && songUrl ? (
        <div className="flex max-w-full truncate">
          <CustomLink
            showIcon={false}
            className="max-w-max truncate"
            href={songUrl ?? ""}
            title={title}
          >
            <p>
              {title} {`//`} {artist}
            </p>
          </CustomLink>
        </div>
      ) : (
        <div>Not Playing</div>
      )}
    </div>
  );
}
