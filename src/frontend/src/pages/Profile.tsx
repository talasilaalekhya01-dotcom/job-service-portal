import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Loader2,
  MapPin,
  Pencil,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { createActor } from "../backend";
import { useSeekerApplications } from "../hooks/use-applications";
import { useAuth } from "../hooks/use-auth";
import type { ApplicationWithJob, JobSeeker } from "../types";
import {
  APPLICATION_STATUS_LABELS,
  ApplicationStatus,
  UserRole,
} from "../types";

// ─── Status badge ──────────────────────────────────────────────────────────────

const STATUS_CLASSES: Record<ApplicationStatus, string> = {
  [ApplicationStatus.Pending]:
    "bg-yellow-100 text-yellow-800 border-yellow-200",
  [ApplicationStatus.Viewed]: "bg-blue-100 text-blue-800 border-blue-200",
  [ApplicationStatus.Accepted]:
    "bg-emerald-100 text-emerald-800 border-emerald-200",
  [ApplicationStatus.Rejected]: "bg-red-100 text-red-800 border-red-200",
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_CLASSES[status]}`}
    >
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}

// ─── Skeletons ─────────────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

function ApplicationsSkeleton() {
  return (
    <div className="space-y-3" data-ocid="applications.loading_state">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 rounded-lg border border-border"
        >
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ─── Application row ────────────────────────────────────────────────────────────

function ApplicationRow({
  app,
  index,
}: {
  app: ApplicationWithJob;
  index: number;
}) {
  const appliedDate = new Date(
    Number(app.application.appliedAt / 1_000_000n),
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`applications.item.${index + 1}`}
      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-smooth"
    >
      <div className="min-w-0 flex-1">
        <Link
          to="/jobs/$id"
          params={{ id: app.job.id.toString() }}
          data-ocid={`applications.job_link.${index + 1}`}
          className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 group-hover:underline"
        >
          {app.job.title}
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{app.job.companyName}</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{app.job.location}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            {appliedDate}
          </span>
        </div>
      </div>
      <StatusBadge status={app.application.status} />
    </motion.div>
  );
}

// ─── Experience level options ───────────────────────────────────────────────────

const EXPERIENCE_LEVELS = [
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Senior Level", label: "Senior Level" },
  { value: "Executive", label: "Executive" },
];

// ─── Main page ──────────────────────────────────────────────────────────────────

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, userRole, isLoading: authLoading } = useAuth();
  const { data: applications, isLoading: appsLoading } =
    useSeekerApplications();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  // Redirect if not a job seeker
  useEffect(() => {
    if (!authLoading && (!currentUser || userRole !== UserRole.JobSeeker)) {
      navigate({ to: "/auth" });
    }
  }, [authLoading, currentUser, userRole, navigate]);

  const seeker =
    userRole === UserRole.JobSeeker ? (currentUser as JobSeeker | null) : null;

  // ── Edit form state
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSkills, setEditSkills] = useState("");
  const [editExperience, setEditExperience] = useState("");
  const [editEducation, setEditEducation] = useState("");

  function openEdit() {
    if (!seeker) return;
    setEditName(seeker.name);
    setEditSkills(seeker.skills);
    setEditExperience(seeker.experienceLevel);
    setEditEducation(seeker.education);
    setEditOpen(true);
  }

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateSeekerProfile(
        editName.trim(),
        editSkills.trim(),
        editExperience,
        editEducation.trim(),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seekerProfile"] });
      setEditOpen(false);
      toast.success("Profile updated successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update profile.");
    },
  });

  const skillsList = seeker?.skills
    ? seeker.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  if (authLoading) {
    return (
      <div
        className="container mx-auto px-4 py-12 max-w-4xl"
        data-ocid="profile.loading_state"
      >
        <ProfileSkeleton />
      </div>
    );
  }

  if (!seeker) return null;

  return (
    <div className="min-h-screen bg-background" data-ocid="profile.page">
      {/* Page header band */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground leading-tight">
                  {seeker.name}
                </h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {seeker.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={openEdit}
              data-ocid="profile.edit_button"
              className="shrink-0 flex items-center gap-1.5"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Profile details card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card data-ocid="profile.card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Skills */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Skills
                </p>
                {skillsList.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No skills listed yet.
                  </p>
                )}
              </div>

              {/* Experience */}
              <div className="flex items-start gap-3">
                <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Experience Level
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {seeker.experienceLevel || "—"}
                  </p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Education
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {seeker.education || "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card data-ocid="applications.section">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                My Applications
                {applications && applications.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {applications.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appsLoading ? (
                <ApplicationsSkeleton />
              ) : !applications || applications.length === 0 ? (
                <div
                  data-ocid="applications.empty_state"
                  className="text-center py-12 space-y-3"
                >
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto">
                    <ClipboardList className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground">
                    No applications yet
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    You haven't applied to any jobs yet. Browse jobs to get
                    started.
                  </p>
                  <Link to="/jobs">
                    <Button
                      variant="outline"
                      size="sm"
                      data-ocid="applications.browse_jobs_button"
                      className="mt-2 inline-flex items-center gap-1.5"
                    >
                      Browse Jobs
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3" data-ocid="applications.list">
                  {applications.map((app, i) => (
                    <ApplicationRow
                      key={app.application.id.toString()}
                      app={app}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditOpen(false);
          }}
          onKeyDown={(e) => e.key === "Escape" && setEditOpen(false)}
          data-ocid="profile.dialog"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Edit Profile
              </h2>
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                onKeyDown={(e) => e.key === "Escape" && setEditOpen(false)}
                data-ocid="profile.close_button"
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1.5">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  data-ocid="profile.name_input"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-skills">
                  Skills
                  <span className="text-muted-foreground font-normal ml-1 text-xs">
                    (comma-separated)
                  </span>
                </Label>
                <Input
                  id="edit-skills"
                  value={editSkills}
                  onChange={(e) => setEditSkills(e.target.value)}
                  data-ocid="profile.skills_input"
                  placeholder="e.g. React, TypeScript, Node.js"
                />
                {editSkills && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {editSkills
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-experience">Experience Level</Label>
                <Select
                  value={editExperience}
                  onValueChange={setEditExperience}
                >
                  <SelectTrigger
                    id="edit-experience"
                    data-ocid="profile.experience_select"
                  >
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-education">Education</Label>
                <Input
                  id="edit-education"
                  value={editEducation}
                  onChange={(e) => setEditEducation(e.target.value)}
                  data-ocid="profile.education_input"
                  placeholder="e.g. B.Sc Computer Science, MIT"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30">
              <Button
                variant="outline"
                onClick={() => setEditOpen(false)}
                data-ocid="profile.cancel_button"
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={() => updateMutation.mutate()}
                data-ocid="profile.save_button"
                disabled={updateMutation.isPending || !editName.trim()}
                className="min-w-[110px]"
              >
                {updateMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
