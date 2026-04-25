import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Briefcase, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { UserRole } from "../types";

interface FieldError {
  name?: string;
  email?: string;
  password?: string;
  companyName?: string;
  companyDescription?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateSignUpSeeker(fields: {
  name: string;
  email: string;
  password: string;
}): FieldError {
  const errors: FieldError = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(fields.email))
    errors.email = "Enter a valid email address.";
  if (!fields.password) errors.password = "Password is required.";
  else if (fields.password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}

function validateSignUpEmployer(fields: {
  companyName: string;
  email: string;
  password: string;
  companyDescription: string;
}): FieldError {
  const errors: FieldError = {};
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

function validateSignIn(fields: {
  email: string;
  password: string;
}): FieldError {
  const errors: FieldError = {};
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
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error && (
        <p
          className="text-xs text-destructive"
          data-ocid={`auth.${id}.field_error`}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function Auth() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { redirect?: string };
  const redirectTo = (search as { redirect?: string })?.redirect ?? null;

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
    registerEmployerError,
  } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated && userRole !== null) {
      if (redirectTo) {
        navigate({ to: redirectTo as "/" });
      } else if (userRole === UserRole.Employer) {
        navigate({ to: "/employer/dashboard" });
      } else {
        navigate({ to: "/" });
      }
    }
  }, [isAuthenticated, userRole, authLoading, redirectTo, navigate]);

  // --- Sign Up state ---
  const [signUpRole, setSignUpRole] = useState<"seeker" | "employer">("seeker");

  // Seeker fields
  const [seekerName, setSeekerName] = useState("");
  const [seekerEmail, setSeekerEmail] = useState("");
  const [seekerPassword, setSeekerPassword] = useState("");
  const [seekerErrors, setSeekerErrors] = useState<FieldError>({});
  const [seekerServerError, setSeekerServerError] = useState("");

  // Employer fields
  const [empCompanyName, setEmpCompanyName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPassword, setEmpPassword] = useState("");
  const [empDescription, setEmpDescription] = useState("");
  const [empErrors, setEmpErrors] = useState<FieldError>({});
  const [empServerError, setEmpServerError] = useState("");

  // --- Sign In state ---
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState<FieldError>({});
  const [signInLoading, setSignInLoading] = useState(false);

  const isConnecting = loginStatus === "logging-in";

  async function handleSeekerSignUp(e: React.FormEvent) {
    e.preventDefault();
    setSeekerServerError("");
    const errors = validateSignUpSeeker({
      name: seekerName,
      email: seekerEmail,
      password: seekerPassword,
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
        education: "",
      });
      if (redirectTo) {
        navigate({ to: redirectTo as "/" });
      } else {
        navigate({ to: "/profile" });
      }
    } catch (err) {
      setSeekerServerError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    }
  }

  async function handleEmployerSignUp(e: React.FormEvent) {
    e.preventDefault();
    setEmpServerError("");
    const errors = validateSignUpEmployer({
      companyName: empCompanyName,
      email: empEmail,
      password: empPassword,
      companyDescription: empDescription,
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
        companyDescription: empDescription,
      });
      if (redirectTo) {
        navigate({ to: redirectTo as "/" });
      } else {
        navigate({ to: "/employer/post-job" });
      }
    } catch (err) {
      setEmpServerError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    }
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateSignIn({
      email: signInEmail,
      password: signInPassword,
    });
    setSignInErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSignInLoading(true);
    try {
      await login();
      // After login, role is fetched by useAuth. Redirect happens via useEffect above.
    } finally {
      setSignInLoading(false);
    }
  }

  const seekerSubmitting = registerSeekerPending || isConnecting;
  const employerSubmitting = registerEmployerPending || isConnecting;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome to JobPortal
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sign in or create your account to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList
              className="grid grid-cols-2 w-full mb-6"
              data-ocid="auth.tabs"
            >
              <TabsTrigger value="signin" data-ocid="auth.signin.tab">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" data-ocid="auth.signup.tab">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* ── SIGN IN ── */}
            <TabsContent value="signin">
              <form
                onSubmit={handleSignIn}
                noValidate
                className="flex flex-col gap-4"
              >
                <FieldRow
                  id="signin-email"
                  label="Email"
                  error={signInErrors.email}
                >
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    onBlur={() => {
                      const errs = validateSignIn({
                        email: signInEmail,
                        password: signInPassword,
                      });
                      setSignInErrors((p) => ({ ...p, email: errs.email }));
                    }}
                    autoComplete="email"
                    data-ocid="auth.signin.email.input"
                  />
                </FieldRow>

                <FieldRow
                  id="signin-password"
                  label="Password"
                  error={signInErrors.password}
                >
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    onBlur={() => {
                      const errs = validateSignIn({
                        email: signInEmail,
                        password: signInPassword,
                      });
                      setSignInErrors((p) => ({
                        ...p,
                        password: errs.password,
                      }));
                    }}
                    autoComplete="current-password"
                    data-ocid="auth.signin.password.input"
                  />
                </FieldRow>

                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={signInLoading || isConnecting}
                  data-ocid="auth.signin.submit_button"
                >
                  {signInLoading || isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-1">
                  We use Internet Identity for secure, passwordless
                  authentication.
                </p>
              </form>
            </TabsContent>

            {/* ── SIGN UP ── */}
            <TabsContent value="signup">
              {/* Role Toggle */}
              <div
                className="flex rounded-lg border border-border overflow-hidden mb-6"
                data-ocid="auth.signup.role_toggle"
              >
                <button
                  type="button"
                  onClick={() => setSignUpRole("seeker")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-smooth ${
                    signUpRole === "seeker"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                  data-ocid="auth.signup.seeker_toggle"
                >
                  <User className="w-4 h-4" />
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setSignUpRole("employer")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-smooth ${
                    signUpRole === "employer"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                  data-ocid="auth.signup.employer_toggle"
                >
                  <Briefcase className="w-4 h-4" />
                  Employer
                </button>
              </div>

              {/* Job Seeker Form */}
              {signUpRole === "seeker" && (
                <form
                  onSubmit={handleSeekerSignUp}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <FieldRow
                    id="seeker-name"
                    label="Full Name"
                    error={seekerErrors.name}
                  >
                    <Input
                      id="seeker-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={seekerName}
                      onChange={(e) => setSeekerName(e.target.value)}
                      onBlur={() => {
                        if (!seekerName.trim())
                          setSeekerErrors((p) => ({
                            ...p,
                            name: "Name is required.",
                          }));
                        else
                          setSeekerErrors((p) => ({ ...p, name: undefined }));
                      }}
                      autoComplete="name"
                      data-ocid="auth.signup.seeker.name.input"
                    />
                  </FieldRow>

                  <FieldRow
                    id="seeker-email"
                    label="Email"
                    error={seekerErrors.email}
                  >
                    <Input
                      id="seeker-email"
                      type="email"
                      placeholder="you@example.com"
                      value={seekerEmail}
                      onChange={(e) => setSeekerEmail(e.target.value)}
                      onBlur={() => {
                        const errs = validateSignUpSeeker({
                          name: seekerName,
                          email: seekerEmail,
                          password: seekerPassword,
                        });
                        setSeekerErrors((p) => ({ ...p, email: errs.email }));
                      }}
                      autoComplete="email"
                      data-ocid="auth.signup.seeker.email.input"
                    />
                  </FieldRow>

                  <FieldRow
                    id="seeker-password"
                    label="Password"
                    error={seekerErrors.password}
                  >
                    <Input
                      id="seeker-password"
                      type="password"
                      placeholder="••••••••"
                      value={seekerPassword}
                      onChange={(e) => setSeekerPassword(e.target.value)}
                      onBlur={() => {
                        const errs = validateSignUpSeeker({
                          name: seekerName,
                          email: seekerEmail,
                          password: seekerPassword,
                        });
                        setSeekerErrors((p) => ({
                          ...p,
                          password: errs.password,
                        }));
                      }}
                      autoComplete="new-password"
                      data-ocid="auth.signup.seeker.password.input"
                    />
                  </FieldRow>

                  {(seekerServerError || registerSeekerError) && (
                    <p
                      className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2"
                      data-ocid="auth.signup.seeker.error_state"
                    >
                      {seekerServerError ||
                        (registerSeekerError instanceof Error
                          ? registerSeekerError.message
                          : "Registration failed.")}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={seekerSubmitting}
                    data-ocid="auth.signup.seeker.submit_button"
                  >
                    {seekerSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              )}

              {/* Employer Form */}
              {signUpRole === "employer" && (
                <form
                  onSubmit={handleEmployerSignUp}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <FieldRow
                    id="emp-name"
                    label="Company Name"
                    error={empErrors.companyName}
                  >
                    <Input
                      id="emp-name"
                      type="text"
                      placeholder="Acme Corp"
                      value={empCompanyName}
                      onChange={(e) => setEmpCompanyName(e.target.value)}
                      onBlur={() => {
                        if (!empCompanyName.trim())
                          setEmpErrors((p) => ({
                            ...p,
                            companyName: "Company name is required.",
                          }));
                        else
                          setEmpErrors((p) => ({
                            ...p,
                            companyName: undefined,
                          }));
                      }}
                      autoComplete="organization"
                      data-ocid="auth.signup.employer.company_name.input"
                    />
                  </FieldRow>

                  <FieldRow
                    id="emp-email"
                    label="Email"
                    error={empErrors.email}
                  >
                    <Input
                      id="emp-email"
                      type="email"
                      placeholder="hr@company.com"
                      value={empEmail}
                      onChange={(e) => setEmpEmail(e.target.value)}
                      onBlur={() => {
                        const errs = validateSignUpEmployer({
                          companyName: empCompanyName,
                          email: empEmail,
                          password: empPassword,
                          companyDescription: empDescription,
                        });
                        setEmpErrors((p) => ({ ...p, email: errs.email }));
                      }}
                      autoComplete="email"
                      data-ocid="auth.signup.employer.email.input"
                    />
                  </FieldRow>

                  <FieldRow
                    id="emp-password"
                    label="Password"
                    error={empErrors.password}
                  >
                    <Input
                      id="emp-password"
                      type="password"
                      placeholder="••••••••"
                      value={empPassword}
                      onChange={(e) => setEmpPassword(e.target.value)}
                      onBlur={() => {
                        const errs = validateSignUpEmployer({
                          companyName: empCompanyName,
                          email: empEmail,
                          password: empPassword,
                          companyDescription: empDescription,
                        });
                        setEmpErrors((p) => ({
                          ...p,
                          password: errs.password,
                        }));
                      }}
                      autoComplete="new-password"
                      data-ocid="auth.signup.employer.password.input"
                    />
                  </FieldRow>

                  <FieldRow
                    id="emp-description"
                    label="Company Description"
                    error={empErrors.companyDescription}
                  >
                    <Textarea
                      id="emp-description"
                      placeholder="Tell job seekers about your company, culture, and mission…"
                      value={empDescription}
                      onChange={(e) => setEmpDescription(e.target.value)}
                      onBlur={() => {
                        if (!empDescription.trim())
                          setEmpErrors((p) => ({
                            ...p,
                            companyDescription:
                              "Company description is required.",
                          }));
                        else
                          setEmpErrors((p) => ({
                            ...p,
                            companyDescription: undefined,
                          }));
                      }}
                      rows={3}
                      data-ocid="auth.signup.employer.description.textarea"
                    />
                  </FieldRow>

                  {(empServerError || registerEmployerError) && (
                    <p
                      className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2"
                      data-ocid="auth.signup.employer.error_state"
                    >
                      {empServerError ||
                        (registerEmployerError instanceof Error
                          ? registerEmployerError.message
                          : "Registration failed.")}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={employerSubmitting}
                    data-ocid="auth.signup.employer.submit_button"
                  >
                    {employerSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      "Create Employer Account"
                    )}
                  </Button>
                </form>
              )}

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secured via Internet Identity — no passwords stored.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
