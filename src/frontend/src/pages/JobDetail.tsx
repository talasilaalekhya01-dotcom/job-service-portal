import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useApplyToJob,
  useSeekerApplications,
} from "../hooks/use-applications";
import { useAuth } from "../hooks/use-auth";
import { useJob, useSearchJobs } from "../hooks/use-jobs";
import {
  CATEGORY_LABELS,
  JOB_TYPE_LABELS,
  type Job,
  JobType,
  UserRole,
} from "../types";

function formatSalary(min: bigint, max: bigint): string {
  const fmt = (n: bigint) => {
    const num = Number(n);
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return `$${num}`;
  };
  return `${fmt(min)} – ${fmt(max)} / yr`;
}

function formatDate(ts: bigint): string {
  const d = new Date(Number(ts) / 1_000_000);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseRequirements(raw: string): string[] {
  return raw
    .split(/[\n;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function JobTypeBadge({ jobType }: { jobType: Job["jobType"] }) {
  const label = JOB_TYPE_LABELS[jobType] ?? String(jobType);
  const colorClass =
    jobType === JobType.Remote
      ? "bg-accent/15 text-accent border-accent/30"
      : jobType === JobType.PartTime
        ? "bg-secondary text-secondary-foreground border-border"
        : "bg-primary/10 text-primary border-primary/30";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}
    >
      {label}
    </span>
  );
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────────
function JobDetailSkeleton() {
  return (
    <div
      data-ocid="job.loading_state"
      className="max-w-5xl mx-auto px-4 py-8 space-y-6"
    >
      <Skeleton className="h-5 w-32" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
        <div>
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Related Job Card ─────────────────────────────────────────────────────────
function RelatedJobCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to="/jobs/$id" params={{ id: job.id.toString() }}>
        <Card
          data-ocid={`job.related_item.${index + 1}`}
          className="hover:border-primary/40 hover:shadow-md transition-smooth cursor-pointer h-full"
        >
          <CardContent className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-foreground line-clamp-1 min-w-0">
                {job.title}
              </p>
              <JobTypeBadge jobType={job.jobType} />
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{job.companyName}</span>
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {job.location}
            </p>
            <p className="text-sm font-medium text-primary">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

// ─── Apply Sidebar ─────────────────────────────────────────────────────────────
interface ApplySidebarProps {
  job: Job;
  jobId: bigint;
}

function ApplySidebar({ job, jobId }: ApplySidebarProps) {
  const { isAuthenticated, userRole } = useAuth();
  const { data: myApplications } = useSeekerApplications();
  const applyMutation = useApplyToJob();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isSeeker = userRole === UserRole.JobSeeker;
  const isEmployer = userRole === UserRole.Employer;

  const appliedApp = myApplications?.find((a) => a.job.id === jobId);
  const alreadyApplied = Boolean(appliedApp);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      void navigate({
        to: "/auth",
        search: { redirect: `/jobs/${jobId.toString()}` } as Record<
          string,
          string
        >,
      });
      return;
    }
    if (isSeeker && !alreadyApplied) {
      setConfirmOpen(true);
    }
  };

  const handleConfirmApply = async () => {
    try {
      await applyMutation.mutateAsync(jobId);
      setConfirmOpen(false);
      toast.success("Application submitted!", {
        description: `You've applied to ${job.title} at ${job.companyName}.`,
      });
    } catch (err) {
      toast.error("Failed to apply", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Card className="border-border shadow-sm sticky top-24">
          <CardContent className="p-6 space-y-5">
            {/* Company block */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {job.companyName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {CATEGORY_LABELS[job.category]}
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">Job Type</p>
                <p className="text-sm font-medium">
                  {JOB_TYPE_LABELS[job.jobType]}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium truncate">{job.location}</p>
              </div>
              <div className="col-span-2 space-y-0.5">
                <p className="text-xs text-muted-foreground">Salary Range</p>
                <p className="text-sm font-medium text-primary">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </p>
              </div>
            </div>

            {/* Apply button area */}
            <div className="pt-2">
              {isEmployer ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div data-ocid="job.apply_button">
                        <Button className="w-full" size="lg" disabled>
                          Employers Cannot Apply
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent data-ocid="job.tooltip">
                      <p>Employers cannot apply to job listings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : alreadyApplied ? (
                <div
                  data-ocid="job.applied_badge"
                  className="flex flex-col items-center gap-2 py-3 px-4 rounded-lg bg-accent/10 border border-accent/30"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold text-sm">Applied</span>
                  </div>
                  {appliedApp && (
                    <p className="text-xs text-muted-foreground">
                      {formatDate(appliedApp.application.appliedAt)}
                    </p>
                  )}
                </div>
              ) : (
                <Button
                  data-ocid="job.apply_button"
                  className="w-full"
                  size="lg"
                  onClick={handleApplyClick}
                >
                  Apply Now
                </Button>
              )}
            </div>

            {!isAuthenticated && (
              <p className="text-center text-xs text-muted-foreground">
                You need to{" "}
                <Link to="/auth" className="text-primary hover:underline">
                  sign in
                </Link>{" "}
                to apply
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent data-ocid="job.dialog">
          <DialogHeader>
            <DialogTitle>Confirm Application</DialogTitle>
            <DialogDescription>
              Submit your application for <strong>{job.title}</strong> at{" "}
              <strong>{job.companyName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="job.cancel_button"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="job.confirm_button"
              onClick={() => void handleConfirmApply()}
              disabled={applyMutation.isPending}
            >
              {applyMutation.isPending ? "Submitting…" : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function JobDetail() {
  const { id } = useParams({ from: "/layout/jobs/$id" });
  const jobId = id ? BigInt(id) : null;
  const { data: job, isLoading } = useJob(jobId);

  // Related jobs — same category, exclude current job
  const { data: categoryJobs } = useSearchJobs(
    "",
    "",
    job?.category ?? null,
    null,
    null,
    null,
  );
  const relatedJobs =
    categoryJobs?.filter((j) => j.id !== job?.id).slice(0, 3) ?? [];

  if (isLoading) return <JobDetailSkeleton />;

  if (!job) {
    return (
      <div
        data-ocid="job.error_state"
        className="max-w-5xl mx-auto px-4 py-24 text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
          <Briefcase className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-display text-foreground">
          Job Not Found
        </h2>
        <p className="text-muted-foreground">
          This listing may have been removed or is no longer available.
        </p>
        <Link to="/jobs">
          <Button variant="outline" data-ocid="job.back_link">
            ← Browse All Jobs
          </Button>
        </Link>
      </div>
    );
  }

  const requirements = parseRequirements(job.requirements);

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Breadcrumb band */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link
            to="/jobs"
            data-ocid="job.back_link"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Job hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <JobTypeBadge jobType={job.jobType} />
            <Badge variant="outline" className="text-xs">
              {CATEGORY_LABELS[job.category]}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-foreground leading-tight mb-3">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">
                {job.companyName}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Posted {formatDate(job.postedAt)}
            </span>
          </div>
        </motion.div>

        {/* Two-column layout: content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Job Description */}
            <section data-ocid="job.description_section">
              <h2 className="text-xl font-bold font-display text-foreground mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Job Description
              </h2>
              <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
                {job.description.split(/\n+/).map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </section>

            {/* Requirements */}
            {requirements.length > 0 && (
              <section
                data-ocid="job.requirements_section"
                className="border-t border-border pt-8"
              >
                <h2 className="text-xl font-bold font-display text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Requirements
                </h2>
                <ul className="space-y-2.5">
                  {requirements.map((req) => (
                    <li
                      key={req.slice(0, 60)}
                      className="flex items-start gap-2.5 text-sm text-foreground/90"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Meta strip */}
            <div className="border-t border-border pt-6 flex flex-wrap gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Posted {formatDate(job.postedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {JOB_TYPE_LABELS[job.jobType]}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
            </div>

            {/* Mobile apply CTA */}
            <div className="lg:hidden border-t border-border pt-6">
              <ApplySidebar job={job} jobId={job.id} />
            </div>
          </motion.div>

          {/* Desktop sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="hidden lg:block"
          >
            <ApplySidebar job={job} jobId={job.id} />
          </motion.div>
        </div>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-16 border-t border-border pt-10"
            data-ocid="job.related_section"
          >
            <h2 className="text-xl font-bold font-display text-foreground mb-6">
              Similar Jobs in {CATEGORY_LABELS[job.category]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedJobs.map((rj, idx) => (
                <RelatedJobCard key={rj.id.toString()} job={rj} index={idx} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
