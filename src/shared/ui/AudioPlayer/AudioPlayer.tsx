"use client";
import DownloadSvg from "@icons/download.svg";
import { useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import { getDurationString } from "@/lib/getDurationString";
import PlaySvg from "@icons/play.svg";
import PauseSvg from "@icons/pause.svg";

interface Props {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export const AudioPlayer = ({ src, onPlay, onPause }: Props) => {
  const { togglePlay, isPlaying, duration, currentTime } = useAudio(src);
  const [barFillPercentWidth, setBarFillPercentWidth] = useState(0);

  useEffect(() => {
    setBarFillPercentWidth(Math.ceil((currentTime / duration) * 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  useEffect(() => {
    if (isPlaying) {
      onPlay && onPlay();
    } else {
      onPause && onPause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return (
    <div className={styles.core}>
      <div className={styles.duration}>{getDurationString(duration)}</div>
      <button className={styles.play} onClick={togglePlay}>
        {isPlaying ? <PauseSvg /> : <PlaySvg />}
      </button>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${barFillPercentWidth}%` }}></div>
      </div>

      <a href={src} className={styles.icon} download>
        <DownloadSvg />
      </a>
    </div>
  );
};

const useAudio = (src: string) => {
  const audio = useRef(new Audio(src));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    audio.current.play();
    setIsPlaying(true);
  };
  const pause = () => {
    audio.current.pause();
    setIsPlaying(false);
  };
  const togglePlay = () => (isPlaying ? pause() : play());

  useEffect(() => {
    audio.current.addEventListener("loadeddata", () => {
      setDuration(audio.current.duration);
    });
    audio.current.addEventListener("timeupdate", () => {
      setCurrentTime(audio.current.currentTime);
    });
  }, []);

  return {
    duration,
    isPlaying,
    play,
    pause,
    togglePlay,
    currentTime,
  };
};
