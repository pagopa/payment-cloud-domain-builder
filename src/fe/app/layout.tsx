import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "IDH - Infrastructure Design HandBook",
  description: "Domain Builder and IDH Module Advisor",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="it" suppressHydrationWarning>
      <head>
        <Script
            id="theme-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  console.log('💡 Theme script: localStorage theme =', theme);
                  console.log('💡 Theme script: prefersDark =', prefersDark);
                  
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    console.log('💡 Theme script: Setting DARK mode');
                    document.documentElement.classList.add('dark');
                  } else {
                    console.log('💡 Theme script: Setting LIGHT mode');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Theme init error:', e);
                }
              })();
            `,
            }}
        />
      </head>
      <body className="antialiased">
      {children}
      </body>
      </html>
  );
}