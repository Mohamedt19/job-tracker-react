import { useEffect, useMemo, useState } from "react";
import { useJobs } from "./useJobs";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Filters from "./components/Filters";
import type { JobStatus } from "./types";

export default function App() {
  // custom hook = keeps all job CRUD + localStorage logic in one place
  const { jobs, addJob, updateStatus, deleteJob, updateJob } = useJobs();

  // search text the user types
  const [query, setQuery] = useState("");

  // selected status filter (either "all" or a specific JobStatus)
  const [status, setStatus] = useState<"all" | JobStatus>("all");

  // simple dark mode toggle
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // when dark changes, add/remove the class on <body>
    // CSS uses body.theme-dark to switch colors
    document.body.classList.toggle("theme-dark", dark);
  }, [dark]);

  const filtered = useMemo(() => {
    // normalize query for case-insensitive matching
    const q = query.trim().toLowerCase();

    // filter jobs by text + status
    return jobs.filter((j) => {
      // match if query is empty OR it appears in company/title/location
      const matchesQuery =
        !q ||
        j.company.toLowerCase().includes(q) ||
        j.title.toLowerCase().includes(q) ||
        (j.location ?? "").toLowerCase().includes(q);

      // if status is "all" we accept everything, otherwise match exact status
      const matchesStatus = status === "all" ? true : j.status === status;

      // only keep jobs that match both filters
      return matchesQuery && matchesStatus;
    });
  }, [jobs, query, status]); // re-run only when these values change

  return (
    <div className="app">
      <header className="hero">
        <div>
          <h1 className="heroTitle">Job Tracker</h1>
          <p className="heroSub">
            Track applications, filter quickly, and keep it simple.
          </p>
        </div>

        {/* toggle dark/light theme */}
        <button className="btn" onClick={() => setDark((v) => !v)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </header>

      {/* form sends a new job object to addJob */}
      <JobForm onAdd={addJob} />

      {/* filters update query + status state */}
      <Filters
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
      />

      {/* list displays the filtered jobs and wires up actions */}
      <JobList
        jobs={filtered}
        onStatusChange={updateStatus}
        onDelete={deleteJob}
        onEdit={updateJob}
      />
    </div>
  );
}