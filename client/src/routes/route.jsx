import { Navigate } from "react-router-dom";

// Public Layout & Pages
import Layout from "@/pages/_components/layout/Layout";
import Home from "@/pages/public/Home/Home";
import About from "@/pages/public/About/About";
import Projects from "@/pages/public/Projects/Projects";
import Skills from "@/pages/public/Skills/Skills";
import Contact from "@/pages/public/Contact/Contact";
import NotFound from "@/pages/public/NotFound/NotFound";

// Conditionally import optional public pages
import ExperiencePage from "@/pages/public/Experience/Experience";
import EducationPage from "@/pages/public/Education/Education";
import TravelPage from "@/pages/public/Travel/Travel";
import References from "@/pages/public/References/References";
import ResumePage from "@/pages/public/Resume/Resume";
import Awards from "@/pages/public/Awards/Awards";
import Languages from "@/pages/public/Languages/Languages";

// CRM Layout & Auth
import CRMLayout from "@/pages/_components/layout/crm-layout";
import Login from "@/pages/crm/login";
import Dashboard from "@/pages/crm/Dashboard";
import CRMMessages from "@/pages/crm/CRMMessages";
import ForgotPassword from "@/pages/crm/ForgotPassword";
import ResetPassword from "@/pages/crm/ResetPassword";

// CRM Content Modules
import ExperienceList from "@/pages/crm/Experience/ExperienceList";
import ExperienceForm from "@/pages/crm/Experience/ExperienceForm";
import SkillList from "@/pages/crm/Skills/SkillList";
import SkillForm from "@/pages/crm/Skills/SkillForm";
import ProjectList from "@/pages/crm/Projects/ProjectList";
import ProjectForm from "@/pages/crm/Projects/ProjectForm";
import EducationList from "@/pages/crm/Education/EducationList";
import EducationForm from "@/pages/crm/Education/EducationForm";
import TravelList from "@/pages/crm/Travel/TravelList";
import TravelForm from "@/pages/crm/Travel/TravelForm";
import AwardList from "@/pages/crm/Awards/AwardList";
import AwardForm from "@/pages/crm/Awards/AwardForm";
import LanguageList from "@/pages/crm/Languages/LanguageList";
import LanguageForm from "@/pages/crm/Languages/LanguageForm";
import ReferenceList from "@/pages/crm/References/ReferenceList";
import ReferenceForm from "@/pages/crm/References/ReferenceForm";
import ProfileForm from "@/pages/crm/Profile/ProfileForm";


export const routes = [
   // ─── Public Portfolio ──────────────────────────────────────────────────────
   {
      path: "/",
      element: <Layout />,
      children: [
         { index: true,         element: <Home /> },
         { path: "about",       element: <About /> },
         { path: "projects",    element: <Projects /> },
         { path: "skills",      element: <Skills /> },
         { path: "experience",  element: <ExperiencePage /> },
         { path: "education",   element: <EducationPage /> },
         { path: "travel",      element: <TravelPage /> },
         { path: "references", element: <References /> },
         { path: "awards",      element: <Awards /> },
         { path: "languages",   element: <Languages /> },
         { path: "contact",     element: <Contact /> },
         { path: "resume",      element: <ResumePage /> },
         { path: "*",           element: <NotFound /> },
      ],
   },
   {
      path: "/crm",
      element: <CRMLayout />,
      children: [
         {
            path: "dashboard",
            element: <Dashboard />,
         },
         {
            path: "experience",
            element: <ExperienceList />,
         },
         {
            path: "experience/new",
            element: <ExperienceForm />,
         },
         {
            path: "experience/edit/:id",
            element: <ExperienceForm />,
         },
         {
            path: "skills",
            element: <SkillList />,
         },
         {
            path: "skills/new",
            element: <SkillForm />,
         },
         {
            path: "skills/edit/:id",
            element: <SkillForm />,
         },
         {
            path: "projects",
            element: <ProjectList />,
         },
         {
            path: "projects/new",
            element: <ProjectForm />,
         },
         {
            path: "projects/edit/:id",
            element: <ProjectForm />,
         },
         {
            path: "education",
            element: <EducationList />,
         },
         {
            path: "education/new",
            element: <EducationForm />,
         },
         {
            path: "education/edit/:id",
            element: <EducationForm />,
         },
         {
            path: "travel",
            element: <TravelList />,
         },
         {
            path: "travel/new",
            element: <TravelForm />,
         },
         {
            path: "travel/edit/:id",
            element: <TravelForm />,
         },
         {
            path: "awards",
            element: <AwardList />,
         },
         {
            path: "awards/new",
            element: <AwardForm />,
         },
         {
            path: "awards/edit/:id",
            element: <AwardForm />,
         },
         {
            path: "languages",
            element: <LanguageList />,
         },
         {
            path: "languages/new",
            element: <LanguageForm />,
         },
         {
            path: "languages/edit/:id",
            element: <LanguageForm />,
         },
         {
            path: "references",
            element: <ReferenceList />,
         },
         {
            path: "references/new",
            element: <ReferenceForm />,
         },
         {
            path: "references/edit/:id",
            element: <ReferenceForm />,
         },
         {
            path: "messages",
            element: <CRMMessages />,
         },
         {
            path: "profile",
            element: <ProfileForm />,
         },

      ],
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/crm/login",
      element: <Login />,
   },
   {
      path: "/crm/forgot-password",
      element: <ForgotPassword />,
   },
   {
      path: "/crm/reset-password/:token",
      element: <ResetPassword />,
   },


   {
      path: "/admin/login",
      element: <Navigate to="/crm/login" />,
   },
   {
      path: "/admin/reset-password/:token",
      element: <ResetPassword />,
   },
   {
      path: "/admin",
      element: <Navigate to="/crm/dashboard" />,
   },
];


