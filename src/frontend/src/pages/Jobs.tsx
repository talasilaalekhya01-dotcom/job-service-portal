import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchJobs } from "../hooks/use-jobs";
import type { Job } from "../types";
import { CATEGORY_LABELS, Category, JOB_TYPE_LABELS, JobType } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────
const JOBS_PER_PAGE = 10;

const ALL_CATEGORIES = Object.values(Category) as Category[];
const ALL_JOB_TYPES = Object.values(JobType) as JobType[];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatSalary(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
  return `$${num}`;
}

function snippetText(text: string, maxLen = 120): string {
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).replace(/\s\S*$/, "")}…`;
}

const jobTypeBadgeClass: Record<JobType, string> = {
  [JobType.FullTime]: "bg-primary/10 text-primary border-primary/20",
  [JobType.PartTime]: "bg-accent/10 text-accent border-accent/20",
  [JobType.Remote]: "bg-secondary text-secondary-foreground border-border",
};

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, position }: { job: Job; position: number }) {
  return (
    <Link
      to="/jobs/$id"
      params={{ id: job.id.toString() }}
      data-ocid={`jobs.item.${position}`}
      className="group block rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-tight group-hover:text-primary transition-colors truncate">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {job.companyName}
            </p>
          </div>
        </div>
        <Badge
          className={`flex-shrink-0 text-xs border ${jobTypeBadgeClass[job.jobType]}`}
          variant="outline"
        >
          {JOB_TYPE_LABELS[job.jobType]}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Briefcase className="w-3.5 h-3.5" />
          {CATEGORY_LABELS[job.category]}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <DollarSign className="w-3.5 h-3.5" />
          {formatSalary(job.salaryMin)} – {formatSalary(job.salaryMax)} / yr
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {snippetText(job.description)}
      </p>

      <div className="mt-4 flex items-center justify-end">
        <span className="text-xs font-medium text-primary group-hover:underline transition-smooth">
          View Job →
        </span>
      </div>
    </Link>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function JobCardSkeleton({ position }: { position: number }) {
  return (
    <div
      data-ocid={`jobs.loading_state.${position}`}
      className="rounded-xl border border-border bg-card p-5 space-y-3"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
interface FilterState {
  keyword: string;
  location: string;
  category: Category | null;
  jobTypes: JobType[];
  salaryMin: string;
  salaryMax: string;
}

interface SidebarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClear: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function FilterSidebar({
  filters,
  onChange,
  onClear,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const activeCount =
    (filters.category ? 1 : 0) +
    filters.jobTypes.length +
    (filters.salaryMin ? 1 : 0) +
    (filters.salaryMax ? 1 : 0);

  const toggleJobType = (jt: JobType) => {
    const already = filters.jobTypes.includes(jt);
    onChange({
      ...filters,
      jobTypes: already
        ? filters.jobTypes.filter((t) => t !== jt)
        : [...filters.jobTypes, jt],
    });
  };

  const content = (
    <aside className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-wide">
          Filters
          {activeCount > 0 && (
            <span className="ml-1.5 text-primary">({activeCount})</span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            data-ocid="jobs.filters.clear_button"
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Category
        </Label>
        <Select
          value={filters.category ?? "all"}
          onValueChange={(val) =>
            onChange({
              ...filters,
              category: val === "all" ? null : (val as Category),
            })
          }
        >
          <SelectTrigger
            data-ocid="jobs.filters.category_select"
            className="bg-background"
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {ALL_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Location
        </Label>
        <Input
          data-ocid="jobs.filters.location_input"
          placeholder="City, state, or remote"
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          className="bg-background"
        />
      </div>

      {/* Job Type */}
      <div className="space-y-3">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Job Type
        </Label>
        {ALL_JOB_TYPES.map((jt) => (
          <div key={jt} className="flex items-center gap-2">
            <Checkbox
              id={`jt-${jt}`}
              data-ocid={`jobs.filters.jobtype_${jt.toLowerCase()}`}
              checked={filters.jobTypes.includes(jt)}
              onCheckedChange={() => toggleJobType(jt)}
            />
            <label
              htmlFor={`jt-${jt}`}
              className="text-sm text-foreground cursor-pointer select-none"
            >
              {JOB_TYPE_LABELS[jt]}
            </label>
          </div>
        ))}
      </div>

      {/* Salary Range */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Salary Range (USD/yr)
        </Label>
        <div className="flex gap-2">
          <Input
            data-ocid="jobs.filters.salary_min_input"
            type="number"
            placeholder="Min"
            min={0}
            value={filters.salaryMin}
            onChange={(e) =>
              onChange({ ...filters, salaryMin: e.target.value })
            }
            className="bg-background"
          />
          <Input
            data-ocid="jobs.filters.salary_max_input"
            type="number"
            placeholder="Max"
            min={0}
            value={filters.salaryMax}
            onChange={(e) =>
              onChange({ ...filters, salaryMax: e.target.value })
            }
            className="bg-background"
          />
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 rounded-xl border border-border bg-card p-5 shadow-sm">
          {content}
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            role="button"
            tabIndex={0}
            aria-label="Close filters"
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={onMobileClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onMobileClose();
            }}
          />
          <div className="relative ml-auto w-72 bg-card h-full p-5 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <span className="font-display font-semibold text-foreground">
                Filters
              </span>
              <button
                type="button"
                onClick={onMobileClose}
                aria-label="Close filters"
                className="p-1 rounded hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const EMPTY_FILTERS: FilterState = {
  keyword: "",
  location: "",
  category: null,
  jobTypes: [],
  salaryMin: "",
  salaryMax: "",
};

export default function Jobs() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;

  const [filters, setFilters] = useState<FilterState>(() => ({
    keyword: searchParams.search ?? "",
    location: searchParams.location ?? "",
    category: (searchParams.category as Category) ?? null,
    jobTypes: [],
    salaryMin: "",
    salaryMax: "",
  }));
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchBar, setSearchBar] = useState({
    keyword: searchParams.search ?? "",
    location: searchParams.location ?? "",
  });

  // Sync URL search params to filters when params change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      keyword: searchParams.search ?? "",
      location: searchParams.location ?? "",
      category: (searchParams.category as Category) ?? null,
    }));
    setSearchBar({
      keyword: searchParams.search ?? "",
      location: searchParams.location ?? "",
    });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.search, searchParams.location, searchParams.category]);

  // For backend query: use first selected type only (client filters for multi-select)
  const activeJobType =
    filters.jobTypes.length === 1 ? filters.jobTypes[0] : null;
  const salaryMin = filters.salaryMin ? BigInt(filters.salaryMin) : null;
  const salaryMax = filters.salaryMax ? BigInt(filters.salaryMax) : null;

  const { data: allJobs, isLoading } = useSearchJobs(
    filters.keyword,
    filters.location,
    filters.category,
    activeJobType,
    salaryMin,
    salaryMax,
  );

  // Client-side multi job-type filter
  const jobs: Job[] = (allJobs ?? []).filter((job) => {
    if (filters.jobTypes.length <= 1) return true;
    return filters.jobTypes.includes(job.jobType);
  });

  const totalJobs = jobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / JOBS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE,
  );

  const handleFiltersChange = useCallback(
    (f: FilterState) => {
      setFilters(f);
      setPage(1);
      void navigate({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        search: Object.fromEntries(
          Object.entries({
            search: f.keyword || undefined,
            location: f.location || undefined,
            category: f.category || undefined,
          }).filter(([, v]) => v !== undefined),
        ) as any,
      });
    },
    [navigate],
  );

  const handleClearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setSearchBar({ keyword: "", location: "" });
    setPage(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    void navigate({ search: {} as any });
  }, [navigate]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFiltersChange({
      ...filters,
      keyword: searchBar.keyword,
      location: searchBar.location,
    });
  };

  const hasFilters =
    !!filters.keyword ||
    !!filters.location ||
    !!filters.category ||
    filters.jobTypes.length > 0 ||
    !!filters.salaryMin ||
    !!filters.salaryMax;

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Browse Jobs
          </h1>
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="jobs.search.keyword_input"
                type="text"
                placeholder="Job title, keyword, or company"
                value={searchBar.keyword}
                onChange={(e) =>
                  setSearchBar((s) => ({ ...s, keyword: e.target.value }))
                }
                className="pl-9 bg-background"
              />
            </div>
            <div className="relative flex-1 sm:max-w-xs">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="jobs.search.location_input"
                type="text"
                placeholder="Location"
                value={searchBar.location}
                onChange={(e) =>
                  setSearchBar((s) => ({ ...s, location: e.target.value }))
                }
                className="pl-9 bg-background"
              />
            </div>
            <Button
              data-ocid="jobs.search.submit_button"
              type="submit"
              className="flex-shrink-0"
            >
              Search Jobs
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={handleFiltersChange}
            onClear={handleClearFilters}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          {/* Job Listings */}
          <div className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <p
                className="text-sm text-muted-foreground"
                data-ocid="jobs.results_count"
              >
                {isLoading ? (
                  <Skeleton className="h-4 w-28 inline-block" />
                ) : (
                  <>
                    <span className="font-semibold text-foreground">
                      {totalJobs}
                    </span>{" "}
                    {totalJobs === 1 ? "job" : "jobs"} found
                  </>
                )}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden gap-2"
                onClick={() => setMobileFiltersOpen(true)}
                data-ocid="jobs.filters.open_modal_button"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Loading skeletons */}
            {isLoading && (
              <div className="grid gap-4" data-ocid="jobs.loading_state">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <JobCardSkeleton key={`skeleton-${n}`} position={n} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && jobs.length === 0 && (
              <div
                data-ocid="jobs.empty_state"
                className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-border bg-card"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                  No jobs found
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs mb-6">
                  {hasFilters
                    ? "Try adjusting your filters or search terms to find more results."
                    : "There are no job listings yet. Check back soon!"}
                </p>
                {hasFilters && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    data-ocid="jobs.empty_state.clear_filters_button"
                  >
                    Clear filters
                  </Button>
                )}
                <Button
                  asChild
                  className="mt-2"
                  variant={hasFilters ? "ghost" : "default"}
                >
                  <Link to="/" data-ocid="jobs.empty_state.home_link">
                    Back to Home
                  </Link>
                </Button>
              </div>
            )}

            {/* Job cards */}
            {!isLoading && jobs.length > 0 && (
              <>
                <div className="grid gap-4">
                  {pageJobs.map((job, i) => (
                    <JobCard
                      key={job.id.toString()}
                      job={job}
                      position={(currentPage - 1) * JOBS_PER_PAGE + i + 1}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      data-ocid="jobs.pagination_prev"
                      className="gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <span
                      className="text-sm text-muted-foreground"
                      data-ocid="jobs.pagination_info"
                    >
                      Page{" "}
                      <span className="font-medium text-foreground">
                        {currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-foreground">
                        {totalPages}
                      </span>
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      data-ocid="jobs.pagination_next"
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
