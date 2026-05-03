import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
   const [mounted, setMounted] = useState(false);
   const { setTheme, resolvedTheme } = useTheme();

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
   }, []);

   if (!mounted) {
      return null;
   }

   return (
      <Button
         variant="outline"
         size="icon"
         className="rounded-full border cursor-pointer"
         onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
         <span className="sr-only">Toggle theme</span>
      </Button>
   );
}
