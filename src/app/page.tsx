import RouteMap from '@/components/RouteMap';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Camino Francés</h1>
          <p className="text-stone-500 mt-1">
            Sarria → Santiago de Compostela · May 2026
          </p>
        </header>
        <RouteMap />
      </main>
    </div>
  );
}
