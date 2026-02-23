import type { JobStatus } from "../types";

/*
  Props passed from parent (App)
  - query: current search text
  - status: selected filter status
  - handlers update state in parent
*/
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
    // panel container for search & filtering controls
    <section className="panel">
      <div className="panelHeader">
        <h2 className="panelTitle">Search & Filter</h2>
      </div>

      {/* two-column layout: search input + status dropdown */}
      <div className="gridTwo">
        
        {/* search field */}
        <div className="field">
          <label className="label" htmlFor="search">
            Search
          </label>

          <input
            id="search"
            className="input"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)} // update parent state
            placeholder="Search company, title, or location..."
            autoComplete="off"
          />
        </div>

        {/* status filter */}
        <div className="field">
          <label className="label" htmlFor="statusFilter">
            Status
          </label>

          <select
            id="statusFilter"
            className="select"
            value={status}
            // cast needed because HTML select returns string
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