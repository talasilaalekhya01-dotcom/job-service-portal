import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Job, PostJobForm } from "../types";
import type { Category, JobType } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useSearchJobs(
  keyword: string,
  location: string,
  category: Category | null,
  jobType: JobType | null,
  salaryMin: bigint | null,
  salaryMax: bigint | null,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: [
      "jobs",
      "search",
      keyword,
      location,
      category,
      jobType,
      salaryMin?.toString(),
      salaryMax?.toString(),
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchJobs(
        keyword,
        location,
        category,
        jobType,
        salaryMin,
        salaryMax,
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useJob(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job | null>({
    queryKey: ["job", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getJob(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAllJobs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["jobs", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchJobs("", "", null, null, null, null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEmployerJobs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Job[]>({
    queryKey: ["jobs", "employer"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmployerJobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: PostJobForm) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.postJob(
        form.title,
        form.description,
        form.requirements,
        form.jobType,
        form.category,
        form.location,
        form.salaryMin,
        form.salaryMax,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useUpdateJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, form }: { id: bigint; form: PostJobForm }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateJob(
        id,
        form.title,
        form.description,
        form.requirements,
        form.jobType,
        form.category,
        form.location,
        form.salaryMin,
        form.salaryMax,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useDeleteJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteJob(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
