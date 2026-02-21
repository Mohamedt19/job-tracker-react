import { useMemo, useState } from "react";
import type { Job, JobStatus } from "../types";

type Props = {
  job: Job;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    patch: Partial<Pick<Job, "company" | "title" | "location" | "status">>
  ) => void;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function JobItem({ job, onStatusChange, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [company, setCompany] = useState(job.company);
  const [title, setTitle] = useState(job.title);
  const [location, setLocation] = useState(job.location);

  const statusLabel =
    job.status === "applied"
      ? "Applied"
      : job.status === "interview"
      ? "Interview"
      : job.status === "offer"
      ? "Offer"
      : "Rejected";

  const appliedLabel = useMemo(() => formatDate(job.appliedDate), [job.appliedDate]);

  function save() {
    onEdit(job.id, {
      company: company.trim() || job.company,
      title: title.trim() || job.title,
      location: location.trim(),
    });
    setEditing(false);
  }

  return (
    <div className="card">
      <div className="cardTop">
        {!editing ? (
          <div className="cardMain">
            <div className="cardTitle">
              {job.company}
              <span className="muted"> — {job.title}</span>
            </div>

            <div className="cardMeta">
              <span className="metaItem">
                {job.location?.trim() || "Remote / Not specified"}
              </span>

              {appliedLabel ? (
                <span className="metaItem">Applied: {appliedLabel}</span>
              ) : null}

              <span className={`badge badge-${job.status}`}>{statusLabel}</span>
            </div>
          </div>
        ) : (
          <div className="editGrid">
            <input
              className="input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
            />
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job title"
            />
            <input
              className="input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
        )}
      </div>

      <div className="cardActions">
        <select
          className="select"
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
          disabled={editing}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        {!editing ? (
          <button className="btn" onClick={() => setEditing(true)}>
            Edit
          </button>
        ) : (
          <>
            <button className="btnPrimary" onClick={save}>
              Save
            </button>
            <button className="btn" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        )}

        <button className="btnDanger" onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}