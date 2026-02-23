import type { Job, JobStatus } from "../types";
import JobItem from "./JobItem";

type Props = {
  jobs: Job[];
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    patch: Partial<Pick<Job, "company" | "title" | "location" | "status">>
  ) => void;
};

export default function JobList({ jobs, onStatusChange, onDelete, onEdit }: Props) {
  // quick stats for the pills (based on what is currently shown after filtering)
  const offers = jobs.filter((j) => j.status === "offer").length;
  const interviews = jobs.filter((j) => j.status === "interview").length;
  const applied = jobs.filter((j) => j.status === "applied").length;
  const rejected = jobs.filter((j) => j.status === "rejected").length;

  return (
    // aria-live makes screen readers announce updates when filters change
    <section className="panel" aria-live="polite">
      <div className="panelHeader panelHeaderRow">
        <h2 className="panelTitle">Applications</h2>

        {/* pills row = small “dashboard” for the current list */}
        <div className="pillRow">
          <span className="pill">{jobs.length} shown</span>

          {/* status breakdown (you can remove any pill you don’t want) */}
          <span className="pill">{applied} Applied</span>
          <span className="pill">{interviews} Interviews</span>

          {/* “success” / “danger” are CSS modifiers for special colors */}
          <span className="pill success">{offers} Offers</span>
          <span className="pill danger">{rejected} Rejected</span>
        </div>
      </div>

      {/* empty state when filters return zero results */}
      {jobs.length === 0 ? (
        <div className="emptyState emptyFade">
          {/* decorative icon (aria-hidden because it doesn’t add meaning) */}
          <div className="emptyIcon briefcase" aria-hidden />

          <div className="emptyTitle">No jobs found</div>
          <div className="emptyText">
            Try changing your search, or add a new job above.
          </div>
        </div>
      ) : (
        // list of cards
        <div className="stack">
          {jobs.map((job) => (
            <JobItem
              key={job.id} // stable key for React rendering
              job={job}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
}