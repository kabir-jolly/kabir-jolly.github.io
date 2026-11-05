import PostImageGrid from "../PostImageGrid";

const StanfordMedicalCenter = () => {
  return (
    <article>
      <p>
        My most involved long-term project (worked on it for 2+ years) was deep
        learning research I did at the Stanford Medical Center. This was a group
        effort by myself, Govind Chada, and Ekin Tiu under the mentorship of Dr.
        David Kim (Department of Emergency Medicine). Our goal was to leverage
        deep learning models on electronic health record data to predict
        hospital readmission due to chronic disease exacerbation during periods
        of bad air quality. This was especially relevant given the recent
        prevalence of wildfires in California, and our data covered every
        hospital admission in the state from 2015–2019.
      </p>

      <PostImageGrid
        images={[
          { src: "/assets/img/aqi/aqi1.png", alt: "Scatter plot of 90th-percentile PM2.5 against median household income, 2014–2018" },
          { src: "/assets/img/aqi/aqi2.png", alt: "Density plot of the lag in days between PM2.5 spikes and excess ED visits for asthma, COPD, influenza, pneumonia and other respiratory conditions" },
        ]}
      />

      <p>The project can be split into three main stages.</p>

      <ol>
        <li>Research study motivation and replication of existing work</li>
        <li>Dataset construction</li>
        <li>Model development and evaluation</li>
      </ol>

      <p>
        For the first year or so, I mostly worked on the first stage, leading
        exploratory data analyses to validate that hospital admissions for
        asthma and COPD rise with spikes in particulate matter (PM2.5)
        concentration. That stage had the shortest timeline, so once it wrapped
        up, I moved on to help with the other two. We built a range of models,
        from non-recurrent baselines to more nuanced models such as LSTMs and
        hierarchical attention networks (HANs).
      </p>

      <PostImageGrid
        images={[
          { src: "/assets/img/aqi/aqi4.png", alt: "Baseline model diagram: input, embedding, average, flatten, dense, binary output" },
          { src: "/assets/img/aqi/aqi3.png", alt: "Longitudinal model diagram: input, embedding, average, LSTM, binary output" },
        ]}
      />

      <p>
        Given the clinical nature of this work, one of our main goals was
        interpretability, and HANs were a big step in this direction. Our goal
        was to outperform existing research which utilized statistical inference
        methods as well as our non-recurrent baselines with models such as
        XGBoost.
      </p>

      <p>
        We never reached the stage for a final publication despite promising
        results, but here is an{" "}
        <a
          href="/assets/pdf/aqi_report.pdf"
        >
          early manuscript
        </a>{" "}
        of some of the preliminary work that we did.
      </p>
    </article>
  );
};

export default StanfordMedicalCenter;
