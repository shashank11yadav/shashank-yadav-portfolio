export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shashank Yadav",
    "jobTitle": "Software Development Engineer",
    "description": "Software Development Engineer specializing in AI-driven solutions, full-stack development, and modern web technologies.",
    "url": "https://shashank11yadav.github.io/shashank-yadav-portfolio/",
    "sameAs": [
      "https://github.com/shashank11yadav",
      "https://www.linkedin.com/in/shashank-yadav-cs"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript", 
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Machine Learning",
      "Artificial Intelligence",
      "Full Stack Development",
      "Web Development",
      "Three.js",
      "Software Engineering"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Development Engineer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Remote"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://shashank11yadav.github.io/shashank-yadav-portfolio/"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Computer Science"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}