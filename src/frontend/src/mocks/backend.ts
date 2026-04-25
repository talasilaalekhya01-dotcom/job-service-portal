import type { backendInterface, Job, Application, JobSeeker, Employer, ApplicantDetail, ApplicationWithJob, Category, JobType, ApplicationStatus, UserRole } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = Principal.fromText("aaaaa-aa");
const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleJobs: Job[] = [
  {
    id: BigInt(1),
    title: "Senior Frontend Engineer",
    postedAt: now,
    jobType: "FullTime" as unknown as JobType,
    description: "We are looking for an experienced Frontend Engineer to join our growing team. You will work on building scalable, high-performance web applications using React and TypeScript.",
    isActive: true,
    employerId: mockPrincipal,
    companyName: "TechCorp Solutions",
    category: "IT" as unknown as Category,
    salaryMax: BigInt(120000),
    salaryMin: BigInt(90000),
    requirements: "5+ years of experience with React, TypeScript, and modern CSS frameworks. Experience with REST APIs and GraphQL.",
    location: "San Francisco, CA",
  },
  {
    id: BigInt(2),
    title: "Product Designer",
    postedAt: now - BigInt(86400000000000),
    jobType: "Remote" as unknown as JobType,
    description: "Join our design team to create beautiful, user-centered product experiences. You'll work closely with engineering and product management.",
    isActive: true,
    employerId: mockPrincipal,
    companyName: "DesignHub Inc",
    category: "Design" as unknown as Category,
    salaryMax: BigInt(100000),
    salaryMin: BigInt(75000),
    requirements: "3+ years of product design experience. Proficiency in Figma. Strong portfolio demonstrating UI/UX skills.",
    location: "New York, NY",
  },
  {
    id: BigInt(3),
    title: "Data Scientist",
    postedAt: now - BigInt(172800000000000),
    jobType: "FullTime" as unknown as JobType,
    description: "We are seeking a Data Scientist to analyze complex datasets and build predictive models that drive business decisions.",
    isActive: true,
    employerId: mockPrincipal,
    companyName: "Analytics Pro",
    category: "IT" as unknown as Category,
    salaryMax: BigInt(140000),
    salaryMin: BigInt(100000),
    requirements: "PhD or Masters in Statistics, Mathematics or Computer Science. Experience with Python, R, machine learning frameworks.",
    location: "Austin, TX",
  },
  {
    id: BigInt(4),
    title: "Registered Nurse",
    postedAt: now - BigInt(259200000000000),
    jobType: "FullTime" as unknown as JobType,
    description: "Join our dedicated healthcare team providing exceptional patient care in a fast-paced hospital environment.",
    isActive: true,
    employerId: mockPrincipal,
    companyName: "City Medical Center",
    category: "Healthcare" as unknown as Category,
    salaryMax: BigInt(85000),
    salaryMin: BigInt(65000),
    requirements: "Active RN license, BLS/ACLS certification, 2+ years of clinical experience.",
    location: "Chicago, IL",
  },
  {
    id: BigInt(5),
    title: "Financial Analyst",
    postedAt: now - BigInt(345600000000000),
    jobType: "FullTime" as unknown as JobType,
    description: "Analyze financial data, prepare reports, and provide insights to support strategic business decisions.",
    isActive: true,
    employerId: mockPrincipal,
    companyName: "Global Finance Group",
    category: "Finance" as unknown as Category,
    salaryMax: BigInt(95000),
    salaryMin: BigInt(70000),
    requirements: "Bachelor's in Finance or Accounting. CFA certification preferred. 3+ years experience.",
    location: "Boston, MA",
  },
  {
    id: BigInt(6),
    title: "Marketing Manager",
    postedAt: now - BigInt(432000000000000),
    jobType: "PartTime" as unknown as JobType,
    description: "Lead marketing campaigns, manage social media presence, and develop brand strategies to drive growth.",
    isActive: true,
    employerId: mockPrincipal,
    companyName: "BrandBoost Agency",
    category: "Marketing" as unknown as Category,
    salaryMax: BigInt(80000),
    salaryMin: BigInt(60000),
    requirements: "4+ years marketing experience. Proficiency in digital marketing tools and analytics platforms.",
    location: "Los Angeles, CA",
  },
];

const sampleSeeker: JobSeeker = {
  id: mockPrincipal,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  skills: "React, TypeScript, Node.js, Python, SQL",
  experienceLevel: "Senior",
  education: "B.S. Computer Science, Stanford University",
  createdAt: now,
};

const sampleEmployer: Employer = {
  id: mockPrincipal,
  email: "hr@techcorp.com",
  companyName: "TechCorp Solutions",
  companyDescription: "A leading technology company specializing in enterprise software solutions.",
  createdAt: now,
};

const sampleApplication: Application = {
  id: BigInt(1),
  status: "Pending" as unknown as ApplicationStatus,
  appliedAt: now,
  jobId: BigInt(1),
  seekerId: mockPrincipal,
};

const sampleApplication2: Application = {
  id: BigInt(2),
  status: "Viewed" as unknown as ApplicationStatus,
  appliedAt: now - BigInt(86400000000000),
  jobId: BigInt(2),
  seekerId: mockPrincipal,
};

const sampleApplication3: Application = {
  id: BigInt(3),
  status: "Accepted" as unknown as ApplicationStatus,
  appliedAt: now - BigInt(172800000000000),
  jobId: BigInt(3),
  seekerId: mockPrincipal,
};

export const mockBackend: backendInterface = {
  applyForJob: async (_jobId) => ({ __kind__: "ok", ok: sampleApplication }),

  deleteJob: async (_id) => ({ __kind__: "ok", ok: null }),

  getEmployerJobs: async () => sampleJobs.slice(0, 3),

  getEmployerProfile: async () => sampleEmployer,

  getFeaturedJobs: async () => sampleJobs.slice(0, 3),

  getJob: async (id) => sampleJobs.find(j => j.id === id) ?? sampleJobs[0],

  getJobApplicants: async (_jobId) => ({
    __kind__: "ok",
    ok: [
      {
        application: sampleApplication,
        seeker: sampleSeeker,
      } as ApplicantDetail,
      {
        application: { ...sampleApplication2, seekerId: mockPrincipal },
        seeker: { ...sampleSeeker, name: "Maria Chen", email: "maria.chen@example.com" },
      } as ApplicantDetail,
    ],
  }),

  getJobCategories: async () => [
    "IT" as unknown as Category,
    "Healthcare" as unknown as Category,
    "Finance" as unknown as Category,
    "Education" as unknown as Category,
    "Engineering" as unknown as Category,
    "Marketing" as unknown as Category,
    "Design" as unknown as Category,
    "Sales" as unknown as Category,
    "Other" as unknown as Category,
  ],

  getMyRole: async () => ({ __kind__: "ok", ok: "JobSeeker" as unknown as UserRole }),

  getRecentJobs: async () => sampleJobs,

  getSeekerApplications: async () => [
    { job: sampleJobs[0], application: sampleApplication } as ApplicationWithJob,
    { job: sampleJobs[1], application: sampleApplication2 } as ApplicationWithJob,
    { job: sampleJobs[2], application: sampleApplication3 } as ApplicationWithJob,
  ],

  getSeekerProfile: async () => sampleSeeker,

  postJob: async (title, description, requirements, jobType, category, location, salaryMin, salaryMax) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(99),
      title,
      description,
      requirements,
      jobType,
      category,
      location,
      salaryMin,
      salaryMax,
      postedAt: now,
      isActive: true,
      employerId: mockPrincipal,
      companyName: "TechCorp Solutions",
    },
  }),

  registerEmployer: async (_email, companyName, companyDescription) => ({
    __kind__: "ok",
    ok: { ...sampleEmployer, companyName, companyDescription },
  }),

  registerJobSeeker: async (_email, name, skills, experienceLevel, education) => ({
    __kind__: "ok",
    ok: { ...sampleSeeker, name, skills, experienceLevel, education },
  }),

  searchJobs: async (_keyword, _location, _category, _jobType, _salaryMin, _salaryMax) => sampleJobs,

  updateApplicationStatus: async (_appId, status) => ({
    __kind__: "ok",
    ok: { ...sampleApplication, status },
  }),

  updateJob: async (id, title, description, requirements, jobType, category, location, salaryMin, salaryMax) => ({
    __kind__: "ok",
    ok: {
      ...sampleJobs[0],
      id,
      title,
      description,
      requirements,
      jobType,
      category,
      location,
      salaryMin,
      salaryMax,
    },
  }),

  updateSeekerProfile: async (name, skills, experienceLevel, education) => ({
    __kind__: "ok",
    ok: { ...sampleSeeker, name, skills, experienceLevel, education },
  }),
};
