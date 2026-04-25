import { Y as useQuery, F as useQueryClient, G as useMutation, z as useActor, E as createActor } from "./index-CQLXwtRZ.js";
function useBackendActor() {
  return useActor(createActor);
}
function useSearchJobs(keyword, location, category, jobType, salaryMin, salaryMax) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: [
      "jobs",
      "search",
      keyword,
      location,
      category,
      jobType,
      salaryMin == null ? void 0 : salaryMin.toString(),
      salaryMax == null ? void 0 : salaryMax.toString()
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchJobs(
        keyword,
        location,
        category,
        jobType,
        salaryMin,
        salaryMax
      );
    },
    enabled: !!actor && !isFetching
  });
}
function useJob(id) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["job", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getJob(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useAllJobs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["jobs", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchJobs("", "", null, null, null, null);
    },
    enabled: !!actor && !isFetching
  });
}
function useEmployerJobs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["jobs", "employer"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmployerJobs();
    },
    enabled: !!actor && !isFetching
  });
}
function usePostJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.postJob(
        form.title,
        form.description,
        form.requirements,
        form.jobType,
        form.category,
        form.location,
        form.salaryMin,
        form.salaryMax
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  });
}
function useUpdateJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, form }) => {
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
        form.salaryMax
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  });
}
function useDeleteJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteJob(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  });
}
export {
  useSearchJobs as a,
  useJob as b,
  useEmployerJobs as c,
  useDeleteJob as d,
  usePostJob as e,
  useUpdateJob as f,
  useAllJobs as u
};
