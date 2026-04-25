import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface Job {
    id: bigint;
    title: string;
    postedAt: Timestamp;
    jobType: JobType;
    description: string;
    isActive: boolean;
    employerId: UserId;
    companyName: string;
    category: Category;
    salaryMax: bigint;
    salaryMin: bigint;
    requirements: string;
    location: string;
}
export interface Application {
    id: bigint;
    status: ApplicationStatus;
    appliedAt: Timestamp;
    jobId: bigint;
    seekerId: UserId;
}
export interface ApplicantDetail {
    application: Application;
    seeker: JobSeeker;
}
export interface Employer {
    id: UserId;
    createdAt: Timestamp;
    email: string;
    companyName: string;
    companyDescription: string;
}
export type LoginResult = {
    __kind__: "ok";
    ok: UserRole;
} | {
    __kind__: "err";
    err: string;
};
export interface ApplicationWithJob {
    job: Job;
    application: Application;
}
export interface JobSeeker {
    id: UserId;
    experienceLevel: string;
    name: string;
    createdAt: Timestamp;
    education: string;
    email: string;
    skills: string;
}
export enum ApplicationStatus {
    Viewed = "Viewed",
    Rejected = "Rejected",
    Accepted = "Accepted",
    Pending = "Pending"
}
export enum Category {
    IT = "IT",
    Healthcare = "Healthcare",
    Sales = "Sales",
    Engineering = "Engineering",
    Design = "Design",
    Other = "Other",
    Marketing = "Marketing",
    Education = "Education",
    Finance = "Finance"
}
export enum JobType {
    PartTime = "PartTime",
    Remote = "Remote",
    FullTime = "FullTime"
}
export enum UserRole {
    JobSeeker = "JobSeeker",
    Employer = "Employer"
}
export interface backendInterface {
    applyForJob(jobId: bigint): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteJob(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getEmployerJobs(): Promise<Array<Job>>;
    getEmployerProfile(): Promise<Employer | null>;
    getFeaturedJobs(): Promise<Array<Job>>;
    getJob(id: bigint): Promise<Job | null>;
    getJobApplicants(jobId: bigint): Promise<{
        __kind__: "ok";
        ok: Array<ApplicantDetail>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getJobCategories(): Promise<Array<Category>>;
    getMyRole(): Promise<LoginResult>;
    getRecentJobs(): Promise<Array<Job>>;
    getSeekerApplications(): Promise<Array<ApplicationWithJob>>;
    getSeekerProfile(): Promise<JobSeeker | null>;
    postJob(title: string, description: string, requirements: string, jobType: JobType, category: Category, location: string, salaryMin: bigint, salaryMax: bigint): Promise<{
        __kind__: "ok";
        ok: Job;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerEmployer(email: string, companyName: string, companyDescription: string): Promise<{
        __kind__: "ok";
        ok: Employer;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerJobSeeker(email: string, name: string, skills: string, experienceLevel: string, education: string): Promise<{
        __kind__: "ok";
        ok: JobSeeker;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchJobs(keyword: string, location: string, category: Category | null, jobType: JobType | null, salaryMin: bigint | null, salaryMax: bigint | null): Promise<Array<Job>>;
    updateApplicationStatus(appId: bigint, status: ApplicationStatus): Promise<{
        __kind__: "ok";
        ok: Application;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateJob(id: bigint, title: string, description: string, requirements: string, jobType: JobType, category: Category, location: string, salaryMin: bigint, salaryMax: bigint): Promise<{
        __kind__: "ok";
        ok: Job;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateSeekerProfile(name: string, skills: string, experienceLevel: string, education: string): Promise<{
        __kind__: "ok";
        ok: JobSeeker;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
