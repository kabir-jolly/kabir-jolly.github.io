const Valar = () => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">
        Machine Learning Engineer at Valar Labs
      </h1>
      <div className="h-px bg-gray-200 w-full mb-8"></div>

      {/* Introduction */}
      <p className="text-gray-600 mb-8">
        Summer 2022 • Building ML solutions for oncology
      </p>

      {/* Overview */}
      <div className="mb-8">
        <img
          src="/assets/img/valar/valar1.png"
          alt="Valar Labs Overview"
          className="w-full rounded-lg mb-6"
        />

        <p className="mb-6">
          At{" "}
          <a
            href="https://www.valarlabs.com/"
            className="text-blue-600 hover:text-blue-800"
          >
            Valar Labs
          </a>
          , I worked in a fast-paced startup environment shortly after their
          <a
            href="https://valarlabs.medium.com/valar-labs-reimagining-cancer-treatment-decisions-with-artificial-intelligence-b9edb6c12243"
            className="text-blue-600 hover:text-blue-800"
          >
            {" "}
            seed round led by a16z
          </a>
          . While primarily focused on Machine Learning Engineering, the
          early-stage nature of the company allowed me to contribute across
          multiple areas including product, research, pathology, and software
          development.
        </p>

        <p className="mb-6">
          The collaborative environment, where company co-founders, engineers,
          and team members worked together at one table, fostered a culture
          where everyone had input on ongoing projects. The healthtech focus
          provided an excellent blend of research lab work with rapid
          user-focused deployment.
        </p>
      </div>

      {/* Key Projects */}
      <h2 className="text-2xl font-semibold mb-4">Key Projects</h2>
      <div className="mb-6">
        <div className="mb-8">
          <img
            src="/assets/img/valar/valar2.png"
            alt="Tissue WSI"
            className="w-full rounded-lg mb-6"
          />

          <h3 className="text-xl font-semibold mb-2">
            Computer Vision Pipeline Development
          </h3>
          <p className="mb-4">
            Built a computer vision pipeline for cell classification in
            whole-slide tissue images, implementing and testing various nuclei
            classification and segmentation models using PyTorch.
          </p>

          <h3 className="text-xl font-semibold mb-2">
            Data Annotation Pipeline
          </h3>
          <p className="mb-4">
            Developed tools using the Labelbox API to streamline the annotation
            process with partnered pathologists and simplify data ingestion for
            model training workflows.
          </p>

          <h3 className="text-xl font-semibold mb-2">
            Model Evaluation Framework
          </h3>
          <p className="mb-4">
            Created data science utilities for comprehensive model evaluation,
            enabling better understanding of model performance and identifying
            areas for improvement.
          </p>
        </div>
      </div>

      {/* Technical Environment */}
      <h2 className="text-2xl font-semibold mb-4">Technical Environment</h2>
      <ul className="mb-6">
        <li>PyTorch and TensorFlow for in-house model development</li>
        <li>Labelbox for data annotation</li>
      </ul>

      <p className="italic mt-8">
        Special thanks to Valar leadership (Anirudh, Damir, and Vish) and my
        colleagues (Ekin and Vrishab) for making this experience both enjoyable
        and impactful. Excited to see Valar transform oncology through machine
        learning!
      </p>
    </article>
  );
};

export default Valar;
