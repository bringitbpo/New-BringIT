// All website copy in one place. Edit text here; the layout lives in src/components/site.

export const hero = {
  label: 'Remote operations · Revenue control',
  title: 'The back office your restaurants have been missing.',
  sub: 'BringIT runs the daily checks, follow-ups, chargebacks and reporting behind your stores, so small mistakes stop turning into lost revenue.',
  facts: [
    { value: '7 days', label: 'a week monitoring' },
    { value: '6+ years', label: 'running U.S. franchise operations' },
    { value: '3 departments', label: 'Operations, Marketing and Finance' },
  ],
};

export const platforms = ['Uber Eats', 'DoorDash', 'Grubhub', 'OLO', 'ezCater', 'Shift4', 'Google Reviews', 'Yelp', 'Instagram', 'Franchisor portals'];
export const brands = ["Dunkin'", 'Cold Stone Creamery', 'Baskin Robbins', 'Charleys', "Wetzel's Pretzels"];

// Sample results. Replace with real figures when available.
export const results = {
  note: 'Illustrative figures',
  items: [
    { value: '40+', label: 'stores supported' },
    { value: '$250K+', label: 'recovered for clients' },
    { value: '90%', label: 'dispute win rate' },
    { value: '< 15 min', label: 'to catch a platform outage' },
  ],
};

export type Service = { icon: string; title: string; short: string; details: string[]; highlight?: boolean };
export const services: Service[] = [
  { icon: 'smartphone', title: 'Delivery platforms', short: 'Every store online and taking orders.',
    details: ['Uber Eats, DoorDash, Grubhub, OLO and ezCater checked daily', 'Outages and paused stores caught and fixed fast', 'Daily sales and order counts reviewed'] },
  { icon: 'card', title: 'Chargebacks & disputes', short: 'Card and delivery app disputes, answered on time.', highlight: true,
    details: ['Card chargebacks through your POS or payment processor', 'False refund claims disputed on delivery apps', 'Evidence gathered, deadlines met, results reported'] },
  { icon: 'star', title: 'Reviews & complaints', short: 'Every review read and answered.',
    details: ['Reviews checked for every store, every day', 'Complaints logged and followed to a close', 'Patterns flagged to you early'] },
  { icon: 'eye', title: 'Daily store checks', short: 'Eyes on your stores without being there.',
    details: ['POS sales and payment deposits verified', 'Store emails watched for notices and past-due warnings', 'Daily store photos and online order proof reviewed'] },
  { icon: 'wrench', title: 'Repairs & supplies', short: 'Orders placed, repairs booked.',
    details: ['Supply and uniform orders placed and tracked', 'Warranty checked first, then repair quotes compared', 'Nothing booked or paid without your approval'] },
  { icon: 'calendar', title: 'Bills, rent & compliance', short: 'No missed payments or expired permits.',
    details: ['Utilities, rent and payroll confirmed with proof', 'Autopay kept active on critical bills', 'Licenses and permits flagged 30 days before expiry'] },
  { icon: 'megaphone', title: 'Marketing', short: 'Social media and delivery app ads managed.',
    details: ['Daily social posts and stories', 'Seasonal campaigns planned a month ahead', 'Ad spend on Uber Eats and DoorDash monitored daily'] },
  { icon: 'chart', title: 'Finance & reporting', short: 'Your numbers, reconciled and summarized.',
    details: ['Deposits, payouts and POS reconciled weekly', 'Food and labor cost tracked by store', 'One clear weekly report across all locations'] },
];

export const disputes = {
  label: 'Chargebacks & disputes',
  title: 'We fight the chargebacks and disputes you don’t have time for.',
  lead: 'Card chargebacks and delivery app disputes are answered before the deadline, backed by evidence, and tracked to the final result.',
  steps: [
    { title: 'Catch it early', text: 'New chargebacks and refund claims are flagged the day they arrive.' },
    { title: 'Build the case', text: 'Receipts, timestamps, order photos and delivery records gathered.' },
    { title: 'File on time', text: 'Responses submitted to the processor or platform before the due date.' },
    { title: 'Report the result', text: 'Wins and dollars recovered appear in your weekly report.' },
  ],
};

export const howWeWork = {
  label: 'How we work',
  title: 'Simple to start. Disciplined every day.',
  steps: [
    { title: 'Free 15-minute call', text: 'We learn about your stores and where money is slipping.' },
    { title: 'Secure setup', text: 'You approve the logins we need. Nothing more.' },
    { title: 'Daily operations begin', text: 'Our team starts the daily checks and follow-ups right away.' },
    { title: 'Weekly review', text: 'A short report and call to keep you in control.' },
  ],
  principles: [
    { title: 'No approval, no spend', text: 'Every repair, order or payment that needs money waits for your written approval.' },
    { title: 'Nothing closed without proof', text: 'A task is only marked done when there is a confirmation, photo or record behind it.' },
    { title: 'Every issue has a deadline', text: 'Problems are logged with who must act and by when. Anything overdue is escalated to you.' },
  ],
  channels: 'Reach us by WhatsApp, email or phone.',
};

export const about = {
  label: 'About BringIT',
  title: 'A remote operations team built for restaurant owners.',
  intro: 'BringIT is a back-office partner for restaurant franchise owners with 1 to 10 locations. Our remote team works U.S. hours and handles the daily work that keeps stores profitable: monitoring, follow-ups, disputes, marketing and financial checks.',
  how: 'We don’t replace your managers. We work behind them, making sure nothing slips, every issue is followed up, and you always know what is happening in every store.',
  departmentsTitle: 'Our departments',
  departments: [
    { name: 'Operations', short: 'Daily monitoring and follow-ups.',
      details: ['Delivery platforms, POS and payments', 'Reviews, store emails and store checks', 'Orders, repairs, bills and compliance', 'Complaints, refunds and chargebacks'] },
    { name: 'Marketing', short: 'Visibility and campaigns.',
      details: ['Daily social media and stories', 'Seasonal event campaigns', 'Delivery app ad spend', 'Budgets planned around your best-selling events'] },
    { name: 'Finance', short: 'Verification and reporting.',
      details: ['Deposit and payout verification', 'POS, platform and bank reconciliation', 'Food and labor cost tracking', 'Weekly consolidated report'] },
  ],
};

export const leader = {
  name: 'Fahad Siddique',
  title: 'Founder & CEO',
  bio: [
    'Fahad has spent more than six years managing restaurant operations for U.S. franchisees, across brands like Dunkin’, Cold Stone Creamery, Baskin Robbins, Charleys and Wetzel’s Pretzels.',
    'He knows franchise systems, portals and vendor processes inside out, and franchisees often rely on that knowledge to run their stores. He built BringIT to bring the same discipline to every client.',
  ],
};

export const security = {
  label: 'Security & confidentiality',
  title: 'Your information stays safe and confidential.',
  lead: 'You trust us with your sales, staff and customer data. We treat it that way.',
  points: [
    { title: 'Never shared or sold', text: 'Your business information is used only to do the work you hired us for.' },
    { title: 'Access you control', text: 'You approve every login and can remove access at any time.' },
    { title: 'Controlled by our CEO', text: 'Access to client systems is managed by our CEO. Credentials are never shared without your approval.' },
    { title: 'NDA and data deletion', text: 'We sign an NDA on request, and your data is deleted when the contract ends.' },
  ],
};

export type Package = { name: string; audience: string; features: string[]; popular?: boolean };
export const packages: Package[] = [
  { name: 'Starter', audience: 'Single-store owners', features: ['Review replies', 'Complaint logging', 'Daily reminders', 'Follow-up and task tracking', 'Calendar scheduling', 'Admin support'] },
  { name: 'Growth', audience: 'Owners who want full control', popular: true, features: ['Everything in Starter', 'Delivery platform monitoring', 'Missed order alerts', 'Chargebacks & disputes', 'Vendor coordination', 'Weekly report and summary', 'Light social media support'] },
  { name: 'Premium', audience: 'Multi-store operators', features: ['Everything in Growth', 'Refund recovery system', 'Staff attendance checks', 'Inventory and procurement', 'Multi-location reporting', 'Expansion support', 'Dedicated account manager'] },
];
export const addOns = ['Extra social media content', 'Extended coverage hours', 'Priority escalation support'];

export const testimonial = {
  quote: 'Honestly, I was tired of being involved in every little problem. Now I focus on opening new locations. I have one weekly meeting with BringIT and my store manager, and they handle the rest.',
  name: 'Arshad',
  role: 'Multi-unit operator',
};

export const faqs = [
  { q: 'Are you replacing my manager?', a: 'No. We support your managers from behind the scenes and make sure every task is followed up.' },
  { q: 'Do you work with franchises?', a: 'Yes. Our experience covers Dunkin’, Cold Stone Creamery, Baskin Robbins, Charleys and Wetzel’s Pretzels, including franchisor portals.' },
  { q: 'Do you handle chargebacks?', a: 'Yes, both card chargebacks through your POS or payment processor and disputes on delivery apps.' },
  { q: 'Is there a long-term contract?', a: 'No. All plans are month to month.' },
  { q: 'How fast can we start?', a: 'Setup is short. Once you approve access, daily operations begin right away.' },
  { q: 'Is my data safe?', a: 'Yes. Your information is never shared or sold, access is controlled by our CEO, and data is deleted when the contract ends.' },
  { q: 'How do I get pricing?', a: 'Pricing depends on your stores and needs. Message us on WhatsApp for a quick quote.' },
];
