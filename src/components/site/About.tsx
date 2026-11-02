import { Settings2, Megaphone, Landmark, UserRound } from 'lucide-react';
import { about, leader } from '../../content/site';
import { Expandable } from './Expandable';

const DEPT_ICONS = [Settings2, Megaphone, Landmark];

export function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <div className="about-top">
          <div>
            <div className="label">{about.label}</div>
            <h2 className="h2">{about.title}</h2>
          </div>
          <div><p>{about.intro}</p><p>{about.how}</p></div>
        </div>

        <div className="sub-h">{about.departmentsTitle}</div>
        <div className="depts">
          {about.departments.map((d, i) => {
            const Icon = DEPT_ICONS[i];
            return (
              <Expandable key={d.name} items={d.details} label="What this team handles" className="dept">
                <div className="ic"><Icon /></div>
                <h3>{d.name}</h3>
                <p>{d.short}</p>
              </Expandable>
            );
          })}
        </div>

        <div className="leader">
          <div className="photo" aria-label="Photo coming soon"><UserRound /></div>
          <div>
            <div className="label" style={{ marginBottom: 10 }}>Leadership</div>
            <div className="nm">{leader.name}</div>
            <div className="tt">{leader.title}</div>
            {leader.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
