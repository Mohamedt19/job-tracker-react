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

export default function JobList({
  jobs,
  onStatusChange,
  onDelete,
  onEdit,
}: Props) {
  const offers = jobs.filter(j => j.status === "offer").length;
  const interviews = jobs.filter(j => j.status === "interview").length;
  const applied = jobs.filter(j => j.status === "applied").length;
  const rejected = jobs.filter(j => j.status === "rejected").length;
  return (
    <section className="panel" aria-live="polite">
      <div className="panelHeader panelHeaderRow">
        <h2 className="panelTitle">Applications</h2>

        <div className="pillRow">
          <span className="pill">{jobs.length} shown</span>

          {/* optional: remove any of these if you don’t want them */}
          <span className="pill">{applied} Applied</span>
          <span className="pill">{interviews} Interviews</span>
          <span className="pill success">{offers} Offers</span>
          <span className="pill danger">{rejected} Rejected</span>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="emptyState emptyFade">
          <div className="emptyIcon briefcase" aria-hidden />
          <div className="emptyTitle">No jobs found</div>
          <div className="emptyText">
            Try changing your search, or add a new job above.
          </div>
        </div>
      ) : (
        <div className="stack">
          {jobs.map((job) => (
            <JobItem
              key={job.id}
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