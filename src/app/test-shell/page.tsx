import { ScallopShell } from '@/components/ScallopShell';

export default function TestShell() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center gap-16 p-12">
      <div className="text-center">
        <p className="text-caption mb-4">STATIC</p>
        <ScallopShell className="w-72 h-72 text-accent" animate={false} />
      </div>
      <div className="text-center">
        <p className="text-caption mb-4">ANIMATED</p>
        <ScallopShell className="w-72 h-72 text-accent" animate={true} />
      </div>
    </div>
  );
}
