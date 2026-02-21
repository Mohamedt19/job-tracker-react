import { useEffect, useState } from "react";
import type { Job, JobStatus } from "./types";

const STORAGE_KEY = "job_tracker_jobs_v1";

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Job[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveJobs(jobs: Job[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(() => loadJobs());

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  function addJob(input: Omit<Job, "id">) {
    const job: Job = { ...input, id: crypto.randomUUID() };
    setJobs((prev) => [job, ...prev]);
  }

  function updateStatus(id: string, status: JobStatus) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
  }

  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

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