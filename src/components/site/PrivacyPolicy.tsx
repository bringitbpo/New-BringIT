import { EMAIL, US_PHONE_DISPLAY } from '../../lib/contact';

// Plain-language privacy policy. Have it reviewed by a professional before relying on it legally.
export function PrivacyPolicy() {
  return (
    <main className="legal">
      <a href="#top">← Back to BringIT</a>
      <h1 style={{ marginTop: 24 }}>Privacy Policy</h1>
      <div className="upd">Last updated: November 2026</div>

      <p>BringIT (“we”, “us”) provides remote back-office and operations services to restaurant owners. This policy explains what information we collect through this website and through our services, how we use it, and the choices you have.</p>

      <h2>Information we collect</h2>
      <ul>
        <li><b>Website forms:</b> your name, business name, email, phone or WhatsApp number, number of locations, preferred call time and any message you send us.</li>
        <li><b>Client information:</b> when you become a client, the business information and system access you choose to give us so we can do the work, such as sales reports, platform dashboards, reviews and store records.</li>
        <li><b>Basic technical data:</b> our hosting provider may log standard information such as browser type and pages visited, to keep the site secure and working.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your message and schedule calls you request.</li>
        <li>To provide the services you hire us for.</li>
        <li>To send you reports and updates related to those services.</li>
      </ul>
      <p>We do not sell, rent or share your information for marketing. We never use client data for anything other than the work you hired us for.</p>

      <h2>Service providers</h2>
      <p>We use a small number of trusted providers to run this website: Vercel (hosting) and Formspree (delivering form submissions to our email). If you message us on WhatsApp, WhatsApp’s own privacy policy also applies.</p>

      <h2>Access and confidentiality</h2>
      <ul>
        <li>We only use the logins and access you approve, and you can remove our access at any time.</li>
        <li>Access to client systems is controlled by our CEO, and credentials are never shared without your approval.</li>
        <li>We sign a non-disclosure agreement (NDA) on request.</li>
      </ul>

      <h2>How long we keep information</h2>
      <p>We keep website inquiries only as long as needed to respond and follow up. Client data is deleted when the contract ends.</p>

      <h2>Your choices</h2>
      <p>You can ask us to see, correct or delete the information we hold about you at any time by contacting us.</p>

      <h2>Contact</h2>
      <p>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call {US_PHONE_DISPLAY}.</p>
    </main>
  );
}
