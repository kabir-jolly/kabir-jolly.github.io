import { useState, useEffect } from "react";
import {
  ChevronDown,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ChevronRight,
} from "lucide-react";
import {
  SkillTagProps,
  CardProps,
  ExperienceType,
  ProjectType,
} from "../types";

// Skill tag component
const SkillTag = ({ skill }: SkillTagProps) => (
  <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600 mr-2 mb-2">
    {skill}
  </span>
);

// Card component for both projects and experiences
const Card = ({
  type,
  title,
  subtitle,
  description,
  image,
  skills,
  slug,
}: CardProps) => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div
      onClick={() => navigate(`/${type}/${slug}`)}
      className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:bg-gray-100 hover:shadow-xl shadow-md flex flex-col md:flex-row w-full"
    >
      {/* Image container */}
      <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0">
        <img
          src={image || "/api/placeholder/300/300"}
          alt={title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap mt-auto pt-4 border-t">
          {skills.map((skill, index) => (
            <SkillTag key={index} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [showMoreAbout, setShowMoreAbout] = useState(false);

  // Sample data
  const experiences: ExperienceType[] = [
    {
      title: "Senior Developer",
      subtitle: "Company Name",
      date: "2020 - Present",
      description:
        "Led development of key features and mentored junior developers. Implemented modern web technologies and best practices.",
      image: "/api/placeholder/300/300",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      slug: "senior-developer-company",
    },
    {
      title: "Software Engineer",
      subtitle: "Tech Corp",
      date: "2018 - 2020",
      description:
        "Developed scalable solutions for enterprise clients. Optimized application performance and implemented new features.",
      image: "/api/placeholder/300/300",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      slug: "software-engineer-techcorp",
    },
    {
      title: "Junior Developer",
      subtitle: "Startup Inc",
      date: "2016 - 2018",
      description:
        "Built and maintained web applications. Collaborated with design team to implement user interfaces and improve user experience.",
      image: "/api/placeholder/300/300",
      skills: ["JavaScript", "React", "MongoDB", "Express"],
      slug: "junior-developer-startup",
    },
  ];

  const projects: ProjectType[] = [
    {
      title: "E-commerce Platform",
      subtitle: "Full Stack Application",
      description:
        "Built a modern e-commerce platform with real-time inventory management and payment processing.",
      image: "/api/placeholder/300/300",
      skills: ["React", "Firebase", "Stripe", "Tailwind CSS"],
      demo: "https://demo.com",
      github: "https://github.com",
      slug: "ecommerce-platform",
    },
    {
      title: "AI Image Generator",
      subtitle: "Machine Learning Project",
      description:
        "Developed an AI-powered image generation tool using deep learning models and modern web technologies.",
      image: "/api/placeholder/300/300",
      skills: ["Python", "TensorFlow", "FastAPI", "React"],
      demo: "https://demo.com",
      github: "https://github.com",
      slug: "ai-image-generator",
    },
    {
      title: "Social Media Dashboard",
      subtitle: "Analytics Tool",
      description:
        "Created a comprehensive dashboard for social media analytics with real-time data visualization.",
      image: "/api/placeholder/300/300",
      skills: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
      demo: "https://demo.com",
      github: "https://github.com",
      slug: "social-dashboard",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "resume") {
      window.open("/path/to/resume.pdf", "_blank");
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Scroll handler (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-semibold">Kabir Jolly</span>
            <div className="flex items-center space-x-8">
              {["about", "experience", "projects", "resume"].map((section) => (
                <>
                  {section === "resume" && (
                    <div className="h-6 w-px bg-gray-200" />
                  )}
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize ${
                      activeSection === section
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {section}
                  </button>
                </>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 max-w-6xl mx-auto">
        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="w-full px-4 py-16 relative z-10">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">About Me</h1>
            <p className="text-lg text-gray-700 mb-8">
              Hey! I'm Kabir, a Master's student at Stanford studying Artificial
              Intelligence and Human-Computer Interaction. I care deeply about
              building tech that is cutting-edge and designing experiences that
              are magical to use🪄.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              I love playing tennis and pickleball🎾, hiking around the Bay
              Area🌁, and (sometimes regrettably) watching tons of movies that
              come out in theaters🎥.
            </p>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                showMoreAbout
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-lg text-gray-700 mb-8">
                Alongside school, I'm currently building internal tools at{" "}
                <a
                  href="https://www.pear.vc"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pear VC
                </a>{" "}
                and am a Course Assistant for Stanford's CS Senior Capstone
                Project class. Previously, I was Head of Product and Engineering
                at the{" "}
                <a
                  href="https://www.dormroomfund.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dorm Room Fund
                </a>
                , built software at{" "}
                <a
                  href="https://www.fieldguide.io"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fieldguide
                </a>
                ,{" "}
                <a
                  href="https://www.getzeal.co"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zeal
                </a>
                , and{" "}
                <a
                  href="https://www.valarlabs.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Valar Labs
                </a>
                , and worked on interpretable AI research at the Stanford
                Medical Center.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                I am also an{" "}
                <a
                  href="https://stvp.stanford.edu/alp/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Accel Leadership Fellow
                </a>
                ,{" "}
                <a
                  href="https://neo.com/scholars"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Neo Scholar
                </a>
                ,{" "}
                <a
                  href="https://www.8vc.com/fellows/kabir-jolly"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  8VC Engineering Fellow
                </a>
                , and{" "}
                <a
                  href="https://www.pear.vc/garage"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pear Garage Fellow
                </a>
                .
              </p>
            </div>

            <button
              onClick={() => setShowMoreAbout(!showMoreAbout)}
              className="text-blue-600 hover:text-blue-700 font-medium mb-8 flex items-center gap-2"
            >
              {showMoreAbout ? "Show Less" : "More About Me"}
              <ChevronRight
                className={`w-4 h-4 transform transition-transform ${
                  showMoreAbout ? "-rotate-90" : ""
                }`}
              />
            </button>

            <ChevronDown
              className="w-8 h-8 text-gray-600/80 animate-bounce mx-auto cursor-pointer hover:text-gray-900"
              onClick={() => scrollToSection("experience")}
            />
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="w-full max-w-5xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8">Experience</h2>
            <div className="flex flex-col space-y-6 w-full">
              {experiences.map((experience, index) => (
                <Card
                  key={index}
                  type="experience"
                  title={experience.title}
                  subtitle={`${experience.subtitle} • ${experience.date}`}
                  description={experience.description}
                  image={experience.image}
                  skills={experience.skills}
                  slug={experience.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="w-full max-w-5xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="flex flex-col space-y-6 w-full">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  type="project"
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  image={project.image}
                  skills={project.skills}
                  slug={project.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:kjolly@stanford.edu"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://github.com/kabir-jolly"
                className="text-gray-600 hover:text-blue-600"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/kabirjolly"
                className="text-gray-600 hover:text-blue-600"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/kabirjolly_"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com/kabirjolly"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
