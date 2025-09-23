import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "a2sn0fju",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});