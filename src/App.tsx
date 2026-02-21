import { useEffect, useMemo, useState } from "react";
import { useJobs } from "./useJobs";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Filters from "./components/Filters";
import type { JobStatus } from "./types";

export default function App() {
  const { jobs, addJob, updateStatus, deleteJob, updateJob } = useJobs();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | JobStatus>("all");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", dark);
  }, [dark]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesQuery =
        !q ||
        j.company.toLowerCase().includes(q) ||
        j.title.toLowerCase().includes(q) ||
        (j.location ?? "").toLowerCase().includes(q);

      const matchesStatus = status === "all" ? true : j.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [jobs, query, status]);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <h1 className="heroTitle">Job Tracker</h1>
          <p className="heroSub">Track applications, filter quickly, and keep it simple.</p>
        </div>

        <button className="btn" onClick={() => setDark((v) => !v)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <JobForm onAdd={addJob} />

      <Filters
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
      />

      <JobList
        jobs={filtered}
        onStatusChange={updateStatus}
        onDelete={deleteJob}
        onEdit={updateJob}
      />
    </div>
  );
}