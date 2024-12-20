const AIImageGenerator = () => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">E-commerce Platform</h1>
      <div className="h-px bg-gray-200 w-full mb-8"></div>

      {/* Introduction */}
      <p className="text-gray-600 mb-8">
        A modern e-commerce solution with real-time inventory management
      </p>

      {/* Project Overview */}
      <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
      <p className="mb-6">
        Built a full-featured e-commerce platform that handles everything from
        product management to order fulfillment. The platform integrates
        real-time inventory tracking with seamless payment processing, providing
        a smooth shopping experience for customers.
      </p>

      {/* Features */}
      <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
      <ul className="mb-6">
        <li>Real-time inventory management system</li>
        <li>Secure payment processing with Stripe integration</li>
        <li>Responsive design optimized for mobile devices</li>
        <li>Advanced search and filtering capabilities</li>
        <li>Customer account management and order history</li>
      </ul>

      {/* Technical Details */}
      <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Frontend</h3>
        <p className="mb-4">
          Built with React and TypeScript, using Tailwind CSS for styling.
          Implements modern state management patterns with Redux Toolkit and RTK
          Query for efficient data fetching and caching.
        </p>

        <h3 className="text-xl font-semibold mb-2">Backend</h3>
        <p className="mb-4">
          Firebase provides the backend infrastructure, including
          authentication, real-time database, and cloud functions for order
          processing.
        </p>

        <h3 className="text-xl font-semibold mb-2">Payment Processing</h3>
        <p className="mb-4">
          Integrated Stripe for secure payment processing, supporting multiple
          payment methods and currencies.
        </p>
      </div>

      {/* Challenges and Solutions */}
      <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
      <div className="mb-6">
        <p className="mb-4">
          One of the main challenges was implementing real-time inventory
          updates across multiple concurrent sessions. This was solved by using
          Firebase's real-time database with optimistic UI updates and conflict
          resolution.
        </p>
        <p className="mb-4">
          Another challenge was optimizing the loading performance with a large
          product catalog. Implemented lazy loading and virtual scrolling to
          handle large datasets efficiently.
        </p>
      </div>

      {/* Links */}
      <h2 className="text-2xl font-semibold mb-4">Project Links</h2>
      <div className="flex space-x-4">
        <a href="#" className="text-blue-600 hover:underline">
          Live Demo
        </a>
        <a href="#" className="text-blue-600 hover:underline">
          GitHub Repository
        </a>
      </div>
    </article>
  );
};

export default AIImageGenerator;
