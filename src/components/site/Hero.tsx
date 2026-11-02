import { hero, platforms, brands } from '../../content/site';
import { HeroBackdrop } from './HeroBackdrop';

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <div className="hero-shell" id="top">
      <HeroBackdrop />
      <div className="wrap">
      <div className="hero">
        <div>
          <div className="label">{hero.label}</div>
          <h1>{hero.title}</h1>
          <p className="sub">{hero.sub}</p>
          <div className="ctas">
            <button className="btn accent" onClick={onBook}>Book a free 15-min call</button>
            <a className="btn ghost" href="#services">See what we handle</a>
          </div>
        </div>
        <div className="facts">
          {hero.facts.map((f) => <div key={f.label}><b>{f.value}</b><span>{f.label}</span></div>)}
        </div>
      </div>
      </div>
    </div>
  );
}

export function Strips() {
  return (
    <div className="wrap">
      <div className="strip"><b>Platforms we work in</b>{platforms.map((p) => <span key={p}>{p.toUpperCase()}</span>)}</div>
      <div className="strip"><b>Franchise experience</b>{brands.map((p) => <span key={p}>{p.toUpperCase()}</span>)}</div>
    </div>
  );
}
