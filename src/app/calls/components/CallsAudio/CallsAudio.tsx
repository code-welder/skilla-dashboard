import styles from "./CallsAudio.module.css";
import { audioFetcher } from "../../api";
import useSwr from "swr";
import { AudioPlayer } from "@ui/AudioPlayer";

interface Props {
  audioId: string;
  partnershipId: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export const CallsAudio = ({ audioId, partnershipId, onPlay, onPause }: Props) => {
  const { data } = useSwr({ audioId, partnershipId }, audioFetcher);

  return <>{data && <AudioPlayer src={data} onPlay={onPlay} onPause={onPause} />}</>;
};
