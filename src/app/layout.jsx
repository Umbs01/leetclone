import { Inter } from "next/font/google";
import { Syne } from "next/font/google";
import "./globals.css";

// Import fonts
const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"] });
export const metadata = {
  title: "SE Coding platform",
  description: "This website provides an interactive platform for students to enhance their coding skills by solving various coding problems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black py-0`}>{children}
      </body>
    </html>
  );
}
