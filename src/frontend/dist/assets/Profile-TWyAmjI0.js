import { c as createLucideIcon, u as useNavigate, t as useAuth, z as useActor, E as createActor, F as useQueryClient, r as reactExports, U as UserRole, G as useMutation, j as jsxRuntimeExports, y as User, B as Button, a as Briefcase, L as Link, X, H as ApplicationStatus } from "./index-CQLXwtRZ.js";
import { u as ue } from "./index-Bge-Ylrg.js";
import { B as Badge, M as MapPin } from "./badge-D9EY50nS.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Brqk0R1W.js";
import { I as Input } from "./input-BlgGYtX8.js";
import { L as Label } from "./label-DzhWKyXj.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DqOJvwqj.js";
import { S as Skeleton, A as APPLICATION_STATUS_LABELS } from "./skeleton-DBNMZiHs.js";
import { u as useSeekerApplications, C as Calendar } from "./use-applications-BXEcMmcX.js";
import { m as motion } from "./proxy-DqYhziaT.js";
import { C as ChevronRight } from "./chevron-right-BRdvZt9k.js";
import { L as LoaderCircle } from "./loader-circle-DWMmpQDG.js";
import { C as CircleCheck } from "./circle-check-BmD10D12.js";
import "./index-DQwN6c6T.js";
import "./chevron-up-DR79tzHC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$2);
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
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
const STATUS_CLASSES = {
  [ApplicationStatus.Pending]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [ApplicationStatus.Viewed]: "bg-blue-100 text-blue-800 border-blue-200",
  [ApplicationStatus.Accepted]: "bg-emerald-100 text-emerald-800 border-emerald-200",
  [ApplicationStatus.Rejected]: "bg-red-100 text-red-800 border-red-200"
};
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_CLASSES[status]}`,
      children: APPLICATION_STATUS_LABELS[status]
    }
  );
}
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" })
  ] });
}
function ApplicationsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "applications.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between p-4 rounded-lg border border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
      ]
    },
    i
  )) });
}
function ApplicationRow({
  app,
  index
}) {
  const appliedDate = new Date(
    Number(app.application.appliedAt / 1000000n)
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      "data-ocid": `applications.item.${index + 1}`,
      className: "group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/jobs/$id",
              params: { id: app.job.id.toString() },
              "data-ocid": `applications.job_link.${index + 1}`,
              className: "font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 group-hover:underline",
              children: app.job.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: app.job.companyName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: app.job.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 shrink-0" }),
              appliedDate
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.application.status })
      ]
    }
  );
}
const EXPERIENCE_LEVELS = [
  { value: "Entry Level", label: "Entry Level" },
  { value: "Mid Level", label: "Mid Level" },
  { value: "Senior Level", label: "Senior Level" },
  { value: "Executive", label: "Executive" }
];
function Profile() {
  const navigate = useNavigate();
  const { currentUser, userRole, isLoading: authLoading } = useAuth();
  const { data: applications, isLoading: appsLoading } = useSeekerApplications();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    if (!authLoading && (!currentUser || userRole !== UserRole.JobSeeker)) {
      navigate({ to: "/auth" });
    }
  }, [authLoading, currentUser, userRole, navigate]);
  const seeker = userRole === UserRole.JobSeeker ? currentUser : null;
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState("");
  const [editSkills, setEditSkills] = reactExports.useState("");
  const [editExperience, setEditExperience] = reactExports.useState("");
  const [editEducation, setEditEducation] = reactExports.useState("");
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
        editEducation.trim()
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seekerProfile"] });
      setEditOpen(false);
      ue.success("Profile updated successfully!");
    },
    onError: (err) => {
      ue.error(err.message || "Failed to update profile.");
    }
  });
  const skillsList = (seeker == null ? void 0 : seeker.skills) ? seeker.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];
  if (authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-12 max-w-4xl",
        "data-ocid": "profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {})
      }
    );
  }
  if (!seeker) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground leading-tight", children: seeker.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: seeker.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: openEdit,
          "data-ocid": "profile.edit_button",
          className: "shrink-0 flex items-center gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            "Edit Profile"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" }),
              "Profile Details"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2", children: "Skills" }),
                skillsList.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: skillsList.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-xs font-medium",
                    children: skill
                  },
                  skill
                )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No skills listed yet." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-muted-foreground mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5", children: "Experience Level" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: seeker.experienceLevel || "—" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-muted-foreground mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5", children: "Education" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: seeker.education || "—" })
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "applications.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 text-primary" }),
              "My Applications",
              applications && applications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-1 text-xs", children: applications.length })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: appsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ApplicationsSkeleton, {}) : !applications || applications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "applications.empty_state",
                className: "text-center py-12 space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-7 w-7 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No applications yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mx-auto", children: "You haven't applied to any jobs yet. Browse jobs to get started." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      "data-ocid": "applications.browse_jobs_button",
                      className: "mt-2 inline-flex items-center gap-1.5",
                      children: [
                        "Browse Jobs",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                      ]
                    }
                  ) })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "applications.list", children: applications.map((app, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ApplicationRow,
              {
                app,
                index: i
              },
              app.application.id.toString()
            )) }) })
          ] })
        }
      )
    ] }),
    editOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "presentation",
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm",
        onClick: (e) => {
          if (e.target === e.currentTarget) setEditOpen(false);
        },
        onKeyDown: (e) => e.key === "Escape" && setEditOpen(false),
        "data-ocid": "profile.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.15 },
            className: "w-full max-w-md bg-card rounded-2xl shadow-xl border border-border overflow-hidden",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground", children: "Edit Profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEditOpen(false),
                    onKeyDown: (e) => e.key === "Escape" && setEditOpen(false),
                    "data-ocid": "profile.close_button",
                    className: "p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: "Full Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "edit-name",
                      value: editName,
                      onChange: (e) => setEditName(e.target.value),
                      "data-ocid": "profile.name_input",
                      placeholder: "Your full name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-skills", children: [
                    "Skills",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1 text-xs", children: "(comma-separated)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "edit-skills",
                      value: editSkills,
                      onChange: (e) => setEditSkills(e.target.value),
                      "data-ocid": "profile.skills_input",
                      placeholder: "e.g. React, TypeScript, Node.js"
                    }
                  ),
                  editSkills && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: editSkills.split(",").map((s) => s.trim()).filter(Boolean).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs",
                      children: skill
                    },
                    skill
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-experience", children: "Experience Level" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: editExperience,
                      onValueChange: setEditExperience,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            id: "edit-experience",
                            "data-ocid": "profile.experience_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EXPERIENCE_LEVELS.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: level.value, children: level.label }, level.value)) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-education", children: "Education" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "edit-education",
                      value: editEducation,
                      onChange: (e) => setEditEducation(e.target.value),
                      "data-ocid": "profile.education_input",
                      placeholder: "e.g. B.Sc Computer Science, MIT"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setEditOpen(false),
                    "data-ocid": "profile.cancel_button",
                    disabled: updateMutation.isPending,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => updateMutation.mutate(),
                    "data-ocid": "profile.save_button",
                    disabled: updateMutation.isPending || !editName.trim(),
                    className: "min-w-[110px]",
                    children: updateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Saving…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                      "Save Changes"
                    ] })
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  Profile as default
};
