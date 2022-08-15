import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { useTheme } from "next-themes";

import Footer from "@/components/Footer";

import { AnimatePresence, motion } from "framer-motion";

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  let [hoveredIndex, setHoveredIndex] = useState(null);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Manu Arora – Developer, writer, creator.",
    description: `Full-Stack developer, JavaScript enthusiast, Freelancer and a Learner.`,
    image: "https://manuarora.in/static/images/banner.png",
    type: "website",
    ...customMeta,
  };

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blog",
      link: "/blog",
    },

    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Snippets",
      link: "/snippets",
    },
    {
      name: "Projects",
      link: "/projects",
    },
  ];

  return (
    <div className="bg-white dark:bg-black">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://manuarora.in${router.asPath}`}
        />
        <link rel="canonical" href={`https://manuarora.in${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Manu Arora" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mannupaaji" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white dark:bg-black bg-opacity-60">
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="bg-gray-200 dark:bg-gray-800 rounded p-3 h-10 w-10"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="h-4 w-4 text-gray-800 dark:text-gray-200"
            >
              {theme === "dark" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          )}
        </button>
        <div>
          {links.map((navLink, index) => (
            <NextLink href="/">
              <a
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative rounded-lg px-1 py-1 sm:px-4 sm:py-2 text-sm text-gray-700 dark:text-gray-200 transition-all delay-150 hover:text-gray-900 dark:hover:text-gray-900"
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gray-100"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.15 } }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                <span className="relative z-10">{navLink.name}</span>
              </a>
              {/* <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
                Home
              </a> */}
            </NextLink>
          ))}
          {/* <NextLink href="/blog">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">Blog</a>
          </NextLink>

          <NextLink href="/dashboard">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              Dashboard
            </a>
          </NextLink>
          <NextLink href="/snippets">
            <a className="p-1 sm:p-4 hidden md:inline text-gray-900 dark:text-gray-100">
              Snippets
            </a>
          </NextLink>
          <NextLink href="/projects">
            <a className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
              Projects
            </a>
          </NextLink> */}
        </div>
      </nav>
      <main
        id="skip"
        className="flex flex-col justify-center bg-white dark:bg-black px-8 text-gray-900 dark:text-gray-100"
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
