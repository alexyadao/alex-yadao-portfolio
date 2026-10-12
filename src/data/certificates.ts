export interface Certificate {
  id: string;
  title: string;
  theme: string;
  issuer: string;
  category: 'internship' | 'seminar' | 'committee';
  role: string;
  date: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const CERTIFICATES: Certificate[] = [
  // INTERNSHIPS
  {
    id: 'intern-abs-2023',
    title: 'Certificate of Completion - Internship Program',
    theme: 'IT Infrastructure & Systems Administration',
    issuer: 'ABS Global Innovations Inc.',
    category: 'internship',
    role: 'Junior System Admin Intern',
    date: 'September 27, 2023',
    image: '/certificates/internships/internship-abs-global-sysadmin-2023.png',
    tags: ['Systems Administration', 'IT Infrastructure', 'Network Operations'],
    featured: true,
  },
  {
    id: 'intern-pixel8-2024',
    title: 'Competency Certificate in System Analysis',
    theme: 'System Analysis & Software Development Competencies',
    issuer: 'Pixel8 Academy',
    category: 'internship',
    role: 'System Analysis Trainee',
    date: 'September 18, 2024',
    image: '/certificates/internships/internship-pixel8-system-analysis-2024.png',
    tags: ['System Analysis', 'Software Architecture', 'Requirement Analysis', 'Prompt Engineering'],
    featured: true,
  },

  // SEMINARS - ORGANIZING COMMITTEE (APPRECIATION)
  {
    id: 'sem-committee-cybersecurity-2025',
    title: 'The Future Is Now: Seminar 2025',
    theme: 'Cybersecurity: Guard Your Clicks, Secure Your Future',
    issuer: 'PUP Department of Computer Engineering',
    category: 'committee',
    role: 'Organizing Committee (BSCPE 4-3)',
    date: 'April 30, 2025',
    image: '/certificates/seminars/seminar-committee-cybersecurity-2025.png',
    tags: ['Cybersecurity', 'Technical Leadership', 'Event Coordination'],
  },
  {
    id: 'sem-committee-touch-future-2025',
    title: 'The Future Is Now: Seminar 2025',
    theme: 'Touch the Future: Interfaces Evolved for a Futuristic World',
    issuer: 'PUP Department of Computer Engineering',
    category: 'committee',
    role: 'Organizing Committee (BSCPE 4-6)',
    date: 'April 30, 2025',
    image: '/certificates/seminars/seminar-committee-touch-the-future-2025.png',
    tags: ['HCI Interfaces', 'Future Systems', 'Event Management'],
  },
  {
    id: 'sem-committee-iot-2025',
    title: 'The Future Is Now: Seminar 2025',
    theme: "Future-Proofing the World with IoT: How IoT Powers Tomorrow's Innovations",
    issuer: 'PUP Department of Computer Engineering',
    category: 'committee',
    role: 'Organizing Committee (BSCPE 4-6)',
    date: 'May 7, 2025',
    image: '/certificates/seminars/seminar-committee-iot-innovations-2025.png',
    tags: ['IoT', 'Embedded Systems', 'Hardware Architecture'],
  },
  {
    id: 'sem-committee-ctrl-future-2025',
    title: 'The Future Is Now: Seminar 2025',
    theme: 'CTRL + FUTURE: Building the Web that Builds Tomorrow',
    issuer: 'PUP Department of Computer Engineering',
    category: 'committee',
    role: 'Organizing Committee (BSCPE 4-6)',
    date: 'May 7, 2025',
    image: '/certificates/seminars/seminar-committee-ctrl-future-web-2025.png',
    tags: ['Web Technologies', 'Software Engineering', 'Event Coordination'],
  },
  {
    id: 'sem-committee-blockchain-2025',
    title: 'The Future Is Now: Seminar 2025',
    theme: 'Blockchain: Revolutionizing Transparency and Security, One Block at a Time',
    issuer: 'PUP Department of Computer Engineering',
    category: 'committee',
    role: 'Organizing Committee (BSCPE 4-3)',
    date: 'May 9, 2025',
    image: '/certificates/seminars/seminar-committee-blockchain-2025.png',
    tags: ['Blockchain', 'Decentralized Tech', 'Security'],
  },

  // SEMINARS - PARTICIPANT (PARTICIPATION)
  {
    id: 'sem-part-sap-2025',
    title: 'Software Engineering Day 2025',
    theme: 'The SAP Advantage: Streamlining your Business Operation',
    issuer: 'PUP Department of Computer Engineering',
    category: 'seminar',
    role: 'Certified Participant',
    date: 'May 5, 2025',
    image: '/certificates/seminars/seminar-sap-advantage-2025.png',
    tags: ['SAP ERP', 'Enterprise Systems', 'Business Operations'],
  },
  {
    id: 'sem-part-bigdata-2025',
    title: 'Software Engineering Day 2025',
    theme: 'Cracking the Code Behind Big Data',
    issuer: 'PUP Department of Computer Engineering',
    category: 'seminar',
    role: 'Certified Participant',
    date: 'May 5, 2025',
    image: '/certificates/seminars/seminar-big-data-code-2025.png',
    tags: ['Big Data', 'Data Architecture', 'Database Systems'],
  },
  {
    id: 'sem-part-salesforce-2025',
    title: 'Software Engineering Day 2025',
    theme: 'The Power of Connection: Exploring the Salesforce World',
    issuer: 'PUP Department of Computer Engineering',
    category: 'seminar',
    role: 'Certified Participant',
    date: 'May 6, 2025',
    image: '/certificates/seminars/seminar-salesforce-world-2025.png',
    tags: ['Salesforce', 'Cloud CRM', 'Enterprise Software'],
  },
  {
    id: 'sem-part-rawdata-2025',
    title: 'Software Engineering Day 2025',
    theme: 'From Raw Data to Career-Ready Skills',
    issuer: 'PUP Department of Computer Engineering',
    category: 'seminar',
    role: 'Certified Participant',
    date: 'May 6, 2025',
    image: '/certificates/seminars/seminar-raw-data-career-skills-2025.png',
    tags: ['Data Pipelines', 'Software Development', 'Technical Skills'],
  },
  {
    id: 'sem-part-ml-2025',
    title: 'Software Engineering Day 2025',
    theme: 'From Pixels to Insights: Machine Learning for Image Processing and Analysis',
    issuer: 'PUP Department of Computer Engineering',
    category: 'seminar',
    role: 'Certified Participant',
    date: 'May 6, 2025',
    image: '/certificates/seminars/seminar-ml-image-processing-2025.png',
    tags: ['Machine Learning', 'Computer Vision', 'Image Processing'],
  },
  {
    id: 'sem-part-github-2025',
    title: 'Software Engineering Day 2025',
    theme: 'Streamlining Project Management with GitHub: Collaboration, Version Control, and Workflow Optimization',
    issuer: 'PUP Department of Computer Engineering',
    category: 'seminar',
    role: 'Certified Participant',
    date: 'May 6, 2025',
    image: '/certificates/seminars/seminar-github-project-management-2025.png',
    tags: ['Git', 'GitHub Workflows', 'CI/CD & Version Control'],
  },
];

export const certificates = CERTIFICATES;
export default CERTIFICATES;