const Zeal = () => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Full-Stack Developer at Zeal</h1>
      <div className="h-px bg-gray-200 w-full mb-8"></div>

      {/* Introduction */}
      <p className="text-gray-600 mb-8">
        Summer 2023 • Full-stack development for consumer social startup
      </p>

      {/* Role Overview */}
      <h2 className="text-2xl font-semibold mb-4">Role Overview</h2>
      <p className="mb-6">
        At{" "}
        <a
          href="https://getzeal.co"
          className="text-blue-600 hover:text-blue-800"
        >
          Zeal
        </a>
        , a startup in the consumer social space, I worked as a full-stack
        developer on their iOS app, focusing on improving user experiences and
        implementing key features during their transition from alpha testing to
        public beta.
      </p>

      {/* Key Achievements */}
      <h2 className="text-2xl font-semibold mb-4">Key Projects</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Chatbot Integration for Event Scheduling
        </h3>
        <p className="mb-4">
          Improved the event scheduling experience by implementing a chat bot
          client within the app, leveraging natural language understanding for
          seamless group event creation.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Invitation System Development
        </h3>
        <p className="mb-4">
          Developed a comprehensive invitation system that enables users to:
        </p>
        <ul className="mb-6">
          <li>
            Invite friends through text messaging, email, and push notifications
          </li>
          <li>Access and utilize phone contacts for invitations</li>
          <li>Resend invitations and track invitation history</li>
          <li>Receive scheduled invitation reminders</li>
        </ul>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <img
          src="/src/assets/img/zeal/zeal1.jpeg"
          alt="Zeal App Screenshot 1"
          className="rounded-lg"
        />
        <img
          src="/src/assets/img/zeal/zeal2.jpeg"
          alt="Zeal App Screenshot 2"
          className="rounded-lg"
        />
        <img
          src="/src/assets/img/zeal/zeal3.jpeg"
          alt="Zeal App Screenshot 3"
          className="rounded-lg"
        />
      </div>

      {/* Technical Environment */}
      <h2 className="text-2xl font-semibold mb-4">Technical Environment</h2>
      <ul className="mb-6">
        <li>React Native</li>
        <li>TypeScript</li>
        <li>HTML/CSS/JS</li>
        <li>Firebase</li>
        <li>Twilio/SendGrid</li>
      </ul>

      <p className="mb-6">
        Check out Zeal on their{" "}
        <a
          href="https://getzeal.co"
          className="text-blue-600 hover:text-blue-800"
        >
          website
        </a>{" "}
        or download it from the App Store!
      </p>
    </article>
  );
};

export default Zeal;
