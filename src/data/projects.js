export const projects = [
  {
    id: "next-station",
    name: "Next Station",
    path: "/projects/next-station",
    category: "AI · EDUCATION",
    status: "Live",
    image: "/Website%20Development.jpg",
    alt: "Monochrome illustrative image for Next Station",
    description:
      "An AI-powered university guidance platform helping students in Pakistan find a direction that fits.",
    problem:
      "Choosing a university means weighing goals, budget, location, and personal preferences. Next Station brings those considerations into one guided discovery experience.",
    features: [
      "Discover universities around Pakistan",
      "Explore options by goals and budget",
      "Consider location and personal preferences",
    ],
    liveUrl: "https://next-station-six.vercel.app/",
  },
  {
    id: "zaroorat",
    name: "Zaroorat",
    path: "/projects/zaroorat",
    category: "LOCAL SERVICES · MARKETPLACE",
    status: "In Development",
    image: "/App%20Development.jpg",
    alt: "Monochrome illustrative image for Zaroorat",
    description:
      "A local services marketplace connecting people with trusted providers for everyday needs.",
    problem:
      "Finding the right local help for everyday tasks can be difficult. Zaroorat is being built to bring people and service providers closer together.",
    features: [
      "Connect people with local service providers",
      "Support everyday household needs",
      "Bring trusted help closer to home",
    ],
    tagline: "Har Zaroorat, Ek Trusted Saathi.",
  },
];

export function getProjectFromPath(pathname) {
  return projects.find((project) => project.path === pathname) ?? null;
}
