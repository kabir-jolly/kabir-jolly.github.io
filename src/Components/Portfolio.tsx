import { Link } from "react-router-dom";
import ListRow from "./ListRow";
import ThemeToggle from "./ThemeToggle";
import HarbourFade from "./HarbourFade";
import { experiences, projects } from "../data/content";
import { postEntries } from "../data/posts";
import { projectPlace, yearLabel } from "../data/format";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const Portfolio = () => {
  const writing = postEntries.filter((post) => post.type === "writing");

  return (
    <div className="home">
      <div className="page">
        <header className="home-header">
          <div>
            <h1>Kabir Jolly</h1>
            <p className="home-role">
              Member of Technical Staff at{" "}
              <a href="https://www.openevidence.com" {...ext}>
                OpenEvidence
              </a>
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="home-bio">
          <p>
            I am currently building at the intersection of AI and healthcare at
            OpenEvidence, the world's leading medical information platform.
          </p>
          <p>
            I was formerly on the healthcare team at Palantir, where I built
            agentic software and decision support systems for hospitals. Before
            that, I earned my B.S. in Computer Science and M.S. in Management
            Science and Engineering at Stanford.
          </p>
          <p>
            Along the way, I built internal tools at{" "}
            <a href="https://www.pear.vc" {...ext}>Pear VC</a>, led product and
            engineering at{" "}
            <a href="https://www.dormroomfund.com" {...ext}>Dorm Room Fund</a>,
            and built software at{" "}
            <a href="https://www.fieldguide.io" {...ext}>Fieldguide</a> and{" "}
            <a href="https://www.valarlabs.com" {...ext}>Valar Labs</a>. I was
            also a Course Assistant for Stanford's{" "}
            <a href="https://web.stanford.edu/class/cs194/" {...ext}>
              CS Senior Capstone Project
            </a>{" "}
            class and did interpretable AI research at the Stanford Medical
            Center.
          </p>
          <p className="muted">
            I am also a{" "}
            <a href="https://neo.com/scholars" {...ext}>Neo Scholar</a> and a
            Fellow at{" "}
            <a href="https://stvp.stanford.edu/alp/" {...ext}>Accel</a>,{" "}
            <a href="https://www.8vc.com/fellows/kabir-jolly" {...ext}>8VC</a>,
            and <a href="https://www.pear.vc/garage" {...ext}>Pear</a>.
          </p>
        </div>

        <section className="list-section" aria-labelledby="work">
          <div className="section-head">
            <h2 id="work">Work</h2>
          </div>
          <ul>
            {experiences.map((job) => (
              <ListRow
                key={`${job.company}-${job.date}`}
                date={yearLabel(job.date)}
                title={job.company}
                href={job.slug ? `/experience/${job.slug}` : undefined}
                label={job.title}
              />
            ))}
          </ul>
        </section>

        <section className="list-section" aria-labelledby="writing">
          <div className="section-head">
            <h2 id="writing">Writing</h2>
            <Link to="/posts" className="section-head-link">
              All posts
            </Link>
          </div>
          <ul>
            {writing.map((post) => (
              <ListRow
                key={post.slug}
                date={yearLabel(post.date)}
                title={post.title}
                href={`/${post.type}/${post.slug}`}
              />
            ))}
          </ul>
        </section>

        <section className="list-section" aria-labelledby="projects">
          <div className="section-head">
            <h2 id="projects">Projects</h2>
          </div>
          <ul>
            {projects.map((project) => (
              <ListRow
                key={project.title}
                date={yearLabel(project.date)}
                title={project.title}
                href={
                  project.slug ? `/project/${project.slug}` : project.externalUrl
                }
                label={projectPlace(project.date)}
              />
            ))}
          </ul>
        </section>

        <footer className="site-footer">
          San Francisco, CA ·{" "}
          <a href="https://github.com/kabir-jolly" {...ext}>GitHub</a> ·{" "}
          <a href="https://x.com/kabirjolly_" {...ext}>X</a> ·{" "}
          <a href="https://linkedin.com/in/kabirjolly" {...ext}>LinkedIn</a>
        </footer>
      </div>
      <HarbourFade />
    </div>
  );
};

export default Portfolio;
