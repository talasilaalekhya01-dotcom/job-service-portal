import List "mo:core/List";
import Map "mo:core/Map";
import Types "types/jobs-users-applications";
import JobsUsersApplicationsApi "mixins/jobs-users-applications-api";

actor {
  let seekers = List.empty<Types.JobSeeker>();
  let employers = List.empty<Types.Employer>();
  let jobs = List.empty<Types.Job>();
  let applications = List.empty<Types.Application>();
  let seekerByPrincipal = Map.empty<Types.UserId, Nat>();
  let employerByPrincipal = Map.empty<Types.UserId, Nat>();

  include JobsUsersApplicationsApi(
    seekers,
    employers,
    jobs,
    applications,
    seekerByPrincipal,
    employerByPrincipal,
  );
};
