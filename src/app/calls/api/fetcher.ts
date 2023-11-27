import { Fetcher } from "swr";
import { CallsQueryParams, CallsResponse, AudioQueryParams, AudioUrl } from "./types";
import { requestCallsUrl, requestAudioUrl } from ".";

const fetchOptions = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
};

export const callsFetcher: Fetcher<CallsResponse, [CallsQueryParams]> = async ([queryParams]) => {
  let query: string[] = [];
  queryParams.dateStart && query.push(`date_start=${queryParams.dateStart}`);
  queryParams.dateEnd && query.push(`date_end=${queryParams.dateEnd}`);
  queryParams.inOut && query.push(`in_out=${queryParams.inOut}`);

  return fetch(`${requestCallsUrl}?${query.join("&")}`, fetchOptions).then((res) => res.json());
};

export const audioFetcher: Fetcher<AudioUrl, AudioQueryParams> = async (queryParams) => {
  return fetch(
    `${requestAudioUrl}?record=${queryParams.audioId}&partnership_id=${queryParams.partnershipId}`,
    fetchOptions
  ).then((r) => r.blob().then((blob) => URL.createObjectURL(blob)));
};
