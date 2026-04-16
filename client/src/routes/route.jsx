import { Navigate } from "react-router-dom";
import CRMLayout from "@/pages/_components/layout/crm-layout";
import Login from "@/pages/crm/login";
import Dashboard from "@/pages/crm/Dashboard";
import CRMMessages from "@/pages/crm/CRMMessages";

// Experience
import ExperienceList from "@/pages/crm/Experience/ExperienceList";
import ExperienceForm from "@/pages/crm/Experience/ExperienceForm";

// Skills
import SkillList from "@/pages/crm/Skills/SkillList";
import SkillForm from "@/pages/crm/Skills/SkillForm";

// Projects
import ProjectList from "@/pages/crm/Projects/ProjectList";
import ProjectForm from "@/pages/crm/Projects/ProjectForm";

// Education
import EducationList from "@/pages/crm/Education/EducationList";
import EducationForm from "@/pages/crm/Education/EducationForm";

// Travel
import TravelList from "@/pages/crm/Travel/TravelList";
import TravelForm from "@/pages/crm/Travel/TravelForm";

// Awards
import AwardList from "@/pages/crm/Awards/AwardList";
import AwardForm from "@/pages/crm/Awards/AwardForm";

// Languages
import LanguageList from "@/pages/crm/Languages/LanguageList";
import LanguageForm from "@/pages/crm/Languages/LanguageForm";

// References
import ReferenceList from "@/pages/crm/References/ReferenceList";
import ReferenceForm from "@/pages/crm/References/ReferenceForm";

// Auth
import ForgotPassword from "@/pages/crm/ForgotPassword";
import ResetPassword from "@/pages/crm/ResetPassword";




export const routes = [
   {
      path: "/",
      element: <Navigate to="/crm/dashboard" />,
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
      path: "/admin",
      element: <Navigate to="/crm/dashboard" />,
   },
];


