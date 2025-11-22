import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-16">
      {/* Left: hero text + CTAs */}
      <section className="max-w-xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/60 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="text-xs font-medium text-indigo-700">
            TinyLink URL Shortener
          </span>
        </div>

        <div>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Shorten links, track clicks,{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              stay in control.
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            TinyLink turns long, messy URLs into clean short links with
            real-time click tracking. Perfect for campaigns, portfolios, and
            sharing anywhere you care about performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Get started for free
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Sign in
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>✓ No credit card required</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>✓ Simple owner dashboard</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>✓ Track clicks in real-time</span>
        </div>
      </section>

      {/* Right: product preview card */}
      <section className="w-full max-w-md">
        <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/60 backdrop-blur">
          {/* floating badge */}
          <div className="absolute -top-3 right-4 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 shadow-sm">
            Live clicks coming in…
          </div>

          {/* header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Example short link
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                /launch-2025
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>

          {/* URL row */}
          <div className="mt-4 space-y-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center gap-2">
              <span className="truncate text-xs font-medium text-indigo-700">
                https://tinylink.app/launch-2025
              </span>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                COPY
              </span>
            </div>
            <p className="truncate text-[11px] text-slate-500">
              https://example.com/campaigns/q1/launch-2025/social?ref=bitly-demo
            </p>
          </div>

          {/* stats */}
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-2 py-2.5">
              <p className="text-[11px] text-slate-500">Total clicks</p>
              <p className="mt-1 text-lg font-bold text-slate-900">1,248</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-2 py-2.5">
              <p className="text-[11px] text-slate-500">Today</p>
              <p className="mt-1 text-lg font-bold text-slate-900">87</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-2 py-2.5">
              <p className="text-[11px] text-slate-500">Top source</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-900">
                Instagram
              </p>
            </div>
          </div>

          {/* bottom hint */}
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-2 text-[11px] text-slate-600">
            Manage every short link from a simple owner dashboard. See clicks,
            last activity, and quickly copy or delete URLs.
          </div>
        </div>
      </section>
    </main>
  );
}
