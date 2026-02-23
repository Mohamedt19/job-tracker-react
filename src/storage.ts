import type { Job } from "./types";

// key used in localStorage
// changing this would reset stored data
const KEY = "job_tracker_jobs_v1";

export function loadJobs(): Job[] {
  try {
    // read raw string from browser storage
    const raw = localStorage.getItem(KEY);

    // nothing saved yet
    if (!raw) return [];

    // convert JSON string → JS object
    const parsed = JSON.parse(raw);

    // make sure it is an array before returning
    return Array.isArray(parsed) ? (parsed as Job[]) : [];
  } catch {
    // if parsing fails (corrupt data, private mode, etc.)
    // just return empty list so app doesn't crash
    return [];
  }
}

export function saveJobs(jobs: Job[]) {
  try {
    // store jobs as JSON string
    localStorage.setItem(KEY, JSON.stringify(jobs));
  } catch {
    // ignore storage errors:
    // • private browsing
    // • storage quota reached
    // • user disabled storage
  }
}