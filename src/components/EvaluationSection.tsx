import React, { useState } from 'react';
import {
  STRENGTHS_AND_LIMITATIONS,
  PROCESS_COMPARISONS,
  ProcessComparison
} from '../data/ebamData';

const AXES = [
  { key: 'depositionSpeed', label: 'DEPOSITION SPEED' },
  { key: 'buildVolume', label: 'BUILD ENVELOPE' },
  { key: 'purityControl', label: 'VACUUM PURITY' },
  { key: 'reflectiveMetals', label: 'REFLECTIVE METALS' },
  { key: 'geometricResolution', label: 'SURFACE RESOLUTION' },
  { key: 'capexAccessibility', label: 'LOW CAPEX / MOBILITY' }
] as const;

export const EvaluationSection: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'strength' | 'limitation'>('all');
  const [comparedProcessId, setComparedProcessId] = useState<string>('waam');

  const ebamSpec = PROCESS_COMPARISONS[0];
  const rivalSpec: ProcessComparison =
    PROCESS_COMPARISONS.find((p) => p.id === comparedProcessId) || PROCESS_COMPARISONS[1];

  const filteredItems = STRENGTHS_AND_LIMITATIONS.filter(
    (item) => filterMode === 'all' || item.type === filterMode
  );

  // Helper to compute SVG polygon coordinates on a 6-axis radar chart
  const center = 160;
  const maxRadius = 105;

  const getPolygonPoints = (scores: ProcessComparison['scores']) => {
    return AXES.map((axis, idx) => {
      const angle = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
      const val = scores[axis.key] / 100;
      const r = val * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <section id="evaluation" className="py-20 border-b border-slate-800/80">
      <div className="max-w-[1360px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
              04. Critical Engineering Evaluation
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-50 leading-tight">
              Points of Strength vs. Physical Drawbacks & Process Limitations
            </h2>
          </div>
          <div className="lg:col-span-7 text-slate-300 text-[15px] leading-relaxed space-y-4 max-w-prose">
            <p>
              Integrating EBAM into a production factory requires an objective trade-off analysis. While EBAM achieves unmatched volumetric deposition speeds and chemical purity on meter-scale reactive and refractory metals, the physics of a high-power electron beam in a hard vacuum introduce strict metallurgical and operational constraints that differentiate it sharply from powder-bed fusion and open-atmosphere arc processes.
            </p>
            <p>
              Below is a rigorous dissection of EBAM’s four foundational technical strengths alongside its four primary engineering limitations—complete with the industrial mitigation protocols used in qualified aerospace production cells.
            </p>
          </div>
        </div>

        {/* Filter Control Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-200">
            Process Capability & Constraint Audit
          </div>
          <div className="flex items-center gap-1.5 bg-[#0D111A] p-1.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                filterMode === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All 8 Engineering Factors
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('strength')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                filterMode === 'strength'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Points of Strength (4)
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('limitation')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                filterMode === 'limitation'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Drawbacks & Limitations (4)
            </button>
          </div>
        </div>

        {/* 2-Column Evaluation Matrix */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const isStrength = item.type === 'strength';
            return (
              <div
                key={item.id}
                className="bg-[#0D111A] border border-slate-800 rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Non-hue-only status & unboxed metric metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2">
                    <span className={isStrength ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                      {isStrength ? '● POINT OF STRENGTH' : '▲ LIMITATION & CONSTRAINT'}
                    </span>
                    <span className="text-slate-400 tabular-nums">{item.metricBadge}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-slate-50 mb-3">
                    {item.title}
                  </h3>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <div className="font-mono text-slate-400 mb-0.5">Physical Mechanism</div>
                      <p className="text-slate-300">{item.mechanism}</p>
                    </div>
                    <div>
                      <div className="font-mono text-slate-400 mb-0.5">Manufacturing Impact</div>
                      <p className="text-slate-300">{item.industrialImpact}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs leading-relaxed">
                  <div className="font-mono text-cyan-400 mb-0.5">
                    {isStrength ? 'Production Leverage Strategy' : 'Engineering Mitigation Protocol'}
                  </div>
                  <p className="text-slate-200">{item.mitigationOrLeverage}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Process Additive Manufacturing Benchmark & Radar Chart */}
        <div className="mt-14 bg-[#0D111A] border border-slate-800 rounded-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">
                CROSS-PROCESS BENCHMARKING (ISO/ASTM 52900)
              </div>
              <h3 className="text-xl font-serif font-medium text-slate-50">
                EBAM (DED-EB) vs. Alternative Metal Additive Technologies
              </h3>
            </div>

            {/* Rival Process Selector */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#070A10] p-1.5 rounded-lg border border-slate-800">
              {PROCESS_COMPARISONS.slice(1).map((proc) => {
                const active = comparedProcessId === proc.id;
                return (
                  <button
                    key={proc.id}
                    type="button"
                    onClick={() => setComparedProcessId(proc.id)}
                    className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    vs. {proc.processName.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 6-Axis Polygon Radar Calibration Chart */}
            <div className="lg:col-span-5 flex flex-col items-center bg-[#070A10] border border-slate-800/90 rounded-lg p-4">
              <svg
                viewBox="0 0 320 320"
                className="w-full max-w-[310px] h-auto"
                role="img"
                aria-label="Radar comparison chart between EBAM and selected metal additive process"
              >
                {/* Concentric Polygonal Grids (25%, 50%, 75%, 100%) */}
                {[0.25, 0.5, 0.75, 1.0].map((level) => {
                  const pts = AXES.map((_, idx) => {
                    const angle = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
                    const r = level * maxRadius;
                    return `${(center + r * Math.cos(angle)).toFixed(1)},${(
                      center +
                      r * Math.sin(angle)
                    ).toFixed(1)}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={level}
                      points={pts}
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Radial Axes & Vertex Labels */}
                {AXES.map((axis, idx) => {
                  const angle = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
                  const x2 = center + maxRadius * Math.cos(angle);
                  const y2 = center + maxRadius * Math.sin(angle);
                  const labelR = maxRadius + 24;
                  const lx = center + labelR * Math.cos(angle);
                  const ly = center + labelR * Math.sin(angle);
                  return (
                    <g key={axis.key}>
                      <line
                        x1={center}
                        y1={center}
                        x2={x2}
                        y2={y2}
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <text
                        x={lx}
                        y={ly + 3}
                        textAnchor="middle"
                        fill="#94A3B8"
                        fontSize="7.5"
                        fontFamily="IBM Plex Mono"
                      >
                        {axis.label}
                      </text>
                    </g>
                  );
                })}

                {/* Rival Process Polygon (Amber Dashed) */}
                <polygon
                  points={getPolygonPoints(rivalSpec.scores)}
                  fill="#F59E0B"
                  fillOpacity="0.16"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* EBAM Polygon (Cyan Solid) */}
                <polygon
                  points={getPolygonPoints(ebamSpec.scores)}
                  fill="#06B6D4"
                  fillOpacity="0.24"
                  stroke="#22D3EE"
                  strokeWidth="2.2"
                />
              </svg>

              {/* Radar Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
                  <span className="text-cyan-300 font-semibold">EBAM (DED-EB Wire)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-amber-400 inline-block border-b border-dashed" />
                  <span className="text-amber-300">{rivalSpec.processName}</span>
                </div>
              </div>
            </div>

            {/* Quantitative Comparison Table */}
            <div className="lg:col-span-7 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#090C12] text-[11px] font-mono text-slate-400">
                    <th className="py-3 px-3 font-medium">Process Architecture</th>
                    <th className="py-3 px-3 font-medium">Deposition Rate</th>
                    <th className="py-3 px-3 font-medium">Max Build Envelope</th>
                    <th className="py-3 px-3 font-medium">Beam Coupling η</th>
                    <th className="py-3 px-3 font-medium">As-Built Roughness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {PROCESS_COMPARISONS.map((proc) => {
                    const isEbam = proc.id === 'ebam';
                    const isRival = proc.id === comparedProcessId;
                    return (
                      <tr
                        key={proc.id}
                        onClick={() => {
                          if (!isEbam) setComparedProcessId(proc.id);
                        }}
                        className={`transition-colors ${
                          isEbam
                            ? 'bg-cyan-950/30 text-slate-50'
                            : isRival
                            ? 'bg-amber-950/25 text-slate-100 cursor-pointer'
                            : 'hover:bg-slate-900/60 text-slate-300 cursor-pointer'
                        }`}
                      >
                        <td className="py-3.5 px-3">
                          <div className="font-semibold flex items-center gap-1.5">
                            <span>{proc.processName}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {proc.isoCode} · {proc.environment}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono tabular-nums text-cyan-300 whitespace-nowrap">
                          {proc.depositionRateKgHr}
                        </td>
                        <td className="py-3.5 px-3 font-mono tabular-nums whitespace-nowrap">
                          {proc.maxEnvelopeM}
                        </td>
                        <td className="py-3.5 px-3 font-mono tabular-nums whitespace-nowrap">
                          {proc.energyEfficiencyPct}
                        </td>
                        <td className="py-3.5 px-3 font-mono tabular-nums whitespace-nowrap">
                          {proc.surfaceRoughnessRaUm}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mt-3 text-[11px] font-mono text-slate-400">
                Click any competing process row in the table above to overlay its capability polygon against EBAM on the radar chart.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
