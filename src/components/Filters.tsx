import type { JobStatus } from "../types";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  status: "all" | JobStatus;
  onStatusChange: (v: "all" | JobStatus) => void;
};

export default function Filters({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: Props) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <h2 className="panelTitle">Search & Filter</h2>
      </div>

      <div className="gridTwo">
        <div className="field">
          <label className="label" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            className="input"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search company, title, or location..."
            autoComplete="off"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="statusFilter">
            Status
          </label>
          <select
            id="statusFilter"
            className="select"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as any)}
          >
            <option value="all">All</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </section>
  );
}