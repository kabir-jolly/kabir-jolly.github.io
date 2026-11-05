import PostFigure from "../PostFigure";

const Valar = () => {
  return (
    <article>
      <div>
        <PostFigure
          src="/assets/img/valar/valar1.png"
          alt="Valar Labs logo with the tagline AI to Make Oncologists Smarter"
        />

        <p>
          I joined{" "}
          <a
            href="https://www.valarlabs.com/"
          >
            Valar Labs
          </a>{" "}
          shortly after their{" "}
          <a
            href="https://valarlabs.medium.com/valar-labs-reimagining-cancer-treatment-decisions-with-artificial-intelligence-b9edb6c12243"
          >
            seed round led by a16z
          </a>
          , back when co-founders, engineers, and everyone else worked together
          at one table. My focus was Machine Learning Engineering, but at that
          stage you go where you're needed, so I also got to contribute to
          product, research, pathology, and software development.
        </p>

        <p>
          Everyone had input on ongoing projects, and the work sat right between
          a research lab and rapid, user-focused deployment.
        </p>
      </div>

      {/* Key Projects */}
      <h2>Key Projects</h2>
      <div>
        <div>
          <PostFigure
            src="/assets/img/valar/valar2.png"
            alt="Two stained whole-slide tissue image patches, labeled a and b"
          />

          <h3>
            Computer Vision Pipeline Development
          </h3>
          <p>
            Built a computer vision pipeline for cell classification in
            whole-slide tissue images, implementing and testing various nuclei
            classification and segmentation models using PyTorch.
          </p>

          <h3>
            Data Annotation Pipeline
          </h3>
          <p>
            Developed tools using the Labelbox API to streamline the annotation
            process with partnered pathologists and simplify data ingestion for
            model training workflows.
          </p>

          <h3>
            Model Evaluation Framework
          </h3>
          <p>
            Created data science utilities for evaluating our models and finding
            where they fell short.
          </p>
        </div>
      </div>


      <p>
        <em>
        Special thanks to Valar leadership (Anirudh, Damir, and Vish) and my
        colleagues (Ekin and Vrishab) for making this experience both enjoyable
        and impactful. Excited to see Valar transform oncology through machine
        learning!
        </em>
      </p>
    </article>
  );
};

export default Valar;
