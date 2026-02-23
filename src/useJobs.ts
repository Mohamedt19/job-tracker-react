import { useEffect, useState } from "react";
import type { Job, JobStatus } from "./types";

const STORAGE_KEY = "job_tracker_jobs_v1";

/**
 * Read jobs from localStorage.
 * If anything goes wrong (bad JSON, storage blocked), we just start empty.
 */
function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    // localStorage stores strings, so we parse back into JS objects
    const parsed = JSON.parse(raw) as Job[];

    // quick guard in case the stored value is not what we expect
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // corrupted JSON / disabled storage / etc.
    return [];
  }
}

/**
 * Save jobs to localStorage.
 * Wrapped in try/catch because storage can fail in some browsers/modes.
 */
function saveJobs(jobs: Job[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  } catch {
    // ignore storage errors (private mode, quota, blocked)
  }
}

export function useJobs() {
  // initialize from localStorage once on first render
  const [jobs, setJobs] = useState<Job[]>(() => loadJobs());

  // whenever jobs change, persist them
  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  /**
   * Add a new job.
   * We generate an id here so the UI can edit/delete reliably.
   */
  function addJob(input: Omit<Job, "id">) {
    const job: Job = { ...input, id: crypto.randomUUID() };

    // put the newest job at the top
    setJobs((prev) => [job, ...prev]);
  }

  /**
   * Update only the status (used by the status dropdown).
   */
  function updateStatus(id: string, status: JobStatus) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  }

  /**
   * Delete a job by id.
   * (UI can add a confirm dialog if needed.)
   */
  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  /**
   * Patch/update a job.
   * This is used by the edit form (company/title/location/status).
   */
  function updateJob(
    id: string,
    patch: Partial<Pick<Job, "company" | "title" | "location" | "status">>
  ) {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...patch } : j))
    );
  }

  return { jobs, addJob, updateStatus, deleteJob, updateJob };
}