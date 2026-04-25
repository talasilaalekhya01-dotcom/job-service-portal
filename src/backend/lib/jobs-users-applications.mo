import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/jobs-users-applications";

module {
  public type JobSeeker = Types.JobSeeker;
  public type Employer = Types.Employer;
  public type Job = Types.Job;
  public type Application = Types.Application;
  public type ApplicationWithJob = Types.ApplicationWithJob;
  public type ApplicantDetail = Types.ApplicantDetail;
  public type ApplicationStatus = Types.ApplicationStatus;
  public type JobType = Types.JobType;
  public type Category = Types.Category;
  public type UserRole = Types.UserRole;

  // ── Job Seeker ─────────────────────────────────────────────────────────────

  public func registerSeeker(
    seekers : List.List<JobSeeker>,
    seekerByPrincipal : Map.Map<Types.UserId, Nat>,
    id : Types.UserId,
    email : Text,
    name : Text,
    skills : Text,
    experienceLevel : Text,
    education : Text,
  ) : { #ok : JobSeeker; #err : Text } {
    if (seekerByPrincipal.containsKey(id)) {
      return #err("Already registered as a job seeker");
    };
    let seeker : JobSeeker = {
      id;
      email;
      name;
      skills;
      experienceLevel;
      education;
      createdAt = Time.now();
    };
    let idx = seekers.size();
    seekers.add(seeker);
    seekerByPrincipal.add(id, idx);
    #ok(seeker);
  };

  public func updateSeekerProfile(
    seekers : List.List<JobSeeker>,
    id : Types.UserId,
    name : Text,
    skills : Text,
    experienceLevel : Text,
    education : Text,
  ) : { #ok : JobSeeker; #err : Text } {
    let idx = seekers.findIndex(func(s : JobSeeker) : Bool { Principal.equal(s.id, id) });
    switch (idx) {
      case null { #err("Seeker profile not found") };
      case (?i) {
        let existing = seekers.at(i);
        let updated : JobSeeker = { existing with name; skills; experienceLevel; education };
        seekers.put(i, updated);
        #ok(updated);
      };
    };
  };

  public func getSeekerById(
    seekers : List.List<JobSeeker>,
    id : Types.UserId,
  ) : ?JobSeeker {
    seekers.find(func(s : JobSeeker) : Bool { Principal.equal(s.id, id) });
  };

  // ── Employer ───────────────────────────────────────────────────────────────

  public func registerEmployer(
    employers : List.List<Employer>,
    employerByPrincipal : Map.Map<Types.UserId, Nat>,
    id : Types.UserId,
    email : Text,
    companyName : Text,
    companyDescription : Text,
  ) : { #ok : Employer; #err : Text } {
    if (employerByPrincipal.containsKey(id)) {
      return #err("Already registered as an employer");
    };
    let employer : Employer = {
      id;
      email;
      companyName;
      companyDescription;
      createdAt = Time.now();
    };
    let idx = employers.size();
    employers.add(employer);
    employerByPrincipal.add(id, idx);
    #ok(employer);
  };

  public func getEmployerById(
    employers : List.List<Employer>,
    id : Types.UserId,
  ) : ?Employer {
    employers.find(func(e : Employer) : Bool { Principal.equal(e.id, id) });
  };

  // ── Auth ───────────────────────────────────────────────────────────────────

  public func getRole(
    seekers : List.List<JobSeeker>,
    employers : List.List<Employer>,
    id : Types.UserId,
  ) : Types.LoginResult {
    if (seekers.any(func(s : JobSeeker) : Bool { Principal.equal(s.id, id) })) {
      return #ok(#JobSeeker);
    };
    if (employers.any(func(e : Employer) : Bool { Principal.equal(e.id, id) })) {
      return #ok(#Employer);
    };
    #err("Not registered");
  };

  // ── Jobs ───────────────────────────────────────────────────────────────────

  public func postJob(
    jobs : List.List<Job>,
    nextId : Nat,
    employerId : Types.UserId,
    employers : List.List<Employer>,
    title : Text,
    description : Text,
    requirements : Text,
    jobType : JobType,
    category : Category,
    location : Text,
    salaryMin : Nat,
    salaryMax : Nat,
  ) : { #ok : Job; #err : Text } {
    let employer = employers.find(func(e : Employer) : Bool { Principal.equal(e.id, employerId) });
    switch (employer) {
      case null { #err("Not registered as an employer") };
      case (?emp) {
        let job : Job = {
          id = nextId;
          employerId;
          title;
          description;
          requirements;
          jobType;
          category;
          location;
          salaryMin;
          salaryMax;
          companyName = emp.companyName;
          postedAt = Time.now();
          isActive = true;
        };
        jobs.add(job);
        #ok(job);
      };
    };
  };

  public func updateJob(
    jobs : List.List<Job>,
    id : Nat,
    employerId : Types.UserId,
    title : Text,
    description : Text,
    requirements : Text,
    jobType : JobType,
    category : Category,
    location : Text,
    salaryMin : Nat,
    salaryMax : Nat,
  ) : { #ok : Job; #err : Text } {
    let idx = jobs.findIndex(func(j : Job) : Bool { j.id == id });
    switch (idx) {
      case null { #err("Job not found") };
      case (?i) {
        let existing = jobs.at(i);
        if (not Principal.equal(existing.employerId, employerId)) {
          return #err("Not the owner of this job");
        };
        let updated : Job = { existing with title; description; requirements; jobType; category; location; salaryMin; salaryMax };
        jobs.put(i, updated);
        #ok(updated);
      };
    };
  };

  public func deleteJob(
    jobs : List.List<Job>,
    id : Nat,
    employerId : Types.UserId,
  ) : { #ok : (); #err : Text } {
    let idx = jobs.findIndex(func(j : Job) : Bool { j.id == id });
    switch (idx) {
      case null { #err("Job not found") };
      case (?i) {
        let existing = jobs.at(i);
        if (not Principal.equal(existing.employerId, employerId)) {
          return #err("Not the owner of this job");
        };
        jobs.put(i, { existing with isActive = false });
        #ok(());
      };
    };
  };

  public func getJobById(
    jobs : List.List<Job>,
    id : Nat,
  ) : ?Job {
    jobs.find(func(j : Job) : Bool { j.id == id });
  };

  public func getEmployerJobs(
    jobs : List.List<Job>,
    employerId : Types.UserId,
  ) : [Job] {
    jobs.filter(func(j : Job) : Bool { Principal.equal(j.employerId, employerId) }).toArray();
  };

  public func searchJobs(
    jobs : List.List<Job>,
    keyword : Text,
    location : Text,
    category : ?Category,
    jobType : ?JobType,
    salaryMin : ?Nat,
    salaryMax : ?Nat,
  ) : [Job] {
    let kw = keyword.toLower();
    let loc = location.toLower();
    jobs.filter(func(j : Job) : Bool {
      if (not j.isActive) { return false };
      let kwMatch = kw == "" or j.title.toLower().contains(#text kw) or j.description.toLower().contains(#text kw) or j.companyName.toLower().contains(#text kw);
      if (not kwMatch) { return false };
      let locMatch = loc == "" or j.location.toLower().contains(#text loc);
      if (not locMatch) { return false };
      let catMatch = switch (category) {
        case (?cat) { categoryEqual(j.category, cat) };
        case null { true };
      };
      if (not catMatch) { return false };
      let jtMatch = switch (jobType) {
        case (?jt) { jobTypeEqual(j.jobType, jt) };
        case null { true };
      };
      if (not jtMatch) { return false };
      let salMinMatch = switch (salaryMin) {
        case (?min) { j.salaryMax >= min };
        case null { true };
      };
      if (not salMinMatch) { return false };
      let salMaxMatch = switch (salaryMax) {
        case (?max) { j.salaryMin <= max };
        case null { true };
      };
      salMaxMatch;
    }).toArray();
  };

  // ── Applications ───────────────────────────────────────────────────────────

  public func applyForJob(
    applications : List.List<Application>,
    nextId : Nat,
    jobs : List.List<Job>,
    jobId : Nat,
    seekerId : Types.UserId,
  ) : { #ok : Application; #err : Text } {
    let job = jobs.find(func(j : Job) : Bool { j.id == jobId and j.isActive });
    switch (job) {
      case null { #err("Job not found or no longer active") };
      case (?_) {
        let alreadyApplied = applications.any(func(a : Application) : Bool {
          a.jobId == jobId and Principal.equal(a.seekerId, seekerId)
        });
        if (alreadyApplied) {
          return #err("Already applied to this job");
        };
        let app : Application = {
          id = nextId;
          jobId;
          seekerId;
          appliedAt = Time.now();
          status = #Pending;
        };
        applications.add(app);
        #ok(app);
      };
    };
  };

  public func getSeekerApplications(
    applications : List.List<Application>,
    jobs : List.List<Job>,
    seekerId : Types.UserId,
  ) : [ApplicationWithJob] {
    applications.filterMap<Application, ApplicationWithJob>(func(a : Application) : ?ApplicationWithJob {
      if (not Principal.equal(a.seekerId, seekerId)) { return null };
      switch (jobs.find(func(j : Job) : Bool { j.id == a.jobId })) {
        case null { null };
        case (?job) { ?{ application = a; job } };
      };
    }).toArray();
  };

  public func getJobApplicants(
    applications : List.List<Application>,
    seekers : List.List<JobSeeker>,
    jobs : List.List<Job>,
    jobId : Nat,
    employerId : Types.UserId,
  ) : { #ok : [ApplicantDetail]; #err : Text } {
    let job = jobs.find(func(j : Job) : Bool { j.id == jobId });
    switch (job) {
      case null { #err("Job not found") };
      case (?j) {
        if (not Principal.equal(j.employerId, employerId)) {
          return #err("Not the owner of this job");
        };
        let details = applications.filterMap<Application, ApplicantDetail>(func(a : Application) : ?ApplicantDetail {
          if (a.jobId != jobId) { return null };
          switch (seekers.find(func(s : JobSeeker) : Bool { Principal.equal(s.id, a.seekerId) })) {
            case null { null };
            case (?seeker) { ?{ application = a; seeker } };
          };
        }).toArray();
        #ok(details);
      };
    };
  };

  public func updateApplicationStatus(
    applications : List.List<Application>,
    jobs : List.List<Job>,
    appId : Nat,
    status : ApplicationStatus,
    employerId : Types.UserId,
  ) : { #ok : Application; #err : Text } {
    let idx = applications.findIndex(func(a : Application) : Bool { a.id == appId });
    switch (idx) {
      case null { #err("Application not found") };
      case (?i) {
        let app = applications.at(i);
        let job = jobs.find(func(j : Job) : Bool { j.id == app.jobId });
        switch (job) {
          case null { #err("Job not found") };
          case (?j) {
            if (not Principal.equal(j.employerId, employerId)) {
              return #err("Not the owner of this job");
            };
            let updated : Application = { app with status };
            applications.put(i, updated);
            #ok(updated);
          };
        };
      };
    };
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  func categoryEqual(a : Category, b : Category) : Bool {
    switch (a, b) {
      case (#IT, #IT) true;
      case (#Healthcare, #Healthcare) true;
      case (#Finance, #Finance) true;
      case (#Education, #Education) true;
      case (#Engineering, #Engineering) true;
      case (#Marketing, #Marketing) true;
      case (#Sales, #Sales) true;
      case (#Design, #Design) true;
      case (#Other, #Other) true;
      case _ false;
    };
  };

  func jobTypeEqual(a : JobType, b : JobType) : Bool {
    switch (a, b) {
      case (#FullTime, #FullTime) true;
      case (#PartTime, #PartTime) true;
      case (#Remote, #Remote) true;
      case _ false;
    };
  };
};
