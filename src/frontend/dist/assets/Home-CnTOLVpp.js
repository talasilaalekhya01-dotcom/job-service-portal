import { c as createLucideIcon, r as reactExports, u as useNavigate, C as Category, j as jsxRuntimeExports, B as Button, a as Briefcase, J as JobType } from "./index-CQLXwtRZ.js";
import { B as Badge, M as MapPin } from "./badge-D9EY50nS.js";
import { C as Card, a as CardContent } from "./card-Brqk0R1W.js";
import { I as Input } from "./input-BlgGYtX8.js";
import { S as Skeleton, J as JOB_TYPE_LABELS } from "./skeleton-DBNMZiHs.js";
import { u as useAllJobs } from "./use-jobs-Db2dDDM2.js";
import { S as Search } from "./search-Dd5JcW7w.js";
import { C as CircleCheck } from "./circle-check-BmD10D12.js";
import { U as Users } from "./users-Cha3jiJv.js";
import { B as Building2 } from "./building-2-BzDCztNH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const SKELETON_KEYS = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8"
];
const CATEGORIES = [
  {
    key: Category.IT,
    label: "Information Technology",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 22 }),
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    key: Category.Healthcare,
    label: "Healthcare",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 22 }),
    color: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    key: Category.Finance,
    label: "Finance",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 22 }),
    color: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    key: Category.Education,
    label: "Education",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 22 }),
    color: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    key: Category.Engineering,
    label: "Engineering",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 22 }),
    color: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    key: Category.Marketing,
    label: "Marketing",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 22 }),
    color: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    key: Category.Sales,
    label: "Sales",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 22 }),
    color: "bg-cyan-50 text-cyan-700 border-cyan-200"
  },
  {
    key: Category.Design,
    label: "Design",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 22 }),
    color: "bg-violet-50 text-violet-700 border-violet-200"
  }
];
const JOB_TYPE_COLORS = {
  [JobType.FullTime]: "bg-accent/15 text-accent-foreground border-accent/30",
  [JobType.PartTime]: "bg-primary/10 text-primary border-primary/25",
  [JobType.Remote]: "bg-emerald-100 text-emerald-800 border-emerald-200"
};
function JobCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
    ] })
  ] }) });
}
function JobCard({ job }) {
  const navigate = useNavigate();
  const typeLabel = JOB_TYPE_LABELS[job.jobType] ?? String(job.jobType);
  const typeColor = JOB_TYPE_COLORS[job.jobType] ?? "";
  const salaryDisplay = job.salaryMin > 0n || job.salaryMax > 0n ? `$${Number(job.salaryMin).toLocaleString()} – $${Number(job.salaryMax).toLocaleString()}` : "Salary not listed";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      "data-ocid": "recent_jobs.item",
      className: "border border-border hover:border-primary/40 hover:shadow-md transition-smooth cursor-pointer group bg-card",
      onClick: () => navigate({ to: "/jobs/$id", params: { id: job.id.toString() } }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug", children: job.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 13, className: "shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: job.companyName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13, className: "shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: job.location || "Remote" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColor}`,
              children: typeLabel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: salaryDisplay })
        ] })
      ] })
    }
  );
}
function CategoryCard({
  cat,
  count,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `category.${cat.key.toLowerCase()}.button`,
      onClick,
      className: `group flex flex-col items-center gap-3 p-5 rounded-xl border transition-smooth hover:shadow-md hover:-translate-y-0.5 text-center w-full ${cat.color}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: cat.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm leading-tight", children: cat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-70 mt-0.5", children: [
            count,
            " job",
            count !== 1 ? "s" : ""
          ] })
        ] })
      ]
    }
  );
}
function Home() {
  const [keyword, setKeyword] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const navigate = useNavigate();
  const { data: allJobs = [], isLoading } = useAllJobs();
  const categoryCounts = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.key] = allJobs.filter((j) => j.category === cat.key).length;
      return acc;
    },
    {}
  );
  const recentJobs = [...allJobs].sort((a, b) => Number(b.postedAt) - Number(a.postedAt)).slice(0, 8);
  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (keyword) params.search = keyword;
    if (location) params.location = location;
    navigate({ to: "/jobs", search: params });
  };
  const handleCategoryClick = (catKey) => {
    navigate({ to: "/jobs", search: { category: catKey } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "hero.section",
        className: "relative min-h-[520px] flex items-center justify-center overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2340 60%, #162d4f 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-job-portal.dim_1600x600.jpg",
              alt: "",
              className: "absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f2340]/60",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-4xl mx-auto px-4 py-20 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-5 bg-white/15 text-white border border-white/25 text-xs font-medium px-3 py-1 backdrop-blur-sm", children: [
              "🚀",
              " ",
              allJobs.length > 0 ? `${allJobs.length.toLocaleString()}+` : "1,000+",
              " ",
              "jobs available"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight", children: [
              "Find Your ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-teal-300", children: "Dream Job" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-lg sm:text-xl mb-10 max-w-xl mx-auto font-body", children: "Connect with top employers and discover opportunities that match your skills and ambitions." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSearch,
                className: "bg-white rounded-2xl shadow-2xl p-2.5 flex flex-col sm:flex-row gap-2 items-stretch max-w-2xl mx-auto",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 px-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, className: "text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "hero.search_input",
                        value: keyword,
                        onChange: (e) => setKeyword(e.target.value),
                        placeholder: "Job title or keyword...",
                        className: "border-0 shadow-none focus-visible:ring-0 p-0 text-foreground placeholder:text-muted-foreground bg-transparent"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px bg-border hidden sm:block self-stretch my-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 px-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        "data-ocid": "hero.location_input",
                        value: location,
                        onChange: (e) => setLocation(e.target.value),
                        placeholder: "City or remote...",
                        className: "border-0 shadow-none focus-visible:ring-0 p-0 text-foreground placeholder:text-muted-foreground bg-transparent"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      "data-ocid": "hero.search_button",
                      size: "lg",
                      className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-xl shrink-0",
                      children: "Search"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 text-sm mt-4", children: [
              "Popular:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleCategoryClick(Category.IT),
                  className: "text-teal-300 hover:underline mx-1",
                  children: "Software Engineering"
                }
              ),
              "·",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleCategoryClick(Category.Design),
                  className: "text-teal-300 hover:underline mx-1",
                  children: "Design"
                }
              ),
              "·",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleCategoryClick(Category.Finance),
                  className: "text-teal-300 hover:underline mx-1",
                  children: "Finance"
                }
              ),
              "·",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleCategoryClick(Category.Healthcare),
                  className: "text-teal-300 hover:underline mx-1",
                  children: "Healthcare"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 py-5 grid grid-cols-3 divide-x divide-border text-center", children: [
      {
        label: "Jobs Posted",
        value: allJobs.length > 0 ? allJobs.length.toLocaleString() : "1,200+"
      },
      { label: "Companies Hiring", value: "320+" },
      { label: "Job Seekers", value: "45,000+" }
    ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
    ] }, label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "categories.section",
        className: "bg-background py-16 px-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Browse by Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Explore opportunities in your field" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategoryCard,
            {
              cat,
              count: categoryCounts[cat.key] ?? 0,
              onClick: () => handleCategoryClick(cat.key)
            },
            cat.key
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "recent_jobs.section",
        className: "bg-muted/30 py-16 px-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Recent Job Listings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Fresh opportunities posted by top employers" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "recent_jobs.view_all_button",
                variant: "outline",
                onClick: () => navigate({ to: "/jobs" }),
                className: "font-medium",
                children: [
                  "View All Jobs ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15, className: "ml-1.5" })
                ]
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCardSkeleton, {}, k)) }) : recentJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "recent_jobs.empty_state",
              className: "text-center py-16 bg-card rounded-2xl border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Briefcase,
                  {
                    size: 48,
                    className: "mx-auto text-muted-foreground/40 mb-4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No jobs posted yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "mt-4",
                    onClick: () => navigate({ to: "/employer/post-job" }),
                    "data-ocid": "recent_jobs.post_job_cta",
                    children: "Be the first to post a job"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: recentJobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job }, job.id.toString())) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "employer_cta.section",
        className: "relative bg-card border-t border-border py-20 px-4 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -right-24 -top-24 w-80 h-80 rounded-full opacity-5 bg-primary blur-3xl pointer-events-none",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -left-20 -bottom-20 w-64 h-64 rounded-full opacity-5 bg-accent blur-3xl pointer-events-none",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-3xl mx-auto text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-accent/15 text-accent-foreground border-accent/30 text-xs px-3 py-1", children: "For Employers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight", children: [
              "Are you hiring?",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Post a job today" }),
              " and reach thousands of talented candidates."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-8 max-w-lg mx-auto", children: "Join hundreds of companies already using our platform to find top talent fast. Posting is quick and free." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "employer_cta.post_job_button",
                  size: "lg",
                  onClick: () => navigate({ to: "/employer/post-job" }),
                  className: "font-semibold px-8",
                  children: [
                    "Post a Job ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "ml-1.5" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "employer_cta.dashboard_button",
                  variant: "outline",
                  size: "lg",
                  onClick: () => navigate({ to: "/employer/dashboard" }),
                  className: "font-medium px-8",
                  children: "Employer Dashboard"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground", children: [
              "Free to post",
              "Reach 45k+ seekers",
              "Manage applicants easily",
              "No credit card required"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, className: "text-accent" }),
              item
            ] }, item)) })
          ] })
        ]
      }
    )
  ] });
}
export {
  Home as default
};
