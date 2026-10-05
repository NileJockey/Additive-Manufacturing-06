import React, { useState, useMemo } from 'react';
import { EBAM_SUBSYSTEMS, ALLOWED_MATERIALS, SubsystemSpec } from '../data/ebamData';
import { Sliders, Zap, Layers, Compass, RotateCcw } from 'lucide-react';

export const ProcessPhysicsSection: React.FC = () => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<SubsystemSpec>(EBAM_SUBSYSTEMS[0]);

  // Interactive Process Simulator State
  const [selectedAlloyId, setSelectedAlloyId] = useState<string>('ti64');
  const [voltageKv, setVoltageKv] = useState<number>(60); // 30 - 60 kV
  const [currentMa, setCurrentMa] = useState<number>(320); // 80 - 600 mA
  const [travelSpeedMms, setTravelSpeedMms] = useState<number>(12); // 4 - 25 mm/s
  const [wireDiaMm, setWireDiaMm] = useState<number>(2.4); // 1.14, 1.6, 2.4, 3.2 mm
  const [dualWireMode, setDualWireMode] = useState<boolean>(true);

  const activeAlloy = useMemo(
    () => ALLOWED_MATERIALS.find((m) => m.id === selectedAlloyId) || ALLOWED_MATERIALS[0],
    [selectedAlloyId]
  );

  // Physics-based process calculations
  const metrics = useMemo(() => {
    const rawPowerKw = (voltageKv * currentMa) / 1000;
    const couplingEfficiency = activeAlloy.category === 'Copper & High-Conductivity' ? 0.87 : 0.93;
    const absorbedPowerKw = rawPowerKw * couplingEfficiency;
    const linearHeatInputJmm = (absorbedPowerKw * 1000) / travelSpeedMms;

    // Approximate enthalpy to melt 1g of alloy from 25C to superheated melt pool (+250C above Tm)
    const deltaT = activeAlloy.meltingPointC + 250 - 25;
    const latentHeatFactor = 1.38; // accounts for latent heat of fusion + radiation losses in vacuum
    const energyPerGramJ = (activeAlloy.specificHeatJkgK * deltaT * latentHeatFactor) / 1000;

    // Max thermally supported melt rate + wire factor
    const wireCrossSectionRatio = Math.pow(wireDiaMm / 2.4, 0.35);
    const dualWireBoost = dualWireMode ? 1.18 : 1.0;
    const gramsPerSec = Math.min(
      (absorbedPowerKw * 1000 * 0.62) / energyPerGramJ,
      4.8
    ) * wireCrossSectionRatio * dualWireBoost;

    const depositionRateKgHr = gramsPerSec * 3.6;

    // Cross-sectional bead geometry
    const volumetricFlowMm3s = (gramsPerSec / activeAlloy.densityGcm3) * 1000;
    const beadAreaMm2 = volumetricFlowMm3s / travelSpeedMms;
    const beadWidthMm = Math.max(3.2, Math.sqrt(beadAreaMm2 * 3.8));
    const layerHeightMm = Math.max(0.8, (beadAreaMm2 / beadWidthMm) * 1.15);

    // Process window stability assessment
    let status: 'nominal' | 'warning' | 'critical' = 'nominal';
    let statusLabel = '● NOMINAL PROCESS WINDOW';
    let statusDetail = 'Stable Marangoni convection and full interlayer metallurgical fusion.';

    if (linearHeatInputJmm > 2200) {
      status = 'critical';
      statusLabel = '✖ EXCESSIVE HEAT INPUT / VOLATILIZATION';
      statusDetail = 'High vapor-pressure element loss (e.g., Al/Mn depletion) and excessive melt pool slumping.';
    } else if (linearHeatInputJmm < 650) {
      status = 'warning';
      statusLabel = '▲ LACK-OF-FUSION RISK (LOW HEAT)';
      statusDetail = 'Insufficient substrate wetting; increase beam current or reduce CNC gantry travel speed.';
    } else if (linearHeatInputJmm > 1650) {
      status = 'warning';
      statusLabel = '▲ COARSE BETA-GRAIN GROWTH';
      statusDetail = 'Elevated thermal gradient slows vacuum cooling rate; consider high-frequency beam oscillation.';
    }

    return {
      rawPowerKw,
      couplingEfficiency: couplingEfficiency * 100,
      absorbedPowerKw,
      linearHeatInputJmm,
      depositionRateKgHr,
      beadWidthMm,
      layerHeightMm,
      status,
      statusLabel,
      statusDetail
    };
  }, [voltageKv, currentMa, travelSpeedMms, wireDiaMm, dualWireMode, activeAlloy]);

  const handleReset = () => {
    setSelectedAlloyId('ti64');
    setVoltageKv(60);
    setCurrentMa(320);
    setTravelSpeedMms(12);
    setWireDiaMm(2.4);
    setDualWireMode(true);
  };

  return (
    <section id="physics" className="py-20 border-b border-slate-800/80">
      <div className="max-w-[1360px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
              01. Process Physics & Architectural Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-50 leading-tight">
              Directed Energy Deposition via Relativistic Electron Streams
            </h2>
          </div>
          <div className="lg:col-span-7 text-slate-300 text-[15px] leading-relaxed space-y-4 max-w-prose">
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-medium first-letter:text-cyan-400 first-letter:float-left first-letter:mr-3 first-letter:mt-0.5">
              Electron Beam Additive Manufacturing (EBAM)—standardized under ISO/ASTM 52900 as wire-fed Directed Energy Deposition with an Electron Beam (DED-EB)—is a high-deposition-rate metal manufacturing process pioneered commercially by Sciaky, Inc. Unlike powder-bed fusion processes that sinter fine particulates inside a small build cylinder, EBAM feeds standard commercial welding wire directly into a molten pool generated by a focused, high-voltage electron beam inside a hard-vacuum chamber.
            </p>
            <p>
              By accelerating free electrons across a <span className="font-mono text-slate-100">30 to 60 kV</span> electrostatic potential in a <span className="font-mono text-slate-100">10⁻⁴ to 10⁻⁵ Torr</span> vacuum, the beam strikes the metallic substrate at approximately 30% to 45% of the speed of light. Kinetic energy transfers directly into lattice phonons within tens of micrometers, achieving <span className="font-mono text-slate-100">&gt;90% energy conversion efficiency</span> regardless of the metal’s optical reflectivity.
            </p>
          </div>
        </div>

        {/* Asymmetric Split Console: Interactive Vacuum Chamber Schematic + Parameter Simulator */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive SVG Vacuum Chamber Cross-Section & Subsystem Inspector */}
          <div className="lg:col-span-7 bg-[#0D111A] border border-slate-800 rounded-lg p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-800">
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  Interactive EBAM Vacuum Workcell Schematic
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select any numbered subsystem node (SYS-01 to SYS-06) to inspect its physical governing mechanism
                </p>
              </div>
              <div className="text-xs font-mono text-slate-400 tabular-nums">
                CHAMBER VACUUM: <span className="text-cyan-400">3.2 × 10⁻⁵ Torr</span>
              </div>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="relative bg-[#070A10] border border-slate-800/90 rounded overflow-hidden">
              <svg
                viewBox="0 0 500 430"
                className="w-full h-auto select-none"
                role="img"
                aria-label="Cross-section schematic of an Electron Beam Additive Manufacturing vacuum chamber"
              >
                <defs>
                  <linearGradient id="beamGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
                    <stop offset="65%" stopColor="#06B6D4" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.95" />
                  </linearGradient>
                  <radialGradient id="meltPoolGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
                    <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                  </radialGradient>
                  <pattern id="gridPattern" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1E293B" strokeWidth="0.6" />
                  </pattern>
                </defs>

                {/* Subtle Technical Grid */}
                <rect width="500" height="430" fill="url(#gridPattern)" />

                {/* Outer Lead-Shielded Vacuum Vessel Wall */}
                <rect
                  x="28"
                  y="24"
                  width="444"
                  height="384"
                  rx="10"
                  fill="#0B0F19"
                   fillOpacity="0.7"
                  stroke="#334155"
                  strokeWidth="2"
                />
                <rect
                  x="34"
                  y="30"
                  width="432"
                  height="372"
                  rx="6"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Vacuum Port & Cryopump Manifold (Right Side) */}
                <rect x="395" y="95" width="77" height="58" fill="#111827" stroke="#475569" strokeWidth="1.5" />
                <line x1="412" y1="95" x2="412" y2="153" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <text x="405" y="88" fill="#94A3B8" fontSize="9" fontFamily="IBM Plex Mono">
                  HV PUMP PORT
                </text>

                {/* Electron Gun Column (Top Center) */}
                <rect x="206" y="30" width="88" height="92" rx="4" fill="#111827" stroke="#475569" strokeWidth="1.5" />
                {/* Tungsten Filament Cathode Symbol */}
                <path d="M 235 48 L 250 64 L 265 48" fill="none" stroke="#F59E0B" strokeWidth="2" />
                <line x1="226" y1="74" x2="242" y2="74" stroke="#94A3B8" strokeWidth="2.5" />
                <line x1="258" y1="74" x2="274" y2="74" stroke="#94A3B8" strokeWidth="2.5" />
                <text x="250" y="43" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="IBM Plex Mono">
                  CATHODE (-{voltageKv} kV)
                </text>

                {/* Electromagnetic Focusing & Deflection Coils Housing */}
                <rect x="196" y="122" width="108" height="68" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                {/* Left & Right EM Coil Cross-Sections */}
                <rect x="204" y="132" width="24" height="20" rx="2" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
                <rect x="272" y="132" width="24" height="20" rx="2" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
                <rect x="204" y="160" width="24" height="20" rx="2" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
                <rect x="272" y="160" width="24" height="20" rx="2" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />

                {/* Coaxial IRISS Pyrometer Sensor Line of Sight */}
                <path
                  d="M 288 190 L 328 215 L 256 293"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <rect x="315" y="198" width="66" height="22" rx="3" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
                <text x="348" y="212" textAnchor="middle" fill="#A7F3D0" fontSize="8" fontFamily="IBM Plex Mono">
                  IRISS 1kHz
                </text>

                {/* Left Primary Wire Feed Nozzle & Spool Feed */}
                <g>
                  <path d="M 92 204 L 182 262 L 175 272 L 85 214 Z" fill="#1E293B" stroke="#64748B" strokeWidth="1.2" />
                  {/* Wire strand entering melt pool */}
                  <line
                    x1="178"
                    y1="267"
                    x2="244"
                    y2="296"
                    stroke="#E2E8F0"
                    strokeWidth={Math.max(1.8, wireDiaMm * 0.9)}
                  />
                  <text x="86" y="196" fill="#CBD5E1" fontSize="9" fontFamily="IBM Plex Mono">
                    WIRE FEED A ({wireDiaMm}mm)
                  </text>
                </g>

                {/* Right Secondary Wire Feed Nozzle (Dual-Wire FGM / High Rate) */}
                <g opacity={dualWireMode ? 1 : 0.28}>
                  <path d="M 408 204 L 318 262 L 325 272 L 415 214 Z" fill="#1E293B" stroke="#64748B" strokeWidth="1.2" />
                  {dualWireMode && (
                    <line
                      x1="322"
                      y1="267"
                      x2="256"
                      y2="296"
                      stroke="#FCD34D"
                      strokeWidth={Math.max(1.6, wireDiaMm * 0.8)}
                    />
                  )}
                  <text x="335" y="196" fill="#CBD5E1" fontSize="9" fontFamily="IBM Plex Mono">
                    {dualWireMode ? 'WIRE FEED B (ACTIVE)' : 'WIRE FEED B (STANDBY)'}
                  </text>
                </g>

                {/* Relativistic Electron Beam Cone */}
                <polygon
                  points={`245,65 255,65 264,155 ${250 + Math.min(8, metrics.beadWidthMm * 0.5)},296 ${250 - Math.min(8, metrics.beadWidthMm * 0.5)},296 236,155`}
                  fill="url(#beamGlow)"
                  opacity={Math.min(1, 0.55 + metrics.rawPowerKw / 45)}
                />
                {/* Core Beam Axis */}
                <line x1="250" y1="64" x2="250" y2="296" stroke="#ECFEFF" strokeWidth="1.5" />

                {/* Deposited Multi-Layer Near-Net Preform Wall */}
                <g>
                  {/* Layer 1 (Bottom) */}
                  <rect x="135" y="330" width="230" height="12" rx="5" fill="#334155" stroke="#475569" strokeWidth="1" />
                  {/* Layer 2 */}
                  <rect x="142" y="319" width="216" height="12" rx="5" fill="#3B495E" stroke="#475569" strokeWidth="1" />
                  {/* Layer 3 */}
                  <rect x="150" y="308" width="200" height="12" rx="5" fill="#475569" stroke="#64748B" strokeWidth="1" />
                  {/* Layer 4 (Active Top Layer being deposited left-to-right) */}
                  <rect x="158" y="297" width="95" height="12" rx="5" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />
                </g>

                {/* Glowing Molten Pool at Impingement Zone */}
                <ellipse
                  cx="250"
                  cy="298"
                  rx={Math.min(26, 9 + metrics.beadWidthMm * 0.9)}
                  ry={Math.min(12, 4 + metrics.layerHeightMm * 1.8)}
                  fill="url(#meltPoolGlow)"
                />

                {/* CNC Positioning Substrate Baseplate & Trunnion Table */}
                <rect x="95" y="342" width="310" height="16" rx="2" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                <rect x="165" y="358" width="170" height="28" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                <text x="250" y="376" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="IBM Plex Mono">
                  5-AXIS CNC ROTARY TRUNNION TABLE ({travelSpeedMms} mm/s)
                </text>

                {/* Interactive Callout Hotspots for Subsystems */}
                {EBAM_SUBSYSTEMS.map((sub) => {
                  const isSelected = selectedSubsystem.id === sub.id;
                  return (
                    <g
                      key={sub.id}
                      onClick={() => setSelectedSubsystem(sub)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${sub.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedSubsystem(sub);
                        }
                      }}
                    >
                      {isSelected && (
                        <circle
                          cx={sub.coordinates.x}
                          cy={sub.coordinates.y}
                          r="18"
                          fill="none"
                          stroke="#22D3EE"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                      )}
                      <circle
                        cx={sub.coordinates.x}
                        cy={sub.coordinates.y}
                        r="12"
                        fill={isSelected ? '#06B6D4' : '#0F172A'}
                        stroke={isSelected ? '#CFFAFE' : '#38BDF8'}
                        strokeWidth="1.5"
                      />
                      <text
                        x={sub.coordinates.x}
                        y={sub.coordinates.y + 3}
                        textAnchor="middle"
                        fill={isSelected ? '#082F49' : '#E0F2FE'}
                        fontSize="8.5"
                        fontWeight="600"
                        fontFamily="IBM Plex Mono"
                      >
                        {sub.code.replace('SYS-', '')}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Subsystem Quick Selector Bar */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {EBAM_SUBSYSTEMS.map((sub) => {
                const active = selectedSubsystem.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubsystem(sub)}
                    className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {sub.code} · {sub.name.split(' ')[0]} {sub.name.split(' ')[1]}
                  </button>
                );
              })}
            </div>

            {/* Selected Subsystem Detailed Engineering Breakdown */}
            <div className="mt-5 pt-5 border-t border-slate-800">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h4 className="text-lg font-serif font-medium text-slate-100">
                  {selectedSubsystem.code}: {selectedSubsystem.name}
                </h4>
                <span className="text-xs font-mono text-cyan-400 tabular-nums">
                  {selectedSubsystem.operatingRange}
                </span>
              </div>
              <p className="text-sm text-slate-200 font-medium mb-2">
                {selectedSubsystem.functionSummary}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/60 text-xs text-slate-300 leading-relaxed">
                <div>
                  <div className="font-mono text-slate-400 mb-1">Physical Governing Mechanism</div>
                  <p>{selectedSubsystem.physicsDetail}</p>
                </div>
                <div>
                  <div className="font-mono text-slate-400 mb-1">Industrial Design Constraint</div>
                  <p>{selectedSubsystem.engineeringConsiderations}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Process Physics & Parameter Calibration Console */}
          <div className="lg:col-span-5 bg-[#0D111A] border border-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
                <h3 className="text-base font-semibold text-slate-100">
                  EBAM Process Parameter Simulator
                </h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Nominal
              </button>
            </div>

            {/* Feedstock Alloy & Wire Mode Controls */}
            <div className="space-y-4">
              <div>
                <label htmlFor="sim-alloy-select" className="block text-xs font-mono text-slate-400 mb-1.5">
                  Target Wire Feedstock Alloy
                </label>
                <select
                  id="sim-alloy-select"
                  value={selectedAlloyId}
                  onChange={(e) => setSelectedAlloyId(e.target.value)}
                  className="w-full bg-[#070A10] border border-slate-700 rounded px-3 py-2 text-sm text-slate-100 font-medium focus:outline-none focus:border-cyan-400"
                >
                  {ALLOWED_MATERIALS.map((alloy) => (
                    <option key={alloy.id} value={alloy.id}>
                      {alloy.designation} — Tm {alloy.meltingPointC} °C ({alloy.densityGcm3} g/cm³)
                    </option>
                  ))}
                </select>
              </div>

              {/* Wire Diameter & Dual-Wire Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1.5">
                    Wire Diameter (mm)
                  </span>
                  <div className="grid grid-cols-4 gap-1 bg-[#070A10] p-1 rounded border border-slate-800">
                    {[1.14, 1.6, 2.4, 3.2].map((dia) => (
                      <button
                        key={dia}
                        type="button"
                        onClick={() => setWireDiaMm(dia)}
                        className={`py-1 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                          wireDiaMm === dia
                            ? 'bg-cyan-500 text-slate-950 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {dia}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1.5">
                    Nozzle Configuration
                  </span>
                  <div className="grid grid-cols-2 gap-1 bg-[#070A10] p-1 rounded border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setDualWireMode(false)}
                      className={`py-1 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                        !dualWireMode
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Single
                    </button>
                    <button
                      type="button"
                      onClick={() => setDualWireMode(true)}
                      className={`py-1 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                        dualWireMode
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Dual-Wire
                    </button>
                  </div>
                </div>
              </div>

              {/* Parameter Scrubbers */}
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Accelerating Voltage (Vₐ)</span>
                    <span className="font-mono text-cyan-400 tabular-nums">{voltageKv} kV</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={60}
                    step={5}
                    value={voltageKv}
                    onChange={(e) => setVoltageKv(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>30 kV (Medium)</span>
                    <span>45 kV</span>
                    <span>60 kV (Aerospace HV)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Electron Beam Current (I_b)</span>
                    <span className="font-mono text-cyan-400 tabular-nums">{currentMa} mA</span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={600}
                    step={10}
                    value={currentMa}
                    onChange={(e) => setCurrentMa(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>80 mA (Fine Trim)</span>
                    <span>340 mA</span>
                    <span>600 mA (Heavy Bulk)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">CNC Gantry Travel Speed (v_t)</span>
                    <span className="font-mono text-cyan-400 tabular-nums">{travelSpeedMms} mm/s</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={25}
                    step={1}
                    value={travelSpeedMms}
                    onChange={(e) => setTravelSpeedMms(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>4 mm/s (Slow/Thick)</span>
                    <span>14 mm/s</span>
                    <span>25 mm/s (High-Speed)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Telemetry Readout Grid */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-3">
                COMPUTED THERMODYNAMIC & DEPOSITION TELEMETRY
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#070A10] border border-slate-800/90 rounded p-3">
                  <div className="text-[11px] font-mono text-slate-400">MASS DEPOSITION RATE</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono font-semibold text-slate-50 tabular-nums">
                      {metrics.depositionRateKgHr.toFixed(2)}
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1.5">kg/hr</span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 mt-1 tabular-nums">
                    {(metrics.depositionRateKgHr * 2.20462).toFixed(1)} lbs/hr equivalent
                  </div>
                </div>

                <div className="bg-[#070A10] border border-slate-800/90 rounded p-3">
                  <div className="text-[11px] font-mono text-slate-400">ABSORBED BEAM POWER</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono font-semibold text-slate-50 tabular-nums">
                      {metrics.absorbedPowerKw.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1.5">kW</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 mt-1 tabular-nums">
                    η = {metrics.couplingEfficiency.toFixed(0)}% kinetic coupling
                  </div>
                </div>

                <div className="bg-[#070A10] border border-slate-800/90 rounded p-3">
                  <div className="text-[11px] font-mono text-slate-400">LINEAR HEAT INPUT (E_L)</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono font-semibold text-slate-50 tabular-nums">
                      {metrics.linearHeatInputJmm.toFixed(0)}
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1.5">J/mm</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1 tabular-nums">
                    P_raw = {metrics.rawPowerKw.toFixed(1)} kW
                  </div>
                </div>

                <div className="bg-[#070A10] border border-slate-800/90 rounded p-3">
                  <div className="text-[11px] font-mono text-slate-400">SINGLE-PASS BEAD GEOMETRY</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono font-semibold text-slate-50 tabular-nums">
                      {metrics.beadWidthMm.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1.5">mm wide</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1 tabular-nums">
                    Step height: {metrics.layerHeightMm.toFixed(2)} mm/layer
                  </div>
                </div>
              </div>

              {/* Non-Hue-Only Process Stability Indicator */}
              <div
                className={`mt-4 p-3 rounded border text-xs ${
                  metrics.status === 'nominal'
                    ? 'bg-emerald-950/30 border-emerald-800/70 text-emerald-200'
                    : metrics.status === 'warning'
                    ? 'bg-amber-950/30 border-amber-800/70 text-amber-200'
                    : 'bg-rose-950/30 border-rose-800/70 text-rose-200'
                }`}
              >
                <div className="font-mono font-semibold tracking-wide">
                  {metrics.statusLabel}
                </div>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  {metrics.statusDetail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
