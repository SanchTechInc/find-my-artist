import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { Providers } from "../providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
          <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
