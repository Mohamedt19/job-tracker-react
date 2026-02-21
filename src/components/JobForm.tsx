import { useState } from "react";
import type { JobStatus } from "../types";

type Props = {
  onAdd: (job: {
    company: string;
    title: string;
    location: string;
    status: JobStatus;
    appliedDate: string;
    notes?: string;
  }) => void;
};

export default function JobForm({ onAdd }: Props) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<JobStatus>("applied");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim() || !title.trim()) return;

    onAdd({
      company: company.trim(),
      title: title.trim(),
      location: location.trim(),
      status,
      appliedDate: new Date().toISOString(),
    });

    setCompany("");
    setTitle("");
    setLocation("");
    setStatus("applied");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="grid">
        <label className="field">
          <span className="label">Company *</span>
          <input
            className="input"
            placeholder="e.g. Spotify"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="label">Job Title *</span>
          <input
            className="input"
            placeholder="e.g. Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="label">Location</span>
          <input
            className="input"
            placeholder="e.g. New York, NY / Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="label">Status</span>
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>

      <div className="actionsRow">
        <button className="btnPrimary" type="submit">
          Add job
        </button>
        <p className="hint">* Required fields</p>
      </div>
    </form>
  );
}