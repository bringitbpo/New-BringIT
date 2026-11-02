import { faqs } from '../../content/site';
import { FaqItem } from '../FaqItem';

export function Faq() {
  return (
    <section className="sec alt" id="faq">
      <div className="wrap faqgrid">
        <div>
          <div className="label">FAQ</div>
          <h2 className="h2">Common questions.</h2>
        </div>
        <div className="faq">{faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
      </div>
    </section>
  );
}
