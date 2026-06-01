import { getRecentlyPlayed } from "../../../lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getRecentlyPlayed();

    const recentlyPlayed = await response.json();

    const title = recentlyPlayed.items[0].track.name;
    const artist = recentlyPlayed.items[0].track.artists
      .map((_artist: { name: string }) => _artist.name)
      .join(", ");
    const songUrl = recentlyPlayed.items[0].track.external_urls.spotify;

    return NextResponse.json(
      {
        artist,
        songUrl,
        title,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching recently played:", error);
    // return NextResponse.json({ isPlaying: false });
  }
}
