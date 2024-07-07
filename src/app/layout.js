import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TodoApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-slate-100 h-full`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
