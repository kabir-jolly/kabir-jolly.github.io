const SeniorDeveloper = () => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">
        Senior Developer at Company Name
      </h1>
      <div className="h-px bg-gray-200 w-full mb-8"></div>

      {/* Introduction */}
      <p className="text-gray-600 mb-8">
        2020 - Present • Leading development initiatives and mentoring team
        members
      </p>

      {/* Role Overview */}
      <h2 className="text-2xl font-semibold mb-4">Role Overview</h2>
      <p className="mb-6">
        As a Senior Developer at Company Name, I've led multiple high-impact
        projects and mentored junior developers. My role combines technical
        leadership with hands-on development, focusing on creating scalable
        solutions for enterprise clients.
      </p>

      {/* Key Achievements */}
      <h2 className="text-2xl font-semibold mb-4">Key Achievements</h2>
      <ul className="mb-6">
        <li>
          Led the architectural design and implementation of a
          microservices-based platform
        </li>
        <li>
          Reduced system response time by 40% through performance optimization
        </li>
        <li>
          Mentored 5 junior developers who have since been promoted to mid-level
          positions
        </li>
        <li>
          Introduced automated testing practices that increased code coverage to
          85%
        </li>
      </ul>

      {/* Technical Environment */}
      <h2 className="text-2xl font-semibold mb-4">Technical Environment</h2>
      <p className="mb-6">
        The role involves working with modern web technologies in a cloud-native
        environment:
      </p>
      <ul className="mb-6">
        <li>Frontend: React, TypeScript, Redux</li>
        <li>Backend: Node.js, Express, GraphQL</li>
        <li>Infrastructure: AWS, Docker, Kubernetes</li>
        <li>Testing: Jest, Cypress</li>
      </ul>

      {/* Projects */}
      <h2 className="text-2xl font-semibold mb-4">Notable Projects</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Enterprise Customer Portal
        </h3>
        <p className="mb-4">
          Led the development of a customer portal serving 500+ enterprise
          clients. Implemented real-time data visualization and reporting
          features.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          CI/CD Pipeline Modernization
        </h3>
        <p className="mb-4">
          Spearheaded the modernization of our deployment pipeline, reducing
          deployment time from 2 hours to 15 minutes.
        </p>
      </div>
    </article>
  );
};

export default SeniorDeveloper;
