import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/AuthProvider/AuthProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Planner - Plan your goal",
  description: "Planner - Plan your goal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}
        
        </AuthProvider>
          
      </body>
    </html>
  );
}
