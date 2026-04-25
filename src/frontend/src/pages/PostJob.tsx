import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";
import { useJob, usePostJob, useUpdateJob } from "../hooks/use-jobs";
import { CATEGORY_LABELS, JOB_TYPE_LABELS, UserRole } from "../types";
import type { Category, Employer, JobType, PostJobForm } from "../types";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormErrors {
  title?: string;
  description?: string;
  requirements?: string;
  jobType?: string;
  category?: string;
  location?: string;
  salaryMin?: string;
  salaryMax?: string;
}

interface FormState {
  title: string;
  description: string;
  requirements: string;
  jobType: JobType | "";
  category: Category | "";
  location: string;
  salaryMin: string;
  salaryMax: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  requirements: "",
  jobType: "",
  category: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
};

// ─── Validation ──────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = "Job title is required.";
  if (!form.description.trim())
    errors.description = "Job description is required.";
  else if (form.description.trim().length < 100)
    errors.description = "Description must be at least 100 characters.";
  if (!form.requirements.trim())
    errors.requirements = "Requirements are required.";
  if (!form.jobType) errors.jobType = "Job type is required.";
  if (!form.category) errors.category = "Category is required.";
  if (!form.location.trim()) errors.location = "Location is required.";
  const min = Number.parseFloat(form.salaryMin);
  const max = Number.parseFloat(form.salaryMax);
  if (!form.salaryMin || Number.isNaN(min) || min < 0)
    errors.salaryMin = "Enter a valid minimum salary.";
  if (!form.salaryMax || Number.isNaN(max) || max < 0)
    errors.salaryMax = "Enter a valid maximum salary.";
  else if (!errors.salaryMin && max < min)
    errors.salaryMax = "Maximum salary must be ≥ minimum salary.";
  return errors;
}

// ─── Field Error ─────────────────────────────────────────────────────────────

function FieldError({ msg, ocid }: { msg?: string; ocid: string }) {
  if (!msg) return null;
  return (
    <p className="text-destructive text-xs mt-1" data-ocid={ocid}>
      {msg}
    </p>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PostJob() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { id?: string };
  const editId = params.id ? BigInt(params.id) : null;
  const isEditMode = editId !== null;

  const { userRole, currentUser, isLoading: authLoading } = useAuth();
  const employer = currentUser as Employer | null;

  const { data: existingJob, isLoading: jobLoading } = useJob(editId);
  const postJob = usePostJob();
  const updateJob = useUpdateJob();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});

  // Redirect non-employers
  useEffect(() => {
    if (!authLoading && userRole !== UserRole.Employer) {
      navigate({ to: "/auth" });
    }
  }, [authLoading, userRole, navigate]);

  // Pre-fill form in edit mode
  useEffect(() => {
    if (isEditMode && existingJob) {
      setForm({
        title: existingJob.title,
        description: existingJob.description,
        requirements: existingJob.requirements,
        jobType: existingJob.jobType,
        category: existingJob.category,
        location: existingJob.location,
        salaryMin: existingJob.salaryMin.toString(),
        salaryMax: existingJob.salaryMax.toString(),
      });
    }
  }, [isEditMode, existingJob]);

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updated = { ...form, [field]: value };
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const blur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, true]),
    ) as Partial<Record<keyof FormState, boolean>>;
    setTouched(allTouched);

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload: PostJobForm = {
      title: form.title.trim(),
      description: form.description.trim(),
      requirements: form.requirements.trim(),
      jobType: form.jobType as JobType,
      category: form.category as Category,
      location: form.location.trim(),
      salaryMin: BigInt(Math.floor(Number.parseFloat(form.salaryMin))),
      salaryMax: BigInt(Math.floor(Number.parseFloat(form.salaryMax))),
    };

    try {
      if (isEditMode && editId !== null) {
        await updateJob.mutateAsync({ id: editId, form: payload });
        toast.success("Job listing updated successfully");
      } else {
        await postJob.mutateAsync(payload);
        toast.success("Job listing created successfully");
      }
      navigate({ to: "/employer/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const isPending = postJob.isPending || updateJob.isPending;
  const isLoading = authLoading || (isEditMode && jobLoading);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-full" data-ocid="post_job.page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground transition-smooth"
            onClick={() => navigate({ to: "/employer/dashboard" })}
            data-ocid="post_job.back_button"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold font-display text-foreground">
            {isEditMode ? "Edit Job Listing" : "Post a New Job"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isEditMode
              ? "Update the details of your job listing."
              : "Fill in the details below to attract the best candidates."}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {employer && (
          <Card className="mb-6 bg-muted/40 border border-border">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Posting as</p>
                <p className="font-semibold font-display text-foreground truncate">
                  {employer.companyName}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} noValidate data-ocid="post_job.form">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-display text-lg">
                Job Details
              </CardTitle>
              <CardDescription>
                Provide accurate information to help candidates find your
                listing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="title">
                  Job Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Software Engineer"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  onBlur={() => blur("title")}
                  className={errors.title ? "border-destructive" : ""}
                  data-ocid="post_job.title.input"
                />
                <FieldError
                  msg={errors.title}
                  ocid="post_job.title.field_error"
                />
              </div>

              {/* Job Type & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="jobType">
                    Job Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.jobType}
                    onValueChange={(v) => {
                      set("jobType", v);
                      setTouched((p) => ({ ...p, jobType: true }));
                    }}
                  >
                    <SelectTrigger
                      id="jobType"
                      className={errors.jobType ? "border-destructive" : ""}
                      data-ocid="post_job.job_type.select"
                    >
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(JOB_TYPE_LABELS) as JobType[]).map((jt) => (
                        <SelectItem key={jt} value={jt}>
                          {JOB_TYPE_LABELS[jt]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    msg={errors.jobType}
                    ocid="post_job.job_type.field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => {
                      set("category", v);
                      setTouched((p) => ({ ...p, category: true }));
                    }}
                  >
                    <SelectTrigger
                      id="category"
                      className={errors.category ? "border-destructive" : ""}
                      data-ocid="post_job.category.select"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(CATEGORY_LABELS) as Category[]).map(
                        (cat) => (
                          <SelectItem key={cat} value={cat}>
                            {CATEGORY_LABELS[cat]}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FieldError
                    msg={errors.category}
                    ocid="post_job.category.field_error"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <Label htmlFor="location">
                  Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA or Remote"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  onBlur={() => blur("location")}
                  className={errors.location ? "border-destructive" : ""}
                  data-ocid="post_job.location.input"
                />
                <FieldError
                  msg={errors.location}
                  ocid="post_job.location.field_error"
                />
              </div>

              {/* Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="salaryMin">
                    Min Salary (USD) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    min="0"
                    placeholder="e.g. 60000"
                    value={form.salaryMin}
                    onChange={(e) => set("salaryMin", e.target.value)}
                    onBlur={() => blur("salaryMin")}
                    className={errors.salaryMin ? "border-destructive" : ""}
                    data-ocid="post_job.salary_min.input"
                  />
                  <FieldError
                    msg={errors.salaryMin}
                    ocid="post_job.salary_min.field_error"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="salaryMax">
                    Max Salary (USD) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    min="0"
                    placeholder="e.g. 90000"
                    value={form.salaryMax}
                    onChange={(e) => set("salaryMax", e.target.value)}
                    onBlur={() => blur("salaryMax")}
                    className={errors.salaryMax ? "border-destructive" : ""}
                    data-ocid="post_job.salary_max.input"
                  />
                  <FieldError
                    msg={errors.salaryMax}
                    ocid="post_job.salary_max.field_error"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">
                  Job Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, team culture, and what success looks like… (min 100 characters)"
                  rows={6}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  onBlur={() => blur("description")}
                  className={`resize-y ${errors.description ? "border-destructive" : ""}`}
                  data-ocid="post_job.description.textarea"
                />
                <div className="flex items-center justify-between">
                  <FieldError
                    msg={errors.description}
                    ocid="post_job.description.field_error"
                  />
                  <span
                    className={`text-xs ml-auto ${
                      form.description.trim().length < 100
                        ? "text-muted-foreground"
                        : "text-accent"
                    }`}
                  >
                    {form.description.trim().length}/100 min
                  </span>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-1.5">
                <Label htmlFor="requirements">
                  Requirements <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="List required skills, experience, education, and qualifications…"
                  rows={5}
                  value={form.requirements}
                  onChange={(e) => set("requirements", e.target.value)}
                  onBlur={() => blur("requirements")}
                  className={`resize-y ${errors.requirements ? "border-destructive" : ""}`}
                  data-ocid="post_job.requirements.textarea"
                />
                <FieldError
                  msg={errors.requirements}
                  ocid="post_job.requirements.field_error"
                />
              </div>
            </CardContent>
          </Card>

          {/* Footer actions */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/employer/dashboard" })}
              disabled={isPending}
              data-ocid="post_job.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="min-w-[140px] transition-smooth"
              data-ocid="post_job.submit_button"
            >
              {isPending
                ? isEditMode
                  ? "Saving…"
                  : "Posting…"
                : isEditMode
                  ? "Save Changes"
                  : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
