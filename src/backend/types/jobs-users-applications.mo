import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  // ── Enums ──────────────────────────────────────────────────────────────────

  public type JobType = {
    #FullTime;
    #PartTime;
    #Remote;
  };

  public type Category = {
    #IT;
    #Healthcare;
    #Finance;
    #Education;
    #Engineering;
    #Marketing;
    #Sales;
    #Design;
    #Other;
  };

  public type ApplicationStatus = {
    #Pending;
    #Viewed;
    #Accepted;
    #Rejected;
  };

  public type UserRole = {
    #JobSeeker;
    #Employer;
  };

  // ── User types ─────────────────────────────────────────────────────────────

  public type JobSeeker = {
    id : UserId;
    email : Text;
    name : Text;
    skills : Text;
    experienceLevel : Text;
    education : Text;
    createdAt : Timestamp;
  };

  public type Employer = {
    id : UserId;
    email : Text;
    companyName : Text;
    companyDescription : Text;
    createdAt : Timestamp;
  };

  // ── Job types ──────────────────────────────────────────────────────────────

  public type Job = {
    id : Nat;
    employerId : UserId;
    title : Text;
    description : Text;
    requirements : Text;
    jobType : JobType;
    category : Category;
    location : Text;
    salaryMin : Nat;
    salaryMax : Nat;
    companyName : Text;
    postedAt : Timestamp;
    isActive : Bool;
  };

  // ── Application types ──────────────────────────────────────────────────────

  public type Application = {
    id : Nat;
    jobId : Nat;
    seekerId : UserId;
    appliedAt : Timestamp;
    status : ApplicationStatus;
  };

  public type ApplicationWithJob = {
    application : Application;
    job : Job;
  };

  public type ApplicantDetail = {
    application : Application;
    seeker : JobSeeker;
  };

  // ── Auth ───────────────────────────────────────────────────────────────────

  public type LoginResult = {
    #ok : UserRole;
    #err : Text;
  };
};
