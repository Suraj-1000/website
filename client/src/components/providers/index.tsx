import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/services/context/AuthContext";

export const Providers = ({ children }) => {
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
