export type Section = { id: string; label: string; index: string };

export const SECTIONS: Section[] = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "education", label: "Education", index: "03" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "certifications", label: "Certs", index: "05" },
  { id: "skills", label: "Skills", index: "06" },
  { id: "projects", label: "Projects", index: "07" },
  { id: "testimonials", label: "Praise", index: "08" },
  { id: "contact", label: "Contact", index: "09" },
];

export const PROFILE = {
  name: "Masturah Babawale",
  alias: "The CyGirl",
  aliases: ["The CyGirl", "Masturah", "Turah", "The Cybersecurity Girl"],
  oneLiner:
    "I investigate digital evidence, study cybercrime law, and build communities that open doors for Muslim women in technology.",
  bio:
    "Masturah Babawale is a law graduate, cybersecurity practitioner, and digital forensics investigator training to become an international cybersecurity lawyer and forensics expert witness. She lives at the meeting point of three disciplines: law that defines what justice means, security that defends the systems people depend on, and advocacy that makes sure the right people are in the room when the rules get written. Alongside this, she founded Project Code-Hijabi to open real pathways for Muslim women into technology.",
  frustration:
    "What pushes her forward is also what frustrates her. Cybercriminals walk free because digital evidence is mishandled. Courts still treat the digital world as foreign territory. Brilliant Muslim women are quietly pushed out of tech rooms they clearly belong in. None of this is acceptable to her, and none of it is inevitable.",
  fix:
    "So she is building the answer in public. She is studying the law, mastering the forensics, and creating the institutions and communities that turn justice and access from rare exceptions into the default. Every project she ships, every case she studies, and every woman she trains is one more brick in that foundation.",
};

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Cybersecurity",
    items: [
      "Network security",
      "Incident response",
      "Threat detection",
      "Vulnerability assessment",
      "Phishing prevention",
      "NIST & CIA triad",
    ],
  },
  {
    group: "Digital forensics",
    items: [
      "Cybercrime investigation",
      "Evidence handling",
      "Suricata",
      "Linux forensics",
      "Python tooling",
      "SQL analysis",
    ],
  },
  {
    group: "Law & policy",
    items: [
      "ICT law",
      "Intellectual property",
      "Cybersecurity law",
      "Legal drafting",
      "Legal research",
      "Contract law",
    ],
  },
  {
    group: "Build & ship",
    items: ["HTML, CSS, JavaScript", "Python & Flask", "Git & GitHub", "Microsoft Azure", "Technical writing", "API integration"],
  },
];

export const EDUCATION = [
  {
    title: "LL.B Bachelor of Laws (Second Class Upper)",
    org: "Lagos State University",
    period: "Jul 2022 · Aug 2026 · Hybrid",
    notes: [
      "Specializing in ICT Law, Intellectual Property, Cybersecurity Law, Tort Law, Legal Drafting and Research.",
      "Distinction in Contract Law with strong performance across coursework.",
      "Active in student clubs sharpening legal research and advocacy.",
    ],
  },
  {
    title: "Cybersecurity Fellow",
    org: "3MTT & NITDA",
    period: "Jul 2024 · Hybrid",
    notes: [
      "Hands-on training in network security, incident response and ethical hacking.",
      "Vulnerability assessments and remediation for digital infrastructure.",
      "Collaborated on cybersecurity awareness for legal sectors.",
    ],
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    org: "Coursera",
    period: "Completed Apr 2025",
    notes: [
      "Eight-course certificate covering fundamentals, network security and risk frameworks.",
      "Twenty-plus Qwiklabs using Suricata, Linux, Python and SQL.",
      "Aligned to CIA triad and NIST standards for Security Analyst and SOC Analyst roles.",
    ],
  },
  {
    title: "Advanced Cybercrime Investigations · Merit",
    org: "International Cybersecurity and Digital Forensics Academy, SAVT",
    period: "Graduated Mar 27, 2026 · Batch B2025",
    notes: [
      "Investigated simulated cybercrime cases using industry-standard digital forensics tools.",
      "Performed evidence acquisition, chain-of-custody documentation and forensic imaging.",
      "Analyzed network intrusions, malware artifacts and recovered deleted digital evidence.",
      "Drafted investigation reports suitable for court-admissible expert testimony.",
      "Inducted as Elite Certified Cybersecurity Specialist.",
    ],
  },
];

export const CERTIFICATIONS: { name: string; issuer: string; year: string; link?: string }[] = [
  { name: "Elite Certified Cybersecurity Specialist", issuer: "International Cybersecurity and Digital Forensics Academy", year: "Mar 2026" },
  { name: "Google Cybersecurity Professional Certificate", issuer: "Google", year: "2025", link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/O8486W4T60CA" },
  { name: "GitHub Foundations", issuer: "GitHub", year: "2025", link: "https://www.credly.com/badges/24a5929f-7395-417b-ae74-b79c98fa4815/public_url" },
  { name: "Junior Security Analyst Path", issuer: "Cisco", year: "2025", link: "https://www.credly.com/badges/39ea4a3e-bd9a-408b-b293-80c7e39b28e1/linked_in_profile" },
  { name: "Certified Phishing Prevention Specialist (CPPS)", issuer: "Hack & Fix", year: "2025", link: "https://academy.hackandfix.com/certificate-page/?user=13493&course=53700" },
  { name: "Career Essentials in Cybersecurity", issuer: "Microsoft & LinkedIn", year: "2024" },
  { name: "Cybersecurity for Attorneys", issuer: "SecureAnchors Consulting", year: "2023" },
  { name: "Technical Writing", issuer: "WriteTech Hub", year: "2023" },
];

export const CALENDLY_URL = "https://calendly.com/babawalemasturah6/virtual-tea-chat";
export const CONTACT_EMAIL = "babawalemasturah6@gmail.com";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/meenjrjg";

export const CONTACT_REASONS = [
  "Interview Opportunity",
  "Speaking Engagement",
  "Collaboration",
  "Internship / Opportunity",
  "Mentorship",
  "General Inquiry",
] as const;

export type Testimonial = { name: string; role: string; quote: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Opeyemi Benjamin",
    role: "Cybersecurity Intern",
    quote:
      "An exceptional mentor who simplifies the complex. Her GDG sessions provided the technical roadmap and clarity I needed to master the cybersecurity landscape.",
  },
];

export const EXPERIENCE = [
  {
    role: "Legal Intern",
    org: "Adedeji & Owotomo LLP · Oct 2025 · On-site",
    bullets: [
      "Researched litigation, ADR and intellectual property matters.",
      "Assisted in case preparation and legal documentation.",
      "Gained courtroom and dispute resolution exposure.",
    ],
  },
  {
    role: "Cybersecurity Intern",
    org: "Centre for Cybersecurity and Research · Sep 2024 · Remote",
    bullets: [
      "Analyzed cybersecurity incidents and developed preventive strategies.",
      "Contributed legal and regulatory insight to threat discussions.",
      "Supported public awareness campaigns on women's online safety.",
    ],
  },
  {
    role: "Virtual Legal Intern",
    org: "Vassalcrest Attorneys · Sep 2024 · Remote",
    bullets: [
      "Drafted technology contracts across a four-week intensive.",
      "Conducted legal research to ensure regulatory compliance.",
      "Reviewed and refined contract terms with peer interns.",
    ],
  },
  {
    role: "Virtual Legal Intern",
    org: "Chaman Law Firm · Jun – Aug 2024 · Remote",
    bullets: [
      "Drafted contracts in property and intellectual property law.",
      "Reviewed legal opinions on IP and contract matters.",
      "Conducted in-depth research for client consultations.",
    ],
  },
  {
    role: "Fraud Investigation Simulation",
    org: "Forage · Latham & Watkins · Feb 2024",
    bullets: [
      "Performed fraud document analysis with targeted search strategies.",
      "Designed structured witness interview questions.",
      "Assessed fines and sentencing implications.",
    ],
  },
  {
    role: "Social Media Coordinator (Volunteer)",
    org: "The Techy Muslimah Network · Sep 2024 – Present",
    bullets: [
      "Grew engagement 60% in two months through targeted strategy.",
      "Curated content empowering Muslim women in technology.",
      "Managed community engagement and outreach campaigns.",
    ],
  },
  {
    role: "Ambassador (Volunteer)",
    org: "Wetech · Jul 2024 – Present",
    bullets: [
      "Promoted programs empowering women in tech and legal-tech spaces.",
      "Organized and supported events expanding visibility of opportunities.",
      "Fostered mentorship and networking across the community.",
    ],
  },
];

export const LEADERSHIP = [
  {
    role: "Vice President",
    org: "Technology Law Club, LASU · Oct 2025 – May 2026",
    bullets: [
      "Led the club's first-ever Code4Justice Hackathon end to end.",
      "Coordinated participants, mentors and program structure.",
      "Aligned activities with the law-tech-cybersecurity intersection.",
    ],
  },
  {
    role: "Head of Research",
    org: "Technology Law Club, LASU · Nov 2024 – Oct 2025",
    bullets: [
      "Led research on emerging issues in technology law.",
      "Supervised projects and knowledge-sharing sessions.",
    ],
  },
  {
    role: "Associate Partner",
    org: "Gani Fawehinmi Students' Chamber, LASU · Jan 2023 – Apr 2026",
    bullets: [
      "Specialized in legal drafting, mooting and high-profile competitions.",
      "Drafted documents and prepared for litigation alongside seniors.",
      "Handled contract and intellectual property matters with teams.",
    ],
  },
  {
    role: "Head of Organizing",
    org: "Intellectual Property Law Club, LASU · Aug 2024",
    bullets: [
      "Spearheaded events, workshops and seminars on IP rights.",
      "Partnered with professionals to deepen practical IP exposure.",
    ],
  },
  {
    role: "Assistant Director of Research",
    org: "Maritime Law Club, LASU · Sep 2024",
    bullets: [
      "Led research across maritime law topics for the club.",
      "Drafted reports on current maritime law developments.",
    ],
  },
  {
    role: "Head of Resources",
    org: "Tech Law Club, LASU · Jun – Oct 2024",
    bullets: [
      "Built and maintained the club's legal-tech resource library.",
      "Facilitated workshops on emerging technologies in law.",
      "Curated content with industry professionals.",
    ],
  },
];

export type Project = {
  name: string;
  status: string;
  summary: string;
  why: string;
  role: string;
  stack: string[];
  highlights: string[];
  link?: { label: string; href: string };
  video?: { label: string; embedUrl: string; watchUrl: string };
};

export const PROJECTS: Project[] = [
  {
    name: "Project Code-Hijabi",
    status: "Live · 50+ active participants",
    summary:
      "Community-driven NGO training Muslim women in frontend, backend, mobile and game development with mentorship, hackathons and pan-African tech events.",
    why:
      "I needed Muslim women to build alongside, but the pathway into technical roles was not clear or accessible. So I built the pathway.",
    role: "Founder and Program Lead",
    stack: ["Microsoft Teams", "Cisco WebEx", "GitHub", "Microsoft Azure", "Google Drive", "WhatsApp"],
    highlights: [
      "Designed program structure across multiple technical tracks.",
      "Coordinated mentors, partnerships and operations.",
      "Built the community and applicant pipeline from zero.",
    ],
    link: { label: "Application form", href: "https://forms.gle/SJMz85eazXMvCypM8" },
  },
  {
    name: "CyberPAW",
    status: "Prototype · Functional with VirusTotal integration",
    summary:
      "A phishing and malicious link scanner that analyzes URLs against 89+ security vendors via VirusTotal, presented through a friendly mascot-led interface.",
    why:
      "Most security tools are intimidating. CyberPAW makes threat detection approachable for non-technical users without dumbing down the analysis.",
    role: "Founder and Developer",
    stack: ["HTML5", "CSS3", "JavaScript", "Python", "Flask", "VirusTotal API v3"],
    highlights: [
      "Real-time analysis across 89+ vendors with community scores.",
      "Color-coded threat orbs and a 3D book-flip detail view.",
      "Educational breakdowns: HTTPS, domain structure, suspicious patterns.",
    ],
    link: { label: "Visit CyberPAW", href: "https://cyberpaw.onrender.com" },
  },
  {
    name: "BTLO Email Analysis CTF",
    status: "Completed · Capture the Flag",
    summary:
      "A hands-on digital forensics investigation analyzing a suspicious email to extract hidden artifacts, file signatures, and embedded flags using forensic tooling across Kali Linux and Windows VMs.",
    why:
      "I wanted to demonstrate practical forensic investigation skills in a realistic scenario — finding what attackers hide and documenting how digital evidence tells the full story.",
    role: "Digital Forensics Investigator",
    stack: ["ExifTool", "CyberChef", "Hex Editor", "Gary Kessler File Signatures", "Kali Linux", "Windows VM"],
    highlights: [
      "Identified hidden file extensions and embedded payloads within email attachments.",
      "Used ExifTool and Hex Editor to analyze file metadata and uncover steganographic artifacts.",
      "Decoded obfuscated strings and extracted flags using CyberChef recipes.",
      "Cross-referenced file signatures against the Gary Kessler database to verify true file types.",
      "Documented the full investigation workflow in a walkthrough video for the community.",
    ],
    video: {
      label: "Watch walkthrough",
      embedUrl: "https://www.youtube.com/embed/6QrucJ_M0Uc",
      watchUrl: "https://youtu.be/6QrucJ_M0Uc",
    },
  },
];

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/masturah-babawale-050745258" },
  { label: "GitHub", href: "https://github.com/Masturahami" },
  { label: "Linktree", href: "https://linktr.ee/TheCyGirl" },
];
