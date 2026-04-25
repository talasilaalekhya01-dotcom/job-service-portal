import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Employer, JobSeeker } from "../types";
import { UserRole } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export type AuthUserRole = UserRole | null;

export function useAuth() {
  const { login, clear, isAuthenticated, isInitializing, loginStatus } =
    useInternetIdentity();
  const { actor, isFetching } = useBackendActor();
  const queryClient = useQueryClient();

  const roleQuery = useQuery({
    queryKey: ["myRole"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getMyRole();
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const seekerProfileQuery = useQuery({
    queryKey: ["seekerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSeekerProfile();
    },
    enabled: !!actor && !isFetching && roleQuery.data === UserRole.JobSeeker,
  });

  const employerProfileQuery = useQuery({
    queryKey: ["employerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getEmployerProfile();
    },
    enabled: !!actor && !isFetching && roleQuery.data === UserRole.Employer,
  });

  const registerSeekerMutation = useMutation({
    mutationFn: async ({
      email,
      name,
      skills,
      experienceLevel,
      education,
    }: {
      email: string;
      name: string;
      skills: string;
      experienceLevel: string;
      education: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.registerJobSeeker(
        email,
        name,
        skills,
        experienceLevel,
        education,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRole"] });
      queryClient.invalidateQueries({ queryKey: ["seekerProfile"] });
    },
  });

  const registerEmployerMutation = useMutation({
    mutationFn: async ({
      email,
      companyName,
      companyDescription,
    }: {
      email: string;
      companyName: string;
      companyDescription: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.registerEmployer(
        email,
        companyName,
        companyDescription,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRole"] });
      queryClient.invalidateQueries({ queryKey: ["employerProfile"] });
    },
  });

  const userRole: AuthUserRole = roleQuery.data ?? null;

  const currentUser: JobSeeker | Employer | null =
    userRole === UserRole.JobSeeker
      ? (seekerProfileQuery.data ?? null)
      : userRole === UserRole.Employer
        ? (employerProfileQuery.data ?? null)
        : null;

  const isLoading =
    isInitializing || isFetching || (isAuthenticated && roleQuery.isLoading);

  const logout = () => {
    clear();
    queryClient.clear();
  };

  return {
    currentUser,
    userRole,
    isLoading,
    isAuthenticated,
    loginStatus,
    login,
    logout,
    registerSeeker: registerSeekerMutation.mutateAsync,
    registerEmployer: registerEmployerMutation.mutateAsync,
    registerSeekerPending: registerSeekerMutation.isPending,
    registerEmployerPending: registerEmployerMutation.isPending,
    registerSeekerError: registerSeekerMutation.error,
    registerEmployerError: registerEmployerMutation.error,
  };
}
