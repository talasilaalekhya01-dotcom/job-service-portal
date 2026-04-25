// Re-export all domain types from backend
export type {
  Job,
  JobSeeker,
  Employer,
  Application,
  ApplicationWithJob,
  ApplicantDetail,
  UserId,
  Timestamp,
  LoginResult,
  Option,
  Some,
  None,
} from "./backend";

export { ApplicationStatus, Category, JobType, UserRole } from "./backend";

// Client-side convenience types
export type UserProfile =
  | import("./backend").JobSeeker
  | import("./backend").Employer;

export interface JobSearchFilters {
  keyword: string;
  location: string;
  category: import("./backend").Category | null;
  jobType: import("./backend").JobType | null;
  salaryMin: bigint | null;
  salaryMax: bigint | null;
}

export interface PostJobForm {
  title: string;
  description: string;
  requirements: string;
  jobType: import("./backend").JobType;
  category: import("./backend").Category;
  location: string;
  salaryMin: bigint;
  salaryMax: bigint;
}

export const CATEGORY_LABELS: Record<import("./backend").Category, string> = {
  IT: "Information Technology",
  Healthcare: "Healthcare",
  Sales: "Sales",
  Engineering: "Engineering",
  Design: "Design",
  Marketing: "Marketing",
  Education: "Education",
  Finance: "Finance",
  Other: "Other",
};

export const JOB_TYPE_LABELS: Record<import("./backend").JobType, string> = {
  FullTime: "Full Time",
  PartTime: "Part Time",
  Remote: "Remote",
};

export const APPLICATION_STATUS_LABELS: Record<
  import("./backend").ApplicationStatus,
  string
> = {
  Pending: "Pending",
  Viewed: "Viewed",
  Accepted: "Accepted",
  Rejected: "Rejected",
};
