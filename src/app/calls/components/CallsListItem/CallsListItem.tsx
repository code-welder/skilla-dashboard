"use client";
import { Checkbox } from "@ui/Checkbox";
import { Call } from "../../api";
import { CallsRow } from "../CallsRow";
import styles from "./CallsListItem.module.css";
import { InOutCallArrow } from "../InOutCallArrow";
import { CallDate } from "../CallDate";
import { UserAvatar } from "@ui/UserAvatar";
import { CallPhoneInfo } from "../CallPhoneInfo";
import { CallsAudio } from "../CallsAudio";
import { useState } from "react";
import clsx from "clsx";
import { getDurationString } from "@/lib/getDurationString";

interface Props {
  call: Call;
}

export const CallsListItem = ({ call }: Props) => {
  const [hovered, toggleHovered] = useState(false);
  const [selected, toggleSelected] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const show = hovered || selected || audioPlaying;

  const handlePointerOver = () => {
    toggleHovered(true);
  };
  const handlePointerLeave = () => {
    toggleHovered(false);
  };
  const handleCheckboxChange = () => {
    toggleSelected(!selected);
  };

  return (
    <CallsRow
      bordersY="top"
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      checkboxSlot={
        <div className={clsx(styles.hidden, show && styles.show)}>
          <Checkbox checked={selected} onChange={handleCheckboxChange} />
        </div>
      }
      typeSlot={
        <InOutCallArrow
          status={call.status === "Дозвонился" ? "success" : "failed"}
          inOut={call.in_out === 1 ? "in" : "out"}
        />
      }
      timeSlot={<CallDate date={call.date} />}
      employeeSlot={<UserAvatar src={call.person_avatar} />}
      callSlot={
        <CallPhoneInfo phoneNumber={call.partner_data.phone} fromSite={Boolean(call.from_site)} />
      }
      sourceSlot={<span>{call.source}</span>}
      qualitySlot={call.errors[0] && <span className={styles.qualityErr}>{call.errors[0]}</span>}
      audioSlot={
        <>
          <div className={clsx(styles.hidden, show && styles.show)}>
            {call.record && (
              <CallsAudio
                audioId={call.record}
                partnershipId={call.partnership_id}
                onPlay={() => setAudioPlaying(true)}
                onPause={() => setAudioPlaying(false)}
              />
            )}
          </div>

          <div>{!show && call.record && getDurationString(call.time)}</div>
        </>
      }
    />
  );
};
