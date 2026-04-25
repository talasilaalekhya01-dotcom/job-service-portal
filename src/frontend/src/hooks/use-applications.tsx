import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ApplicantDetail, ApplicationWithJob } from "../types";
import type { ApplicationStatus } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useSeekerApplications() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ApplicationWithJob[]>({
    queryKey: ["applications", "seeker"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSeekerApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useJobApplicants(jobId: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ApplicantDetail[]>({
    queryKey: ["applicants", jobId?.toString()],
    queryFn: async () => {
      if (!actor || jobId === null) return [];
      const result = await actor.getJobApplicants(jobId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching && jobId !== null,
  });
}

export function useApplyToJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.applyForJob(jobId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      appId,
      status,
    }: {
      appId: bigint;
      status: ApplicationStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateApplicationStatus(appId, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
}
