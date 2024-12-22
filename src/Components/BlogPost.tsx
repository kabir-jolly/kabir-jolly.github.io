import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { experienceContent, projectContent } from "./blog-content";
import { ContentRegistryType } from "../types";

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
    navigate("/");
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
        <h1 className="text-3xl font-bold">Content not found</h1>
      </div>
    );
  }

  const ContentComponent = content.component;

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed position back button */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 text-gray-600 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <ContentComponent />
      </div>
    </div>
  );
};

export default BlogPost;
