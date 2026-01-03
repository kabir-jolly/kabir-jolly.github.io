const StanfordMedicalCenter = () => {
  return (
    <article className="prose prose-lg max-w-none">
      <p className="mb-6">
        My most involved long-term project (worked on it for 2+ years) was deep
        learning research I did at the Stanford Medical Center. This was a group
        effort by myself, Govind Chada, and Ekin Tiu under the mentorship of Dr.
        David Kim (Department of Emergency Medicine). Our goal was to leverage
        deep learning models on electronic health record date to predict
        hospital readmission due to chronic disease exacerbation during periods
        of bad air quality. This was especially relevant given the recent
        prevalence of wildfires in California, and worked well with the fact
        that our data consisted of every hospital admission from 2015-2019 in
        the state of California.
      </p>

      {/* First Image Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <img
          src="/assets/img/aqi/aqi1.png"
          alt="Data Analysis 1"
          className="rounded-lg"
        />
        <img
          src="/assets/img/aqi/aqi2.png"
          alt="Data Analysis 2"
          className="rounded-lg"
        />
      </div>

      <p className="mb-6">The project can be split into three main stages.</p>

      <ol className="mb-6">
        <li>Research study motivation and replication of existing work</li>
        <li>Dataset construction</li>
        <li>Model development and evaluation</li>
      </ol>

      <p className="mb-6">
        For the first year or so, I predominantly worked on the first stage,
        leading exploratory data analyses to validate increased hospital
        admissions due to asthma and COPD with spikes in particulate matter (PM
        2.5) concentration. Later on, I expanded to assist with the other two
        stages since the first part had the shortest timeline. We build a
        variety of models, including non-recurrent baselines as well as more
        nuanced models such as LSTMs and hierarchical attention networks.
      </p>

      {/* Second Image Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <img
          src="/assets/img/aqi/aqi4.png"
          alt="Baseline"
          className="rounded-lg"
        />
        <img
          src="/assets/img/aqi/aqi3.png"
          alt="Longitudinal"
          className="rounded-lg"
        />
      </div>

      <p className="mb-6">
        Given the clinical nature of this work, one of our main goals was
        interpretability, and HANs were a big step in this direction. Our goal
        was to outperform existing research which utilized statistical inference
        methods as well as our non-recurrent baselines with models such as
        XGBoost.
      </p>

      <p className="mb-6">
        We never reached the stage for a final publication despite promising
        results, but here is an{" "}
        <a
          href="/assets/pdf/aqi_report.pdf"
          className="text-blue-600 hover:text-blue-800"
        >
          early manuscript
        </a>{" "}
        of some of the preliminary work that we did.
      </p>
    </article>
  );
};

export default StanfordMedicalCenter;
