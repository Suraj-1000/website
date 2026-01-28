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
import ProjectList from './pages/Admin/Projects/ProjectList';
import ProjectForm from './pages/Admin/Projects/ProjectForm';
import EducationList from './pages/Admin/Education/EducationList';
import EducationForm from './pages/Admin/Education/EducationForm';

// Travel Admin
import TravelList from './pages/Admin/Travel/TravelList';
import TravelForm from './pages/Admin/Travel/TravelForm';

// Awards Admin
import AwardList from './pages/Admin/Awards/AwardList';
import AwardForm from './pages/Admin/Awards/AwardForm';

// Languages Admin
import LanguageList from './pages/Admin/Languages/LanguageList';
import LanguageForm from './pages/Admin/Languages/LanguageForm';

// References Admin
import ReferenceList from './pages/Admin/References/ReferenceList';
import ReferenceForm from './pages/Admin/References/ReferenceForm';

// Messages Admin
import AdminMessages from './pages/Admin/AdminMessages';

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
            <Route path="/references" element={<Testimonials />} />
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

            {/* Projects Admin */}
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />

            {/* Education Admin */}
            <Route path="education" element={<EducationList />} />
            <Route path="education/new" element={<EducationForm />} />
            <Route path="education/edit/:id" element={<EducationForm />} />

            {/* Travel Admin */}
            <Route path="travel" element={<TravelList />} />
            <Route path="travel/new" element={<TravelForm />} />
            <Route path="travel/edit/:id" element={<TravelForm />} />

            {/* Awards Admin */}
            <Route path="awards" element={<AwardList />} />
            <Route path="awards/new" element={<AwardForm />} />
            <Route path="awards/edit/:id" element={<AwardForm />} />

            {/* Languages Admin */}
            <Route path="languages" element={<LanguageList />} />
            <Route path="languages/new" element={<LanguageForm />} />
            <Route path="languages/edit/:id" element={<LanguageForm />} />

            {/* References Admin */}
            <Route path="references" element={<ReferenceList />} />
            <Route path="references/new" element={<ReferenceForm />} />
            <Route path="references/edit/:id" element={<ReferenceForm />} />

            {/* Messages Admin */}
            <Route path="messages" element={<AdminMessages />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
