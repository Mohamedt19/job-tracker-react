// possible stages in the application process
// used for filtering, badges, and status updates
export type JobStatus =
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

// shape of a job application object
// this keeps data consistent across the app
export type Job = {
  id: string;            // unique id (generated when job is created)

  company: string;       // company name
  title: string;         // role title

  location: string;      // location or "Remote"

  status: JobStatus;     // current stage in the hiring process

  appliedDate: string;   // ISO date string (easy to store & format)

  notes?: string;        // optional notes (future use)
};