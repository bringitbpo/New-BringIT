import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  LayoutDashboard, Building2, Store, Users, ListChecks, FolderCheck, Bell, CalendarClock, FileText,
  Calendar, Sparkles, Star, User, CheckSquare, Paperclip, RefreshCw,
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
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);

  return (
    <div className="tabsec" ref={ref}>
      <div className="wrap">
        <motion.div className="tablet" style={{ rotateX, scale }}>
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
