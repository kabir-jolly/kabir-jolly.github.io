import PostFigure from "../PostFigure";

const FDEManual = () => {
  return (
    <article>
      <p>The goal of this manual is twofold.</p>
      <p>
        First, a byproduct of deeply devoting myself to my work has been the
        constant influx of learning, especially as a young professional. This is
        meant to document what has worked well for me so far and act as a
        system of record for what voices with highly-educated opinions have to
        say on the central topic. What has
        worked for me is first codifying seemingly disparate insights, then
        using that synthesis to operationalize what I've learned.
      </p>
      <p>
        Second, I hope others—whether trying to get a better grasp of this
        fairly new concept, seeing how it is valuable to them, or finding
        themselves in my position—can benefit from the ideas presented. It should be a
        guide for getting started, how it can be done well, and why it is
        important in the business sense.
      </p>
      <p>
        What I write is rarely public, or even shared, but I hope to push
        through that wall a bit with this endeavor.
      </p>

      <h2>
        What is Forward Deployed Engineering?
      </h2>
      <p>
        At its core, the idea is simple: a forward deployed engineer is someone,
        typically with a technical background, who sits at the intersection
        between the company's core product and the pressing customer need.
      </p>
      <p>
        A forward deployed engineer will show up on the doorstep of a
        prospective customer, usually one who faces a problem that the FDE's
        company has not even really seen before, but with the conviction that
        they can build on top of their core product to quickly deliver value.
      </p>

      <PostFigure
        src="/assets/img/fde/knock-knock.png"
        alt="Stick figure in a hard hat knocking on a door labeled CEO"
        size="medium"
      />

      <p>
        Ted Mabrey, Head of Commercial at Palantir, and Bob McGrew, former
        Director at Palantir and CRO at OpenAI, have both said that if the FDE
        team isn't honed in on one of the top 5 problems for the CEO, then the
        FDE model will not work. You have to start here first; only then can you
        branch out to problems that may ultimately prove even more valuable,
        building on the foundation laid during the initial engagement.
      </p>

      <h2>
        Profile of an Effective FDE
      </h2>

      <h3>Overview</h3>
      <p>
        The table stakes are largely implied by the job title itself. An FDE
        must be technically competent, possessing a deep understanding of their
        company's core product, and best-in-class engineering aptitude to build
        on top of it. Breadth is often valued here—every client operates a
        unique tech stack and possesses their own custom set of engineering
        practices. To adapt to this, you should be a fast learner, but
        comfortable with a wide variety of primitives that make you valuable to
        the discussions you have with your client. Beyond engineering, since you
        are "forward deployed," it is highly regarded to possess strong
        communication and collaboration skills. As you deploy to different
        settings, you quickly escape a comfort and homogeneity that builds
        itself up when solely operating within your own company environment.
        Interfacing with a wide variety of customers, each with their own
        company culture, values, and work styles requires a natural inclination
        towards being comfortable in any situation.
      </p>
      <p>
        Some of the best FDEs I've seen share a particularly important knack for
        being able to bridge almost any divide in communication. This has been
        crucial at Palantir, especially when working with clients that are known
        to be bureaucratic, skeptical of introducing anything new, and strongly
        attached to their status quo. Being able to explain a hospital bed
        management utility to a nurse in a rural facility who managed her
        day-to-day with pen and paper for 40 years is no easy task, but strong
        FDEs have a magical way of distilling complexity. Richard Feynman's
        "Feynman Learning Technique," better known today as "ELI5," is a great
        example of this, and also a proxy for fast learners who can quickly grok
        complex topics themselves. True understanding is being able to explain
        something back to a five-year-old, and upon doing so, an FDE has set
        themselves up for success when having to explain things to others.
      </p>

      <PostFigure
        src="/assets/img/fde/fast-prototyper.png"
        alt="Stick figure typing rapidly on a laptop"
        size="medium"
      />

      <p>
        Building on these ideas, the next trait I've seen is someone who is just{" "}
        <em>fast.</em> Fast prototyper, extraordinarily decisive, and generally
        quick-to-action. The picture we paint at Palantir is that, after
        customer feedback and testing, the ideal FDE whips out their laptop and
        iterates on the product in front of the customer's eyes. I've seen
        firsthand the pace at which we are able to <em>stun</em> our solution's
        users. This is a large part of our company's secret sauce—there's a
        seemingly unbounded capacity for on-the-fly development, even in
        response to requests that are ambitious, under-scoped, and technically
        challenging. The norm is while you are onsite with a customer, the group
        breaks at the usual 5pm, and by the time the client wakes up the next
        morning, they get a fully-functional prototype from the previous day's
        discussion in front of them. You see jaws physically drop, shocked at
        the delivery of a technical solution that they thought would easily take
        weeks of roadmapping, discussion, and implementation.
      </p>
      <p>
        This is not to say that there is a compromise in soundness of the
        technical delivery. At Palantir, in addition to Forward Deployed
        Engineers (Deltas), we also place key importance in Deployment
        Strategists (Echos). I often inquired about what creates a mutually
        symbiotic relationship within pods composed of Echos and Deltas. After
        much discussion, my conclusion was simple: there is an ever-present
        tension between the Echo wanting to drive the business value as fast as
        possible and the Delta wanting to do things in a technically sound
        manner the first time around... and both are in the right. Standout FDEs
        are those that can minimize any amount of compromise and drive both
        tangible business value and engineering rigor up and to the right
        simultaneously.
      </p>
      <p>
        This all might sound eerily similar to descriptions of extraordinary
        early-stage technical founders. We see this in practice, where many FDEs
        come from former founding backgrounds, and many FDEs also end up as
        successful technical co-founders and powerful assets to early-stage
        ventures as well.
      </p>
      <p>
        Beyond these core traits, it's unsurprisingly nuanced. Each company
        needs their own flavor of an FDE—one that aligns with their company's
        key business strategy and is uniquely armed with a skillset that gives
        them a leg up, usually involving specificity within the company or
        client's core domain.
      </p>

      <h3>A You-Shaped Opening</h3>
      <p>
        As someone with solely early-stage startup exposure prior to graduating
        college, I sought two main things from my first full-time professional
        opportunity—growth and mentorship. I thought a larger company would
        create this space, and while I am sure that this is true in other cases,
        the FDE-centric culture at Palantir creates a different reality from
        what I imagined.
      </p>
      <p>
        In the span of a single week, I am asked the same questions several
        times over—"What's your spike" and "What shape of Delta do you see
        yourself being?" This is what leaders in the company care about. The
        investment does not lie in making you a well-rounded contributor, but in
        sharpening you into the best possible asset for solving a specific
        problem. If you are good at building agents, go do that. If you have a
        knack for speaking with Marines after shift, go do that. If you
        understand and have a keen eye for the intricacies of mining for
        rare-earth materials in remote areas, do that!
      </p>

      <PostFigure
        src="/assets/img/fde/you-shaped-opening.png"
        alt="Stick figure shaped like a puzzle piece fitting into a matching gap in a puzzle"
        size="medium"
      />

      <p>
        An effective FDE at Palantir, and beyond, doubles down on what they are
        best at—exploitation over exploration.
      </p>
      <p>
        The Japanese concept of ikigai details the intersection formed by four
        things: what you love, what you are good at, what the world needs, and
        what you can be paid for. You can adjust this to describe where an FDE
        fits in within a company, the "you-shaped opening" that lies at the
        intersection of: what you can eat pain for, what you are interested in,
        what the company needs, and what the company can be paid the most for
        (solving their most pressing problems).
      </p>

      <PostFigure
        src="/assets/img/fde/building-bridges.png"
        alt="Stick figure holding a sign reading SOLUTION, balanced over a chasm between signs reading CUSTOMER and PRODUCT"
        size="medium"
      />

      <h2>Building Bridges</h2>
      <p>
        This is where the FDE really shines. If your company is one whose core
        product offering possesses a repeatable motion and it's kind of just
        "one-size-fits-all" then you can stop here. But if, as Bob McGrew puts
        it, you effectively need to do things that don't scale, <em>at scale</em>,
        then FDEs are crucial to generating positive outcomes for both the
        company and the customers.
      </p>

      <h3>
        Customer &lt;&gt; Solution
      </h3>
      <p>
        The first bridge an FDE builds is the most immediate: taking a
        customer's painful, often underspecified problem and translating it into
        something that actually works. This is where the deep embedding pays
        off. You sit in on their standups, you watch how they actually use their
        existing tools, and you hear about the workarounds they've invented
        because nobody has ever addressed their particular problems. The
        solution you architect isn't born from a product spec—it's learned
        through osmosis and birthed from proximity.
      </p>
      <p>
        This is why the common comparison between an FDE and consultant misses
        the mark. You are not handing over a deliverable and walking away.
        You're building something live, in their environment, with their data.
        The solution has to survive contact with reality on day one, which means
        it has to be robust enough to handle the edge cases that only surface
        when something is being used, which is never accounted for when those
        same ideas are being planned beforehand. Shyam Sankar, CTO at Palantir,
        describes the job of the FDE as "metabolizing pain and excreting
        product"—the ethos that comes alive when you're absorbing the frictions
        your customer faces daily and converting it into something tangible,
        repeatable, and scalable.
      </p>

      <h3>
        Customer &lt;&gt; Product
      </h3>
      <p>
        The second bridge points back toward your own company. When an FDE shows
        up at the customer's doorstep, they typically have never seen the
        problem before and have to architect solutions on top of the platform to
        bring them to life. When the work you do for the customer is high value,
        and just viscerally painful to implement, you start synthesizing
        patterns that may be extensible to other deployments. The feature you
        hacked together at 2am for a manufacturing plant to solve their
        mission-critical defective part response nightmare becomes the seed of a
        core product capability that serves hundreds of more similar scenarios
        down the line.
      </p>
      <p>
        This is where Palantir's incumbency, consistent product iteration, and
        years of building end-to-end solutions for customers helps future FDE
        engagements shine. You get to stand on the shoulders of giants and
        deliver value even faster than your predecessors, kicking off the
        feedback loop once more. It's what enables the scale at which you see a
        company operate—despite when drilling down to a particular engagement
        you would be baffled as to how any of this could possibly be extensible.
        The trick is that extensibility isn't designed upfront; it's discovered
        through hard-earned truths from repeated exposure to variations of the
        same underlying pain.
      </p>

      <h3>
        Customer &lt;&gt; Solution &lt;&gt; Product
      </h3>
      <p>
        The FDE's last step is to constantly tie it all together. The "solution"
        which falls under the responsibility of the deployment team, is the glue
        between solving the customer's problem in the immediate and informing
        product vision long-term.
      </p>
      <p>
        This requires a particular kind of awareness. You quickly find yourself
        deep in the weeds solving today's problem, but need to maintain a
        peripheral vision for what should end up being generalizable. Which
        parts of this solution are specific to this customer's idiosyncratic
        setup, and which parts reflect a gap in the platform that others will
        inevitably hit? The best FDEs develop a sharp instinct for this. They
        know when to push the product teams, when to push back on a customer
        request that is tangential to business value or leads to technical debt,
        and when to just build the thing because the customer needs it{" "}
        <em>yesterday</em>.
      </p>

      <h2>Enablement</h2>
      <p>
        Oftentimes the end state of an FDE engagement is to eventually make
        yourself unnecessary. You're not there to become a permanent fixture—you're
        there to break into the hardest problem they have and get them from zero
        to one. This starts with a deliberate focus on building alongside the
        customer, rather than building for the customer. FDEs get a unique
        opportunity to pair with their customer's engineers, walk through
        decisions out loud, and work to build a system that the customer's team
        can actively contribute toward. It's for them and their problems, after
        all. Shyam Sankar talks about the importance of leveraging the
        "customer's institutional knowledge" and this cuts both ways—you absorb
        what they know best but you also enable them by sharing your knowledge
        back to those you work with.
      </p>
      <p>
        Enablement is a core tenet of many engagements at Palantir and thus
        baked into the FDE role. Ted Mabrey puts it simply: "when they win, you
        win". While this may feel like it slows down progress at times, the
        long-term benefit has been proven time after time.
      </p>

      <h2>
        Pitfalls of Adopting the FDE Model
      </h2>

      <PostFigure
        src="/assets/img/fde/pitfalls.png"
        alt="Stick figure in a hard hat teetering on the edge of a cliff"
        size="medium"
      />

      <p>
        The primary pitfall worth mentioning is losing sight of the product in
        favor of the services being delivered. When you're embedded with a
        customer, the temptation to just build whatever they directly ask for is
        immense. But if every engagement produces a bespoke solution that lives
        and dies with that particular engagement, you're not building a company,
        platform, or product. The short-term gain of services revenue,
        especially when large, is seductive, but it's a trap if it comes at the
        expense of an extensible product that should scale well beyond a
        headcount.
      </p>
      <p>
        Forward Deployed Engineering was one of the most sought-after roles in
        Silicon Valley this past year. YCombinator's Jared Friedman mentions
        that well over 100 companies were hiring for the role this year, up from
        basically zero just a few years back. However, I see this time and time
        again: companies are simply doing it wrong. Especially at early stages,
        the FDE has turned into someone who rapidly vibe-codes an ad-hoc
        solution for a prospective customer that may solve a short-term problem,
        but has zero long-term implications. This will never scale. Without
        having a competitive edge to your core product offering and architecting
        a functionally different system for every client (even if they are in
        the same vertical and face similar problems) this motion will quickly
        fall flat.
      </p>

      <PostFigure
        src="/assets/img/fde/pave-fde-growth.png"
        alt="Line chart titled 'New Potential Job on the Rise: The Forward Deployed Engineer (FDE)' showing the percentage of companies with an FDE role rising from 0.34% in January 2023 to 1.24% in September 2025"
        caption={
          <>
            Image / data courtesy of{" "}
            <a
              href="https://www.pave.com/blog-posts/forward-deployed-engineer-on-the-rise"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pave
            </a>
            .
          </>
        }
      />

      <p>
        Another common mistake I've seen being mentioned is the lack of a clear
        vision. Are the services being offered treated and seen as a key source
        of revenue for the company? Colin Jarvis from OpenAI talks about how for
        their lean team of FDEs, the ACV of the engagement needs to be in the
        tens of millions to low billions of value creation for the customer to
        be worth it. The problem at-hand has to be extraordinarily high-stakes,
        and in return also needs to generate more than enough signal to inform
        both core product and research offerings, furthering OpenAI's company
        agenda rather than seeing software consultancy and solutions engineering
        for clients as a key company OKR. He says trying to do both is a key
        failure mode, where the short-term lure of services revenue is lost in
        favor of building a long term and lasting product.
      </p>

      <h2>
        Additional Aside: FD(AI)E and the Role of FDEs in the AI-Age
      </h2>
      <p>
        This is more important than ever, with a{" "}
        <a
          href="https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          recent MIT study
        </a>{" "}
        finding that 95% of companies are getting <em>zero</em> dollars in value
        from their generative AI pilots. Jack Soslow, former a16z partner and now CEO and
        co-founder of AI-native transformation startup Ciridae has recently
        echoed this sentiment. He articulates it in his startup's announcement
        for stealth in a piece titled{" "}
        <a
          href="https://www.linkedin.com/pulse/1-ebitda-jack-soslow-8gmhe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          "$1 in EBITDA"
        </a>{" "}
        where his thesis is that
        the technology isn't the bottleneck—it's the willingness to sit in
        cramped back offices, codify decades of tacit knowledge, and push
        through the human resistance to change until adoption actually sticks.
        He talks about his initially surprising struggle to generate{" "}
        <em>just $1 in value</em>, a metaphor for the widespread failure and
        inability we see in building AI-native deployments that matter.
      </p>
      <p>
        I am strongly convinced of AI's capability (at its current, not just
        future state) to solve some of business' most challenging problems and
        drive significant shifts in revenue. Agentic capabilities are increasing
        at a rapid pace and yet despite investment, despite implementations
        seemingly everywhere, there's not much additional value being created.
        There's a lofty task that lies ahead for the FDE: how do you build the
        rails, context, repeatability/non-determinism and evaluation
        infrastructure to actually do this. This will require everything that
        makes the FDE model shine, deeply embedding yourself in the customer's
        problem, building data management and translation layers, engineering
        context and guardrails for every step of extraordinarily complicated
        workflows, and so much more tailored discovery that can only take place
        in practice. I believe this is where a lot of digital transformation is
        headed, and FDEs will be uniquely poised to bring this future to
        reality. Many places are starting to adopt this paradigm already with
        AI-specialized FDEs, or Forward Deployed AI Engineers, starting to take
        shape as an important position.
      </p>
      <p>
        Companies that win the AI era won't just be the ones with the best
        models—they'll also be the ones willing to do the work of making those
        models actually run in the real world. That's the FDE's job, and it's
        never been more valuable.
      </p>
    </article>
  );
};

export default FDEManual;
