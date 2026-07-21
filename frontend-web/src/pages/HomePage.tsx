import type { FC } from 'react';

const HomePage: FC = () => {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8">
      {/* Hero Section */}
      <section className="rounded-2xl border p-8 text-center">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">🌿 Welcome to SasyaVana</h1>

          <p className="text-lg">
            Helping you grow greener.
          </p>

          <p className="text-sm text-gray-600">
            Discover plants, learn how to care for them, and shop confidently
            from trusted nurseries.
          </p>
        </header>
      </section>

      {/* Explore Plants */}
      <section className="rounded-2xl border p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold">🌿 Explore Plants</h2>

          <p className="mt-2 text-gray-600">
            Browse categories, seasonal collections, trending plants and
            verified nurseries.
          </p>
        </header>

        <button
          type="button"
          className="rounded-lg border px-5 py-2 font-medium transition hover:bg-gray-100"
        >
          Start Exploring
        </button>
      </section>

      {/* Help Me Choose */}
      <section className="rounded-2xl border p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold">🤝 Help Me Choose</h2>

          <p className="mt-2 text-gray-600">
            Answer a few simple questions about your home, sunlight, watering
            habits and lifestyle. We'll recommend plants that suit you.
          </p>
        </header>

        <button
          type="button"
          className="rounded-lg border px-5 py-2 font-medium transition hover:bg-gray-100"
        >
          Find My Plant
        </button>
      </section>

      {/* Seasonal Highlights */}
      <section className="rounded-2xl border p-6">
        <header>
          <h2 className="text-2xl font-semibold">🌼 Seasonal Highlights</h2>

          <p className="mt-2 text-gray-600">
            Placeholder for seasonal recommendations and curated collections.
          </p>
        </header>
      </section>

      {/* Browse Categories */}
      <section className="rounded-2xl border p-6">
        <header>
          <h2 className="text-2xl font-semibold">🪴 Browse Categories</h2>

          <p className="mt-2 text-gray-600">
            Placeholder for indoor plants, outdoor plants, seeds, pots,
            fertilizers and more.
          </p>
        </header>
      </section>

      {/* Trending Plants */}
      <section className="rounded-2xl border p-6">
        <header>
          <h2 className="text-2xl font-semibold">🔥 Trending Plants</h2>

          <p className="mt-2 text-gray-600">
            Placeholder for trending and popular plants.
          </p>
        </header>
      </section>

      {/* Recommended */}
      <section className="rounded-2xl border p-6">
        <header>
          <h2 className="text-2xl font-semibold">⭐ Recommended For You</h2>

          <p className="mt-2 text-gray-600">
            Future recommendations will explain why each plant is suggested,
            making recommendations transparent and trustworthy.
          </p>
        </header>
      </section>

      {/* Verified Nurseries */}
      <section className="rounded-2xl border p-6">
        <header>
          <h2 className="text-2xl font-semibold">🏡 Verified Nurseries</h2>

          <p className="mt-2 text-gray-600">
            Placeholder for trusted nursery partners and nearby sellers.
          </p>
        </header>
      </section>

      {/* Learn While You Grow */}
      <section className="rounded-2xl border p-6">
        <header>
          <h2 className="text-2xl font-semibold">
            📚 Learn While You Grow
          </h2>

          <p className="mt-2 text-gray-600">
            Placeholder for plant care tips, beginner guides and growing advice.
          </p>
        </header>
      </section>

      {/* Community */}
      <section className="rounded-2xl border p-6">
        <header>
          <h2 className="text-2xl font-semibold">
            🌱 Community & Inspiration
          </h2>

          <p className="mt-2 text-gray-600">
            Placeholder for customer gardens, success stories and featured plant
            collections.
          </p>
        </header>
      </section>
    </main>
  );
};

export default HomePage;
