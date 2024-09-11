import React, { ReactNode } from "react";
import "./globals.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* NavBar */}
        {children}
        {/* Footer */}
      </body>
    </html>
  );
};

export default RootLayout;
