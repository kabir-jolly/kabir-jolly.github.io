const ModifyingMinBERT = () => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Modifying MinBERT</h1>
      <div className="h-px bg-gray-200 w-full mb-8"></div>

      {/* Introduction */}
      <p className="text-gray-600 mb-8">CS 224N Final Project</p>

      <p className="mb-6">
        <a
          href="https://web.stanford.edu/class/cs224n/"
          className="text-blue-600 hover:text-blue-800"
        >
          CS 224N (Natural Language Processing with Deep Learning)
        </a>{" "}
        was a wonderful class I took during the winter quarter of my junior
        year. Prior to taking 224N, I had already taken a bunch of other
        AI/ML/DL classes and this one is known to be one of the more
        approachable courses to begin with, so I did not find the class to be
        too challenging at all. It was extremely well taught and I really
        appreciated how the course staff modified much of the material to remain
        fairly topical (side note: this definitely one of Stanford's greatest
        strengths as an academic institution). Much of the final portion of the
        class was entirely devoted to covering the cutting-edge (especially with
        ChatGPT released only a few months prior to this offering) - a large
        reason why this class had over 650 students enrolled.
      </p>

      <p className="mb-6">
        While I cannot share the code for this project given Stanford's Honor
        Code, I would love to share the work that went into the final project
        conducted by Govind Chada and myself. If you would prefer to read the
        whole paper, you can find it{" "}
        <a
          href="/src/assets/pdf/224N_final_report.pdf"
          className="text-blue-600 hover:text-blue-800"
        >
          here
        </a>
        .
      </p>

      {/* Background */}
      <h2 className="text-2xl font-semibold mb-4">Background</h2>
      <p className="mb-4">
        BERT, or Bidirectional Encoder Representations from Transformers, is an
        LLM based on the transformer architecture.
      </p>
      <ul className="mb-6">
        <li>Especially powerful when it comes to sequential textual data</li>
        <li>
          Training pipeline consists of pre-training on a large body of text and
          then fine-tuning it for a particular NLP task
        </li>
      </ul>

      <img
        src="/src/assets/img/224n/224n1.png"
        alt="Overview"
        className="w-full rounded-lg mb-6"
      />

      <p className="mb-6">
        In many domains such as healthcare and education, data collection is
        challenging, and training LLMs to perform well in these fields benefits
        from bootstrapping the performance on a specific task by utilizing
        learnings from other tasks where far more data is easily accessible.
      </p>

      {/* Problem */}
      <h2 className="text-2xl font-semibold mb-4">Problem</h2>
      <p className="mb-6">
        BERT has been shown to perform well on a variety of natural language
        tasks. However, these models are optimized during training to perform
        well on a particular task. This inspires the central question that
        motivates this work: How can we perform multiple tasks with high
        accuracy?
      </p>

      <p className="mb-4">
        For this project, we adapt BERT to solve 3 main tasks:
      </p>
      <ol className="mb-6">
        <li>
          <span className="font-semibold">Sentiment Analysis</span>
          <ul>
            <li>Stanford Sentiment Treebank dataset</li>
            <li>
              Phrases assigned labels of negative, somewhat negative, neutral,
              somewhat positive, or positive (0-4 respectively)
            </li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Paraphrase Detection</span>
          <ul>
            <li>Quora dataset</li>
            <li>
              Binary labels describing whether a pair of questions are
              paraphrases of each other
            </li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Semantic Textual Similarity</span>
          <ul>
            <li>SemEval STS Benchmark dataset</li>
            <li>
              Label measures degree of similarity between a pair of sentences
              (on a scale from 0 to 5)
            </li>
          </ul>
        </li>
      </ol>

      {/* Methodology and Results */}
      <h2 className="text-2xl font-semibold mb-4">Methodology and Results</h2>

      <h3 className="text-xl font-semibold mb-4">
        Phase 1: Baseline, Gradient Surgery, and Cosine Similarity
      </h3>
      <p className="mb-4">
        Baseline approach: BERT model with separate head for each task.
        Different loss functions used for each head.
      </p>
      <ol className="mb-6">
        <li>Sentiment analysis: Cross Entropy Loss</li>
        <li>Paraphrase detection: Binary Cross Entropy Loss</li>
        <li>Semantic textual similarity: Mean Squared Error</li>
      </ol>

      <p className="mb-4">
        Experimentation to expand upon the baseline included:
      </p>
      <ol className="mb-6">
        <li>Naïve gradient surgery (worse performance)</li>
        <li>Cosine similarity (CS) (significant improvement)</li>
        <li>
          CS with gradient surgery (GS) to counteract conflicting gradients
          (even more improvement)
        </li>
        <li>CS + GS and no dropout (best model during Phase 1)</li>
      </ol>

      <img
        src="/src/assets/img/224n/224n2.png"
        alt="Phase 1 Architecture"
        className="w-full rounded-lg mb-6"
      />

      <h3 className="text-xl font-semibold mb-4">
        Phase 2: Training Pipeline Modifications
      </h3>
      <p className="mb-4">
        We then modified the approach taken in Phase 1 through a 3-step process:
      </p>
      <ul className="mb-6">
        <li>Pre-train using 3 separate BERT models, one for each task</li>
        <li>
          Average outputs to be used as a stronger initialization for multitask
          finetuning
        </li>
      </ul>

      <div className="space-y-4 mb-6">
        <img
          src="/src/assets/img/224n/224n3.png"
          alt="Phase 2 Training"
          className="w-full rounded-lg"
        />
        <img
          src="/src/assets/img/224n/224n4.png"
          alt="Results"
          className="w-full rounded-lg"
        />
      </div>

      {/* Analysis */}
      <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
      <p className="mb-4">
        We found the best performing model consists of our training method in
        combination with gradient surgery and cosine similarity:
      </p>
      <ul className="mb-6">
        <li>
          Naively applying gradient surgery negatively impacts results due to
          strongly conflicting gradients between the tasks
        </li>
        <li>
          Cosine similarity brings the tasks more in line with each other and
          allows for better multitask model performance
        </li>
        <li>
          This also constrains the output of the head to be between 0 and 5,
          rather than letting the model learn this
        </li>
        <li>
          Using both gradient surgery and cosine similarity together boosts
          overall performance across the tasks, and combining this with our
          training scheme allows for even greater performance
        </li>
        <li>
          This shows the importance of a good initialization point to begin
          finetuning from and an even more efficient pretraining process could
          probably improve the results further
        </li>
        <li>
          We also found that the model begins to overfit after only a few epochs
          of finetuning but, removing dropout led to improved performance on the
          dev data
        </li>
      </ul>

      {/* Conclusion */}
      <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
      <p className="mb-6">
        Throughout the course of this project, we were able to empirically
        determine certain modifications to our baseline multitask BERT
        implementation that resulted in stronger task-specific and overall
        performance. Our best model used single task pretraining to provide a
        strong initialization for multitask finetuning, combined with CS, GS and
        removing dropout regularization. While experimental success was logged
        using the dev datasets, our overall test score was found to be 0.702.
      </p>

      <p className="mb-4">Limitations include:</p>
      <ul className="mb-6">
        <li>
          Universally low performance on the sentiment classification task,
          pulling down the overall score greatly
        </li>
        <li>
          Cosine similarity only benefitted the STS task, and we did not find
          any beneficial task-specific approaches for the Para and SST tasks
        </li>
      </ul>

      <p className="mb-6">
        One future step in involves trying an optimization based meta-learning
        approach such as MAML. We saw having a good initialization point before
        finetuning improved downstream task performance, so with the
        construction of more related tasks for meta-training, we hypothesize
        this may boost performance across the board.
      </p>
    </article>
  );
};

export default ModifyingMinBERT;
