"use client";

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useWindowListener } from "@/hook/useWindowListener";

export default function PromoteCard() {
  const [playing, setPlaying] = useState(true);
  const handlePlaying = () => {
    setPlaying((prev) => !prev);
  };
  useWindowListener("contextmenu", (e: Event) => {
    e.preventDefault();
  });
  return (
    <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row">
      <VideoPlayer isPlaying={playing} vdoSrc="/video/venue.mp4" />
      <div className="flex flex-col justify-center items-center w-full">
        <div className="font-bold text-xl p-6">Book your venue today</div>
        <button
          className="bg-gray-500 text-white p-2 rounded-lg w-16"
          onClick={handlePlaying}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
