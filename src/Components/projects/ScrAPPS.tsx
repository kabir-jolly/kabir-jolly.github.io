import PostImageGrid from "../PostImageGrid";

const ScrAPPS = () => {
  return (
    <article>
      <p>
        I spent a large part of my high school working on a venture called
        ScrAPPS with my friend and co-founder Michael Gerhard, which was a
        venture focused on tackling the commercial food waste problem. The idea
        behind ScrAPPS was to connect restaurants and grocery stores with
        composting facilities via privately contracted haulers.
      </p>

      <p>
        There is a story behind the idea that inspired ScrAPPS in the first
        place. While at Whole Foods, we were sorting our trash into the
        designated receptacles for landfill, recycling, and compost. We were
        taking an especially long amount of time ensuring that each item was
        ending up in the right place, but much to our surprise, the janitorial
        staff came up to us and said "don't bother, they all end up in the
        regular trash anyways." Given the environmentally-friendly business
        image I had previously felt to be closely associated with Whole Foods,
        this was a little jarring. If they weren't doing it, I am not sure who
        was.
      </p>

      <p>
        After drafting up a plan for ScrAPPS, we presented it to just about
        every food waste producing establishment that my mom was willing to
        drive us to (tough scene for two 15-year-olds). Based on a fair bit of
        positive feedback and knowing way too much about where a spoiled head of
        lettuce ends up, we decided to start building out the platform.
      </p>

      {/* First Image Row */}
      <PostImageGrid
        columns={3}
        images={[
          { src: "/assets/img/scrapps/scrapps1.jpeg", alt: "Whiteboard 1" },
          { src: "/assets/img/scrapps/scrapps2.jpeg", alt: "Whiteboard 2" },
          { src: "/assets/img/scrapps/scrapps3.jpeg", alt: "Whiteboard 3" },
        ]}
        caption="Our high-fidelity Starbucks-cake-pop-fueled app wireframes."
      />

      <p>
        The shameless interrogation of restaurant owners slowly turned into
        partnerships and the expo marker sketches slowly turned into a fairly
        functional smartphone app. The final process was pretty simple and made
        a ton of sense on paper.
      </p>

      {/* Single Images */}
      <PostImageGrid
        stacked
        images={[
          { src: "/assets/img/scrapps/scrapps4.png", alt: "ScrAPPS App" },
          { src: "/assets/img/scrapps/scrapps5.png", alt: "ScrAPPS Flow" },
        ]}
      />

      <p>
        One of my proudest achievements to date is conducting successful hauls
        for places like California Pizza Kitchen and Whole Foods.
      </p>

      <p>
        Reflecting on this experience, I feel like it is so important to note
        how this is before Michael and I knew anything about funding, market
        research, or scaling a product. We were just blindly doing what felt
        right in the moment until we hit larger roadblocks. After a while,
        businesses expressed that they were simply not willing to pay the extra
        cost to have a separate hauler come to compost their waste (sending it
        to a landfill was baked into their rental fee, so they have to pay it
        anyways). We were never really able to get past this hurdle, and as
        normal high school life and academics got in the way, ScrAPPS came to an
        end.
      </p>

      {/* Final Image Row */}
      <PostImageGrid
        images={[
          { src: "/assets/img/scrapps/scrapps6.jpeg", alt: "First Haul" },
          { src: "/assets/img/scrapps/scrapps7.jpeg", alt: "First Haul 2" },
        ]}
        caption="Pictures from our very first haul. Why did I wear a white shirt for a composting job?"
      />

      {/* Technologies */}
      <h2>Technologies Used</h2>
      <ul>
        <li>Swift and Objective-C for iOS app development</li>
        <li>Firebase for backend and database</li>
        <li>
          APIs: Google Maps (location and mapping), Stripe (payment processing)
        </li>
        <li>Sketch and Figma for UI designing</li>
      </ul>
    </article>
  );
};

export default ScrAPPS;
