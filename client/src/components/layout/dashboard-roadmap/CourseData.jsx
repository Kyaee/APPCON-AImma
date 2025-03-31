export const courseData = [
  {
    name: "Web Development",
    progression: 10,
    lessons: [
      {
        id: 1,
        title: "HTML Fundamentals - Document Structure",
        status: "completed",
      },
      { id: 2, title: "HTML Elements and Attributes", status: "completed" },
      { id: 3, title: "CSS Selectors and Properties", status: "in_progress" },
      { id: 4, title: "CSS Box Model and Layout", status: "locked" },
      { id: 5, title: "CSS Flexbox and Grid", status: "locked" },
      { id: 6, title: "JavaScript Syntax and Variables", status: "locked" },
      { id: 7, title: "JavaScript Functions and Objects", status: "locked" },
      { id: 8, title: "DOM Manipulation Basics", status: "locked" },
      { id: 9, title: "Event Handling in JavaScript", status: "locked" },
      { id: 10, title: "Asynchronous JavaScript - Promises", status: "locked" },
      {
        id: 11,
        title: "Asynchronous JavaScript - Async/Await",
        status: "locked",
      },
      { id: 12, title: "React Fundamentals", status: "locked" },
      { id: 13, title: "React Components and Props", status: "locked" },
      { id: 14, title: "React State and Lifecycle", status: "locked" },
      { id: 15, title: "React Hooks - useState", status: "locked" },
      { id: 16, title: "React Hooks - useEffect", status: "locked" },
      { id: 17, title: "Context API for State Management", status: "locked" },
      { id: 18, title: "Redux Fundamentals", status: "locked" },
      { id: 19, title: "API Integration with Fetch", status: "locked" },
      { id: 20, title: "API Integration with Axios", status: "locked" },
      { id: 21, title: "Building and Deploying React Apps", status: "locked" },
    ],
  },
  {
    name: "Quality Assurance",
    progression: 5,
    lessons: [
      { id: 1, title: "Introduction to Software Testing", status: "completed" },
      {
        id: 2,
        title: "Testing Methodologies and Approaches",
        status: "in_progress",
      },
      { id: 3, title: "Writing Test Cases and Test Plans", status: "locked" },
      { id: 4, title: "Unit Testing Fundamentals", status: "locked" },
      { id: 5, title: "Jest Testing Framework", status: "locked" },
      { id: 6, title: "Testing React Components", status: "locked" },
      { id: 7, title: "Mocking in Unit Tests", status: "locked" },
      { id: 8, title: "Integration Testing Basics", status: "locked" },
      { id: 9, title: "E2E Testing with Cypress", status: "locked" },
      { id: 10, title: "API Testing with Postman", status: "locked" },
      { id: 11, title: "Performance Testing Basics", status: "locked" },
      { id: 12, title: "Load Testing with JMeter", status: "locked" },
      { id: 13, title: "Security Testing Principles", status: "locked" },
      { id: 14, title: "Test Automation Frameworks", status: "locked" },
      { id: 15, title: "CI/CD Integration for Testing", status: "locked" },
    ],
  },
  {
    name: "Mobile Development",
    progression: 0,
    lessons: [
      { id: 1, title: "Introduction to Mobile Development", status: "locked" },
      { id: 2, title: "Mobile Development Platforms", status: "locked" },
      { id: 3, title: "React Native Setup and Environment", status: "locked" },
      { id: 4, title: "React Native Components", status: "locked" },
      { id: 5, title: "React Native Navigation", status: "locked" },
      { id: 6, title: "Styling in React Native", status: "locked" },
      { id: 7, title: "Accessing Device Features", status: "locked" },
      { id: 8, title: "Working with Camera and Photos", status: "locked" },
      { id: 9, title: "Location and Maps Integration", status: "locked" },
      { id: 10, title: "Push Notifications", status: "locked" },
      { id: 11, title: "Offline Data Storage", status: "locked" },
      { id: 12, title: "API Integration in Mobile Apps", status: "locked" },
      { id: 13, title: "Performance Optimization", status: "locked" },
      { id: 14, title: "Publishing to App Stores", status: "locked" },
    ],
  },
  {
    name: "Data Science and Machine Learning",
    progression: 0,
    lessons: [
      { id: 1, title: "Introduction to Data Science", status: "locked" },
      { id: 2, title: "Python for Data Science", status: "locked" },
      { id: 3, title: "Data Collection and Preparation", status: "locked" },
      { id: 4, title: "Data Visualization with Python", status: "locked" },
      { id: 5, title: "Statistical Analysis Basics", status: "locked" },
      { id: 6, title: "Introduction to Machine Learning", status: "locked" },
      { id: 7, title: "Supervised Learning Algorithms", status: "locked" },
      { id: 8, title: "Unsupervised Learning Algorithms", status: "locked" },
      { id: 9, title: "Feature Engineering", status: "locked" },
      { id: 10, title: "Model Evaluation and Validation", status: "locked" },
      { id: 11, title: "Deep Learning Fundamentals", status: "locked" },
      { id: 12, title: "Neural Networks with TensorFlow", status: "locked" },
      { id: 13, title: "Natural Language Processing", status: "locked" },
      { id: 14, title: "Computer Vision Applications", status: "locked" },
      { id: 15, title: "Deploying ML Models", status: "locked" },
    ],
  },
  {
    name: "DevOps and Cloud",
    progression: 0,
    lessons: [
      { id: 1, title: "Introduction to DevOps", status: "locked" },
      { id: 2, title: "Linux Fundamentals for DevOps", status: "locked" },
      { id: 3, title: "Git and Version Control", status: "locked" },
      { id: 4, title: "Containerization with Docker", status: "locked" },
      {
        id: 5,
        title: "Container Orchestration with Kubernetes",
        status: "locked",
      },
      { id: 6, title: "CI/CD Pipeline Fundamentals", status: "locked" },
      { id: 7, title: "Jenkins for CI/CD", status: "locked" },
      { id: 8, title: "Infrastructure as Code", status: "locked" },
      { id: 9, title: "Terraform Basics", status: "locked" },
      { id: 10, title: "AWS Cloud Services", status: "locked" },
      { id: 11, title: "Azure Cloud Services", status: "locked" },
      { id: 12, title: "Cloud Architecture Design", status: "locked" },
      { id: 13, title: "Monitoring and Logging", status: "locked" },
      { id: 14, title: "Security in DevOps", status: "locked" },
      { id: 15, title: "Cost Optimization in Cloud", status: "locked" },
    ],
  },
];

export const generateExtendedLessons = (lessons) => {
  // Helper function to generate additional lessons if needed
  if (lessons.length >= 30) return lessons;

  const extended = [...lessons];
  const lastId = lessons.length > 0 ? lessons[lessons.length - 1].id : 0;

  // Add supplementary lessons to reach 30 if needed
  const supplementaryLessons = [
    "Advanced Techniques",
    "Best Practices",
    "Design Patterns",
    "Performance Tuning",
    "Industry Applications",
    "Case Studies",
    "Future Trends",
    "Capstone Project",
  ];

  for (let i = lessons.length; i < 30; i++) {
    extended.push({
      id: lastId + i - lessons.length + 1,
      title: `${supplementaryLessons[i % supplementaryLessons.length]} ${
        Math.floor(i / supplementaryLessons.length) + 1
      }`,
      status: "locked",
    });
  }

  return extended;
};
