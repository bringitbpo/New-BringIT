// Soft moving color glow and faint grid behind the top section. Purely decorative.
export function HeroBackdrop() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="grid-lines" />
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
    </div>
  );
}
