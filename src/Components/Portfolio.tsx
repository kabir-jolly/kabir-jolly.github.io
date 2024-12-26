import { useState, useEffect } from "react";
import {
  ChevronDown,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ChevronRight,
  Link,
} from "lucide-react";
import {
  SkillTagProps,
  CardProps,
  ExperienceType,
  ProjectType,
} from "../types";

// Skill tag component
const SkillTag = ({ skill }: SkillTagProps) => (
  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-600 mr-1.5 mb-1.5">
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
    window.location.href = `/#${path}`;
  };

  return (
    <div
      onClick={slug ? () => navigate(`/${type}/${slug}`) : undefined}
      className={`group bg-gray-50 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:bg-gray-100 hover:shadow-lg shadow-sm flex flex-col md:flex-row w-full ${
        slug ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {/* Image container */}
      <div className="relative w-full md:w-56 h-36 md:h-auto flex-shrink-0 bg-white p-4 flex items-center justify-center">
        <img
          src={image || "/api/placeholder/300/300"}
          alt={title}
          className="max-w-[50%] max-h-[80%] object-contain group-hover:opacity-90 transition-opacity duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-grow p-4 flex flex-col justify-between relative">
        {slug && (
          <div className="absolute top-4 right-4">
            <Link className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <div>
          <div className="mb-2">
            <h3 className="text-base font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap mt-auto pt-2 border-t">
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const experiences: ExperienceType[] = [
    {
      title: "Software Engineering Fellow",
      subtitle: "Pear VC",
      date: "11/24 - Present",
      description:
        "Building internal tools to help our investment team and portfolio companies.",
      image: "/assets/img/pear/pear_logo.png",
      skills: ["React", "TypeScript", "Airtable", "Python"],
    },
    {
      title: "Software Engineering Intern",
      subtitle: "Fieldguide (backed by YC, Bessemer, 8VC)",
      date: "2024",
      description:
        "Built full-stack tooling for Fieldguide's newest platform offering - financial audits.",
      image: "/assets/img/fieldguide/fieldguide.png",
      skills: ["GraphQL", "TypeScript", "React", "PostgreSQL"],
    },
    {
      title: "Head of Product and Engineering",
      subtitle: "Dorm Room Fund",
      date: "2023-2024",
      description:
        "Led all development and product efforts for DRF's investment team and portfolio.",
      image: "/assets/img/dormroomfund/drf.png",
      skills: ["TypeScript", "React", "Airtable", "Product Management"],
    },
    {
      title: "Full-Stack Engineering Intern",
      subtitle: "Zeal AI (Stealth)",
      date: "2023",
      description:
        "Built invitations and chatbot for a activity-based relationship building social app",
      image: "/assets/img/zeal/zeal.jpg",
      skills: [
        "TypeScript",
        "HTML/CSS/JS",
        "ReactNative",
        "Chatbot Development",
      ],
      slug: "zeal",
    },
    {
      title: "Machine Learning Engineering Intern",
      subtitle: "Valar Labs (backed by a16z, Pear)",
      date: "2022",
      description:
        "Built tumor segmentation, classification, and data ingestion pipelines for oncologists",
      image: "/assets/img/valar/valarlabs.jpeg",
      skills: ["PyTorch", "Tensorflow", "Labelbox"],
      slug: "valar",
    },
  ];

  const projects: ProjectType[] = [
    {
      title: "Receipts",
      date: "2024",
      description:
        "Mac app that generates statistical and AI-driven insights on your iMessage data. 100+ users.",
      image: "/assets/img/receipts/receipts.png",
      skills: ["Electron React", "TypeScript", "AWS", "LLM APIs", "MySQL"],
      slug: "receipts",
    },
    {
      title: "Modifying MinBERT",
      date: "Stanford CS 224N • 2023",
      description:
        "Researching ways to improve multi-task performance of MinBERT.",
      image: "/assets/img/224n/224n.jpeg",
      skills: ["PyTorch", "NLP", "Tranformers"],
      slug: "224n",
    },
    {
      title: "Predicting Chronic Disease Exacerbation During Wildfires",
      date: "Stanford Medical Center • 2020-2023",
      description:
        "Built interpretable AI models to aid clinicians in targeting preventative interventions for patients during wildfire season.",
      image: "/assets/img/aqi/stanford_med.png",
      skills: ["PyTorch", "NLP", "Attention Networks", "AWS", "Parquet"],
      slug: "stanford-medical-center",
    },
    {
      title: "Depth Aware Pixel2Mesh",
      date: "Stanford CS 231N • 2022",
      description:
        "Improving object mesh reconstruction using depth-aware inputs.",
      image: "/assets/img/231n/231n.jpeg",
      skills: ["PyTorch", "Computer Vision", "Segmentation Models"],
      slug: "231n",
    },
    {
      title: "Nasal Cycle Detection",
      date: "Stanford Wehab Lab • 2020-2023",
      description:
        "Built and programmed a digital health embedded system for palatal artery blood flow analysis.",
      image: "/assets/img/wehab/wehab.png",
      skills: ["Arduino", "Signal Analysis"],
      slug: "wehab",
    },
    {
      title: "ScrAPPS",
      date: "2017-2019",
      description:
        "Built an app to connect grocery stores and restaurants with composting facilities. Hauled a bunch of pineapple peels and spoiled lettuce with my friend Michael.",
      image: "/assets/img/scrapps/scrapps.png",
      skills: ["Waste Management!", "Swift", "Firebase"],
      slug: "scrapps",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "resume") {
      window.open("/assets/files/kabirjolly_resume_1-2-25.pdf", "_blank");
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 10; // Adjust this value as needed (accounts for fixed header + padding)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
    <div className="min-h-screen light">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <span className="text-lg font-semibold">Kabir Jolly</span>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {["about", "experience", "projects", "resume"].map((section) => (
                <>
                  {section === "resume" && (
                    <div className="h-5 w-px bg-gray-200" />
                  )}
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-sm ${
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    mobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-200 ${
              mobileMenuOpen ? "max-h-48" : "max-h-0"
            }`}
          >
            <div className="py-2 space-y-2">
              {["about", "experience", "projects", "resume"].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-2 py-1.5 capitalize text-sm ${
                    activeSection === section
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-14 max-w-6xl mx-auto">
        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="w-full max-w-5xl mx-auto px-4 py-12 relative z-10">
            <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
              <img
                src="/assets/img/prof_pic.jpg"
                alt="Kabir Jolly"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">
                  About Me
                </h1>
                <p className="text-base text-gray-700 mb-6">
                  Hey! I'm Kabir, a Master's student at Stanford studying
                  Artificial Intelligence and Human-Computer Interaction. I care
                  deeply about building cutting-edge tech and designing magical
                  user experiences🪄.
                </p>
                <p className="text-base text-gray-700 mb-6">
                  I love playing tennis and pickleball🎾, hiking around the Bay
                  Area🌁, and (sometimes regrettably) watching tons of movies
                  that come out in theaters🎥.
                </p>

                {!showMoreAbout && (
                  <button
                    onClick={() => setShowMoreAbout(true)}
                    className="bg-white shadow-md active:shadow-sm active:opacity-90 transition-all duration-200 px-3 py-1.5 rounded-lg text-blue-600 hover:text-blue-700 font-medium mb-6 flex items-center gap-1.5 text-sm"
                  >
                    More About Me
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    showMoreAbout
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-base text-gray-700 mb-6">
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
                    Project class. Previously, I was Head of Product and
                    Engineering at the{" "}
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
                  <p className="text-base text-gray-700 mb-6">
                    I am also a{" "}
                    <a
                      href="https://neo.com/scholars"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Neo Scholar
                    </a>{" "}
                    and a Fellow at{" "}
                    <a
                      href="https://stvp.stanford.edu/alp/"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Accel
                    </a>
                    ,{" "}
                    <a
                      href="https://www.8vc.com/fellows/kabir-jolly"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      8VC
                    </a>
                    , and{" "}
                    <a
                      href="https://www.pear.vc/garage"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pear
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <ChevronDown
              className="w-6 h-6 text-gray-600/80 animate-bounce mx-auto cursor-pointer hover:text-gray-900"
              onClick={() => scrollToSection("experience")}
            />
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="w-full max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="flex flex-col space-y-4 w-full">
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
          <div className="w-full max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="flex flex-col space-y-4 w-full">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  type="project"
                  title={project.title}
                  subtitle={project.date}
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
        <footer className="bg-white py-6">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center space-x-6">
              <a
                href="mailto:kjolly@stanford.edu"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/kabir-jolly"
                className="text-gray-600 hover:text-blue-600"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/kabirjolly"
                className="text-gray-600 hover:text-blue-600"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com/kabirjolly_"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/kabirjolly"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
