'use strict';
const crypto = require('crypto');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Clear existing data first to avoid duplicates if desired, 
    // or just append. Given the request, replacing with CV data is best.
    
    // Projects
    await queryInterface.bulkInsert('projects', [
      {
        id: crypto.randomUUID(),
        title: 'Explore Nepal (Tourist Attraction Finder)',
        description: 'Interactive maps for discovering tourist attractions with real-time features for user engagement.',
        techStack: ['React', 'Node.js', 'Google Maps API', 'MongoDB', 'Axios'],
        repoLink: 'https://github.com/Suraj-1000',
        demoLink: '',
        imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        title: 'Job Portal Application',
        description: 'Scalable backend with responsive frontend featuring secure authentication and interactive UI.',
        techStack: ['React', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'Tailwind CSS'],
        repoLink: 'https://github.com/Suraj-1000',
        demoLink: '',
        imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        title: 'HRMS (Human Resource Management System)',
        description: 'Admin dashboard for employee management with full CRUD operations and server-side modules.',
        techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
        repoLink: 'https://github.com/Suraj-1000',
        demoLink: '',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        title: 'Weather Forecast Application',
        description: 'Real-time weather dashboard with global data, visualized temperature, humidity, and metrics.',
        techStack: ['JavaScript', 'PHP', 'MySQL', 'HTML', 'CSS', 'OpenWeatherAPI'],
        repoLink: 'https://github.com/Suraj-1000',
        demoLink: '',
        imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Skills
    await queryInterface.bulkInsert('skills', [
      {
        id: crypto.randomUUID(),
        category: 'Programming Languages',
        items: ['Python', 'C', 'Java', 'TypeScript', 'JavaScript', 'PHP'],
        icon: 'Code',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        category: 'Web & Frameworks',
        items: ['MERN Stack', 'React', 'Node.js', 'Express', 'Tailwind CSS', 'HTML', 'CSS'],
        icon: 'Layout',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        category: 'Databases',
        items: ['MySQL', 'MongoDB', 'PostgresSQL'],
        icon: 'Database',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        category: 'Dev Tools & AI',
        items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Swagger/OpenAPI', 'Prompt Engineering (ChatGPT, Gemini, Claude)'],
        icon: 'Terminal',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Education
    await queryInterface.bulkInsert('educations', [
      {
        id: crypto.randomUUID(),
        degree: 'BSc(Hons) Computer Science',
        institution: 'Herald College Kathmandu',
        address: 'Naxal, Kathmandu',
        level: 'Bachelors',
        startYear: '2023',
        endYear: '2025',
        grade: '78.56%',
        icon: 'GraduationCap',
        color: 'text-primary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        degree: '+2 in Computer Science',
        institution: 'Greenplant English Boarding Higher Secondary School',
        address: 'Devdaha -07, Rupandehi',
        level: '+2',
        startYear: '2020',
        endYear: '2022',
        grade: '3.31 / 4.0',
        icon: 'School',
        color: 'text-blue-500',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        degree: 'Secondary School Education',
        institution: 'Sunwal United English Boarding Secondary School',
        address: 'Sunwal - 04, Nawalparasi',
        level: 'School',
        startYear: '2007',
        endYear: '2020',
        grade: '3.75 / 4.0',
        icon: 'BookOpen',
        color: 'text-green-500',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Experiences
    await queryInterface.bulkInsert('experiences', [
      {
        id: crypto.randomUUID(),
        role: 'MERN Developer Intern (Contract)',
        company: 'Saurik Solution Pvt. Ltd.',
        location: 'Kathmandu, Nepal',
        startDate: 'Dec 2025',
        endDate: 'Feb 2026',
        description: [
          'Developed full-stack features using React, Node.js, and PostgreSQL',
          'Built responsive UI and integrated backend APIs',
          'Fixed bugs and optimized application performance',
          'Implemented authentication and database operations'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        role: 'Backend Developer (Part-time, Intern)',
        company: 'Engineering & Tech.Connect',
        location: 'Michigan, US (Remote)',
        startDate: 'Nov 2024',
        endDate: 'Sep 2025',
        description: [
          'Built responsive web apps with MERN stack',
          'Developed APIs and managed MongoDB',
          'Integrated React.js frontend with backend',
          'Optimized performance and cloud deployment'
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Awards
    await queryInterface.bulkInsert('awards', [
      {
        id: crypto.randomUUID(),
        title: 'AAA Scholarship',
        issuer: 'Herald College Kathmandu',
        date: '2025-01-01',
        description: 'Recognized for excellence in Academics, Attitude, and Attendance. Received Letter of Commendation and Certificate of Achievement.',
        images: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Languages
    await queryInterface.bulkInsert('languages', [
      { id: crypto.randomUUID(), name: 'Nepali', proficiency: 'Native', createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'English', proficiency: 'Fluent', createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Hindi', proficiency: 'Fluent', createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Bhojpuri', proficiency: 'Fluent', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Travels (Interests)
    await queryInterface.bulkInsert('travels', [
      {
        id: crypto.randomUUID(),
        title: 'Exploring Nepal',
        description: 'Passionate about travelling and exploring natural beauty of Nepal.',
        location: 'Nepal',
        visitDate: new Date(),
        images: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // This will delete all entries created by this seeder
    // Be careful if other data exists. This is a simple cleanup.
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.bulkDelete('skills', null, {});
    await queryInterface.bulkDelete('educations', null, {});
    await queryInterface.bulkDelete('experiences', null, {});
    await queryInterface.bulkDelete('awards', null, {});
    await queryInterface.bulkDelete('languages', null, {});
    await queryInterface.bulkDelete('travels', null, {});
  }
};
