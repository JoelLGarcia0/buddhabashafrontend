import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary border-t border-light mt-4 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-2">
        <p className="text-black text-sm">
          © {new Date().getFullYear()} Buddha Basha Jewelry. All Rights
          Reserved. This website was created by{" "}
          <a
            className="font-medium"
            href="https://restweb.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            RESTWeb.dev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
