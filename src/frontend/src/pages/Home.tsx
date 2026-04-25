import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAllJobs } from "../hooks/use-jobs";
import type { Job } from "../types";
import { Category, JOB_TYPE_LABELS, JobType } from "../types";

// ─── Constants ───────────────────────────────────────────────────────────────

const SKELETON_KEYS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
] as const;

type CategoryConfig = {
  key: Category;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const CATEGORIES: CategoryConfig[] = [
  {
    key: Category.IT,
    label: "Information Technology",
    icon: <Briefcase size={22} />,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    key: Category.Healthcare,
    label: "Healthcare",
    icon: <CheckCircle2 size={22} />,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    key: Category.Finance,
    label: "Finance",
    icon: <TrendingUp size={22} />,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    key: Category.Education,
    label: "Education",
    icon: <Users size={22} />,
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    key: Category.Engineering,
    label: "Engineering",
    icon: <Building2 size={22} />,
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    key: Category.Marketing,
    label: "Marketing",
    icon: <TrendingUp size={22} />,
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    key: Category.Sales,
    label: "Sales",
    icon: <ArrowRight size={22} />,
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    key: Category.Design,
    label: "Design",
    icon: <Briefcase size={22} />,
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
];

const JOB_TYPE_COLORS: Partial<Record<JobType, string>> = {
  [JobType.FullTime]: "bg-accent/15 text-accent-foreground border-accent/30",
  [JobType.PartTime]: "bg-primary/10 text-primary border-primary/25",
  [JobType.Remote]: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function JobCardSkeleton() {
  return (
    <Card className="border border-border">
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function JobCard({ job }: { job: Job }) {
  const navigate = useNavigate();
  const typeLabel = JOB_TYPE_LABELS[job.jobType] ?? String(job.jobType);
  const typeColor = JOB_TYPE_COLORS[job.jobType] ?? "";
  const salaryDisplay =
    job.salaryMin > 0n || job.salaryMax > 0n
      ? `$${Number(job.salaryMin).toLocaleString()} – $${Number(job.salaryMax).toLocaleString()}`
      : "Salary not listed";

  return (
    <Card
      data-ocid="recent_jobs.item"
      className="border border-border hover:border-primary/40 hover:shadow-md transition-smooth cursor-pointer group bg-card"
      onClick={() =>
        navigate({ to: "/jobs/$id", params: { id: job.id.toString() } })
      }
    >
      <CardContent className="p-5 space-y-3">
        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {job.title}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Building2 size={13} className="shrink-0" />
          <span className="truncate">{job.companyName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">{job.location || "Remote"}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColor}`}
          >
            {typeLabel}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {salaryDisplay}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({
  cat,
  count,
  onClick,
}: { cat: CategoryConfig; count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      data-ocid={`category.${cat.key.toLowerCase()}.button`}
      onClick={onClick}
      className={`group flex flex-col items-center gap-3 p-5 rounded-xl border transition-smooth hover:shadow-md hover:-translate-y-0.5 text-center w-full ${cat.color}`}
    >
      <span className="text-2xl">{cat.icon}</span>
      <div>
        <p className="font-display font-semibold text-sm leading-tight">
          {cat.label}
        </p>
        <p className="text-xs opacity-70 mt-0.5">
          {count} job{count !== 1 ? "s" : ""}
        </p>
      </div>
    </button>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { data: allJobs = [], isLoading } = useAllJobs();

  const categoryCounts = CATEGORIES.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat.key] = allJobs.filter((j) => j.category === cat.key).length;
      return acc;
    },
    {},
  );

  const recentJobs = [...allJobs]
    .sort((a, b) => Number(b.postedAt) - Number(a.postedAt))
    .slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (keyword) params.search = keyword;
    if (location) params.location = location;
    navigate({ to: "/jobs", search: params });
  };

  const handleCategoryClick = (catKey: Category) => {
    navigate({ to: "/jobs", search: { category: catKey } });
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e3a5f 0%, #0f2340 60%, #162d4f 100%)",
        }}
      >
        <img
          src="/assets/generated/hero-job-portal.dim_1600x600.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f2340]/60"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20 text-center">
          <Badge className="mb-5 bg-white/15 text-white border border-white/25 text-xs font-medium px-3 py-1 backdrop-blur-sm">
            🚀{" "}
            {allJobs.length > 0
              ? `${allJobs.length.toLocaleString()}+`
              : "1,000+"}{" "}
            jobs available
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight">
            Find Your <span className="text-teal-300">Dream Job</span>
          </h1>
          <p className="text-white/75 text-lg sm:text-xl mb-10 max-w-xl mx-auto font-body">
            Connect with top employers and discover opportunities that match
            your skills and ambitions.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl p-2.5 flex flex-col sm:flex-row gap-2 items-stretch max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={18} className="text-muted-foreground shrink-0" />
              <Input
                data-ocid="hero.search_input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title or keyword..."
                className="border-0 shadow-none focus-visible:ring-0 p-0 text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <div className="w-px bg-border hidden sm:block self-stretch my-1" />
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin size={18} className="text-muted-foreground shrink-0" />
              <Input
                data-ocid="hero.location_input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or remote..."
                className="border-0 shadow-none focus-visible:ring-0 p-0 text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <Button
              type="submit"
              data-ocid="hero.search_button"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-xl shrink-0"
            >
              Search
            </Button>
          </form>

          <p className="text-white/50 text-sm mt-4">
            Popular:{" "}
            <button
              type="button"
              onClick={() => handleCategoryClick(Category.IT)}
              className="text-teal-300 hover:underline mx-1"
            >
              Software Engineering
            </button>
            ·
            <button
              type="button"
              onClick={() => handleCategoryClick(Category.Design)}
              className="text-teal-300 hover:underline mx-1"
            >
              Design
            </button>
            ·
            <button
              type="button"
              onClick={() => handleCategoryClick(Category.Finance)}
              className="text-teal-300 hover:underline mx-1"
            >
              Finance
            </button>
            ·
            <button
              type="button"
              onClick={() => handleCategoryClick(Category.Healthcare)}
              className="text-teal-300 hover:underline mx-1"
            >
              Healthcare
            </button>
          </p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-3 divide-x divide-border text-center">
          {[
            {
              label: "Jobs Posted",
              value:
                allJobs.length > 0 ? allJobs.length.toLocaleString() : "1,200+",
            },
            { label: "Companies Hiring", value: "320+" },
            { label: "Job Seekers", value: "45,000+" },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-1">
              <p className="font-display font-bold text-2xl text-primary">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────── */}
      <section
        data-ocid="categories.section"
        className="bg-background py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Explore opportunities in your field
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.key}
                cat={cat}
                count={categoryCounts[cat.key] ?? 0}
                onClick={() => handleCategoryClick(cat.key)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Jobs ───────────────────────────────────────────── */}
      <section
        data-ocid="recent_jobs.section"
        className="bg-muted/30 py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Recent Job Listings
              </h2>
              <p className="text-muted-foreground mt-1">
                Fresh opportunities posted by top employers
              </p>
            </div>
            <Button
              data-ocid="recent_jobs.view_all_button"
              variant="outline"
              onClick={() => navigate({ to: "/jobs" })}
              className="font-medium"
            >
              View All Jobs <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SKELETON_KEYS.map((k) => (
                <JobCardSkeleton key={k} />
              ))}
            </div>
          ) : recentJobs.length === 0 ? (
            <div
              data-ocid="recent_jobs.empty_state"
              className="text-center py-16 bg-card rounded-2xl border border-border"
            >
              <Briefcase
                size={48}
                className="mx-auto text-muted-foreground/40 mb-4"
              />
              <p className="text-muted-foreground font-medium">
                No jobs posted yet.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate({ to: "/employer/post-job" })}
                data-ocid="recent_jobs.post_job_cta"
              >
                Be the first to post a job
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recentJobs.map((job) => (
                <JobCard key={job.id.toString()} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Employer CTA ──────────────────────────────────────────── */}
      <section
        data-ocid="employer_cta.section"
        className="relative bg-card border-t border-border py-20 px-4 overflow-hidden"
      >
        <div
          className="absolute -right-24 -top-24 w-80 h-80 rounded-full opacity-5 bg-primary blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full opacity-5 bg-accent blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-accent/15 text-accent-foreground border-accent/30 text-xs px-3 py-1">
            For Employers
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
            Are you hiring?
            <br />
            <span className="text-primary">Post a job today</span> and reach
            thousands of talented candidates.
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-lg mx-auto">
            Join hundreds of companies already using our platform to find top
            talent fast. Posting is quick and free.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              data-ocid="employer_cta.post_job_button"
              size="lg"
              onClick={() => navigate({ to: "/employer/post-job" })}
              className="font-semibold px-8"
            >
              Post a Job <ArrowRight size={16} className="ml-1.5" />
            </Button>
            <Button
              data-ocid="employer_cta.dashboard_button"
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: "/employer/dashboard" })}
              className="font-medium px-8"
            >
              Employer Dashboard
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {[
              "Free to post",
              "Reach 45k+ seekers",
              "Manage applicants easily",
              "No credit card required",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-accent" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
