/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProcessPhysicsSection } from './components/ProcessPhysicsSection';
import { MaterialsMatrixSection } from './components/MaterialsMatrixSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { EvaluationSection } from './components/EvaluationSection';
import { FutureOutlookSection } from './components/FutureOutlookSection';
import {
  ALLOWED_MATERIALS,
  INDUSTRIAL_APPLICATIONS,
  STRENGTHS_AND_LIMITATIONS,
  FUTURE_OUTLOOK_HORIZONS
} from './data/ebamData';
import heroChamberImg from './assets/images/hero_ebam_vacuum_chamber_1791191856734.jpg';
import { Download, ArrowDownRight, Check } from 'lucide-react';

export default function App() {
  const [heroImgError, setHeroImgError] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExportDossier = () => {
    const lines: string[] = [
      '# ELECTRON BEAM ADDITIVE MANUFACTURING (EBAM / DED-EB): TECHNICAL MONOGRAPH',
      'Standard Classification: ISO/ASTM 52900 Directed Energy Deposition — Electron Beam (Wire-Fed)',
      'Primary Aerospace Material Specification: SAE AMS 4999A / ASTM F2924',
      '',
      '## 1. EXECUTIVE OVERVIEW & PROCESS PHYSICS',
      'Electron Beam Additive Manufacturing (EBAM) is a wire-fed Directed Energy Deposition (DED-EB) process that melts metallic welding wire using a focused, high-voltage electron beam (30–60 kV, up to 42 kW) inside a hard-vacuum chamber (10^-4 to 10^-5 Torr).',
      '- Energy Coupling Efficiency: >90% kinetic transfer independent of optical reflectivity.',
      '- Deposition Rate: 3.0 to 15.0+ kg/hr (6.6 to 33+ lbs/hr) depending on alloy density and wire gauge.',
      '- Build Envelope Scalability: Up to 5.79 m x 1.22 m x 1.22 m (19 ft x 4 ft x 4 ft).',
      '- Dual-Wire Capability: Independent dual wire nozzles enable rapid coarse-to-fine deposition switching and real-time Functionally Graded Materials (FGMs).',
      '',
      '## 2. ALLOWED MATERIALS & METALLURGICAL COMPATIBILITY',
      ...ALLOWED_MATERIALS.map(
        (m) =>
          `### ${m.designation} (${m.category})\n- Melting Point: ${m.meltingPointC} °C | Density: ${m.densityGcm3} g/cm³ | Deposition Rate: ${m.depositionRateKgHr}\n- Mechanical Properties: UTS ${m.utsMpa} MPa, 0.2% Yield ${m.yieldMpa} MPa, Elongation ${m.elongationPct}%\n- Vacuum Behavior: ${m.vacuumBehavior}\n- Post-Processing: ${m.postProcessing}\n- Key Applications: ${m.keyApplications.join(', ')}\n`
      ),
      '## 3. INDUSTRIAL APPLICATIONS & CASE STUDIES',
      ...INDUSTRIAL_APPLICATIONS.map(
        (a) =>
          `### ${a.title} (${a.sector})\n- Reference Component: ${a.componentExample}\n- Alloy: ${a.primaryAlloy} | Buy-to-Fly Reduction: ${a.conventionalBtf} -> ${a.ebamBtf} | Lead Time: ${a.conventionalLeadWeeks} wks -> ${a.ebamLeadWeeks} wks\n- Breakthrough: ${a.technicalBreakthrough}\n- Outcome: ${a.quantifiedOutcome}\n`
      ),
      '## 4. POINTS OF STRENGTH VS. DRAWBACKS & LIMITATIONS',
      ...STRENGTHS_AND_LIMITATIONS.map(
        (s) =>
          `### [${s.type.toUpperCase()}] ${s.title} (${s.metricBadge})\n- Mechanism: ${s.mechanism}\n- Industrial Impact: ${s.industrialImpact}\n- Strategy/Mitigation: ${s.mitigationOrLeverage}\n`
      ),
      '## 5. FUTURE OUTLOOK FOR INDUSTRIAL MANUFACTURING INTEGRATION (2026-2035)',
      ...FUTURE_OUTLOOK_HORIZONS.map(
        (h) =>
          `### ${h.phase} (${h.timeframe} | ${h.trlStatus}): ${h.title}\n- Bottleneck Solved: ${h.coreProblemSolved}\n- Architecture: ${h.technicalArchitecture}\n- Factory Deliverable: ${h.industrialDeliverable}\n`
      )
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EBAM_Technical_Review_Monograph.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div id="top" className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-14 bg-[#07090E]/95 backdrop-blur border-b border-slate-800/90 px-6 flex items-center justify-between">
        {/* Zone 1: Brand Title (Single text element, no adjacent tags or subtitles) */}
        <a
          href="#top"
          className="text-lg font-serif font-medium tracking-tight text-slate-50 whitespace-nowrap"
        >
          EBAM Technical Monograph
        </a>

        {/* Zone 2: 5 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
          <a
            href="#physics"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            Process Physics
          </a>
          <a
            href="#materials"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            Allowed Materials
          </a>
          <a
            href="#applications"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            Applications
          </a>
          <a
            href="#evaluation"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            Strengths & Limits
          </a>
          <a
            href="#outlook"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            Future Outlook
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportDossier}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors whitespace-nowrap cursor-pointer"
          >
            {exported ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Dossier Exported (.MD)</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Review Dossier</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with High-Vacuum Chamber Visual & Executive Monograph Framing */}
        <section className="relative border-b border-slate-800/90 overflow-hidden">
          <div className="max-w-[1360px] mx-auto px-6 py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left 7 Columns: Editorial Monograph Lead */}
              <div className="lg:col-span-7 space-y-6">
                {/* Unboxed metadata line per Zero-Pill Discipline */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>ISO/ASTM 52900: DED-EB</span>
                  <span aria-hidden="true">·</span>
                  <span>SAE AMS 4999A</span>
                  <span aria-hidden="true">·</span>
                  <span>Metallurgical & Process Review</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-serif font-medium text-slate-50 leading-[1.12] tracking-tight">
                  Electron Beam Additive Manufacturing: Process Physics, Metallurgy & Industrial Outlook
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  A comprehensive descriptive engineering review of wire-fed Electron Beam Additive Manufacturing (EBAM)—examining relativistic electron-lattice coupling, hard-vacuum reactive and refractory alloy compatibility, aerospace Buy-to-Fly economics, physical limitations, and the 2026–2035 factory integration roadmap.
                </p>

                {/* Primary Hero Navigation Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#physics"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors whitespace-nowrap"
                  >
                    <span>Launch Interactive Process Simulator</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#materials"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono text-slate-200 hover:text-white bg-[#0D111A] hover:bg-slate-800 border border-slate-700 rounded transition-colors whitespace-nowrap"
                  >
                    <span>Explore 10 Qualified Alloy Families</span>
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Vacuum Melt Pool Photography Frame */}
              <div className="lg:col-span-5">
                <figure className="bg-[#0D111A] border border-slate-800 rounded-lg overflow-hidden">
                  <div className="aspect-[16/10] relative bg-slate-900 overflow-hidden">
                    {!heroImgError ? (
                      <img
                        src={heroChamberImg}
                        alt="Inside a high-vacuum Electron Beam Additive Manufacturing chamber showing a glowing molten titanium melt pool and wire feed nozzle"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-xs font-mono text-slate-400 text-center">
                        [High-Vacuum EBAM Coaxial Wire Deposition Chamber — 60 kV / 10⁻⁵ Torr]
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-200">
                      <span>HIGH-VACUUM WIRE DED-EB MELT POOL</span>
                      <span className="text-cyan-400 tabular-nums">10⁻⁴ – 10⁻⁵ TORR</span>
                    </div>
                  </div>
                  <figcaption className="p-3.5 text-xs text-slate-400 font-mono border-t border-slate-800/80 flex items-center justify-between">
                    <span>Dual-Wire Coaxial Impingement</span>
                    <span className="text-slate-300 tabular-nums">T_pool &gt; 1,850 °C</span>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Quantitative Executive Specification Strip */}
            <div className="mt-14 pt-8 border-t border-slate-800/90 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-xs font-mono text-slate-400">VOLUMETRIC DEPOSITION RATE</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-3xl font-mono font-semibold text-slate-50 tabular-nums">
                    3.0 – 15.0
                  </span>
                  <span className="text-xs font-mono text-cyan-400 ml-1.5">kg/hr</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Up to 33 lbs/hr in heavy Ti-6Al-4V / Stainless
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">HARD VACUUM ENVIRONMENT</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-3xl font-mono font-semibold text-slate-50 tabular-nums">
                    10⁻⁴ – 10⁻⁵
                  </span>
                  <span className="text-xs font-mono text-cyan-400 ml-1.5">Torr</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Zero argon purge gas · &lt;0.1 ppm O₂ purity
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">KINETIC BEAM COUPLING</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-3xl font-mono font-semibold text-slate-50 tabular-nums">
                    85 – 95
                  </span>
                  <span className="text-xs font-mono text-cyan-400 ml-1.5">%</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Immune to optical reflection on Cu &amp; Al
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">BUY-TO-FLY COMPRESSION</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-3xl font-mono font-semibold text-slate-50 tabular-nums">
                    1.5 : 1
                  </span>
                  <span className="text-xs font-mono text-emerald-400 ml-1.5">vs. 15:1</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Up to 85% raw billet swarf reduction
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 01: Process Physics & Interactive Chamber Workbench */}
        <ProcessPhysicsSection />

        {/* Chapter 02: Allowed Materials & Metallurgical Compatibility Matrix */}
        <MaterialsMatrixSection />

        {/* Chapter 03: Industrial Applications & Buy-to-Fly Economics */}
        <ApplicationsSection />

        {/* Chapter 04: Points of Strength, Drawbacks & Multi-Process Benchmark */}
        <EvaluationSection />

        {/* Chapter 05: Future Outlook & Industrial Factory Configurator */}
        <FutureOutlookSection />
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="bg-[#05070B] border-t border-slate-800/90 py-10 px-6 text-xs text-slate-400">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-serif text-slate-200 font-medium">
              EBAM Technical Monograph &amp; Process Workbench
            </span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Reference Standards: ISO/ASTM 52900 (DED-EB), SAE AMS 4999A, AWS D17.1</span>
          </div>
          <div className="flex items-center gap-6 font-mono">
            <a href="#top" className="hover:text-slate-200 transition-colors">
              Back to Top ↑
            </a>
            <button
              type="button"
              onClick={handleExportDossier}
              className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Download Full Review (.MD)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
