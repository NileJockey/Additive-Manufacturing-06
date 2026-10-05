import React, { useState, useMemo } from 'react';
import { INDUSTRIAL_APPLICATIONS } from '../data/ebamData';
import { Calculator } from 'lucide-react';
import sparImg from '../assets/images/aerospace_titanium_spar_1791191868351.jpg';
import nozzleImg from '../assets/images/refractory_tantalum_nozzle_1791191878384.jpg';
import chamberImg from '../assets/images/hero_ebam_vacuum_chamber_1791191856734.jpg';

const SECTORS = [
  'All Sectors',
  'Aerospace & Spaceflight',
  'Defense & Naval',
  'Energy & Nuclear',
  'Tooling & Remanufacturing'
] as const;

const ALLOY_ECONOMICS = [
  { id: 'ti64', name: 'Ti-6Al-4V Aerospace Grade 5', billetCostKg: 68, wireCostKg: 95, depRateKgHr: 9.0, ebamBtf: 1.65 },
  { id: 'c103', name: 'Niobium C-103 Refractory', billetCostKg: 620, wireCostKg: 740, depRateKgHr: 6.5, ebamBtf: 1.45 },
  { id: 'in718', name: 'Inconel 718 Superalloy', billetCostKg: 54, wireCostKg: 78, depRateKgHr: 8.5, ebamBtf: 1.60 },
  { id: 'ta10w', name: 'Tantalum Ta-10W Refractory', billetCostKg: 540, wireCostKg: 660, depRateKgHr: 6.2, ebamBtf: 1.40 }
];

export const ApplicationsSection: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Interactive Buy-to-Fly Calculator State
  const [finalPartMassKg, setFinalPartMassKg] = useState<number>(85);
  const [conventionalBtf, setConventionalBtf] = useState<number>(12);
  const [calcAlloyId, setCalcAlloyId] = useState<string>('ti64');

  const filteredApps = useMemo(() => {
    if (selectedSector === 'All Sectors') return INDUSTRIAL_APPLICATIONS;
    return INDUSTRIAL_APPLICATIONS.filter((app) => app.sector === selectedSector);
  }, [selectedSector]);

  const calcStats = useMemo(() => {
    const alloy = ALLOY_ECONOMICS.find((a) => a.id === calcAlloyId) || ALLOY_ECONOMICS[0];
    const convRawMassKg = finalPartMassKg * conventionalBtf;
    const ebamPreformMassKg = finalPartMassKg * alloy.ebamBtf;
    const massSavedKg = convRawMassKg - ebamPreformMassKg;
    const massSavedPct = (massSavedKg / convRawMassKg) * 100;

    // Machine & Material Economics
    const convMaterialCost = convRawMassKg * alloy.billetCostKg;
    const convCncHours = (convRawMassKg - finalPartMassKg) / 3.2; // 3.2 kg/hr roughing/finishing average
    const convTotalCost = convMaterialCost + convCncHours * 165;

    const ebamMaterialCost = ebamPreformMassKg * alloy.wireCostKg;
    const ebamDepositionHours = ebamPreformMassKg / alloy.depRateKgHr;
    const ebamFinishCncHours = (ebamPreformMassKg - finalPartMassKg) / 2.2;
    const ebamTotalCost =
      ebamMaterialCost + ebamDepositionHours * 340 + ebamFinishCncHours * 165;

    const netSavingsUsd = Math.max(0, convTotalCost - ebamTotalCost);
    const netSavingsPct = (netSavingsUsd / convTotalCost) * 100;

    return {
      alloy,
      convRawMassKg,
      ebamPreformMassKg,
      massSavedKg,
      massSavedPct,
      ebamDepositionHours,
      convTotalCost,
      ebamTotalCost,
      netSavingsUsd,
      netSavingsPct
    };
  }, [finalPartMassKg, conventionalBtf, calcAlloyId]);

  const getImageSource = (key?: 'spar' | 'nozzle' | 'chamber') => {
    if (key === 'spar') return sparImg;
    if (key === 'nozzle') return nozzleImg;
    if (key === 'chamber') return chamberImg;
    return null;
  };

  return (
    <section id="applications" className="py-20 border-b border-slate-800/80">
      <div className="max-w-[1360px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
              03. Industrial Applications & Economic Proof
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-50 leading-tight">
              Replacing Multi-Year Heavy Die Forgings Across Aerospace, Naval & Nuclear Sectors
            </h2>
          </div>
          <div className="lg:col-span-7 text-slate-300 text-[15px] leading-relaxed space-y-4 max-w-prose">
            <p>
              In aerospace and defense manufacturing, the ratio of raw billet weight purchased to the weight of the finished flight component is known as the <strong className="text-slate-100 font-semibold">Buy-to-Fly (BTF) ratio</strong>. Conventional manufacturing of titanium airframe bulkheads, wing spars, and engine casings frequently requires a BTF ratio between <span className="font-mono text-slate-100">10:1 and 20:1</span>—meaning up to 95% of an expensive, energy-intensive titanium forging is milled away into scrap chips.
            </p>
            <p>
              EBAM targets this exact industrial bottleneck. By depositing near-net-shape wire preforms onto simple flat or tubular substrates inside a vacuum chamber, EBAM compresses Buy-to-Fly ratios down to <span className="font-mono text-slate-100">1.4:1 – 1.9:1</span> and bypasses global 18-to-24-month queues for 50,000-ton hydraulic forging presses.
            </p>
          </div>
        </div>

        {/* Visual Showcase Gallery of EBAM Structural & Refractory Hardware */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <figure className="bg-[#0D111A] border border-slate-800 rounded-lg overflow-hidden">
            <div className="aspect-[4/3] relative bg-slate-900 overflow-hidden">
              {!imgErrors['spar'] ? (
                <img
                  src={sparImg}
                  alt="Near-net-shape Ti-6Al-4V aerospace structural bulkhead and dome showing stepped wire-DED weld tracks alongside CNC finish-machined datum surfaces"
                  referrerPolicy="no-referrer"
                  onError={() => setImgErrors((prev) => ({ ...prev, spar: true }))}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center text-xs font-mono text-slate-400">
                  [Fig. 1 — Ti-6Al-4V Near-Net Aerospace Bulkhead Preform & Finish CNC Datum]
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-xs font-mono text-slate-200">
                <span>FIG. 01 · TI-6AL-4V AIRFRAME SPAR & DOME</span>
                <span className="text-cyan-400 tabular-nums">BTF 1.8:1 vs 14.5:1</span>
              </div>
            </div>
            <figcaption className="p-4 text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-100 font-medium">Hybrid Additive-Subtractive Workflow:</strong> Raw stepped wire-fed electron beam weld beads form the near-net structural web, while critical aerodynamic and mating bolt flanges are 5-axis CNC finish-machined to <span className="font-mono">±0.025 mm</span> tolerance.
            </figcaption>
          </figure>

          <figure className="bg-[#0D111A] border border-slate-800 rounded-lg overflow-hidden">
            <div className="aspect-[4/3] relative bg-slate-900 overflow-hidden">
              {!imgErrors['nozzle'] ? (
                <img
                  src={nozzleImg}
                  alt="Refractory tantalum-tungsten rocket reaction control thruster bell and nuclear manifold produced via vacuum electron beam wire deposition"
                  referrerPolicy="no-referrer"
                  onError={() => setImgErrors((prev) => ({ ...prev, nozzle: true }))}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center text-xs font-mono text-slate-400">
                  [Fig. 2 — Refractory Tantalum-Tungsten Thruster Nozzle & Manifold]
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-xs font-mono text-slate-200">
                <span>FIG. 02 · REFRACTORY TA-10W / NB C-103 THRUSTER</span>
                <span className="text-cyan-400 tabular-nums">Tm &gt; 2,350 °C IN VACUUM</span>
              </div>
            </div>
            <figcaption className="p-4 text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-100 font-medium">Refractory & Space Propulsion Hardware:</strong> Hard-vacuum electron beam deposition consolidates oxygen-sensitive Niobium C-103 and Tantalum alloys without inert gas tent purging, achieving &gt;99.9% density for orbital thruster skirts.
            </figcaption>
          </figure>
        </div>

        {/* Sector Filter Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-200">
            Validated Industrial Deployment Profiles
          </div>
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0D111A] p-1.5 rounded-lg border border-slate-800">
            {SECTORS.map((sector) => {
              const active = selectedSector === sector;
              return (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setSelectedSector(sector)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {sector}
                </button>
              );
            })}
          </div>
        </div>

        {/* Industrial Case Studies List (Single-Elevation Cards, Unboxed Metadata) */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          {filteredApps.map((app, index) => {
            const imgSrc = getImageSource(app.imageKey);
            return (
              <article
                key={app.id}
                className="bg-[#0D111A] border border-slate-800 rounded-lg p-6 transition-colors hover:border-slate-700"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left 8 Columns: Narrative & Technical Breakthrough */}
                  <div className="lg:col-span-8 space-y-3">
                    {/* Clean unboxed metadata per Zero-Pill Discipline */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="text-cyan-400">0{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{app.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{app.primaryAlloy}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">Nominal Preform: {app.partMassKg} kg</span>
                    </div>

                    <h3 className="text-xl font-serif font-medium text-slate-50">
                      {app.title}
                    </h3>

                    <div className="text-xs font-mono text-slate-300">
                      Reference Hardware: {app.componentExample}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed pt-1">
                      {app.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/70 text-xs leading-relaxed">
                      <div>
                        <div className="font-mono text-slate-400 mb-1">Process Implementation</div>
                        <p className="text-slate-300">{app.technicalBreakthrough}</p>
                      </div>
                      <div>
                        <div className="font-mono text-emerald-400 mb-1">Verified Industrial Outcome</div>
                        <p className="text-slate-200">{app.quantifiedOutcome}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Columns: Quantitative Proof Adjacency */}
                  <div className="lg:col-span-4 lg:border-l lg:border-slate-800 lg:pl-6 flex flex-col justify-between gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] font-mono text-slate-400">CONVENTIONAL BTF</div>
                        <div className="text-xl font-mono font-semibold text-slate-400 line-through tabular-nums mt-0.5">
                          {app.conventionalBtf}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-cyan-400">EBAM BTF RATIO</div>
                        <div className="text-2xl font-mono font-semibold text-slate-50 tabular-nums mt-0.5">
                          {app.ebamBtf}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80">
                      <div className="text-[11px] font-mono text-slate-400 mb-1.5">
                        PROCUREMENT LEAD TIME COMPRESSION
                      </div>
                      <div className="space-y-1.5 text-xs font-mono tabular-nums">
                        <div className="flex justify-between text-slate-400">
                          <span>Die Forging + CNC:</span>
                          <span>{app.conventionalLeadWeeks} weeks</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded overflow-hidden">
                          <div className="h-full bg-slate-500 w-full" />
                        </div>
                        <div className="flex justify-between text-cyan-300 pt-1">
                          <span>EBAM Preform + Finish:</span>
                          <span className="font-semibold">{app.ebamLeadWeeks} weeks</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded overflow-hidden">
                          <div
                            className="h-full bg-cyan-400"
                            style={{
                              width: `${Math.max(8, (app.ebamLeadWeeks / app.conventionalLeadWeeks) * 100)}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {imgSrc && (
                      <div className="pt-2 text-[11px] font-mono text-slate-400">
                        Qualified under SAE AMS 4999A / DoD Additive Directives
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive Buy-to-Fly & Forging Replacement Calculator */}
        <div className="mt-12 bg-[#0D111A] border border-slate-800 rounded-lg p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-semibold text-slate-100">
                Interactive Buy-to-Fly (BTF) & Billet Waste Reduction Calculator
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Compare Conventional Billet/Die Hog-Out vs. EBAM Wire Preform + Finish CNC
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Inputs */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label htmlFor="btf-alloy" className="block text-xs font-mono text-slate-400 mb-1.5">
                  Component Alloy Class
                </label>
                <select
                  id="btf-alloy"
                  value={calcAlloyId}
                  onChange={(e) => setCalcAlloyId(e.target.value)}
                  className="w-full bg-[#070A10] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
                >
                  {ALLOY_ECONOMICS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} (EBAM BTF ~{a.ebamBtf}:1)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Finished Flight Component Mass</span>
                  <span className="font-mono text-cyan-400 tabular-nums">{finalPartMassKg} kg</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={400}
                  step={5}
                  value={finalPartMassKg}
                  onChange={(e) => setFinalPartMassKg(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Conventional Billet Buy-to-Fly Ratio</span>
                  <span className="font-mono text-cyan-400 tabular-nums">{conventionalBtf}.0 : 1</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={22}
                  step={1}
                  value={conventionalBtf}
                  onChange={(e) => setConventionalBtf(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Computed Results */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#070A10] border border-slate-800 rounded p-4">
                <div className="text-[11px] font-mono text-slate-400">CONVENTIONAL BILLET</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-slate-300 tabular-nums">
                    {calcStats.convRawMassKg.toFixed(0)}
                  </span>
                  <span className="text-xs font-mono text-slate-500 ml-1">kg</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1 tabular-nums">
                  {((1 - 1 / conventionalBtf) * 100).toFixed(0)}% milled to swarf
                </div>
              </div>

              <div className="bg-[#070A10] border border-slate-800 rounded p-4">
                <div className="text-[11px] font-mono text-cyan-400">EBAM WIRE PREFORM</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-slate-50 tabular-nums">
                    {calcStats.ebamPreformMassKg.toFixed(0)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">kg</span>
                </div>
                <div className="text-[11px] font-mono text-cyan-400 mt-1 tabular-nums">
                  BTF {calcStats.alloy.ebamBtf.toFixed(2)} : 1
                </div>
              </div>

              <div className="bg-[#070A10] border border-slate-800 rounded p-4">
                <div className="text-[11px] font-mono text-emerald-400">ALLOY SAVED / PART</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-emerald-300 tabular-nums">
                    -{calcStats.massSavedKg.toFixed(0)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">kg</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1 tabular-nums">
                  {calcStats.massSavedPct.toFixed(1)}% raw reduction
                </div>
              </div>

              <div className="bg-[#070A10] border border-slate-800 rounded p-4">
                <div className="text-[11px] font-mono text-slate-400">BEAM PRINT TIME</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-slate-50 tabular-nums">
                    {calcStats.ebamDepositionHours.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">hrs</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1 tabular-nums">
                  Est. -{calcStats.netSavingsPct.toFixed(0)}% unit cost
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
