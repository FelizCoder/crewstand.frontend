"use server";

import { client, getVersionV1InfoVersionGet } from "../../api";

client.setConfig({
  baseURL: process.env.BACKEND_URI,
  proxy: false,
});

export async function getBackendVersion () {
  const response = await getVersionV1InfoVersionGet();

  if (response.error) {
    console.error("Error fetching Backend Version: ",response.error);
  }

  const version = response.data || "Unknown";
  return version
}