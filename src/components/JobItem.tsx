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

// Small helper: format stored ISO date into something readable for UI
function formatDate(iso: string) {
  const d = new Date(iso);

  // guard in case date is missing/corrupted in localStorage
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function JobItem({ job, onStatusChange, onDelete, onEdit }: Props) {
  // UI state: toggles edit mode per card
  const [editing, setEditing] = useState(false);

  // local editable fields (start with current job values)
  const [company, setCompany] = useState(job.company);
  const [title, setTitle] = useState(job.title);
  const [location, setLocation] = useState(job.location);

  // convert internal status value into user-friendly label
  const statusLabel =
    job.status === "applied"
      ? "Applied"
      : job.status === "interview"
      ? "Interview"
      : job.status === "offer"
      ? "Offer"
      : "Rejected";

  // memoize formatted date so we don’t reformat on every render
  const appliedLabel = useMemo(
    () => formatDate(job.appliedDate),
    [job.appliedDate]
  );

  function save() {
    // trim inputs and fall back to old values if required fields are empty
    onEdit(job.id, {
      company: company.trim() || job.company,
      title: title.trim() || job.title,
      // location is optional, so empty string is fine
      location: location.trim(),
    });

    // exit edit mode after saving
    setEditing(false);
  }

  return (
    <div className="card">
      <div className="cardTop">
        {/* view mode */}
        {!editing ? (
          <div className="cardMain">
            <div className="cardTitle">
              {job.company}
              <span className="muted"> — {job.title}</span>
            </div>

            <div className="cardMeta">
              {/* if location is missing, show a friendly default */}
              <span className="metaItem">
                {job.location?.trim() || "Remote / Not specified"}
              </span>

              {/* only show applied date if we have a valid formatted value */}
              {appliedLabel ? (
                <span className="metaItem">Applied: {appliedLabel}</span>
              ) : null}

              {/* status badge uses status for color via CSS class */}
              <span className={`badge badge-${job.status}`}>{statusLabel}</span>
            </div>
          </div>
        ) : (
          /* edit mode */
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
        {/* status dropdown is disabled while editing to avoid confusing updates */}
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

        {/* edit controls */}
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

        {/* destructive action */}
        <button className="btnDanger" onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}