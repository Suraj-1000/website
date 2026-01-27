import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Education from './pages/Education/Education';
import Travel from './pages/Travel/Travel';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';

// Contexts
import { AuthProvider } from './context/AuthContext';

// Admin Pages
// Admin Pages
// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ExperienceList from './pages/Admin/Experience/ExperienceList';
import ExperienceForm from './pages/Admin/Experience/ExperienceForm';
import SkillList from './pages/Admin/Skills/SkillList';
import SkillForm from './pages/Admin/Skills/SkillForm';

import Skills from './pages/Skills/Skills';
import Experience from './pages/Experience/Experience';
import Testimonials from './pages/Testimonials/Testimonials';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Experience Admin */}
            <Route path="experience" element={<ExperienceList />} />
            <Route path="experience/new" element={<ExperienceForm />} />
            <Route path="experience/edit/:id" element={<ExperienceForm />} />

            {/* Skills Admin */}
            <Route path="skills" element={<SkillList />} />
            <Route path="skills/new" element={<SkillForm />} />
            <Route path="skills/edit/:id" element={<SkillForm />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
