import { FALLBACK_SONG } from "@/constants";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function SpotifyCard() {
    const [songName, setSongName] = useState<string | null>(null);
    const [artists, setArtists] = useState<string[] | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_RESONANCE_API}/api/recent-song-played`)
            .then((response) => {
                if (!response.ok) {
                    setSongName(FALLBACK_SONG.songName);
                    setArtists(FALLBACK_SONG.artists);
                    setImageUrl(FALLBACK_SONG.imageUrl);
                    return;
                }
                return response.json()
            })
            .then((data) => {
                setSongName(data.songName);
                setArtists(data.artists);
                setImageUrl(data.imageUrl);
            })
            .catch(() => {
                setSongName(FALLBACK_SONG.songName);
                setArtists(FALLBACK_SONG.artists);
                setImageUrl(FALLBACK_SONG.imageUrl);
            });
    }, [])

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.7,
                        staggerChildren: 0.5,
                    },
                },
            }}
            initial="hidden"
            animate="show"
            className="z-10 p-4 flex flex-col gap-3 items-start text-gray-400 w-[90vw] lg:w-[50vw] h-fit border border-white/10 rounded-xl relative bg-cyan-500/10"
        >
            <div className="text-sm flex flex-row items-center gap-2">
                Recently played on <img src="/spotify-no-bg.png" width={20} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 justify-between w-full items-center">
                <div className="flex flex-row gap-3 items-center w-full sm:w-auto">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            width={48}
                            className="rounded"
                        />
                    ) : (
                        <div className="w-12 aspect-square bg-gray-300/20 animate-pulse rounded"></div>
                    )}

                    {(songName && artists) ? (
                        <div className="flex flex-col">
                            <span className="text-sm">{songName ? songName : "No song playing"}</span>
                            <span className="text-xs">{(artists && artists.length > 0) ? artists.join(", ") : "Unknown Artist"}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <div className="w-32 h-4 bg-gray-300/20 animate-pulse rounded"></div>
                            <div className="w-32 h-3 bg-gray-300/20 animate-pulse rounded"></div>
                        </div>
                    )}
                </div>
                <a href="https://resonating.vercel.app/" target="_blank" className="w-full sm:w-auto text-center text-xs border border-cyan-500/20 hover:border-cyan-500/75 px-4 py-2 rounded-xl transition-all duration-500">
                    Checkout my playlists
                </a>
            </div>
        </motion.div>
    )
}