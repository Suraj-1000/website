import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/services/context/AuthContext.jsx";

export const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
      >
         <AuthProvider>
            {children}
         </AuthProvider>
      </ThemeProvider>
   );
};
