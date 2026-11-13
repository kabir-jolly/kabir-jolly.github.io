// Kabir's Lofoten harbour painting, fading in below the home page footer.
// Decorative only. To swap the picture, replace the two files at
// public/assets/img/harbour/harbour.{avif,webp} (same name, roughly 960 px wide).
const IMAGE = "/assets/img/harbour/harbour";

const HarbourFade = () => (
  <div className="harbour-fade" aria-hidden="true">
    <picture>
      <source srcSet={`${IMAGE}.avif`} type="image/avif" />
      <img
        src={`${IMAGE}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        width={960}
        height={540}
      />
    </picture>
  </div>
);

export default HarbourFade;
