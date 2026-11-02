import { disputes } from '../../content/site';

export function Disputes() {
  return (
    <section className="sec alt" id="disputes">
      <div className="wrap split">
        <div>
          <div className="label">{disputes.label}</div>
          <h2 className="h2">{disputes.title}</h2>
          <p className="lead">{disputes.lead}</p>
          <div className="steps">
            {disputes.steps.map((s, i) => (
              <div className="st" key={s.title}><span className="n">0{i + 1}</span><div><b>{s.title}</b><p>{s.text}</p></div></div>
            ))}
          </div>
        </div>
        <div className="device" aria-label="Sample dispute timeline">
          <div className="card disp">
            <div className="hd"><div><b>Dispute · DoorDash order #48213</b><small>Store 2 · “Missing items” claim · $46.20</small></div><span className="status">Won</span></div>
            <div className="tl">
              <div className="ev"><i /><div><b>Claim received</b><p>Customer reported missing items</p></div><em>Mon 9:12 AM</em></div>
              <div className="ev"><i /><div><b>Evidence collected</b><p>Order photo, receipt, handoff time</p></div><em>Mon 11:40 AM</em></div>
              <div className="ev"><i /><div><b>Dispute filed</b><p>Submitted in the merchant portal</p></div><em>Mon 12:05 PM</em></div>
              <div className="ev win"><i /><div><b>Won: $46.20 returned</b><p>Added to next payout</p></div><em>Wed 3:30 PM</em></div>
            </div>
          </div>
          <div className="card mini"><span>Chargebacks & disputes this month</span><b>$1,240 recovered</b><div className="bar"><i /></div><div className="r"><span>18 won</span><span>5 lost</span><span>78% win rate</span></div></div>
        </div>
      </div>
    </section>
  );
}
