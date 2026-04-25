import { r as reactExports, v as useDirection, d as useControllableState, j as jsxRuntimeExports, b as Primitive, l as useId, w as Root, I as Item, f as composeEventHandlers, P as Presence, x as createRovingFocusGroupScope, h as createContextScope, i as cn, u as useNavigate, k as useSearch, t as useAuth, U as UserRole, a as Briefcase, B as Button, y as User } from "./index-CQLXwtRZ.js";
import { I as Input } from "./input-BlgGYtX8.js";
import { L as Label } from "./label-DzhWKyXj.js";
import { T as Textarea } from "./textarea-fdzyk_XF.js";
import { L as LoaderCircle } from "./loader-circle-DWMmpQDG.js";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateSignUpSeeker(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(fields.email))
    errors.email = "Enter a valid email address.";
  if (!fields.password) errors.password = "Password is required.";
  else if (fields.password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}
function validateSignUpEmployer(fields) {
  const errors = {};
  if (!fields.companyName.trim())
    errors.companyName = "Company name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(fields.email))
    errors.email = "Enter a valid email address.";
  if (!fields.password) errors.password = "Password is required.";
  else if (fields.password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  if (!fields.companyDescription.trim())
    errors.companyDescription = "Company description is required.";
  return errors;
}
function validateSignIn(fields) {
  const errors = {};
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(fields.email))
    errors.email = "Enter a valid email address.";
  if (!fields.password) errors.password = "Password is required.";
  else if (fields.password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}
function FieldRow({
  id,
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-sm font-medium text-foreground", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-destructive",
        "data-ocid": `auth.${id}.field_error`,
        children: error
      }
    )
  ] });
}
function Auth() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const redirectTo = (search == null ? void 0 : search.redirect) ?? null;
  const {
    isAuthenticated,
    userRole,
    isLoading: authLoading,
    login,
    loginStatus,
    registerSeeker,
    registerEmployer,
    registerSeekerPending,
    registerEmployerPending,
    registerSeekerError,
    registerEmployerError
  } = useAuth();
  reactExports.useEffect(() => {
    if (!authLoading && isAuthenticated && userRole !== null) {
      if (redirectTo) {
        navigate({ to: redirectTo });
      } else if (userRole === UserRole.Employer) {
        navigate({ to: "/employer/dashboard" });
      } else {
        navigate({ to: "/" });
      }
    }
  }, [isAuthenticated, userRole, authLoading, redirectTo, navigate]);
  const [signUpRole, setSignUpRole] = reactExports.useState("seeker");
  const [seekerName, setSeekerName] = reactExports.useState("");
  const [seekerEmail, setSeekerEmail] = reactExports.useState("");
  const [seekerPassword, setSeekerPassword] = reactExports.useState("");
  const [seekerErrors, setSeekerErrors] = reactExports.useState({});
  const [seekerServerError, setSeekerServerError] = reactExports.useState("");
  const [empCompanyName, setEmpCompanyName] = reactExports.useState("");
  const [empEmail, setEmpEmail] = reactExports.useState("");
  const [empPassword, setEmpPassword] = reactExports.useState("");
  const [empDescription, setEmpDescription] = reactExports.useState("");
  const [empErrors, setEmpErrors] = reactExports.useState({});
  const [empServerError, setEmpServerError] = reactExports.useState("");
  const [signInEmail, setSignInEmail] = reactExports.useState("");
  const [signInPassword, setSignInPassword] = reactExports.useState("");
  const [signInErrors, setSignInErrors] = reactExports.useState({});
  const [signInLoading, setSignInLoading] = reactExports.useState(false);
  const isConnecting = loginStatus === "logging-in";
  async function handleSeekerSignUp(e) {
    e.preventDefault();
    setSeekerServerError("");
    const errors = validateSignUpSeeker({
      name: seekerName,
      email: seekerEmail,
      password: seekerPassword
    });
    setSeekerErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (!isAuthenticated) {
      await login();
    }
    try {
      await registerSeeker({
        email: seekerEmail,
        name: seekerName,
        skills: "",
        experienceLevel: "",
        education: ""
      });
      if (redirectTo) {
        navigate({ to: redirectTo });
      } else {
        navigate({ to: "/profile" });
      }
    } catch (err) {
      setSeekerServerError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    }
  }
  async function handleEmployerSignUp(e) {
    e.preventDefault();
    setEmpServerError("");
    const errors = validateSignUpEmployer({
      companyName: empCompanyName,
      email: empEmail,
      password: empPassword,
      companyDescription: empDescription
    });
    setEmpErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (!isAuthenticated) {
      await login();
    }
    try {
      await registerEmployer({
        email: empEmail,
        companyName: empCompanyName,
        companyDescription: empDescription
      });
      if (redirectTo) {
        navigate({ to: redirectTo });
      } else {
        navigate({ to: "/employer/post-job" });
      }
    } catch (err) {
      setEmpServerError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    }
  }
  async function handleSignIn(e) {
    e.preventDefault();
    const errors = validateSignIn({
      email: signInEmail,
      password: signInPassword
    });
    setSignInErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSignInLoading(true);
    try {
      await login();
    } finally {
      setSignInLoading(false);
    }
  }
  const seekerSubmitting = registerSeekerPending || isConnecting;
  const employerSubmitting = registerEmployerPending || isConnecting;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] bg-muted/30 flex items-center justify-center py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Welcome to JobPortal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Sign in or create your account to get started" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border shadow-sm p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "signin", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsList,
        {
          className: "grid grid-cols-2 w-full mb-6",
          "data-ocid": "auth.tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signin", "data-ocid": "auth.signin.tab", children: "Sign In" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signup", "data-ocid": "auth.signup.tab", children: "Sign Up" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSignIn,
          noValidate: true,
          className: "flex flex-col gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FieldRow,
              {
                id: "signin-email",
                label: "Email",
                error: signInErrors.email,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "signin-email",
                    type: "email",
                    placeholder: "you@example.com",
                    value: signInEmail,
                    onChange: (e) => setSignInEmail(e.target.value),
                    onBlur: () => {
                      const errs = validateSignIn({
                        email: signInEmail,
                        password: signInPassword
                      });
                      setSignInErrors((p) => ({ ...p, email: errs.email }));
                    },
                    autoComplete: "email",
                    "data-ocid": "auth.signin.email.input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FieldRow,
              {
                id: "signin-password",
                label: "Password",
                error: signInErrors.password,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "signin-password",
                    type: "password",
                    placeholder: "••••••••",
                    value: signInPassword,
                    onChange: (e) => setSignInPassword(e.target.value),
                    onBlur: () => {
                      const errs = validateSignIn({
                        email: signInEmail,
                        password: signInPassword
                      });
                      setSignInErrors((p) => ({
                        ...p,
                        password: errs.password
                      }));
                    },
                    autoComplete: "current-password",
                    "data-ocid": "auth.signin.password.input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full mt-2",
                disabled: signInLoading || isConnecting,
                "data-ocid": "auth.signin.submit_button",
                children: signInLoading || isConnecting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Signing in…"
                ] }) : "Sign In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-1", children: "We use Internet Identity for secure, passwordless authentication." })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "signup", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex rounded-lg border border-border overflow-hidden mb-6",
            "data-ocid": "auth.signup.role_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSignUpRole("seeker"),
                  className: `flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-smooth ${signUpRole === "seeker" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`,
                  "data-ocid": "auth.signup.seeker_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                    "Job Seeker"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSignUpRole("employer"),
                  className: `flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-smooth ${signUpRole === "employer" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`,
                  "data-ocid": "auth.signup.employer_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }),
                    "Employer"
                  ]
                }
              )
            ]
          }
        ),
        signUpRole === "seeker" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSeekerSignUp,
            noValidate: true,
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldRow,
                {
                  id: "seeker-name",
                  label: "Full Name",
                  error: seekerErrors.name,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "seeker-name",
                      type: "text",
                      placeholder: "Jane Smith",
                      value: seekerName,
                      onChange: (e) => setSeekerName(e.target.value),
                      onBlur: () => {
                        if (!seekerName.trim())
                          setSeekerErrors((p) => ({
                            ...p,
                            name: "Name is required."
                          }));
                        else
                          setSeekerErrors((p) => ({ ...p, name: void 0 }));
                      },
                      autoComplete: "name",
                      "data-ocid": "auth.signup.seeker.name.input"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldRow,
                {
                  id: "seeker-email",
                  label: "Email",
                  error: seekerErrors.email,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "seeker-email",
                      type: "email",
                      placeholder: "you@example.com",
                      value: seekerEmail,
                      onChange: (e) => setSeekerEmail(e.target.value),
                      onBlur: () => {
                        const errs = validateSignUpSeeker({
                          name: seekerName,
                          email: seekerEmail,
                          password: seekerPassword
                        });
                        setSeekerErrors((p) => ({ ...p, email: errs.email }));
                      },
                      autoComplete: "email",
                      "data-ocid": "auth.signup.seeker.email.input"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldRow,
                {
                  id: "seeker-password",
                  label: "Password",
                  error: seekerErrors.password,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "seeker-password",
                      type: "password",
                      placeholder: "••••••••",
                      value: seekerPassword,
                      onChange: (e) => setSeekerPassword(e.target.value),
                      onBlur: () => {
                        const errs = validateSignUpSeeker({
                          name: seekerName,
                          email: seekerEmail,
                          password: seekerPassword
                        });
                        setSeekerErrors((p) => ({
                          ...p,
                          password: errs.password
                        }));
                      },
                      autoComplete: "new-password",
                      "data-ocid": "auth.signup.seeker.password.input"
                    }
                  )
                }
              ),
              (seekerServerError || registerSeekerError) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2",
                  "data-ocid": "auth.signup.seeker.error_state",
                  children: seekerServerError || (registerSeekerError instanceof Error ? registerSeekerError.message : "Registration failed.")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full mt-2",
                  disabled: seekerSubmitting,
                  "data-ocid": "auth.signup.seeker.submit_button",
                  children: seekerSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                    "Creating account…"
                  ] }) : "Create Account"
                }
              )
            ]
          }
        ),
        signUpRole === "employer" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleEmployerSignUp,
            noValidate: true,
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldRow,
                {
                  id: "emp-name",
                  label: "Company Name",
                  error: empErrors.companyName,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "emp-name",
                      type: "text",
                      placeholder: "Acme Corp",
                      value: empCompanyName,
                      onChange: (e) => setEmpCompanyName(e.target.value),
                      onBlur: () => {
                        if (!empCompanyName.trim())
                          setEmpErrors((p) => ({
                            ...p,
                            companyName: "Company name is required."
                          }));
                        else
                          setEmpErrors((p) => ({
                            ...p,
                            companyName: void 0
                          }));
                      },
                      autoComplete: "organization",
                      "data-ocid": "auth.signup.employer.company_name.input"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldRow,
                {
                  id: "emp-email",
                  label: "Email",
                  error: empErrors.email,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "emp-email",
                      type: "email",
                      placeholder: "hr@company.com",
                      value: empEmail,
                      onChange: (e) => setEmpEmail(e.target.value),
                      onBlur: () => {
                        const errs = validateSignUpEmployer({
                          companyName: empCompanyName,
                          email: empEmail,
                          password: empPassword,
                          companyDescription: empDescription
                        });
                        setEmpErrors((p) => ({ ...p, email: errs.email }));
                      },
                      autoComplete: "email",
                      "data-ocid": "auth.signup.employer.email.input"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldRow,
                {
                  id: "emp-password",
                  label: "Password",
                  error: empErrors.password,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "emp-password",
                      type: "password",
                      placeholder: "••••••••",
                      value: empPassword,
                      onChange: (e) => setEmpPassword(e.target.value),
                      onBlur: () => {
                        const errs = validateSignUpEmployer({
                          companyName: empCompanyName,
                          email: empEmail,
                          password: empPassword,
                          companyDescription: empDescription
                        });
                        setEmpErrors((p) => ({
                          ...p,
                          password: errs.password
                        }));
                      },
                      autoComplete: "new-password",
                      "data-ocid": "auth.signup.employer.password.input"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldRow,
                {
                  id: "emp-description",
                  label: "Company Description",
                  error: empErrors.companyDescription,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "emp-description",
                      placeholder: "Tell job seekers about your company, culture, and mission…",
                      value: empDescription,
                      onChange: (e) => setEmpDescription(e.target.value),
                      onBlur: () => {
                        if (!empDescription.trim())
                          setEmpErrors((p) => ({
                            ...p,
                            companyDescription: "Company description is required."
                          }));
                        else
                          setEmpErrors((p) => ({
                            ...p,
                            companyDescription: void 0
                          }));
                      },
                      rows: 3,
                      "data-ocid": "auth.signup.employer.description.textarea"
                    }
                  )
                }
              ),
              (empServerError || registerEmployerError) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2",
                  "data-ocid": "auth.signup.employer.error_state",
                  children: empServerError || (registerEmployerError instanceof Error ? registerEmployerError.message : "Registration failed.")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full mt-2",
                  disabled: employerSubmitting,
                  "data-ocid": "auth.signup.employer.submit_button",
                  children: employerSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                    "Creating account…"
                  ] }) : "Create Employer Account"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-4", children: "Secured via Internet Identity — no passwords stored." })
      ] })
    ] }) })
  ] }) });
}
export {
  Auth as default
};
