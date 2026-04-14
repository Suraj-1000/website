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
import CRMLayout from './layouts/CRMLayout';
import Login from './pages/crm/Login';
import ForgotPassword from './pages/crm/ForgotPassword';
import ResetPassword from './pages/crm/ResetPassword';
import Dashboard from './pages/crm/Dashboard';
import ExperienceList from './pages/crm/Experience/ExperienceList';
import ExperienceForm from './pages/crm/Experience/ExperienceForm';
import SkillList from './pages/crm/Skills/SkillList';
import SkillForm from './pages/crm/Skills/SkillForm';
import ProjectList from './pages/crm/Projects/ProjectList';
import ProjectForm from './pages/crm/Projects/ProjectForm';
import EducationList from './pages/crm/Education/EducationList';
import EducationForm from './pages/crm/Education/EducationForm';

// Travel CRM
import TravelList from './pages/crm/Travel/TravelList';
import TravelForm from './pages/crm/Travel/TravelForm';

// Awards CRM
import AwardList from './pages/crm/Awards/AwardList';
import AwardForm from './pages/crm/Awards/AwardForm';

// Languages CRM
import LanguageList from './pages/crm/Languages/LanguageList';
import LanguageForm from './pages/crm/Languages/LanguageForm';

// References CRM
import ReferenceList from './pages/crm/References/ReferenceList';
import ReferenceForm from './pages/crm/References/ReferenceForm';

// Messages CRM
import CRMMessages from './pages/crm/CRMMessages';

import Skills from './pages/Skills/Skills';
import Experience from './pages/Experience/Experience';
import Testimonials from './pages/Testimonials/Testimonials';
import NotFound from './pages/NotFound/NotFound';

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

          {/* CRM Routes */}
          <Route path="/crm/login" element={<Login />} />
          <Route path="/crm/forgot-password" element={<ForgotPassword />} />
          <Route path="/crm/reset-password/:token" element={<ResetPassword />} />
          <Route path="/crm" element={<CRMLayout />}>
            <Route index element={<Navigate to="/crm/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Experience CRM */}
            <Route path="experience" element={<ExperienceList />} />
            <Route path="experience/new" element={<ExperienceForm />} />
            <Route path="experience/edit/:id" element={<ExperienceForm />} />

            {/* Skills CRM */}
            <Route path="skills" element={<SkillList />} />
            <Route path="skills/new" element={<SkillForm />} />
            <Route path="skills/edit/:id" element={<SkillForm />} />

            {/* Projects CRM */}
            <Route path="projects" element={<ProjectList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />

            {/* Education CRM */}
            <Route path="education" element={<EducationList />} />
            <Route path="education/new" element={<EducationForm />} />
            <Route path="education/edit/:id" element={<EducationForm />} />

            {/* Travel CRM */}
            <Route path="travel" element={<TravelList />} />
            <Route path="travel/new" element={<TravelForm />} />
            <Route path="travel/edit/:id" element={<TravelForm />} />

            {/* Awards CRM */}
            <Route path="awards" element={<AwardList />} />
            <Route path="awards/new" element={<AwardForm />} />
            <Route path="awards/edit/:id" element={<AwardForm />} />

            {/* Languages CRM */}
            <Route path="languages" element={<LanguageList />} />
            <Route path="languages/new" element={<LanguageForm />} />
            <Route path="languages/edit/:id" element={<LanguageForm />} />

            {/* References CRM */}
            <Route path="references" element={<ReferenceList />} />
            <Route path="references/new" element={<ReferenceForm />} />
            <Route path="references/edit/:id" element={<ReferenceForm />} />

            {/* Messages CRM */}
            <Route path="messages" element={<CRMMessages />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
