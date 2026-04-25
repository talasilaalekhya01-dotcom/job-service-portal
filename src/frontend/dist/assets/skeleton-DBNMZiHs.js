import { j as jsxRuntimeExports, i as cn } from "./index-CQLXwtRZ.js";
const CATEGORY_LABELS = {
  IT: "Information Technology",
  Healthcare: "Healthcare",
  Sales: "Sales",
  Engineering: "Engineering",
  Design: "Design",
  Marketing: "Marketing",
  Education: "Education",
  Finance: "Finance",
  Other: "Other"
};
const JOB_TYPE_LABELS = {
  FullTime: "Full Time",
  PartTime: "Part Time",
  Remote: "Remote"
};
const APPLICATION_STATUS_LABELS = {
  Pending: "Pending",
  Viewed: "Viewed",
  Accepted: "Accepted",
  Rejected: "Rejected"
};
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
export {
  APPLICATION_STATUS_LABELS as A,
  CATEGORY_LABELS as C,
  JOB_TYPE_LABELS as J,
  Skeleton as S
};
