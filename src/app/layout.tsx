import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Find My Artist",
  description: "Find writers and artists to collaborate with",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
                    
          {children}

        </Providers>
      </body>
    </html>
  );
}
