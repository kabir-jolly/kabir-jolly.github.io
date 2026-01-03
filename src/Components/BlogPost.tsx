import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { experienceContent, projectContent } from "./blog-content";
import { ContentRegistryType } from "../types";
import { colors } from "./BentoBoxes/BentoBox";

const BlogPost = () => {
  const { type, slug } = useParams<{
    type: "experience" | "project";
    slug: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when blog post component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    // Use browser history to go back to where you came from
    navigate(-1);
  };

  // Get the appropriate content based on type and slug
  const content: ContentRegistryType[string] | undefined =
    type && slug
      ? type === "experience"
        ? experienceContent[slug]
        : projectContent[slug]
      : undefined;

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">Coming soon!</h1>
      </div>
    );
  }

  const ContentComponent = content.component;

  return (
    <div className="min-h-screen bg-white">
      {/* Back button - inline, not fixed */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: colors.slate }}
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title and Date from registry */}
        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.navy }}>
          {content.postTitle}
        </h1>
        <p className="text-sm mb-6" style={{ color: colors.slate }}>
          {content.date}
        </p>
        <div className="h-px bg-gray-200 w-full mb-8"></div>
        
        <ContentComponent />
      </div>
    </div>
  );
};

export default BlogPost;
