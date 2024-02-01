"use client";

import { useRouter } from "next/navigation";

export default function StatusFilter() {
  const router = useRouter();
  return (
    <div className="text-m">
      <label htmlFor="filter" className="mb-3">
        Filter Product by Status
      </label>
      <select
        id="filter"
        className="m-1 mb-3 font-bold"
        onChange={(e) => {
          router.push(`/?stat=${e.target.value}`);
        }}
      >
        <option value="status:*">All</option>
        <option value="status:active">Active</option>
        <option value="status:draft">Draft</option>
      </select>
    </div>
  );
}
