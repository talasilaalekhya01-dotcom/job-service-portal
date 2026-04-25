import { u as useNavigate, s as useParams, t as useAuth, r as reactExports, U as UserRole, j as jsxRuntimeExports, B as Button } from "./index-CQLXwtRZ.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from "./card-Brqk0R1W.js";
import { I as Input } from "./input-BlgGYtX8.js";
import { L as Label } from "./label-DzhWKyXj.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DqOJvwqj.js";
import { S as Skeleton, J as JOB_TYPE_LABELS, C as CATEGORY_LABELS } from "./skeleton-DBNMZiHs.js";
import { T as Textarea } from "./textarea-fdzyk_XF.js";
import { u as ue } from "./index-Bge-Ylrg.js";
import { b as useJob, e as usePostJob, f as useUpdateJob } from "./use-jobs-Db2dDDM2.js";
import { A as ArrowLeft } from "./arrow-left-K6oPq_-T.js";
import { B as Building2 } from "./building-2-BzDCztNH.js";
import "./index-DQwN6c6T.js";
import "./chevron-up-DR79tzHC.js";
const EMPTY_FORM = {
  title: "",
  description: "",
  requirements: "",
  jobType: "",
  category: "",
  location: "",
  salaryMin: "",
  salaryMax: ""
};
function validate(form) {
  const errors = {};
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
function FieldError({ msg, ocid }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", "data-ocid": ocid, children: msg });
}
function PostJob() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const editId = params.id ? BigInt(params.id) : null;
  const isEditMode = editId !== null;
  const { userRole, currentUser, isLoading: authLoading } = useAuth();
  const employer = currentUser;
  const { data: existingJob, isLoading: jobLoading } = useJob(editId);
  const postJob = usePostJob();
  const updateJob = useUpdateJob();
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!authLoading && userRole !== UserRole.Employer) {
      navigate({ to: "/auth" });
    }
  }, [authLoading, userRole, navigate]);
  reactExports.useEffect(() => {
    if (isEditMode && existingJob) {
      setForm({
        title: existingJob.title,
        description: existingJob.description,
        requirements: existingJob.requirements,
        jobType: existingJob.jobType,
        category: existingJob.category,
        location: existingJob.location,
        salaryMin: existingJob.salaryMin.toString(),
        salaryMax: existingJob.salaryMax.toString()
      });
    }
  }, [isEditMode, existingJob]);
  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updated = { ...form, [field]: value };
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };
  const blur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(EMPTY_FORM).map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      requirements: form.requirements.trim(),
      jobType: form.jobType,
      category: form.category,
      location: form.location.trim(),
      salaryMin: BigInt(Math.floor(Number.parseFloat(form.salaryMin))),
      salaryMax: BigInt(Math.floor(Number.parseFloat(form.salaryMax)))
    };
    try {
      if (isEditMode && editId !== null) {
        await updateJob.mutateAsync({ id: editId, form: payload });
        ue.success("Job listing updated successfully");
      } else {
        await postJob.mutateAsync(payload);
        ue.success("Job listing created successfully");
      }
      navigate({ to: "/employer/dashboard" });
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };
  const isPending = postJob.isPending || updateJob.isPending;
  const isLoading = authLoading || isEditMode && jobLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-full", "data-ocid": "post_job.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "mb-4 -ml-2 text-muted-foreground hover:text-foreground transition-smooth",
          onClick: () => navigate({ to: "/employer/dashboard" }),
          "data-ocid": "post_job.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
            "Back to Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: isEditMode ? "Edit Job Listing" : "Post a New Job" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: isEditMode ? "Update the details of your job listing." : "Fill in the details below to attract the best candidates." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-3xl", children: [
      employer && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6 bg-muted/40 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Posting as" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold font-display text-foreground truncate", children: employer.companyName })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, "data-ocid": "post_job.form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Job Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Provide accurate information to help candidates find your listing." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
                "Job Title ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "title",
                  placeholder: "e.g. Senior Software Engineer",
                  value: form.title,
                  onChange: (e) => set("title", e.target.value),
                  onBlur: () => blur("title"),
                  className: errors.title ? "border-destructive" : "",
                  "data-ocid": "post_job.title.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  msg: errors.title,
                  ocid: "post_job.title.field_error"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "jobType", children: [
                  "Job Type ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.jobType,
                    onValueChange: (v) => {
                      set("jobType", v);
                      setTouched((p) => ({ ...p, jobType: true }));
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "jobType",
                          className: errors.jobType ? "border-destructive" : "",
                          "data-ocid": "post_job.job_type.select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select job type" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(JOB_TYPE_LABELS).map((jt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: jt, children: JOB_TYPE_LABELS[jt] }, jt)) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    msg: errors.jobType,
                    ocid: "post_job.job_type.field_error"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "category", children: [
                  "Category ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.category,
                    onValueChange: (v) => {
                      set("category", v);
                      setTouched((p) => ({ ...p, category: true }));
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "category",
                          className: errors.category ? "border-destructive" : "",
                          "data-ocid": "post_job.category.select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(CATEGORY_LABELS).map(
                        (cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: CATEGORY_LABELS[cat] }, cat)
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    msg: errors.category,
                    ocid: "post_job.category.field_error"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "location", children: [
                "Location ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "location",
                  placeholder: "e.g. San Francisco, CA or Remote",
                  value: form.location,
                  onChange: (e) => set("location", e.target.value),
                  onBlur: () => blur("location"),
                  className: errors.location ? "border-destructive" : "",
                  "data-ocid": "post_job.location.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  msg: errors.location,
                  ocid: "post_job.location.field_error"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "salaryMin", children: [
                  "Min Salary (USD) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "salaryMin",
                    type: "number",
                    min: "0",
                    placeholder: "e.g. 60000",
                    value: form.salaryMin,
                    onChange: (e) => set("salaryMin", e.target.value),
                    onBlur: () => blur("salaryMin"),
                    className: errors.salaryMin ? "border-destructive" : "",
                    "data-ocid": "post_job.salary_min.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    msg: errors.salaryMin,
                    ocid: "post_job.salary_min.field_error"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "salaryMax", children: [
                  "Max Salary (USD) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "salaryMax",
                    type: "number",
                    min: "0",
                    placeholder: "e.g. 90000",
                    value: form.salaryMax,
                    onChange: (e) => set("salaryMax", e.target.value),
                    onBlur: () => blur("salaryMax"),
                    className: errors.salaryMax ? "border-destructive" : "",
                    "data-ocid": "post_job.salary_max.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    msg: errors.salaryMax,
                    ocid: "post_job.salary_max.field_error"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", children: [
                "Job Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  placeholder: "Describe the role, responsibilities, team culture, and what success looks like… (min 100 characters)",
                  rows: 6,
                  value: form.description,
                  onChange: (e) => set("description", e.target.value),
                  onBlur: () => blur("description"),
                  className: `resize-y ${errors.description ? "border-destructive" : ""}`,
                  "data-ocid": "post_job.description.textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    msg: errors.description,
                    ocid: "post_job.description.field_error"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-xs ml-auto ${form.description.trim().length < 100 ? "text-muted-foreground" : "text-accent"}`,
                    children: [
                      form.description.trim().length,
                      "/100 min"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "requirements", children: [
                "Requirements ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "requirements",
                  placeholder: "List required skills, experience, education, and qualifications…",
                  rows: 5,
                  value: form.requirements,
                  onChange: (e) => set("requirements", e.target.value),
                  onBlur: () => blur("requirements"),
                  className: `resize-y ${errors.requirements ? "border-destructive" : ""}`,
                  "data-ocid": "post_job.requirements.textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  msg: errors.requirements,
                  ocid: "post_job.requirements.field_error"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({ to: "/employer/dashboard" }),
              disabled: isPending,
              "data-ocid": "post_job.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isPending,
              className: "min-w-[140px] transition-smooth",
              "data-ocid": "post_job.submit_button",
              children: isPending ? isEditMode ? "Saving…" : "Posting…" : isEditMode ? "Save Changes" : "Post Job"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  PostJob as default
};
