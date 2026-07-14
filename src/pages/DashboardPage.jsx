import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import SectionCard from '../components/dashboard/SectionCard';
import ProgressRing from '../components/dashboard/ProgressRing';
import Button from '../components/ui/Button';

const recentUploads = [
  { title: 'React patterns', meta: '12 min ago', status: 'Ready' },
  { title: 'Design systems', meta: '43 min ago', status: 'Processing' },
  { title: 'Productivity sprint', meta: '1h ago', status: 'Scheduled' },
];

const continueLearning = [
  { title: 'Advanced React Hooks', progress: '68%', duration: '18 min left' },
  { title: 'UI system architecture', progress: '41%', duration: '22 min left' },
];

const timelineItems = [
  { title: 'Completed lesson recap', time: '09:10 AM', detail: 'You finished the latest review module.' },
  { title: 'Uploaded new video', time: '11:40 AM', detail: 'A new recording is now available in your library.' },
  { title: 'Daily streak updated', time: 'Yesterday', detail: 'You maintained your learning streak for 7 days.' },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/60 bg-gradient-to-br from-violet-500/15 via-cyan-400/10 to-white/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.6)] backdrop-blur-xl dark:border-slate-700/60 dark:from-violet-500/20 dark:via-cyan-400/10 dark:to-slate-900/70">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">Your learning space is thriving.</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">Track uploads, resume lessons, and stay consistent with a calm, modern dashboard designed for daily growth.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/upload">
              <Button>New upload</Button>
            </Link>
            <Link to="/videos">
              <Button variant="secondary">Open library</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Study streak" value="7 days" detail="Keep going to unlock a new milestone" icon="🔥" accent="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" />
        <StatCard title="Weekly progress" value="84%" detail="You are ahead of your weekly target" icon="📈" accent="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" />
        <StatCard title="Videos watched" value="24" detail="A steady pace across your recent content" icon="🎥" accent="bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300" />
        <StatCard title="Focus time" value="6.2h" detail="Optimized for uninterrupted learning" icon="⏱️" accent="bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Recent uploads" subtitle="Latest content ready for review" action={<Link to="/upload" className="text-sm font-medium text-slate-600 dark:text-slate-400">Manage</Link>}>
          <div className="space-y-3">
            {recentUploads.map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.meta}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{item.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Continue learning" subtitle="Resume where you left off" action={<span className="text-sm font-medium text-slate-600 dark:text-slate-400">2 active</span>}>
          <div className="space-y-4">
            {continueLearning.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/60">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{item.duration}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: item.progress }} />
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.progress} complete</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Progress overview" subtitle="A quick snapshot of your daily momentum">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ProgressRing percent={84} label="Weekly completion" />
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>• 3 sessions completed this week</p>
              <p>• 91% of your recent lessons were finished</p>
              <p>• Strongest day: Thursday</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Activity timeline" subtitle="Your recent milestones and updates" action={<span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">Live</span>}>
          <div className="space-y-4">
            {timelineItems.map((item) => (
              <div key={item.title} className="flex gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-3 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Quick actions" subtitle="Jump into common tasks">
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/upload" className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/60">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Upload a new lesson</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Prepare your next video or document.</p>
            </Link>
            <Link to="/history" className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/60">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Review recent history</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">See what you worked on last.</p>
            </Link>
            <Link to="/settings" className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/60">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Adjust preferences</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Tune notifications and defaults.</p>
            </Link>
            <Link to="/profile" className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/60">
              <p className="font-semibold text-slate-900 dark:text-slate-100">View your profile</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Keep your account details up to date.</p>
            </Link>
          </div>
        </SectionCard>

        <SectionCard title="Notifications" subtitle="Stay on top of important updates">
          <div className="space-y-3">
            {['New upload processed', 'Weekly progress goal achieved', 'Reminder: continue your next lesson'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-900/60">
                <p className="text-sm text-slate-700 dark:text-slate-300">{item}</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">Now</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default DashboardPage;
