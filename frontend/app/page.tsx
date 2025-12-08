"use client";

import { useEffect, useMemo, useState } from "react";

type Trend = {
  id: number;
  marketplace: string;
  product_title: string;
  niche: string;
  score: number;
  demand_level: string;
  competition_level: string;
  price: number;
  currency: string;
  sample_image_url?: string | null;
  last_seen: string;
};

export default function HomePage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [marketplaceFilter, setMarketplaceFilter] = useState<string>("all");
  const [demandFilter, setDemandFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/trends");
        if (!res.ok) throw new Error("Failed to fetch trends");
        const data: Trend[] = await res.json();
        setTrends(data);
      } catch (err: any) {
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  const filteredTrends = useMemo(() => {
    return trends.filter((t) => {
      if (marketplaceFilter !== "all" && t.marketplace !== marketplaceFilter) return false;
      if (demandFilter !== "all" && t.demand_level !== demandFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const haystack = `${t.product_title} ${t.niche}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [trends, marketplaceFilter, demandFilter, search]);

  const bestScore = filteredTrends.reduce((max, t) => Math.max(max, t.score), 0);

  const marketplaces = Array.from(new Set(trends.map((t) => t.marketplace)));
  const demandLevels = Array.from(new Set(trends.map((t) => t.demand_level)));

  if (loading) {
    return <p>Loading trends...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-sm">Error: {error}</p>;
  }

  return (
    <main className="space-y-4">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Trends (filtered / total)
          </p>
          <p className="text-2xl font-semibold">
            {filteredTrends.length}{" "}
            <span className="text-xs text-slate-400">/ {trends.length}</span>
          </p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Top Marketplace</p>
          <p className="text-lg font-medium">
            {filteredTrends[0]?.marketplace ?? trends[0]?.marketplace ?? "N/A"}
          </p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Best Score</p>
          <p className="text-lg font-medium">{bestScore.toFixed(2)}</p>
        </div>
      </section>

      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
              Trend Filters
            </h2>
            <p className="text-xs text-slate-400">
              Slice your trend universe by marketplace, demand level and keywords.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <input
              type="text"
              placeholder="Search by title or niche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
            />
            <select
              value={marketplaceFilter}
              onChange={(e) => setMarketplaceFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
            >
              <option value="all">All marketplaces</option>
              {marketplaces.map((mkt) => (
                <option key={mkt} value={mkt}>
                  {mkt}
                </option>
              ))}
            </select>
            <select
              value={demandFilter}
              onChange={(e) => setDemandFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500/70"
            >
              <option value="all">All demand levels</option>
              {demandLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Trending Products
          </h2>
          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
            MVP – demo / DB-backed
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/80">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Product</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">
                  Marketplace
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Niche</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Score</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Demand</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">
                  Competition
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrends.map((trend) => (
                <tr
                  key={trend.id}
                  className="border-t border-slate-800 hover:bg-slate-900/60 transition-colors"
                >
                  <td className="px-4 py-2 flex items-center gap-2">
                    {trend.sample_image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={trend.sample_image_url}
                        alt={trend.product_title}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-100 text-xs md:text-sm">
                        {trend.product_title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Last seen {new Date(trend.last_seen).toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-xs">{trend.marketplace}</td>
                  <td className="px-4 py-2 text-xs">{trend.niche}</td>
                  <td className="px-4 py-2 text-xs">{trend.score.toFixed(2)}</td>
                  <td className="px-4 py-2 text-xs capitalize">
                    <span className="px-2 py-1 rounded-full border border-slate-700/80 text-[10px] uppercase tracking-wide">
                      {trend.demand_level}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs capitalize">{trend.competition_level}</td>
                  <td className="px-4 py-2 text-xs">
                    {trend.currency} {trend.price.toFixed(2)}
                  </td>
                </tr>
              ))}
              {filteredTrends.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-xs text-slate-400">
                    No trends match your filters yet. Try clearing some filters or adjusting your
                    search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
