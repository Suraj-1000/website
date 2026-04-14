'use strict';
const crypto = require('crypto');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Projects
    await queryInterface.bulkInsert('projects', [
      {
        id: crypto.randomUUID(),
        title: 'Baalvo Local Business Platform',
        description: 'A comprehensive platform for local businesses to manage their online presence, bookings, and customer interactions.',
        techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
        repoLink: 'https://github.com/surajkunwor/baalvo',
        demoLink: 'https://baalvo.com',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        title: 'Personal Portfolio v2',
        description: 'A minimalist, section-based portfolio built with React and Sequelize, featuring a powerful admin panel for content management.',
        techStack: ['React', 'TailwindCSS', 'Express', 'Sequelize'],
        repoLink: 'https://github.com/surajkunwor/portfolio-v2',
        demoLink: 'https://surajkunwor.com.np',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2455&auto=format&fit=crop',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Skills
    await queryInterface.bulkInsert('skills', [
      {
        id: crypto.randomUUID(),
        category: 'Frontend',
        items: ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Framer Motion'],
        icon: 'Layout',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        category: 'Backend',
        items: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'MongoDB', 'Redis'],
        icon: 'Server',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        category: 'DevOps & Tools',
        items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux'],
        icon: 'Tool',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Educations
    await queryInterface.bulkInsert('educations', [
      {
        id: crypto.randomUUID(),
        degree: 'Bachelor of Computer Science',
        institution: 'Tribhuvan University',
        address: 'Kathmandu, Nepal',
        level: 'Bachelors',
        startYear: '2019',
        endYear: '2023',
        grade: '3.8 CGPA',
        icon: 'GraduationCap',
        color: 'text-primary',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Experiences
    await queryInterface.bulkInsert('experiences', [
      {
        id: crypto.randomUUID(),
        role: 'Full Stack Developer',
        company: 'Tech Innovators',
        location: 'Remote',
        startDate: 'Jan 2023',
        endDate: 'Present',
        description: ['Developing and maintaining web applications using React and Node.js', 'Optimizing database performance and scalability'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Awards
    await queryInterface.bulkInsert('awards', [
      {
        id: crypto.randomUUID(),
        title: 'Outstanding Developer Award',
        issuer: 'Global Tech Summit',
        date: '2023-11-15',
        description: 'Recognized for contributing to high-impact open source projects.',
        images: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Languages
    await queryInterface.bulkInsert('languages', [
      {
        id: crypto.randomUUID(),
        name: 'English',
        proficiency: 'Fluent',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: crypto.randomUUID(),
        name: 'Nepali',
        proficiency: 'Native',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Travels
    await queryInterface.bulkInsert('travels', [
      {
        id: crypto.randomUUID(),
        title: 'Everest Base Camp Trek',
        description: 'An unforgettable 12-day journey to the base of the worlds highest peak.',
        location: 'Solukhumbu, Nepal',
        visitDate: new Date('2022-10-01'),
        images: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // References
    await queryInterface.bulkInsert('references', [
      {
        id: crypto.randomUUID(),
        name: 'Jane Doe',
        position: 'Senior Engineering Manager',
        company: 'Tech Innovators',
        email: 'jane.doe@example.com',
        phone: '+1234567890',
        relationship: 'Former Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.bulkDelete('skills', null, {});
    await queryInterface.bulkDelete('educations', null, {});
    await queryInterface.bulkDelete('experiences', null, {});
    await queryInterface.bulkDelete('awards', null, {});
    await queryInterface.bulkDelete('languages', null, {});
    await queryInterface.bulkDelete('travels', null, {});
    await queryInterface.bulkDelete('references', null, {});
  }
};
