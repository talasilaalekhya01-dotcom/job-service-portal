import { c as createLucideIcon, j as jsxRuntimeExports, i as cn, u as useNavigate, t as useAuth, r as reactExports, U as UserRole, B as Button, K as CirclePlus, a as Briefcase, M as ChevronDown, H as ApplicationStatus } from "./index-CQLXwtRZ.js";
import { M as MapPin, B as Badge } from "./badge-D9EY50nS.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Brqk0R1W.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-CWnhgCML.js";
import { S as Skeleton, J as JOB_TYPE_LABELS, C as CATEGORY_LABELS, A as APPLICATION_STATUS_LABELS } from "./skeleton-DBNMZiHs.js";
import { u as ue } from "./index-Bge-Ylrg.js";
import { C as Calendar, b as useJobApplicants, c as useUpdateApplicationStatus } from "./use-applications-BXEcMmcX.js";
import { c as useEmployerJobs, d as useDeleteJob } from "./use-jobs-Db2dDDM2.js";
import { U as Users } from "./users-Cha3jiJv.js";
import { C as ChevronUp } from "./chevron-up-DR79tzHC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatSalary(min, max) {
  const fmt = (n) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number(n));
  return `${fmt(min)} – ${fmt(max)}`;
}
function statusVariant(status) {
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
function ApplicantsPanel({ jobId, jobTitle }) {
  const { data: applicants = [], isLoading } = useJobApplicants(jobId);
  const updateStatus = useUpdateApplicationStatus();
  const handleStatus = async (appId, status, label) => {
    try {
      await updateStatus.mutateAsync({ appId, status });
      ue.success(`Application marked as ${label}`);
    } catch {
      ue.error("Failed to update status");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", "data-ocid": "applicants.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) });
  }
  if (applicants.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-6 text-center text-muted-foreground text-sm",
        "data-ocid": "applicants.empty_state",
        children: [
          "No applicants yet for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: jobTitle }),
          "."
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", "data-ocid": "applicants.table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Applicant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Skills" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Experience" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Applied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: applicants.map((app, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      TableRow,
      {
        "data-ocid": `applicant.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: app.seeker.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-[160px] truncate text-sm text-muted-foreground", children: app.seeker.skills || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: app.seeker.experienceLevel || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground whitespace-nowrap", children: formatDate(app.application.appliedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: statusVariant(app.application.status),
              "data-ocid": `applicant.status.${idx + 1}`,
              children: APPLICATION_STATUS_LABELS[app.application.status]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 px-2 text-xs",
                title: "Mark as Viewed",
                "data-ocid": `applicant.viewed_button.${idx + 1}`,
                onClick: () => handleStatus(
                  app.application.id,
                  ApplicationStatus.Viewed,
                  "Viewed"
                ),
                disabled: updateStatus.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 mr-1" }),
                  "View"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 px-2 text-xs text-accent hover:text-accent",
                title: "Accept",
                "data-ocid": `applicant.accept_button.${idx + 1}`,
                onClick: () => handleStatus(
                  app.application.id,
                  ApplicationStatus.Accepted,
                  "Accepted"
                ),
                disabled: updateStatus.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1" }),
                  "Accept"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 px-2 text-xs text-destructive hover:text-destructive",
                title: "Reject",
                "data-ocid": `applicant.reject_button.${idx + 1}`,
                onClick: () => handleStatus(
                  app.application.id,
                  ApplicationStatus.Rejected,
                  "Rejected"
                ),
                disabled: updateStatus.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mr-1" }),
                  "Reject"
                ]
              }
            )
          ] }) })
        ]
      },
      app.application.id.toString()
    )) })
  ] }) });
}
function JobCard({ job, index, onDelete }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border border-border shadow-sm",
      "data-ocid": `employer.job.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold font-display text-foreground truncate", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 flex-shrink-0" }),
                  job.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 flex-shrink-0" }),
                  formatDate(job.postedAt)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: JOB_TYPE_LABELS[job.jobType] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: CATEGORY_LABELS[job.category] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: job.isActive ? "default" : "secondary",
                  className: "text-xs",
                  children: job.isActive ? "Active" : "Inactive"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: formatSalary(job.salaryMin, job.salaryMax) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-8 text-xs transition-smooth",
                  "data-ocid": `employer.job.edit_button.${index}`,
                  onClick: () => navigate({ to: `/employer/post-job/${job.id.toString()}` }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5 mr-1" }),
                    "Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-8 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5 transition-smooth",
                  "data-ocid": `employer.job.delete_button.${index}`,
                  onClick: () => onDelete(job.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 mr-1" }),
                    "Delete"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-8 text-xs transition-smooth",
                "data-ocid": `employer.job.applicants_button.${index}`,
                onClick: () => setExpanded((v) => !v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 mr-1" }),
                  "View Applicants",
                  expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5 ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 ml-1" })
                ]
              }
            )
          ] }),
          expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border-t border-border pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApplicantsPanel, { jobId: job.id, jobTitle: job.title }) })
        ] })
      ]
    }
  );
}
function EmployerDashboard() {
  const navigate = useNavigate();
  const { userRole, isLoading: authLoading } = useAuth();
  const { data: jobs = [], isLoading: jobsLoading } = useEmployerJobs();
  const deleteJob = useDeleteJob();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  if (!authLoading && userRole !== UserRole.Employer) {
    navigate({ to: "/auth" });
    return null;
  }
  const handleDeleteConfirm = async () => {
    if (deleteTarget === null) return;
    try {
      await deleteJob.mutateAsync(deleteTarget);
      ue.success("Job listing deleted successfully");
    } catch {
      ue.error("Failed to delete job listing");
    } finally {
      setDeleteTarget(null);
    }
  };
  const isLoading = authLoading || jobsLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-background min-h-full",
      "data-ocid": "employer.dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "Employer Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Manage your job listings and review applicants" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/employer/post-job" }),
              className: "transition-smooth",
              "data-ocid": "employer.post_job_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-2" }),
                "Post a Job"
              ]
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "employer.jobs.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-xl" }, i)) }) : jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "employer.jobs.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold font-display text-foreground mb-2", children: "No jobs posted yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm", children: "Create your first job listing to start receiving applications from qualified candidates." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => navigate({ to: "/employer/post-job" }),
                  className: "transition-smooth",
                  "data-ocid": "employer.empty.post_job_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-2" }),
                    "Post a Job"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "employer.jobs.list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            jobs.length,
            " job",
            jobs.length === 1 ? "" : "s",
            " posted"
          ] }),
          jobs.map((job, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            JobCard,
            {
              job,
              index: idx + 1,
              onDelete: (id) => setDeleteTarget(id)
            },
            job.id.toString()
          ))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: deleteTarget !== null,
            onOpenChange: (open) => {
              if (!open) setDeleteTarget(null);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "employer.delete.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Delete Job Listing" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Are you sure you want to delete this job listing? This action cannot be undone and all associated applications will be removed." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setDeleteTarget(null),
                    "data-ocid": "employer.delete.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    onClick: handleDeleteConfirm,
                    disabled: deleteJob.isPending,
                    "data-ocid": "employer.delete.confirm_button",
                    children: deleteJob.isPending ? "Deleting…" : "Delete"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  EmployerDashboard as default
};
