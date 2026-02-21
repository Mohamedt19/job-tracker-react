export type JobStatus = "applied" | "interview" | "offer" | "rejected";

export type Job = {
  id: string;
  company: string;
  title: string;
  location: string;
  status: JobStatus;
  appliedDate: string;
  notes?: string;
};