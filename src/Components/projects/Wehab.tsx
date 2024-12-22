const Wehab = () => {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">Stanford Wehab Lab</h1>
      <div className="h-px bg-gray-200 w-full mb-8"></div>

      {/* Introduction */}
      <p className="text-gray-600 mb-8">
        Building and evaluating a device for nasal cycle detection
      </p>

      {/* Overview */}
      <p className="mb-6">
        I spent the summer after my freshman year working at the Stanford
        Psychophysiology Lab (
        <a
          href="https://wehab.stanford.edu/"
          className="text-blue-600 hover:text-blue-800"
        >
          Wehab Lab
        </a>
        ). This was a part of the{" "}
        <a
          href="https://curis.stanford.edu/"
          className="text-blue-600 hover:text-blue-800"
        >
          CURIS
        </a>{" "}
        (undergraduate research in computer science) fellowship.
      </p>

      <p className="mb-6">
        My work involved using Arduino to construct and evaluate a palatal PPG
        and microphone apparatus for nasal cycle detection. I developed a
        pipeline that was capable of calculating loudness measurements and FFT
        frequency analyses using the collected nasal exhalation data.
      </p>

      {/* Technologies */}
      <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
      <ul className="mb-6">
        <li>Arduino</li>
        <li>Python (numpy, scipy, matplotlib, pandas, sklearn)</li>
      </ul>

      {/* Background */}
      <h2 className="text-2xl font-semibold mb-4">Background</h2>
      <p className="mb-4">
        The nasal cycle refers to spontaneous congestion and decongestion of
        opposite sides of the nose.
      </p>
      <ul className="mb-4">
        <li>Common in mammals, present in ~80% of the human population</li>
        <li>
          Periodic in nature, shifts in the cycle are individual dependent but
          range from 0.5-2.5 hours on average
        </li>
      </ul>

      <p className="mb-6">
        Congestion is controlled by tissue-covered flaps in the nose known as
        turbinates, and turbinate enlargement results in restricted nostril
        airflow.
      </p>

      <img
        src="/assets/img/wehab/wehab1.png"
        alt="Nasal Cycle"
        className="w-full rounded-lg mb-6"
      />

      <p className="mb-6">
        Studies show potential links between the nasal cycle and autonomic
        nervous system functioning, respiratory infection response, and
        mental/emotional disorders, motivating further research into nasal cycle
        detection methods.
      </p>

      {/* Proposed Solution */}
      <h2 className="text-2xl font-semibold mb-4">Proposed Solution</h2>
      <p className="mb-6">
        Current methods are invasive, expensive, or constrained by the necessity
        to operate in a lab/clinical setting.
      </p>

      <img
        src="/assets/img/wehab/wehab2.png"
        alt="Current Methods"
        className="w-full rounded-lg mb-6"
      />

      <p className="mb-4">
        We aim to create a self-contained retainer that uses
        photoplethysmography (PPG) sensors to analyze blood flow in the greater
        palatine arteries, which supply blood to the inferior turbinates.
      </p>

      <p className="mb-4">
        Furthermore, we want to verify the existence of the nasal cycle with
        audio-based methods and determine alignment between our two approaches.
      </p>

      <p className="mb-4">Our goals are to create prototypes that are:</p>
      <ul className="mb-6">
        <li>Portable/practical for long-term data collection</li>
        <li>Cost effective</li>
        <li>Comfortable and non-invasive</li>
      </ul>

      <img
        src="/assets/img/wehab/wehab3.png"
        alt="Placement Diagram"
        className="w-1/2 rounded-lg mb-6 mx-auto"
      />

      {/* Methodology and Results */}
      <h2 className="text-2xl font-semibold mb-4">Methodology and Results</h2>

      <h3 className="text-xl font-semibold mb-4">
        Phase 1: Turbinate Enlargement Detection with PPG Sensors
      </h3>
      <ul className="mb-6">
        <li>Placed two PPG sensors on the prototype base</li>
        <li>Tested with dental wax and retainer designs</li>
        <li>
          Aligned sensors slightly in front of the first molar on either side
        </li>
        <li>
          Lateral positioning matched branching of the greater palatine artery
        </li>
        <li>Fastened sensors using waterproof tape for safety purposes</li>
        <li>Connected sensors to an Arduino-compatible microcontroller</li>
      </ul>

      <div className="space-y-4 mb-6">
        <img
          src="/assets/img/wehab/wehab4.png"
          alt="Prototypes"
          className="w-full rounded-lg"
        />
        <img
          src="/assets/img/wehab/wehab5.png"
          alt="PPG Data"
          className="w-full rounded-lg"
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">
        Phase 2: Nostril Dominance Detection with Microphone
      </h3>
      <img
        src="/assets/img/wehab/wehab6.png"
        alt="Demo"
        className="w-full rounded-lg mb-6"
      />

      <ul className="mb-6">
        <li>
          Attached an omnidirectional lapel microphone to a sleep apnea chin
          strap
        </li>
        <li>
          Maintained a consistent angle towards and distance from each nostril
        </li>
        <li>Covered one nostril using a finger</li>
        <li>
          Performed five inhalation-exhalation sets timed at three seconds each
        </li>
        <li>
          Recorded audio data with the microphone, processed data, and
          calculated integrated loudness for each resulting audio file
        </li>
      </ul>

      <div className="space-y-4 mb-6">
        <img
          src="/assets/img/wehab/wehab7.png"
          alt="Microphone Readings"
          className="w-full rounded-lg"
        />
        <img
          src="/assets/img/wehab/wehab8.png"
          alt="Pipeline"
          className="w-full rounded-lg"
        />
      </div>

      {/* Discussion */}
      <h2 className="text-2xl font-semibold mb-4">Discussion</h2>
      <p className="mb-4">
        We conducted experimentation by blocking a nostril or laying sideways,
        thus forcing one nostril to dominate breathing over the other. Trials
        from both PPG-based prototypes were inconclusive.
      </p>

      <ul className="mb-6">
        <li>
          No replicable or statistically significant relationship between PPG
          readings and nostril airflow
        </li>
        <li>
          Laying on one side to force blood flow did not result in a shift
          between the amplitudes in the readings
        </li>
        <li>
          Readings were heavily impacted by sensor placement and pressure
          against the artery
        </li>
        <li>
          Turbinate enlargement is one of many factors contributing to the nasal
          cycle, and the greater palatine artery is only connected to one of
          three nasal turbinates
        </li>
        <li>
          Preliminary testing and analysis with the microphone readings were
          more promising
        </li>
        <li>
          Testing apparatus resulted in replicable measurements across trials
        </li>
        <li>
          There was alignment between computed loudness measurements and peak
          nasal expiratory flow measurements (our gold standard)
        </li>
      </ul>

      {/* Future Work */}
      <h2 className="text-2xl font-semibold mb-4">Future Work</h2>
      <p className="mb-4">
        The retainer showed a higher amplitude from the right sensor in every
        trial. This is due to sensor placement (aligning a flat sensor to the
        curved palate) or sensor error.
      </p>
      <ul className="mb-6">
        <li>
          We developed a flexible PPG sensor to place on the retainer and are
          awaiting its arrival for testing
        </li>
      </ul>

      <p className="mb-4">
        For the microphone readings, the loudness values are difficult to
        interpret as a standalone metric, and further measures can be taken to
        clean the data. We can:
      </p>
      <ul className="mb-6">
        <li>Compare the energy in each audio signal</li>
        <li>
          Utilize a baseline frequency (e.g. a 1 kHz tone) to establish a
          relative scale such that LUFS and dB values can be more accurately
          compared
        </li>
        <li>Record ambient noise in the room and filter it out</li>
      </ul>

      <p className="mb-4">Further exploration:</p>
      <ul className="mb-6">
        <li>
          Compare results with a rhinomanometer which is the academic convention
          for nasal cycle detection
        </li>
        <li>
          Use a temperature sensor to check cyclic nasal mucous temperature
          differentials
        </li>
        <li>Use a pressure sensor to check for cyclic air pressure changes</li>
      </ul>

      {/* Final Poster */}
      <img
        src="/assets/img/wehab/curis_poster.png"
        alt="CURIS Poster"
        className="w-full rounded-lg mb-2"
      />
      <p className="text-sm text-gray-600 text-center mb-6">
        Research poster presented at the end of the summer CURIS symposium.
      </p>
    </article>
  );
};

export default Wehab;
