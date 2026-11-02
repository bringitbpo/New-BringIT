import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import {
  LayoutDashboard, Building2, Store, Users, ListChecks, FolderCheck, Bell, CalendarClock, FileText,
  Calendar, Sparkles, Star, User, CheckSquare, Paperclip, RefreshCw, Wifi, BadgeDollarSign,
} from 'lucide-react';

const MENU = [
  [LayoutDashboard, 'Overview'], [Building2, 'Companies'], [Store, 'Stores'], [Users, 'Users'],
  [ListChecks, 'Tasks'], [FolderCheck, 'Completed tasks'], [Bell, 'Notifications'], [CalendarClock, 'Schedule'],
  [FileText, 'Documents'], [Calendar, 'Calendar'], [Sparkles, 'AI reports'], [Star, 'Reviews'],
] as const;

// Sample data that mirrors the real BringIT Ops platform layout. Store names are generic on purpose.
const TASKS = [
  ['Check OLO and delivery platforms', 'Store 1', '4:11 PM EST', '2m 28s'],
  ['Dispute DoorDash refund claim — won $46.20', 'Store 2', '3:52 PM EST', '6m 10s'],
  ['Reply to new Google reviews', 'Store 3', '3:40 PM EST', '4m 02s'],
  ['Verify Shift4 deposits', 'Store 1', '3:15 PM EST', '3m 47s'],
  ['Review overnight performance', 'Store 4', '9:06 AM EST', '5m 31s'],
] as const;

export function OpsTablet() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] });
  const scrollTilt = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);

  // Gentle 3D tilt that follows the cursor (desktop only).
  const mx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const rotateX = useTransform([scrollTilt, my], ([s, y]: number[]) => s - y * 4);
  const rotateY = useTransform(mx, (x) => x * 5);
  const floatA = useTransform(mx, (x) => x * -18);
  const floatB = useTransform(mx, (x) => x * 22);
  const floatY = useTransform(my, (y) => y * -14);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="tabsec" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="wrap tabwrap">
        <motion.div className="glass toast t1" style={{ x: floatA, y: floatY }} aria-hidden="true">
          <span className="ti ok"><Wifi /></span><div><b>Uber Eats back online</b><small>Store 2 · caught in 12 min</small></div>
        </motion.div>
        <motion.div className="glass toast t2" style={{ x: floatB, y: floatY }} aria-hidden="true">
          <span className="ti money"><BadgeDollarSign /></span><div><b>Dispute won · +$46.20</b><small>DoorDash · added to payout</small></div>
        </motion.div>
        <motion.div className="glass toast t3" style={{ x: floatA, y: floatY }} aria-hidden="true">
          <span className="ti star"><Star /></span><div><b>5-star review answered</b><small>Store 3 · 2 min ago</small></div>
        </motion.div>
        <motion.div className="tablet" style={{ rotateX, rotateY, scale }}>
          <div className="ops" role="img" aria-label="Sample view of the BringIT Ops platform showing completed tasks with proof">
            <aside className="side">
              <div className="logo"><img src="/LOGO_1_1_no_BG.png" alt="" /></div>
              <div className="search">Search…</div>
              <div className="menu">
                {MENU.map(([Icon, t]) => <span key={t} className={t === 'Completed tasks' ? 'on' : ''}><Icon />{t}</span>)}
              </div>
              <div className="who">BringIT team · Signed in</div>
            </aside>
            <div className="main">
              <div className="head">
                <div><h4>Completed tasks</h4><small>Finished tasks with uploaded proof</small></div>
                <span className="pillbtn"><RefreshCw size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: -1 }} />Refresh</span>
              </div>
              <div className="kpis">
                <div className="k"><span>Tasks completed today</span><b>48</b><em>All with proof</em></div>
                <div className="k"><span>Disputes won this week</span><b>7 of 9</b><em>$412 recovered</em></div>
                <div className="k"><span>Reviews answered</span><b>42</b><em>Avg reply 3h</em></div>
                <div className="k"><span>Platforms online</span><b>100%</b><em>Last check 4:11 PM</em></div>
              </div>
              <div className="filters"><span className="pillbtn">All team members ▾</span><span className="pillbtn">Today ▾</span></div>
              {TASKS.map(([t, store, time, took]) => (
                <div className="task" key={t}>
                  <div>
                    <b>{t}</b>
                    <small>
                      <span><User />BringIT Rep</span>
                      <span><Store />{store}</span>
                      <span className="ok"><CheckSquare />{time}</span>
                      <span>took {took}</span>
                    </small>
                  </div>
                  <span className="att"><Paperclip />View proof</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="sample">Sample view of the BringIT Ops platform · illustrative data</div>
      </div>
    </div>
  );
}
