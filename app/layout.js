// app/layout.jsx
import "./globals.css";
import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Emirkan Huluca — Portfolio",
  description: "Game Developer & Web Developer portfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <Header />
          <main className="container py-10 min-h-[70vh]">{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
