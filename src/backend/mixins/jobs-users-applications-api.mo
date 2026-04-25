import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/jobs-users-applications";
import Lib "../lib/jobs-users-applications";

mixin (
  seekers : List.List<Types.JobSeeker>,
  employers : List.List<Types.Employer>,
  jobs : List.List<Types.Job>,
  applications : List.List<Types.Application>,
  seekerByPrincipal : Map.Map<Types.UserId, Nat>,
  employerByPrincipal : Map.Map<Types.UserId, Nat>,
) {
  var nextJobId : Nat = 0;
  var nextAppId : Nat = 0;

  // ── Canister Init — Seed Sample Jobs ──────────────────────────────────────

  func seedSampleJobs() {
    let sampleEmployers : [(Text, Text, Text)] = [
      ("TechCorp Solutions", "admin1@techcorp.com", "A leading software development company building innovative web and mobile solutions."),
      ("HealthFirst Clinic", "admin2@healthfirst.com", "A premier healthcare provider committed to patient wellness and medical excellence."),
      ("GlobalFinance Ltd", "admin3@globalfinance.com", "An international financial services firm specializing in investment and wealth management."),
      ("BrightMinds Academy", "admin4@brightminds.com", "An educational institution dedicated to empowering learners through quality education."),
      ("BuildRight Engineering", "admin5@buildright.com", "A construction and civil engineering firm with decades of infrastructure project experience."),
    ];

    // Seed employers with unique principals
    let seedPrincipals = [
      Principal.fromText("2vxsx-fae"),
      Principal.fromText("aaaaa-aa"),
      Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
      Principal.fromText("renrk-eyaaa-aaaaa-aaada-cai"),
      Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"),
    ];

    var empIdx = 0;
    for ((companyName, email, companyDescription) in sampleEmployers.values()) {
      let empId = seedPrincipals[empIdx];
      let emp : Types.Employer = {
        id = empId;
        email;
        companyName;
        companyDescription;
        createdAt = Time.now();
      };
      let idx = employers.size();
      employers.add(emp);
      employerByPrincipal.add(empId, idx);
      empIdx += 1;
    };

    let sampleJobs : [(Text, Text, Text, Types.JobType, Types.Category, Text, Nat, Nat, Nat)] = [
      // (title, description, requirements, jobType, category, location, salaryMin, salaryMax, empIdx)
      (
        "Senior Full-Stack Developer",
        "We are looking for an experienced Full-Stack Developer to join our growing engineering team. You will design and build scalable web applications used by thousands of users daily.",
        "5+ years experience with React and Node.js. Proficiency in TypeScript, PostgreSQL, and RESTful API design. Strong understanding of CI/CD pipelines.",
        #FullTime, #IT, "San Francisco, CA", 120000, 160000, 0
      ),
      (
        "Remote React Native Engineer",
        "Join our mobile team to build cross-platform applications for iOS and Android. You will collaborate with designers and backend engineers to deliver high-quality user experiences.",
        "3+ years of React Native experience. Familiarity with Redux, GraphQL, and mobile deployment pipelines. Experience with Expo is a plus.",
        #Remote, #IT, "Remote", 95000, 130000, 0
      ),
      (
        "Registered Nurse — Emergency Department",
        "HealthFirst Clinic is seeking a compassionate and skilled Registered Nurse for our busy Emergency Department. You will triage patients and coordinate care with physicians.",
        "Active RN license required. BLS and ACLS certifications. Minimum 2 years of emergency or critical care nursing experience.",
        #FullTime, #Healthcare, "New York, NY", 75000, 95000, 1
      ),
      (
        "Part-Time Medical Receptionist",
        "We need a friendly and organized Medical Receptionist to manage patient check-ins, appointments, and insurance verifications at our front desk.",
        "High school diploma or equivalent. Prior experience in a medical office preferred. Strong communication and computer skills.",
        #PartTime, #Healthcare, "Chicago, IL", 35000, 45000, 1
      ),
      (
        "Investment Banking Analyst",
        "GlobalFinance Ltd is hiring an ambitious Investment Banking Analyst to support deal execution, financial modelling, and client presentations across M&A and capital markets transactions.",
        "Bachelor's degree in Finance, Economics, or related field. Strong Excel and PowerPoint skills. Prior internship in finance preferred.",
        #FullTime, #Finance, "New York, NY", 85000, 110000, 2
      ),
      (
        "Remote Financial Planner",
        "Help individuals and families achieve their financial goals by providing personalized investment and retirement planning advice. Flexible remote role.",
        "CFP certification preferred. 3+ years of financial planning experience. Excellent client communication skills.",
        #Remote, #Finance, "Remote", 70000, 100000, 2
      ),
      (
        "High School Mathematics Teacher",
        "BrightMinds Academy is seeking a dedicated Mathematics Teacher to inspire students in Grades 9-12. You will design lesson plans, assess student progress, and foster a love for learning.",
        "Bachelor's degree in Mathematics or Education. State teaching certification required. Prior classroom experience preferred.",
        #FullTime, #Education, "Austin, TX", 50000, 68000, 3
      ),
      (
        "Online Curriculum Developer",
        "Create engaging and effective online course content for K-12 students. Collaborate with educators to design interactive modules, assessments, and learning resources.",
        "Experience in instructional design or curriculum development. Proficiency with e-learning authoring tools such as Articulate or Canvas.",
        #Remote, #Education, "Remote", 55000, 75000, 3
      ),
      (
        "Civil Engineer — Infrastructure Projects",
        "BuildRight Engineering seeks a Civil Engineer to oversee the design and construction of roads, bridges, and public utilities. You will manage project timelines and coordinate with contractors.",
        "Bachelor's degree in Civil Engineering. PE license preferred. 4+ years of infrastructure project experience.",
        #FullTime, #Engineering, "Houston, TX", 80000, 110000, 4
      ),
      (
        "Electrical Engineer — Renewable Energy",
        "Design and implement electrical systems for solar and wind energy projects. Work with cross-functional teams to deliver sustainable energy infrastructure on time and on budget.",
        "Bachelor's degree in Electrical Engineering. Experience with power systems design. Familiarity with NEC and IEC standards required.",
        #FullTime, #Engineering, "Denver, CO", 90000, 125000, 4
      ),
      (
        "UX/UI Designer",
        "We are looking for a talented UX/UI Designer to craft beautiful and intuitive interfaces for our SaaS products. You will conduct user research, create wireframes, and collaborate with developers.",
        "Portfolio demonstrating strong visual and interaction design skills. Proficiency in Figma. Experience with design systems and user testing.",
        #FullTime, #Design, "Seattle, WA", 85000, 115000, 0
      ),
      (
        "Digital Marketing Manager",
        "Lead our digital marketing strategy across SEO, SEM, social media, and email channels. Drive brand awareness, lead generation, and customer engagement for our B2B platform.",
        "5+ years of digital marketing experience. Proven track record managing Google Ads and LinkedIn campaigns. Strong analytical skills.",
        #FullTime, #Marketing, "Boston, MA", 80000, 105000, 2
      ),
    ];

    for ((title, description, requirements, jobType, category, location, salaryMin, salaryMax, empIndex) in sampleJobs.values()) {
      let empId = seedPrincipals[empIndex];
      let emp = employers.find(func(e : Types.Employer) : Bool { Principal.equal(e.id, empId) });
      switch (emp) {
        case null {};
        case (?e) {
          let job : Types.Job = {
            id = nextJobId;
            employerId = empId;
            title;
            description;
            requirements;
            jobType;
            category;
            location;
            salaryMin;
            salaryMax;
            companyName = e.companyName;
            postedAt = Time.now();
            isActive = true;
          };
          jobs.add(job);
          nextJobId += 1;
        };
      };
    };
  };

  // Run seed on first init (only when jobs list is empty)
  if (jobs.isEmpty()) {
    seedSampleJobs();
  };

  // ── Auth / Registration ────────────────────────────────────────────────────

  public shared ({ caller }) func registerJobSeeker(
    email : Text,
    name : Text,
    skills : Text,
    experienceLevel : Text,
    education : Text,
  ) : async { #ok : Types.JobSeeker; #err : Text } {
    Lib.registerSeeker(seekers, seekerByPrincipal, caller, email, name, skills, experienceLevel, education);
  };

  public shared ({ caller }) func registerEmployer(
    email : Text,
    companyName : Text,
    companyDescription : Text,
  ) : async { #ok : Types.Employer; #err : Text } {
    Lib.registerEmployer(employers, employerByPrincipal, caller, email, companyName, companyDescription);
  };

  public shared query ({ caller }) func getMyRole() : async Types.LoginResult {
    Lib.getRole(seekers, employers, caller);
  };

  // ── Seeker Profile ─────────────────────────────────────────────────────────

  public shared ({ caller }) func updateSeekerProfile(
    name : Text,
    skills : Text,
    experienceLevel : Text,
    education : Text,
  ) : async { #ok : Types.JobSeeker; #err : Text } {
    Lib.updateSeekerProfile(seekers, caller, name, skills, experienceLevel, education);
  };

  public shared query ({ caller }) func getSeekerProfile() : async ?Types.JobSeeker {
    Lib.getSeekerById(seekers, caller);
  };

  public shared query ({ caller }) func getEmployerProfile() : async ?Types.Employer {
    Lib.getEmployerById(employers, caller);
  };

  // ── Jobs ───────────────────────────────────────────────────────────────────

  public shared ({ caller }) func postJob(
    title : Text,
    description : Text,
    requirements : Text,
    jobType : Types.JobType,
    category : Types.Category,
    location : Text,
    salaryMin : Nat,
    salaryMax : Nat,
  ) : async { #ok : Types.Job; #err : Text } {
    let result = Lib.postJob(jobs, nextJobId, caller, employers, title, description, requirements, jobType, category, location, salaryMin, salaryMax);
    switch (result) {
      case (#ok(_)) { nextJobId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared ({ caller }) func updateJob(
    id : Nat,
    title : Text,
    description : Text,
    requirements : Text,
    jobType : Types.JobType,
    category : Types.Category,
    location : Text,
    salaryMin : Nat,
    salaryMax : Nat,
  ) : async { #ok : Types.Job; #err : Text } {
    Lib.updateJob(jobs, id, caller, title, description, requirements, jobType, category, location, salaryMin, salaryMax);
  };

  public shared ({ caller }) func deleteJob(
    id : Nat,
  ) : async { #ok : (); #err : Text } {
    Lib.deleteJob(jobs, id, caller);
  };

  public shared query func getJob(id : Nat) : async ?Types.Job {
    Lib.getJobById(jobs, id);
  };

  public shared query ({ caller }) func getEmployerJobs() : async [Types.Job] {
    Lib.getEmployerJobs(jobs, caller);
  };

  public shared query func searchJobs(
    keyword : Text,
    location : Text,
    category : ?Types.Category,
    jobType : ?Types.JobType,
    salaryMin : ?Nat,
    salaryMax : ?Nat,
  ) : async [Types.Job] {
    Lib.searchJobs(jobs, keyword, location, category, jobType, salaryMin, salaryMax);
  };

  // ── Featured & Recent Jobs ─────────────────────────────────────────────────

  public shared query func getFeaturedJobs() : async [Types.Job] {
    let active = jobs.filter(func(j : Types.Job) : Bool { j.isActive });
    let arr = active.toArray();
    let total = arr.size();
    if (total <= 6) { arr } else {
      arr.sliceToArray(total - 6, total);
    };
  };

  public shared query func getRecentJobs() : async [Types.Job] {
    let active = jobs.filter(func(j : Types.Job) : Bool { j.isActive });
    let arr = active.toArray();
    let total = arr.size();
    if (total <= 8) { arr } else {
      arr.sliceToArray(total - 8, total);
    };
  };

  public shared query func getJobCategories() : async [Types.Category] {
    let seen = Map.empty<Text, Types.Category>();
    jobs.forEach(func(j : Types.Job) {
      if (j.isActive) {
        let key = categoryToText(j.category);
        if (not seen.containsKey(key)) {
          seen.add(key, j.category);
        };
      };
    });
    seen.values().toArray();
  };

  // ── Applications ───────────────────────────────────────────────────────────

  public shared ({ caller }) func applyForJob(
    jobId : Nat,
  ) : async { #ok : Types.Application; #err : Text } {
    let result = Lib.applyForJob(applications, nextAppId, jobs, jobId, caller);
    switch (result) {
      case (#ok(_)) { nextAppId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getSeekerApplications() : async [Types.ApplicationWithJob] {
    Lib.getSeekerApplications(applications, jobs, caller);
  };

  public shared query ({ caller }) func getJobApplicants(
    jobId : Nat,
  ) : async { #ok : [Types.ApplicantDetail]; #err : Text } {
    Lib.getJobApplicants(applications, seekers, jobs, jobId, caller);
  };

  public shared ({ caller }) func updateApplicationStatus(
    appId : Nat,
    status : Types.ApplicationStatus,
  ) : async { #ok : Types.Application; #err : Text } {
    Lib.updateApplicationStatus(applications, jobs, appId, status, caller);
  };

  // ── Private Helpers ────────────────────────────────────────────────────────

  func categoryToText(cat : Types.Category) : Text {
    switch (cat) {
      case (#IT) "IT";
      case (#Healthcare) "Healthcare";
      case (#Finance) "Finance";
      case (#Education) "Education";
      case (#Engineering) "Engineering";
      case (#Marketing) "Marketing";
      case (#Sales) "Sales";
      case (#Design) "Design";
      case (#Other) "Other";
    };
  };
};
