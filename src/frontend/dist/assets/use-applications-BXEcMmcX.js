import { c as createLucideIcon, Y as useQuery, F as useQueryClient, G as useMutation, z as useActor, E as createActor } from "./index-CQLXwtRZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function useBackendActor() {
  return useActor(createActor);
}
function useSeekerApplications() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["applications", "seeker"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSeekerApplications();
    },
    enabled: !!actor && !isFetching
  });
}
function useJobApplicants(jobId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["applicants", jobId == null ? void 0 : jobId.toString()],
    queryFn: async () => {
      if (!actor || jobId === null) return [];
      const result = await actor.getJobApplicants(jobId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching && jobId !== null
  });
}
function useApplyToJob() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.applyForJob(jobId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    }
  });
}
function useUpdateApplicationStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      appId,
      status
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateApplicationStatus(appId, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    }
  });
}
export {
  Calendar as C,
  useApplyToJob as a,
  useJobApplicants as b,
  useUpdateApplicationStatus as c,
  useSeekerApplications as u
};
