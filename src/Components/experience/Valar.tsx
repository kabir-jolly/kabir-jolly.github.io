import PostFigure from "../PostFigure";

const Valar = () => {
  return (
    <article>
      <div>
        <PostFigure
          src="/assets/img/valar/valar1.png"
          alt="Valar Labs Overview"
        />

        <p>
          At{" "}
          <a
            href="https://www.valarlabs.com/"
          >
            Valar Labs
          </a>
          , I worked in a fast-paced startup environment shortly after their
          <a
            href="https://valarlabs.medium.com/valar-labs-reimagining-cancer-treatment-decisions-with-artificial-intelligence-b9edb6c12243"
          >
            {" "}
            seed round led by a16z
          </a>
          . While primarily focused on Machine Learning Engineering, the
          early-stage nature of the company allowed me to contribute across
          multiple areas including product, research, pathology, and software
          development.
        </p>

        <p>
          The collaborative environment, where company co-founders, engineers,
          and team members worked together at one table, fostered a culture
          where everyone had input on ongoing projects. The healthtech focus
          provided an excellent blend of research lab work with rapid
          user-focused deployment.
        </p>
      </div>

      {/* Key Projects */}
      <h2>Key Projects</h2>
      <div>
        <div>
          <PostFigure
            src="/assets/img/valar/valar2.png"
            alt="Tissue WSI"
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
            Created data science utilities for comprehensive model evaluation,
            enabling better understanding of model performance and identifying
            areas for improvement.
          </p>
        </div>
      </div>

      {/* Technical Environment */}
      <h2>Technical Environment</h2>
      <ul>
        <li>PyTorch and TensorFlow for in-house model development</li>
        <li>Labelbox for data annotation</li>
      </ul>

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
