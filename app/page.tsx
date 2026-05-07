import Link from 'next/link';

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-[Montserrat]">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-black">A&G Survey</h1>
        <p className="text-gray-400">Redirigiendo al panel de control...</p>
        <Link 
          href="/dashboard"
          className="inline-block bg-black text-white px-8 py-3 rounded-2xl font-bold"
        >
          Ir al Dashboard
        </Link>
      </div>
    </div>
  );
}
