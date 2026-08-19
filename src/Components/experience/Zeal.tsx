import PostImageGrid from "../PostImageGrid";

const Zeal = () => {
  return (
    <article>
      <p>
        At{" "}
        <a
          href="https://getzeal.co"
        >
          Zeal
        </a>
        , a startup in the consumer social space, I worked as a full-stack
        developer on their iOS app, focusing on improving user experiences and
        implementing key features during their transition from alpha testing to
        public beta.
      </p>

      {/* Key Achievements */}
      <h2>Key Projects</h2>
      <div>
        <h3>
          Chatbot Integration for Event Scheduling
        </h3>
        <p>
          Improved the event scheduling experience by implementing a chat bot
          client within the app, leveraging natural language understanding for
          seamless group event creation.
        </p>

        <h3>
          Invitation System Development
        </h3>
        <p>
          Developed a comprehensive invitation system that enables users to:
        </p>
        <ul>
          <li>
            Invite friends through text messaging, email, and push notifications
          </li>
          <li>Access and utilize phone contacts for invitations</li>
          <li>Resend invitations and track invitation history</li>
          <li>Receive scheduled invitation reminders</li>
        </ul>
      </div>

      {/* Image Gallery */}
      <PostImageGrid
        columns={3}
        images={[
          {
            src: "/assets/img/zeal/zeal1.jpeg",
            alt: "Zeal App Screenshot 1",
          },
          {
            src: "/assets/img/zeal/zeal2.jpeg",
            alt: "Zeal App Screenshot 2",
          },
          {
            src: "/assets/img/zeal/zeal3.jpeg",
            alt: "Zeal App Screenshot 3",
          },
        ]}
      />

      {/* Technical Environment */}
      <h2>Technical Environment</h2>
      <ul>
        <li>React Native</li>
        <li>TypeScript</li>
        <li>HTML/CSS/JS</li>
        <li>Firebase</li>
        <li>Twilio/SendGrid</li>
      </ul>

      <p>
        Check out Zeal on their{" "}
        <a
          href="https://getzeal.co"
        >
          website
        </a>{" "}
        or download it from the App Store!
      </p>
    </article>
  );
};

export default Zeal;
