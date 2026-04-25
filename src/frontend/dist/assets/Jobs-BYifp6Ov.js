import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Presence, b as Primitive, d as useControllableState, e as useComposedRefs, f as composeEventHandlers, g as useSize, h as createContextScope, i as cn, u as useNavigate, k as useSearch, B as Button, L as Link, X, a as Briefcase, C as Category, J as JobType } from "./index-CQLXwtRZ.js";
import { M as MapPin, B as Badge } from "./badge-D9EY50nS.js";
import { u as usePrevious, C as Check, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DqOJvwqj.js";
import { I as Input } from "./input-BlgGYtX8.js";
import { L as Label } from "./label-DzhWKyXj.js";
import { S as Skeleton, C as CATEGORY_LABELS, J as JOB_TYPE_LABELS } from "./skeleton-DBNMZiHs.js";
import { a as useSearchJobs } from "./use-jobs-Db2dDDM2.js";
import { S as Search } from "./search-Dd5JcW7w.js";
import { C as ChevronRight } from "./chevron-right-BRdvZt9k.js";
import { B as Building2 } from "./building-2-BzDCztNH.js";
import { D as DollarSign } from "./dollar-sign-C79inp8g.js";
import "./index-DQwN6c6T.js";
import "./chevron-up-DR79tzHC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const JOBS_PER_PAGE = 10;
const ALL_CATEGORIES = Object.values(Category);
const ALL_JOB_TYPES = Object.values(JobType);
function formatSalary(n) {
  const num = Number(n);
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}k`;
  return `$${num}`;
}
function snippetText(text, maxLen = 120) {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).replace(/\s\S*$/, "")}…`;
}
const jobTypeBadgeClass = {
  [JobType.FullTime]: "bg-primary/10 text-primary border-primary/20",
  [JobType.PartTime]: "bg-accent/10 text-accent border-accent/20",
  [JobType.Remote]: "bg-secondary text-secondary-foreground border-border"
};
function JobCard({ job, position }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/jobs/$id",
      params: { id: job.id.toString() },
      "data-ocid": `jobs.item.${position}`,
      className: "group block rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight group-hover:text-primary transition-colors truncate", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate mt-0.5", children: job.companyName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `flex-shrink-0 text-xs border ${jobTypeBadgeClass[job.jobType]}`,
              variant: "outline",
              children: JOB_TYPE_LABELS[job.jobType]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
            job.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3.5 h-3.5" }),
            CATEGORY_LABELS[job.category]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3.5 h-3.5" }),
            formatSalary(job.salaryMin),
            " – ",
            formatSalary(job.salaryMax),
            " / yr"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-2", children: snippetText(job.description) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-primary group-hover:underline transition-smooth", children: "View Job →" }) })
      ]
    }
  );
}
function JobCardSkeleton({ position }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `jobs.loading_state.${position}`,
      className: "rounded-xl border border-border bg-card p-5 space-y-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" })
      ]
    }
  );
}
function FilterSidebar({
  filters,
  onChange,
  onClear,
  mobileOpen,
  onMobileClose
}) {
  const activeCount = (filters.category ? 1 : 0) + filters.jobTypes.length + (filters.salaryMin ? 1 : 0) + (filters.salaryMax ? 1 : 0);
  const toggleJobType = (jt) => {
    const already = filters.jobTypes.includes(jt);
    onChange({
      ...filters,
      jobTypes: already ? filters.jobTypes.filter((t) => t !== jt) : [...filters.jobTypes, jt]
    });
  };
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground text-sm uppercase tracking-wide", children: [
        "Filters",
        activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-primary", children: [
          "(",
          activeCount,
          ")"
        ] })
      ] }),
      activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClear,
          "data-ocid": "jobs.filters.clear_button",
          className: "text-xs text-muted-foreground hover:text-destructive transition-colors",
          children: "Clear all"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: filters.category ?? "all",
          onValueChange: (val) => onChange({
            ...filters,
            category: val === "all" ? null : val
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                "data-ocid": "jobs.filters.category_select",
                className: "bg-background",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Categories" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Categories" }),
              ALL_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: CATEGORY_LABELS[cat] }, cat))
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          "data-ocid": "jobs.filters.location_input",
          placeholder: "City, state, or remote",
          value: filters.location,
          onChange: (e) => onChange({ ...filters, location: e.target.value }),
          className: "bg-background"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Job Type" }),
      ALL_JOB_TYPES.map((jt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: `jt-${jt}`,
            "data-ocid": `jobs.filters.jobtype_${jt.toLowerCase()}`,
            checked: filters.jobTypes.includes(jt),
            onCheckedChange: () => toggleJobType(jt)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: `jt-${jt}`,
            className: "text-sm text-foreground cursor-pointer select-none",
            children: JOB_TYPE_LABELS[jt]
          }
        )
      ] }, jt))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Salary Range (USD/yr)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "jobs.filters.salary_min_input",
            type: "number",
            placeholder: "Min",
            min: 0,
            value: filters.salaryMin,
            onChange: (e) => onChange({ ...filters, salaryMin: e.target.value }),
            className: "bg-background"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "jobs.filters.salary_max_input",
            type: "number",
            placeholder: "Max",
            min: 0,
            value: filters.salaryMax,
            onChange: (e) => onChange({ ...filters, salaryMax: e.target.value }),
            className: "bg-background"
          }
        )
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-64 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-24 rounded-xl border border-border bg-card p-5 shadow-sm", children: content }) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          role: "button",
          tabIndex: 0,
          "aria-label": "Close filters",
          className: "absolute inset-0 bg-foreground/20 backdrop-blur-sm",
          onClick: onMobileClose,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") onMobileClose();
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative ml-auto w-72 bg-card h-full p-5 overflow-y-auto shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onMobileClose,
              "aria-label": "Close filters",
              className: "p-1 rounded hover:bg-muted transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        content
      ] })
    ] })
  ] });
}
const EMPTY_FILTERS = {
  keyword: "",
  location: "",
  category: null,
  jobTypes: [],
  salaryMin: "",
  salaryMax: ""
};
function Jobs() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false });
  const [filters, setFilters] = reactExports.useState(() => ({
    keyword: searchParams.search ?? "",
    location: searchParams.location ?? "",
    category: searchParams.category ?? null,
    jobTypes: [],
    salaryMin: "",
    salaryMax: ""
  }));
  const [page, setPage] = reactExports.useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = reactExports.useState(false);
  const [searchBar, setSearchBar] = reactExports.useState({
    keyword: searchParams.search ?? "",
    location: searchParams.location ?? ""
  });
  reactExports.useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      keyword: searchParams.search ?? "",
      location: searchParams.location ?? "",
      category: searchParams.category ?? null
    }));
    setSearchBar({
      keyword: searchParams.search ?? "",
      location: searchParams.location ?? ""
    });
    setPage(1);
  }, [searchParams.search, searchParams.location, searchParams.category]);
  const activeJobType = filters.jobTypes.length === 1 ? filters.jobTypes[0] : null;
  const salaryMin = filters.salaryMin ? BigInt(filters.salaryMin) : null;
  const salaryMax = filters.salaryMax ? BigInt(filters.salaryMax) : null;
  const { data: allJobs, isLoading } = useSearchJobs(
    filters.keyword,
    filters.location,
    filters.category,
    activeJobType,
    salaryMin,
    salaryMax
  );
  const jobs = (allJobs ?? []).filter((job) => {
    if (filters.jobTypes.length <= 1) return true;
    return filters.jobTypes.includes(job.jobType);
  });
  const totalJobs = jobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / JOBS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );
  const handleFiltersChange = reactExports.useCallback(
    (f) => {
      setFilters(f);
      setPage(1);
      void navigate({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        search: Object.fromEntries(
          Object.entries({
            search: f.keyword || void 0,
            location: f.location || void 0,
            category: f.category || void 0
          }).filter(([, v]) => v !== void 0)
        )
      });
    },
    [navigate]
  );
  const handleClearFilters = reactExports.useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setSearchBar({ keyword: "", location: "" });
    setPage(1);
    void navigate({ search: {} });
  }, [navigate]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleFiltersChange({
      ...filters,
      keyword: searchBar.keyword,
      location: searchBar.location
    });
  };
  const hasFilters = !!filters.keyword || !!filters.location || !!filters.category || filters.jobTypes.length > 0 || !!filters.salaryMin || !!filters.salaryMax;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Browse Jobs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSearchSubmit,
          className: "flex flex-col sm:flex-row gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "jobs.search.keyword_input",
                  type: "text",
                  placeholder: "Job title, keyword, or company",
                  value: searchBar.keyword,
                  onChange: (e) => setSearchBar((s) => ({ ...s, keyword: e.target.value })),
                  className: "pl-9 bg-background"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:max-w-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "jobs.search.location_input",
                  type: "text",
                  placeholder: "Location",
                  value: searchBar.location,
                  onChange: (e) => setSearchBar((s) => ({ ...s, location: e.target.value })),
                  className: "pl-9 bg-background"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "jobs.search.submit_button",
                type: "submit",
                className: "flex-shrink-0",
                children: "Search Jobs"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterSidebar,
        {
          filters,
          onChange: handleFiltersChange,
          onClear: handleClearFilters,
          mobileOpen: mobileFiltersOpen,
          onMobileClose: () => setMobileFiltersOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5 flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground",
              "data-ocid": "jobs.results_count",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 inline-block" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: totalJobs }),
                " ",
                totalJobs === 1 ? "job" : "jobs",
                " found"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "lg:hidden gap-2",
              onClick: () => setMobileFiltersOpen(true),
              "data-ocid": "jobs.filters.open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
                "Filters"
              ]
            }
          )
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", "data-ocid": "jobs.loading_state", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCardSkeleton, { position: n }, `skeleton-${n}`)) }),
        !isLoading && jobs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "jobs.empty_state",
            className: "flex flex-col items-center justify-center py-20 text-center rounded-xl border border-border bg-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-7 h-7 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-2", children: "No jobs found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: hasFilters ? "Try adjusting your filters or search terms to find more results." : "There are no job listings yet. Check back soon!" }),
              hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: handleClearFilters,
                  "data-ocid": "jobs.empty_state.clear_filters_button",
                  children: "Clear filters"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "mt-2",
                  variant: hasFilters ? "ghost" : "default",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "jobs.empty_state.home_link", children: "Back to Home" })
                }
              )
            ]
          }
        ),
        !isLoading && jobs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: pageJobs.map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            JobCard,
            {
              job,
              position: (currentPage - 1) * JOBS_PER_PAGE + i + 1
            },
            job.id.toString()
          )) }),
          totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-8 pt-6 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: currentPage <= 1,
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                "data-ocid": "jobs.pagination_prev",
                className: "gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  "Previous"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-sm text-muted-foreground",
                "data-ocid": "jobs.pagination_info",
                children: [
                  "Page",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: currentPage }),
                  " ",
                  "of",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: totalPages })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: currentPage >= totalPages,
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                "data-ocid": "jobs.pagination_next",
                className: "gap-1",
                children: [
                  "Next",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Jobs as default
};
