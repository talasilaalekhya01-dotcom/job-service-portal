import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Edit2,
  Eye,
  MapPin,
  PlusCircle,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useJobApplicants,
  useUpdateApplicationStatus,
} from "../hooks/use-applications";
import { useAuth } from "../hooks/use-auth";
import { useDeleteJob, useEmployerJobs } from "../hooks/use-jobs";
import { ApplicationStatus, UserRole } from "../types";
import {
  APPLICATION_STATUS_LABELS,
  CATEGORY_LABELS,
  JOB_TYPE_LABELS,
} from "../types";
import type { ApplicantDetail, Job } from "../types";

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatSalary(min: bigint, max: bigint): string {
  const fmt = (n: bigint) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(n));
  return `${fmt(min)} – ${fmt(max)}`;
}

function statusVariant(
  status: ApplicationStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case ApplicationStatus.Accepted:
      return "default";
    case ApplicationStatus.Rejected:
      return "destructive";
    case ApplicationStatus.Viewed:
      return "secondary";
    default:
      return "outline";
  }
}

// ─── Applicants Panel ────────────────────────────────────────────────────────

interface ApplicantsPanelProps {
  jobId: bigint;
  jobTitle: string;
}

function ApplicantsPanel({ jobId, jobTitle }: ApplicantsPanelProps) {
  const { data: applicants = [], isLoading } = useJobApplicants(jobId);
  const updateStatus = useUpdateApplicationStatus();

  const handleStatus = async (
    appId: bigint,
    status: ApplicationStatus,
    label: string,
  ) => {
    try {
      await updateStatus.mutateAsync({ appId, status });
      toast.success(`Application marked as ${label}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-2" data-ocid="applicants.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <div
        className="p-6 text-center text-muted-foreground text-sm"
        data-ocid="applicants.empty_state"
      >
        No applicants yet for <span className="font-medium">{jobTitle}</span>.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto" data-ocid="applicants.table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((app: ApplicantDetail, idx: number) => (
            <TableRow
              key={app.application.id.toString()}
              data-ocid={`applicant.item.${idx + 1}`}
            >
              <TableCell className="font-medium">{app.seeker.name}</TableCell>
              <TableCell className="max-w-[160px] truncate text-sm text-muted-foreground">
                {app.seeker.skills || "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {app.seeker.experienceLevel || "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                {formatDate(app.application.appliedAt)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={statusVariant(app.application.status)}
                  data-ocid={`applicant.status.${idx + 1}`}
                >
                  {APPLICATION_STATUS_LABELS[app.application.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs"
                    title="Mark as Viewed"
                    data-ocid={`applicant.viewed_button.${idx + 1}`}
                    onClick={() =>
                      handleStatus(
                        app.application.id,
                        ApplicationStatus.Viewed,
                        "Viewed",
                      )
                    }
                    disabled={updateStatus.isPending}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs text-accent hover:text-accent"
                    title="Accept"
                    data-ocid={`applicant.accept_button.${idx + 1}`}
                    onClick={() =>
                      handleStatus(
                        app.application.id,
                        ApplicationStatus.Accepted,
                        "Accepted",
                      )
                    }
                    disabled={updateStatus.isPending}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                    title="Reject"
                    data-ocid={`applicant.reject_button.${idx + 1}`}
                    onClick={() =>
                      handleStatus(
                        app.application.id,
                        ApplicationStatus.Rejected,
                        "Rejected",
                      )
                    }
                    disabled={updateStatus.isPending}
                  >
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Job Card ────────────────────────────────────────────────────────────────

interface JobCardProps {
  job: Job;
  index: number;
  onDelete: (id: bigint) => void;
}

function JobCard({ job, index, onDelete }: JobCardProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="border border-border shadow-sm"
      data-ocid={`employer.job.item.${index}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <CardTitle className="text-base font-semibold font-display text-foreground truncate">
              {job.title}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                {formatDate(job.postedAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {JOB_TYPE_LABELS[job.jobType]}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {CATEGORY_LABELS[job.category]}
            </Badge>
            <Badge
              variant={job.isActive ? "default" : "secondary"}
              className="text-xs"
            >
              {job.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs transition-smooth"
              data-ocid={`employer.job.edit_button.${index}`}
              onClick={() =>
                navigate({ to: `/employer/post-job/${job.id.toString()}` })
              }
            >
              <Edit2 className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5 transition-smooth"
              data-ocid={`employer.job.delete_button.${index}`}
              onClick={() => onDelete(job.id)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs transition-smooth"
            data-ocid={`employer.job.applicants_button.${index}`}
            onClick={() => setExpanded((v) => !v)}
          >
            <Users className="h-3.5 w-3.5 mr-1" />
            View Applicants
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5 ml-1" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 ml-1" />
            )}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 border-t border-border pt-4">
            <ApplicantsPanel jobId={job.id} jobTitle={job.title} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { userRole, isLoading: authLoading } = useAuth();
  const { data: jobs = [], isLoading: jobsLoading } = useEmployerJobs();
  const deleteJob = useDeleteJob();
  const [deleteTarget, setDeleteTarget] = useState<bigint | null>(null);

  if (!authLoading && userRole !== UserRole.Employer) {
    navigate({ to: "/auth" });
    return null;
  }

  const handleDeleteConfirm = async () => {
    if (deleteTarget === null) return;
    try {
      await deleteJob.mutateAsync(deleteTarget);
      toast.success("Job listing deleted successfully");
    } catch {
      toast.error("Failed to delete job listing");
    } finally {
      setDeleteTarget(null);
    }
  };

  const isLoading = authLoading || jobsLoading;

  return (
    <div
      className="bg-background min-h-full"
      data-ocid="employer.dashboard.page"
    >
      {/* Header band */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">
                Employer Dashboard
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage your job listings and review applicants
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: "/employer/post-job" })}
              className="transition-smooth"
              data-ocid="employer.post_job_button"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Post a Job
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-4" data-ocid="employer.jobs.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="employer.jobs.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold font-display text-foreground mb-2">
              No jobs posted yet
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Create your first job listing to start receiving applications from
              qualified candidates.
            </p>
            <Button
              onClick={() => navigate({ to: "/employer/post-job" })}
              className="transition-smooth"
              data-ocid="employer.empty.post_job_button"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Post a Job
            </Button>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="employer.jobs.list">
            <p className="text-sm text-muted-foreground">
              {jobs.length} job{jobs.length === 1 ? "" : "s"} posted
            </p>
            {jobs.map((job: Job, idx: number) => (
              <JobCard
                key={job.id.toString()}
                job={job}
                index={idx + 1}
                onDelete={(id) => setDeleteTarget(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent data-ocid="employer.delete.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Delete Job Listing
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job listing? This action
              cannot be undone and all associated applications will be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              data-ocid="employer.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteJob.isPending}
              data-ocid="employer.delete.confirm_button"
            >
              {deleteJob.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
