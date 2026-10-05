import React, { useState } from 'react';
import { FUTURE_OUTLOOK_HORIZONS, FutureHorizon } from '../data/ebamData';

export const FutureOutlookSection: React.FC = () => {
  const [activeHorizon, setActiveHorizon] = useState<FutureHorizon>(FUTURE_OUTLOOK_HORIZONS[0]);

  // Interactive Factory Integration Prescription State
  const [partScale, setPartScale] = useState<'medium' | 'large' | 'ultra'>('large');
  const [criticality, setCriticality] = useState<'structural' | 'pressure' | 'tooling'>('structural');
  const [annualVolume, setAnnualVolume] = useState<'prototype' | 'low-rate' | 'serial'>('serial');

  const getIntegrationPrescription = () => {
    const chamberRecommendation =
      partScale === 'ultra'
        ? 'Extended Linear Gantry Vacuum Vessel (3.7m – 5.8m envelope) with Dual-Beam Synchronous Deposition Heads'
        : partScale === 'large'
        ? 'Medium-Frame 5-Axis Trunnion Vacuum Workcell (1.8m × 1.2m × 1.2m) with Dual-Wire Co-Feeder'
        : 'Compact Modular Vacuum Cell with Rapid Load-Lock Antechamber (<8 min pump-down)';

    const ndtPathway =
      criticality === 'structural'
        ? 'SAE AMS 4999A / AWS D17.1 Class A · Coaxial IRISS 1 kHz closed-loop thermal logging + Hot Isostatic Pressing (HIP) + Phased-Array Ultrasonic Testing (PAUT)'
        : criticality === 'pressure'
        ? 'ASME BPVC Sec. III / Spaceflight Fracture Critical · Helium mass-spectrometer leak test + 100% digital X-ray radiography + Vacuum recrystallization anneal'
        : 'Industrial Near-Net Spec · In-situ optical bead profilometry + Stress relief anneal + 5-axis CNC adaptive finish milling';

    const automationArchitecture =
      annualVolume === 'serial'
        ? 'Zero-point kinematic pallet transfer between Vacuum Airlock, Vacuum Stress-Relief Furnace, and 5-Axis Mill-Turn Center with automated millimeter-wave stock registration.'
        : annualVolume === 'low-rate'
        ? 'Batch-loaded multi-part substrate platen (3–6 preforms per vacuum pump-down cycle) paired with offline CMM touch-probe alignment.'
        : 'Direct CAD-to-path closed-loop prototyping utilizing bilateral substrate deposition to cancel thermal bowing without dedicated hard fixturing.';

    return { chamberRecommendation, ndtPathway, automationArchitecture };
  };

  const prescription = getIntegrationPrescription();

  return (
    <section id="outlook" className="py-20 border-b border-slate-800/80">
      <div className="max-w-[1360px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
              05. Future Outlook & Industrial Integration (2026–2035)
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-50 leading-tight">
              From Standalone Vacuum Chambers to Autonomous Digital Forging Foundries
            </h2>
          </div>
          <div className="lg:col-span-7 text-slate-300 text-[15px] leading-relaxed space-y-4 max-w-prose">
            <p>
              Over the next decade, Electron Beam Additive Manufacturing is poised to transition from a specialized low-volume aerospace preform generator into a cornerstone of <strong className="text-slate-100 font-semibold">decentralized heavy industrial manufacturing</strong>. Driven by severe global bottlenecks in large-scale hydraulic die forging and titanium sponge supply chains, OEMs are integrating EBAM directly into automated hybrid production lines.
            </p>
            <p>
              Four converging technological advancements—<strong className="text-slate-100 font-semibold">in-situ multi-spectral certification</strong>, <strong className="text-slate-100 font-semibold">interpass microstructural refinement</strong>, <strong className="text-slate-100 font-semibold">vacuum airlock palletization</strong>, and <strong className="text-slate-100 font-semibold">computational multi-wire alloying</strong>—will define its industrial trajectory through 2035.
            </p>
          </div>
        </div>

        {/* 4-Horizon Interactive Timeline Selector */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FUTURE_OUTLOOK_HORIZONS.map((horizon) => {
            const isActive = activeHorizon.id === horizon.id;
            return (
              <button
                key={horizon.id}
                type="button"
                onClick={() => setActiveHorizon(horizon)}
                className={`text-left p-4 rounded-lg border transition-colors ${
                  isActive
                    ? 'bg-cyan-950/35 border-cyan-500/80 text-slate-50'
                    : 'bg-[#0D111A] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                  <span>{horizon.timeframe}</span>
                  <span>{horizon.trlStatus.split('·')[0]}</span>
                </div>
                <div className="text-sm font-semibold text-slate-100 line-clamp-2">
                  {horizon.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Horizon Detailed Engineering Blueprint */}
        <div className="mt-6 bg-[#0D111A] border border-slate-800 rounded-lg p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-cyan-400">{activeHorizon.phase}</span>
                <span aria-hidden="true">·</span>
                <span>{activeHorizon.timeframe}</span>
                <span aria-hidden="true">·</span>
                <span>{activeHorizon.trlStatus}</span>
              </div>

              <h3 className="text-2xl font-serif font-medium text-slate-50">
                {activeHorizon.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 text-xs leading-relaxed">
                <div>
                  <div className="font-mono text-slate-400 mb-1">
                    Current Industrial Bottleneck Addressed
                  </div>
                  <p className="text-slate-300">{activeHorizon.coreProblemSolved}</p>
                </div>
                <div>
                  <div className="font-mono text-slate-400 mb-1">
                    Next-Gen Hardware & Software Architecture
                  </div>
                  <p className="text-slate-300">{activeHorizon.technicalArchitecture}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 text-xs leading-relaxed">
                <div className="font-mono text-emerald-400 mb-1">
                  Target Factory Integration Deliverable
                </div>
                <p className="text-slate-200">{activeHorizon.industrialDeliverable}</p>
              </div>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-slate-800 lg:pl-8 space-y-4">
              <div className="text-xs font-mono text-slate-400">
                PROJECTED BENCHMARK IMPACT
              </div>
              {activeHorizon.keyMetrics.map((m) => (
                <div key={m.label} className="bg-[#070A10] border border-slate-800 rounded p-4">
                  <div className="text-[11px] font-mono text-slate-400">{m.label}</div>
                  <div className="text-2xl font-mono font-semibold text-cyan-400 tabular-nums mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Factory Integration Planner */}
        <div className="mt-12 bg-[#0D111A] border border-slate-800 rounded-lg p-6">
          <div className="pb-4 mb-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono text-cyan-400">
                INDUSTRIAL INTEGRATION CONFIGURATOR
              </div>
              <h3 className="text-lg font-serif font-medium text-slate-100 mt-0.5">
                Configure Your Target Production Line Architecture
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Generates cell specification, NDT qualification route & hybrid CNC workflow
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 3 Parameter Selectors */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-2">
                  1. Component Structural Envelope
                </div>
                <div className="grid grid-cols-3 gap-1.5 bg-[#070A10] p-1.5 rounded border border-slate-800">
                  {[
                    { id: 'medium', label: '< 1.2m Class' },
                    { id: 'large', label: '1.2m – 2.5m' },
                    { id: 'ultra', label: '2.5m – 5.8m' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPartScale(opt.id as 'medium' | 'large' | 'ultra')}
                      className={`py-1.5 px-2 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                        partScale === opt.id
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 mb-2">
                  2. Mission Criticality & Duty Classification
                </div>
                <div className="grid grid-cols-3 gap-1.5 bg-[#070A10] p-1.5 rounded border border-slate-800">
                  {[
                    { id: 'structural', label: 'Flight Primary' },
                    { id: 'pressure', label: 'Cryo / Vessel' },
                    { id: 'tooling', label: 'Heavy Tooling' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCriticality(opt.id as 'structural' | 'pressure' | 'tooling')}
                      className={`py-1.5 px-2 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                        criticality === opt.id
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 mb-2">
                  3. Annual Production Cadence
                </div>
                <div className="grid grid-cols-3 gap-1.5 bg-[#070A10] p-1.5 rounded border border-slate-800">
                  {[
                    { id: 'prototype', label: '1–5 Units/yr' },
                    { id: 'low-rate', label: '10–50 Units/yr' },
                    { id: 'serial', label: '100+ Serial' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnnualVolume(opt.id as 'prototype' | 'low-rate' | 'serial')}
                      className={`py-1.5 px-2 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                        annualVolume === opt.id
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Prescription */}
            <div className="lg:col-span-7 bg-[#070A10] border border-slate-800 rounded-lg p-5 space-y-4 text-xs leading-relaxed">
              <div>
                <div className="font-mono text-cyan-400 mb-1">
                  Recommended EBAM Vacuum Cell Configuration
                </div>
                <p className="text-slate-100 font-medium">{prescription.chamberRecommendation}</p>
              </div>
              <div className="pt-3 border-t border-slate-800/80">
                <div className="font-mono text-emerald-400 mb-1">
                  Quality Assurance, Thermal & NDT Qualification Route
                </div>
                <p className="text-slate-200">{prescription.ndtPathway}</p>
              </div>
              <div className="pt-3 border-t border-slate-800/80">
                <div className="font-mono text-amber-400 mb-1">
                  Factory Automation & Hybrid CNC Machining Integration
                </div>
                <p className="text-slate-200">{prescription.automationArchitecture}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
