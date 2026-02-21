import type { Job } from "./types";

const KEY = "job_tracker_jobs_v1";

export function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Job[]) : [];
  } catch {
    return [];
  }
}

export function saveJobs(jobs: Job[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(jobs));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}