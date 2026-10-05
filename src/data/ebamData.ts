export interface SubsystemSpec {
  id: string;
  code: string;
  name: string;
  operatingRange: string;
  functionSummary: string;
  physicsDetail: string;
  engineeringConsiderations: string;
  coordinates: { x: number; y: number };
}

export interface AlloyMaterial {
  id: string;
  designation: string;
  commonName: string;
  category: 'Titanium' | 'Refractory' | 'Nickel Superalloy' | 'Copper & High-Conductivity' | 'Specialty Steel & Nuclear';
  meltingPointC: number;
  densityGcm3: number;
  depositionRateKgHr: string;
  nominalRateKgHr: number;
  specificHeatJkgK: number;
  utsMpa: number;
  yieldMpa: number;
  elongationPct: number;
  standardSpec: string;
  vacuumBehavior: string;
  postProcessing: string;
  dualWireCompatibility: string;
  keyApplications: string[];
  metallurgicalNotes: string;
}

export interface IndustrialApplication {
  id: string;
  sector: 'Aerospace & Spaceflight' | 'Defense & Naval' | 'Energy & Nuclear' | 'Tooling & Remanufacturing';
  title: string;
  componentExample: string;
  primaryAlloy: string;
  conventionalBtf: string;
  ebamBtf: string;
  conventionalLeadWeeks: number;
  ebamLeadWeeks: number;
  partMassKg: number;
  summary: string;
  technicalBreakthrough: string;
  quantifiedOutcome: string;
  imageKey?: 'spar' | 'nozzle' | 'chamber';
}

export interface EvaluationPoint {
  id: string;
  type: 'strength' | 'limitation';
  title: string;
  metricBadge: string;
  mechanism: string;
  industrialImpact: string;
  mitigationOrLeverage: string;
}

export interface ProcessComparison {
  id: string;
  processName: string;
  isoCode: string;
  feedstock: string;
  environment: string;
  depositionRateKgHr: string;
  maxEnvelopeM: string;
  energyEfficiencyPct: string;
  surfaceRoughnessRaUm: string;
  layerThicknessMm: string;
  scores: {
    depositionSpeed: number; // 1-100
    buildVolume: number; // 1-100
    purityControl: number; // 1-100
    reflectiveMetals: number; // 1-100
    geometricResolution: number; // 1-100
    capexAccessibility: number; // 1-100
  };
}

export interface FutureHorizon {
  id: string;
  phase: string;
  timeframe: string;
  trlStatus: string;
  title: string;
  coreProblemSolved: string;
  technicalArchitecture: string;
  industrialDeliverable: string;
  keyMetrics: { label: string; value: string }[];
}

export const EBAM_SUBSYSTEMS: SubsystemSpec[] = [
  {
    id: 'electron-gun',
    code: 'SYS-01',
    name: 'High-Voltage Triode Electron Gun Column',
    operatingRange: '30–60 kV · 50–650 mA · Up to 42 kW',
    functionSummary: 'Generates a high-velocity stream of electrons via thermionic emission from a heated tungsten or LaB6 cathode.',
    physicsDetail: 'Electrons are accelerated across a steep electrostatic potential between the cathode and grounded anode, reaching relativistic speeds (~0.3c to 0.45c). Upon striking the metallic feedstock and substrate, kinetic energy converts directly into lattice thermal vibrations within a penetration depth of 10–50 micrometers.',
    engineeringConsiderations: 'Requires differential turbo-pumping in the upper column (10⁻⁶ Torr) to prevent high-voltage arcing and extend filament life when volatile metal vapors evolve from the melt pool.',
    coordinates: { x: 250, y: 78 }
  },
  {
    id: 'em-coils',
    code: 'SYS-02',
    name: 'Electromagnetic Focusing & Astigmatism Coils',
    operatingRange: 'Spot Ø 0.5–4.5 mm · 10 kHz Deflection',
    functionSummary: 'Shapes the electron beam focal spot and dynamically oscillates (rasters) the beam across the wire-substrate junction.',
    physicsDetail: 'Zero-inertia magnetic lenses focus the electron stream and execute high-frequency Lissajous, circular, or transverse raster patterns at kilohertz frequencies. This distributes thermal energy evenly across wide weld beads and stabilizes melt pool fluid dynamics (Marangoni convection).',
    engineeringConsiderations: 'High-frequency beam oscillation prevents keyhole porosity and suppresses plasma plume instability during high-power (>25 kW) deposition.',
    coordinates: { x: 250, y: 158 }
  },
  {
    id: 'dual-wire',
    code: 'SYS-03',
    name: 'Independent Dual-Wire Feed Nozzles',
    operatingRange: 'Ø 1.14–4.0 mm Wire · 1–18 m/min Feed',
    functionSummary: 'Delivers one or two commercial welding wires directly into the leading or trailing edge of the molten pool.',
    physicsDetail: 'Servo-driven precision wire straighteners and water-cooled copper-beryllium guide nozzles feed wire at controlled impingement angles (typically 35°–55°). Dual independent feeders allow alternating alloys between layers or simultaneous co-feeding to synthesize Functionally Graded Materials (FGMs) in real time.',
    engineeringConsiderations: 'Nearly 100% feedstock capture efficiency—every gram of wire fed into the melt pool is consolidated into the part, eliminating powder sieving and recycling losses.',
    coordinates: { x: 152, y: 245 }
  },
  {
    id: 'melt-pool',
    code: 'SYS-04',
    name: 'High-Purity Vacuum Melt Pool & IRISS Sensor',
    operatingRange: '1,650–3,420 °C · Closed-Loop PID Control',
    functionSummary: 'The liquid metal deposition zone monitored continuously by real-time coaxial optical/infrared pyrometry.',
    physicsDetail: 'Because electrons couple kinetic energy directly into conduction electrons of the metal, absorption exceeds 90%—even in optically reflective metals like pure Copper or Aluminum where infrared lasers lose 70–90% of incident energy. Closed-loop sensing measures melt pool geometry and temperature at >400 Hz, modulating beam current automatically.',
    engineeringConsiderations: 'High vacuum exposes the superheated melt pool to low ambient pressure, which degasses dissolved hydrogen/oxygen pores but can partially volatilize high-vapor-pressure elements like Al in Ti-6Al-4V.',
    coordinates: { x: 250, y: 295 }
  },
  {
    id: 'vacuum-chamber',
    code: 'SYS-05',
    name: 'Hard-Vacuum Pressure Vessel & Pumping Array',
    operatingRange: '10⁻⁴ to 5×10⁻⁵ Torr (1.3×10⁻² Pa)',
    functionSummary: 'Prevents electron scattering by gas molecules and shields reactive metals from atmospheric oxygen, nitrogen, and moisture.',
    physicsDetail: 'Mechanical roughing pumps paired with high-throughput diffusion or cryopumps evacuate the chamber to <10⁻⁴ Torr in 15–45 minutes. At this vacuum level, the mean free path of electrons exceeds several meters, ensuring crisp beam focus over long working distances and purity equivalent to <0.1 ppm O₂.',
    engineeringConsiderations: 'Lead-lined stainless steel walls provide complete attenuation of secondary Bremsstrahlung X-rays generated when high-energy electrons decelerate in heavy nuclei.',
    coordinates: { x: 425, y: 125 }
  },
  {
    id: 'cnc-table',
    code: 'SYS-06',
    name: 'Multi-Axis CNC Gantry & Trunnion Substrate',
    operatingRange: 'Up to 5.79 × 1.22 × 1.22 m Build Envelope',
    functionSummary: 'Synchronizes 5-axis or 6-axis motion of the electron gun gantry and rotary tilt substrate table.',
    physicsDetail: 'To deposit overhangs, domes, and boss features without sacrificial support structures, the trunnion table tilts and rotates the part so that gravity remains aligned with the local surface normal of the molten weld bead.',
    engineeringConsiderations: 'Fixtures and substrates must be non-magnetic (e.g., 300-series austenitic stainless or titanium) or thoroughly demagnetized (<0.5 Gauss) to avoid Lorentz-force deflection of the electron beam.',
    coordinates: { x: 250, y: 375 }
  }
];

export const ALLOWED_MATERIALS: AlloyMaterial[] = [
  {
    id: 'ti64',
    designation: 'Ti-6Al-4V (Grade 5 / ELI Grade 23)',
    commonName: 'Alpha-Beta Titanium Alloy',
    category: 'Titanium',
    meltingPointC: 1660,
    densityGcm3: 4.43,
    depositionRateKgHr: '6.8 – 11.3 kg/hr',
    nominalRateKgHr: 9.1,
    specificHeatJkgK: 526,
    utsMpa: 965,
    yieldMpa: 875,
    elongationPct: 12.5,
    standardSpec: 'AMS 4999A / ASTM F2924',
    vacuumBehavior: 'Exempt from atmospheric alpha-case embrittlement; requires Al-enriched wire (6.4–6.7 wt% Al) to offset ~0.5 wt% aluminum volatilization in vacuum.',
    postProcessing: 'Vacuum stress relief (705 °C / 2 hr) or HIP (900 °C, 100 MPa) + finish CNC milling.',
    dualWireCompatibility: 'Co-fed with CP-Ti or Ti-6242 for stiffness/creep-graded aero structures.',
    keyApplications: ['F-35 Wing Spars & Bulkheads', 'Satellite Propellant Tanks', 'Landing Gear Trunnions'],
    metallurgicalNotes: 'Solidifies with coarse prior-β columnar grains growing epitaxially across layers along the maximum thermal gradient, transforming to basketweave α+β Widmanstätten laths upon cooling.'
  },
  {
    id: 'ti6242',
    designation: 'Ti-6Al-2Sn-4Zr-2Mo (Ti-6242)',
    commonName: 'Near-Alpha High-Temp Titanium',
    category: 'Titanium',
    meltingPointC: 1705,
    densityGcm3: 4.54,
    depositionRateKgHr: '5.5 – 9.0 kg/hr',
    nominalRateKgHr: 7.2,
    specificHeatJkgK: 460,
    utsMpa: 1010,
    yieldMpa: 915,
    elongationPct: 10.0,
    standardSpec: 'AMS 4919 / Aerospace OEM Spec',
    vacuumBehavior: 'Ultra-low interstitial pick-up (<1200 ppm O₂) preserves high-temperature creep resistance up to 540 °C.',
    postProcessing: 'Duplex anneal + CNC finish machining of sealing faces.',
    dualWireCompatibility: 'Graded transition from Ti-6Al-4V structural root to Ti-6242 hot-section aft ring.',
    keyApplications: ['Jet Engine Compressor Casings', 'Hypersonic Airframe Skins', 'Gas Turbine Exhaust Ducts'],
    metallurgicalNotes: 'Slow cooling in vacuum promotes stable α-colony microstructures with superior long-term thermal stability compared to gas-shielded arc DED.'
  },
  {
    id: 'tantalum',
    designation: 'Ta & Ta-10W (Refractory Grade)',
    commonName: 'Tantalum / Tantalum-Tungsten',
    category: 'Refractory',
    meltingPointC: 3017,
    densityGcm3: 16.69,
    depositionRateKgHr: '4.5 – 8.2 kg/hr',
    nominalRateKgHr: 6.4,
    specificHeatJkgK: 140,
    utsMpa: 520,
    yieldMpa: 385,
    elongationPct: 28.0,
    standardSpec: 'ASTM B365 / ASTM B708',
    vacuumBehavior: 'Ideal EBAM material: high boiling point prevents evaporation, while 10⁻⁵ Torr vacuum prevents catastrophic oxygen embrittlement above 400 °C.',
    postProcessing: 'Vacuum recrystallization anneal (1200 °C) + precision EDM/turning.',
    dualWireCompatibility: 'Bimetallic deposition onto 316L Stainless or Copper via Niobium interlayer.',
    keyApplications: ['Rocket Reaction Control Nozzles', 'Chemical Acid Heat Exchangers', 'Ballistic Defense Liners'],
    metallurgicalNotes: 'Achieves >99.9% theoretical density with ductile BCC grain structure, impossible to weld at scale in open-atmosphere laser or arc processes.'
  },
  {
    id: 'tungsten',
    designation: 'Pure W & W-Re (Tungsten-Rhenium)',
    commonName: 'Refractory Tungsten Alloy',
    category: 'Refractory',
    meltingPointC: 3422,
    densityGcm3: 19.25,
    depositionRateKgHr: '3.0 – 5.8 kg/hr',
    nominalRateKgHr: 4.2,
    specificHeatJkgK: 132,
    utsMpa: 980,
    yieldMpa: 750,
    elongationPct: 4.5,
    standardSpec: 'ASTM B760 / Fusion Divertor Spec',
    vacuumBehavior: 'Requires high beam power density (25–40 kW) and pre-heated substrate (800–1000 °C via defocused electron beam rastering) to cross the ductile-to-brittle transition temperature (DBTT).',
    postProcessing: 'Stress-relief in vacuum + diamond grinding / wire EDM.',
    dualWireCompatibility: 'Graded W-to-CuCrZr plasma-facing heat sinks for tokamak fusion reactors.',
    keyApplications: ['Tokamak Fusion Divertor Plates', 'X-Ray Anode Targets', 'Solid Rocket Throat Inserts'],
    metallurgicalNotes: 'Defocused electron beam preheating suppresses thermal shock micro-cracking during solidification of high-modulus BCC tungsten.'
  },
  {
    id: 'niobium',
    designation: 'Nb C-103 (Nb-10Hf-1Ti)',
    commonName: 'Aerospace Niobium Superalloy',
    category: 'Refractory',
    meltingPointC: 2350,
    densityGcm3: 8.85,
    depositionRateKgHr: '5.0 – 8.5 kg/hr',
    nominalRateKgHr: 6.8,
    specificHeatJkgK: 265,
    utsMpa: 435,
    yieldMpa: 295,
    elongationPct: 24.0,
    standardSpec: 'ASTM B655 / AMS 7857',
    vacuumBehavior: 'High affinity for oxygen above 250 °C makes hard vacuum mandatory; EBAM reduces C-103 material waste by >80% over forged billet machining.',
    postProcessing: 'Slurry silicide oxidation coating (R512E) after finish CNC contouring.',
    dualWireCompatibility: 'Transition joints with Titanium Ti-6Al-4V propulsive injector manifolds.',
    keyApplications: ['Lunar Lander Thruster Skirts', 'Upper-Stage Rocket Nozzles', 'Hypersonic Leading Edges'],
    metallurgicalNotes: 'Fine hafnium-oxide dispersion remains stable in EBAM melt pools, providing exceptional creep resistance at 1,370 °C.'
  },
  {
    id: 'in718',
    designation: 'Inconel 718 (UNS N07718)',
    commonName: 'Precipitation-Hardened Ni-Cr-Fe',
    category: 'Nickel Superalloy',
    meltingPointC: 1336,
    densityGcm3: 8.19,
    depositionRateKgHr: '6.5 – 10.5 kg/hr',
    nominalRateKgHr: 8.5,
    specificHeatJkgK: 435,
    utsMpa: 1240,
    yieldMpa: 1035,
    elongationPct: 16.0,
    standardSpec: 'AMS 5662 / AMS 5663',
    vacuumBehavior: 'Zero oxide slag inclusions on weld bead toes, allowing multi-pass thick-wall builds without interpass wire brushing or grinding.',
    postProcessing: 'Homogenization + Solution Treatment (980 °C) + Double Aging (720 °C / 620 °C) to dissolve Laves phase and precipitate γ″.',
    dualWireCompatibility: 'Bimetallic turbine disks (Inconel 718 rim on stainless or low-alloy hub).',
    keyApplications: ['Turbine Cases & Flanges', 'Cryogenic Rocket Turbopump Housings', 'Subsea Blowout Preventers'],
    metallurgicalNotes: 'High heat input can cause Nb segregation into brittle interdendritic Laves phases; high-frequency beam oscillation and HIP + solution aging restore full wrought γ″ strength.'
  },
  {
    id: 'in625',
    designation: 'Inconel 625 (UNS N06625)',
    commonName: 'Solid-Solution Ni-Cr-Mo-Nb Alloy',
    category: 'Nickel Superalloy',
    meltingPointC: 1350,
    densityGcm3: 8.44,
    depositionRateKgHr: '7.0 – 11.0 kg/hr',
    nominalRateKgHr: 9.0,
    specificHeatJkgK: 410,
    utsMpa: 885,
    yieldMpa: 490,
    elongationPct: 35.0,
    standardSpec: 'AMS 5666 / ASTM B446',
    vacuumBehavior: 'Exceptional weldability and wetting in vacuum; resistant to hot cracking and strain-age cracking.',
    postProcessing: 'Stress relief at 870 °C + finish machining.',
    dualWireCompatibility: 'Cladding corrosion-resistant Inconel 625 onto high-strength steel substrates.',
    keyApplications: ['Marine Exhaust Manifolds', 'Offshore Riser Connectors', 'Nuclear Control Rod Drive Housings'],
    metallurgicalNotes: 'Solid-solution strengthened by Molybdenum and Niobium within the austenitic nickel matrix, providing immediate corrosion immunity without complex precipitation heat treatments.'
  },
  {
    id: 'cu-ofhc',
    designation: 'OFHC Copper & CuCrZr (C10100 / C18150)',
    commonName: 'High-Conductivity Copper Alloy',
    category: 'Copper & High-Conductivity',
    meltingPointC: 1085,
    densityGcm3: 8.94,
    depositionRateKgHr: '5.5 – 9.5 kg/hr',
    nominalRateKgHr: 7.4,
    specificHeatJkgK: 385,
    utsMpa: 375,
    yieldMpa: 280,
    elongationPct: 22.0,
    standardSpec: 'ASTM B170 / Aerospace Thrust Chamber Spec',
    vacuumBehavior: 'Whereas 1 µm IR lasers suffer >90% optical reflection on copper, kinetic 60 kV electrons couple >85% energy directly into copper while overcoming rapid thermal diffusivity.',
    postProcessing: 'Solution anneal + aging (480 °C for CuCrZr) + 5-axis milling of cooling channels.',
    dualWireCompatibility: 'Bimetallic CuCrZr combustion liner jacketed directly with Inconel 625 structural structural shell.',
    keyApplications: ['Regeneratively Cooled Rocket Chambers', 'High-Energy Particle Accelerator Cavities', 'Induction Coil Manifolds'],
    metallurgicalNotes: 'Vacuum processing keeps oxygen below 5 ppm, preventing cuprous oxide (Cu₂O) grain-boundary embrittlement and preserving >92% IACS electrical/thermal conductivity.'
  },
  {
    id: 'ss316l',
    designation: '316L / 304L Austenitic Stainless Steel',
    commonName: 'Low-Carbon Marine & Cryo Stainless',
    category: 'Specialty Steel & Nuclear',
    meltingPointC: 1400,
    densityGcm3: 7.99,
    depositionRateKgHr: '8.0 – 14.5 kg/hr',
    nominalRateKgHr: 11.2,
    specificHeatJkgK: 500,
    utsMpa: 575,
    yieldMpa: 290,
    elongationPct: 42.0,
    standardSpec: 'AMS 5507 / ASME BPVC Sec. III',
    vacuumBehavior: 'Careful beam power modulation prevents excessive Manganese (Mn) evaporation in vacuum while achieving zero delta-ferrite embrittlement.',
    postProcessing: 'Solution anneal (1040 °C) if required + CNC finish machining.',
    dualWireCompatibility: 'Graded 316L-to-Inconel 625 nuclear reactor nozzle safe-ends.',
    keyApplications: ['Cryogenic Liquid Hydrogen Valves', 'Submarine Pressure Hull Penetrators', 'Vacuum Chamber Flanges'],
    metallurgicalNotes: 'Non-magnetic austenitic FCC structure avoids magnetic beam deflection issues that affect high-permeability ferritic steels.'
  },
  {
    id: 'zircaloy',
    designation: 'Zircaloy-4 & NAB (C95800)',
    commonName: 'Nuclear Zirconium / Nickel-Aluminum Bronze',
    category: 'Specialty Steel & Nuclear',
    meltingPointC: 1855,
    densityGcm3: 6.56,
    depositionRateKgHr: '6.0 – 10.8 kg/hr',
    nominalRateKgHr: 8.2,
    specificHeatJkgK: 285,
    utsMpa: 640,
    yieldMpa: 450,
    elongationPct: 18.0,
    standardSpec: 'ASTM B353 / NAVSEA T9074-BC-GIB-010',
    vacuumBehavior: 'Zirconium requires strict vacuum (<10⁻⁴ Torr) to prevent nitrogen/oxygen pickup that degrades nuclear corrosion resistance.',
    postProcessing: 'Beta-quench or stress relief + hydro-machining.',
    dualWireCompatibility: 'Dual-wire compositional tuning of κ-phase precipitates in Nickel-Aluminum Bronze.',
    keyApplications: ['Naval Propulsors & Seawater Valves', 'Nuclear Fuel Assembly Grids', 'Heavy Press Forging Replacements'],
    metallurgicalNotes: 'Produces fine, uniform κ-phase distribution in NAB without the shrinkage porosity common to large sand castings.'
  }
];

export const INDUSTRIAL_APPLICATIONS: IndustrialApplication[] = [
  {
    id: 'aero-spars',
    sector: 'Aerospace & Spaceflight',
    title: 'Primary Airframe Spars, Bulkheads & Wing Rib Forging Replacement',
    componentExample: 'Lockheed Martin F-35 Flaperon Spar & Aft Fuselage Bulkhead',
    primaryAlloy: 'Ti-6Al-4V (AMS 4999A)',
    conventionalBtf: '14.5 : 1',
    ebamBtf: '1.8 : 1',
    conventionalLeadWeeks: 72,
    ebamLeadWeeks: 8,
    partMassKg: 145,
    summary: 'Large titanium airframe structures traditionally require closed-die forgings on 30,000+ ton hydraulic presses with 18-month lead times, followed by hogging out 90%+ of the titanium billet into swarf.',
    technicalBreakthrough: 'EBAM deposits near-net-shape Ti-6Al-4V preforms onto a flat titanium rolling plate from both sides (bilateral deposition to balance residual stress) at up to 9.5 kg/hr.',
    quantifiedOutcome: 'Reduces raw titanium billet procurement mass by 78%, slashes manufacturing lead time by 88% (from 72 weeks to 8 weeks), and eliminates $1.2M+ in dedicated forging die tooling.',
    imageKey: 'spar'
  },
  {
    id: 'space-tanks',
    sector: 'Aerospace & Spaceflight',
    title: 'High-Pressure Satellite Propellant Tanks & Reaction Control Nozzles',
    componentExample: 'Deep-Space Hydrazine / Xenon Thin-Wall Hemispherical Tank Domes',
    primaryAlloy: 'Ti-6Al-4V ELI & Nb C-103',
    conventionalBtf: '11.2 : 1',
    ebamBtf: '1.5 : 1',
    conventionalLeadWeeks: 56,
    ebamLeadWeeks: 5,
    partMassKg: 68,
    summary: 'Spacecraft propellant tanks up to 1.5 meters in diameter require thin, defect-free hemispherical titanium domes with integrated polar bosses.',
    technicalBreakthrough: 'Using 5-axis trunnion rotation inside the vacuum chamber, EBAM deposits hemispherical domes layer-by-layer without internal support structures, maintaining uniform wall allowance prior to finish lathe turning.',
    quantifiedOutcome: 'Saves over $250,000 per tank set, cuts titanium scrap by 85%, and enables rapid customization of tank diameter and boss geometry without re-tooling.',
    imageKey: 'nozzle'
  },
  {
    id: 'naval-propulsion',
    sector: 'Defense & Naval',
    title: 'Subsea Hull Valves, Thruster Hubs & Bimetallic Seawater Manifolds',
    componentExample: 'Submarine High-Pressure Seawater Ball Valve Body & Propulsor Hub',
    primaryAlloy: 'Nickel-Aluminum Bronze (NAB) & Inconel 625',
    conventionalBtf: '8.4 : 1',
    ebamBtf: '1.6 : 1',
    conventionalLeadWeeks: 64,
    ebamLeadWeeks: 6,
    partMassKg: 420,
    summary: 'Sand-cast naval bronzes and forged superalloy valves suffer from long foundry queues and casting shrinkage porosity that frequently causes part rejection during final radiographic inspection.',
    technicalBreakthrough: 'Vacuum wire deposition eliminates gas entrapment and casting shrinkage cavities, while dual-wire feeding enables a structural steel core clad seamlessly with 8 mm of corrosion-proof Inconel 625.',
    quantifiedOutcome: 'Achieves 100% first-pass ultrasonic/X-ray NDT acceptance and reduces supply-chain replacement turnaround for dry-docked vessels from 15 months to 6 weeks.',
    imageKey: 'chamber'
  },
  {
    id: 'nuclear-fusion',
    sector: 'Energy & Nuclear',
    title: 'Refractory Fusion Divertors & Bimetallic Reactor Coolant Nozzles',
    componentExample: 'Graded Tungsten-to-CuCrZr Plasma Heat Sink & Zircaloy Manifold',
    primaryAlloy: 'Pure W / Ta-10W / CuCrZr',
    conventionalBtf: '9.8 : 1',
    ebamBtf: '1.4 : 1',
    conventionalLeadWeeks: 48,
    ebamLeadWeeks: 6,
    partMassKg: 95,
    summary: 'Joining ultra-high-melting Tungsten (3,422 °C) to high-conductivity Copper (1,085 °C) by brazing creates brittle intermetallic interfaces that delaminate under cyclic 20 MW/m² plasma heat flux.',
    technicalBreakthrough: 'Dual-wire EBAM varies wire feed ratios layer-by-layer across a 15 mm transition zone, creating a continuous compositional gradient that eliminates sharp thermal expansion mismatches.',
    quantifiedOutcome: 'Increases thermal fatigue life by 3.4× compared to brazed monoblocks while conserving scarce refractory tantalum and tungsten feedstock.'
  },
  {
    id: 'tooling-repair',
    sector: 'Tooling & Remanufacturing',
    title: 'High-Value Aerospace Forging Die Repair & Feature Addition',
    componentExample: 'Turbine Casing Boss Re-Engineering & Worn Die Cavity Restoration',
    primaryAlloy: 'Inconel 718 & H13 / Maraging Steel',
    conventionalBtf: '16.0 : 1',
    ebamBtf: '1.2 : 1',
    conventionalLeadWeeks: 44,
    ebamLeadWeeks: 2,
    partMassKg: 310,
    summary: 'Scrapping a $400,000 aerospace forging die or turbine casing due to localized flange wear or an engineering design change wastes massive embodied energy and capital.',
    technicalBreakthrough: 'Optical scanning registers the existing worn or semi-finished component inside the EBAM chamber, depositing new superalloy bosses or hard-facing layers directly onto the heritage substrate.',
    quantifiedOutcome: 'Recovers 92% of original component value in under 14 days with full metallurgical fusion across the repair interface.'
  }
];

export const STRENGTHS_AND_LIMITATIONS: EvaluationPoint[] = [
  {
    id: 'str-1',
    type: 'strength',
    title: 'Industry-Leading Deposition Rate & Massive Build Scalability',
    metricBadge: '3.0 – 15.0+ kg/hr · Up to 5.8 m Envelope',
    mechanism: 'High-power electron guns (up to 42 kW) combined with thick wire feedstock (1.6–4.0 mm) melt continuous metal streams at an order of magnitude higher volumetric throughput than powder-bed systems.',
    industrialImpact: 'Allows fabrication of multi-meter, 50 kg to 2,500+ kg structural airframe and marine preforms in days rather than weeks.',
    mitigationOrLeverage: 'Deploy heavy wire diameters (2.4–3.2 mm) for bulk structural core deposition, then switch via dual-wire feeder to finer 1.14 mm wire for near-net perimeter contours.'
  },
  {
    id: 'str-2',
    type: 'strength',
    title: 'Intrinsic High-Vacuum Shielding (10⁻⁴ to 10⁻⁵ Torr)',
    metricBadge: '< 0.1 ppm O₂/N₂ Equivalent Purity',
    mechanism: 'Operating inside a hard vacuum eliminates atmospheric oxygen, nitrogen, and hydrogen without consuming thousands of cubic meters of expensive ultra-high-purity Argon or Helium shielding gas.',
    industrialImpact: 'Prevents alpha-case embrittlement in Titanium and oxide inclusions in Niobium/Tantalum, yielding wrought-equivalent or superior fracture toughness and fatigue life.',
    mitigationOrLeverage: 'Particularly decisive for long-duration aerospace builds where open-air tent purging (as in WAAM) risks catastrophic contamination if a gas seal fluctuates.'
  },
  {
    id: 'str-3',
    type: 'strength',
    title: ' >90% Energy Coupling Independent of Optical Reflectivity',
    metricBadge: '85–95% Wall-Plug & Beam Absorption',
    mechanism: 'Electrons transfer kinetic energy directly via inelastic coulomb collisions with lattice electrons rather than photon absorption. Optical reflectivity to infrared wavelengths (which reflects >85% of laser power off Copper, Silver, Gold, and Aluminum) has zero effect on an electron beam.',
    industrialImpact: 'Unlocks reliable, crack-free deposition of pure OFHC Copper, CuCrZr, Aluminum alloys, and ultra-refractory Tungsten/Tantalum in a single platform.',
    mitigationOrLeverage: 'Use high-frequency electromagnetic beam oscillation to preheat conductive substrates seconds before wire touch-down.'
  },
  {
    id: 'str-4',
    type: 'strength',
    title: 'Commercial Welding Wire Feedstock & Dual-Wire FGM Capability',
    metricBadge: '~99.2% Material Capture Efficiency',
    mechanism: 'Uses standard spooled welding wire (AMS/AWS certified) rather than atomized spherical metal powder. Dual independent wire nozzles can feed two distinct alloys into a single melt pool.',
    industrialImpact: 'Wire feedstock costs 50–75% less per kilogram than AM powder, carries zero explosive dust or respirable health hazard, and enables real-time Functionally Graded Materials (FGMs).',
    mitigationOrLeverage: 'Program continuous compositional ramps (e.g., 100% Alloy A to 100% Alloy B over 20 layers) to eliminate bimetallic weld joints.'
  },
  {
    id: 'lim-1',
    type: 'limitation',
    title: 'Near-Net-Shape Surface Roughness & Mandatory Post-Machining',
    metricBadge: 'Ra 50–200 µm · 2.5–4.5 mm Machining Allowance',
    mechanism: 'Large molten weld beads (3–12 mm wide, 1.0–2.5 mm layer height) create a characteristic stepped, rippled surface profile ("stair-stepping").',
    industrialImpact: 'EBAM cannot produce net-shape intricate lattice structures, internal micro-channels (<4 mm), or ready-to-assemble mating surfaces without subsequent 5-axis CNC finish milling.',
    mitigationOrLeverage: 'Design parts as hybrid Additive-Subtractive envelopes: add 3 mm stock allowance on functional surfaces and machine datum features on a 5-axis mill post-stress-relief.'
  },
  {
    id: 'lim-2',
    type: 'limitation',
    title: 'Selective Volatilization of High-Vapor-Pressure Alloying Elements',
    metricBadge: '0.4–0.9 wt% Al Loss in Ti-6Al-4V',
    mechanism: 'The combination of hard vacuum (10⁻⁴ Torr) and superheated melt pool temperatures (>2,000 °C) exceeds the equilibrium vapor pressure of volatile elements such as Aluminum (in Ti-6Al-4V), Manganese (in steels), Magnesium, and Zinc.',
    industrialImpact: 'Uncompensated evaporation can shift alloy chemistry below AMS specification limits (e.g., dropping Al below 5.50 wt% in Ti-6Al-4V) and coat chamber optics with metallic condensate.',
    mitigationOrLeverage: 'Use custom over-alloyed wire chemistry (e.g., 6.6 wt% Al wire for Ti-6Al-4V), minimize specific heat input via closed-loop IRISS control, and use vapor shields on gun columns.'
  },
  {
    id: 'lim-3',
    type: 'limitation',
    title: 'Coarse Columnar β-Grains & Mechanical Anisotropy',
    metricBadge: '6–12% Z-Axis Yield/Ductility Delta',
    mechanism: 'Because heat conducts strictly downward through the previously deposited layers (conductive cooling in vacuum with zero convective gas cooling), steep directional thermal gradients drive epitaxial growth of centimeter-scale columnar grains along the Z-build axis.',
    industrialImpact: 'As-deposited parts exhibit directional anisotropy in yield strength, ultrasonic attenuation, and elongation between longitudinal (X/Y) and transverse (Z) orientations.',
    mitigationOrLeverage: 'Apply Hot Isostatic Pressing (HIP), solution/aging heat treatments, high-frequency electromagnetic beam oscillation, or emerging interpass mechanical rolling.'
  },
  {
    id: 'lim-4',
    type: 'limitation',
    title: 'Magnetic Beam Deflection & Vacuum Cycle Overhead',
    metricBadge: '< 0.5 Gauss Residual Magnetism Limit',
    mechanism: 'Because an electron beam consists of charged particles ($q = -e$), any stray or residual magnetic field in ferromagnetic steel substrates or tooling fixtures exerts a Lorentz force ($F = qv \times B$), deflecting the beam off the wire tip.',
    industrialImpact: 'Restricts ferromagnetic tooling and requires degaussing of magnetic steel parts; additionally, chamber evacuation adds 20–45 minutes per batch cycle and caps maximum part size to the vacuum vessel.',
    mitigationOrLeverage: 'Use non-magnetic austenitic stainless (304L/316L) or titanium fixtures, perform automated Hall-probe Gauss checks prior to pump-down, and batch multiple parts per vacuum cycle.'
  }
];

export const PROCESS_COMPARISONS: ProcessComparison[] = [
  {
    id: 'ebam',
    processName: 'EBAM (Wire DED-EB)',
    isoCode: 'DED-EB (Wire)',
    feedstock: 'Commercial Metal Wire (Dual/Single)',
    environment: 'Hard Vacuum (10⁻⁴ – 10⁻⁵ Torr)',
    depositionRateKgHr: '3.0 – 15.0 kg/hr',
    maxEnvelopeM: '5.79 × 1.22 × 1.22 m',
    energyEfficiencyPct: '85 – 95%',
    surfaceRoughnessRaUm: '60 – 180 µm (Near-Net)',
    layerThicknessMm: '1.0 – 3.0 mm',
    scores: {
      depositionSpeed: 94,
      buildVolume: 92,
      purityControl: 99,
      reflectiveMetals: 98,
      geometricResolution: 38,
      capexAccessibility: 42
    }
  },
  {
    id: 'waam',
    processName: 'WAAM (Wire Arc AM)',
    isoCode: 'DED-Arc (GMAW/GTAW/PAW)',
    feedstock: 'Commercial Metal Wire',
    environment: 'Inert Gas Shield / Purge Tent',
    depositionRateKgHr: '2.0 – 10.0 kg/hr',
    maxEnvelopeM: 'Unlimited (Robotic Arm)',
    energyEfficiencyPct: '65 – 80%',
    surfaceRoughnessRaUm: '120 – 300 µm (Near-Net)',
    layerThicknessMm: '1.5 – 4.0 mm',
    scores: {
      depositionSpeed: 86,
      buildVolume: 98,
      purityControl: 55,
      reflectiveMetals: 72,
      geometricResolution: 30,
      capexAccessibility: 88
    }
  },
  {
    id: 'lded',
    processName: 'Laser DED (Powder/Wire)',
    isoCode: 'DED-LB',
    feedstock: 'Spherical Powder or Fine Wire',
    environment: 'Argon Box or Coaxial Nozzle',
    depositionRateKgHr: '0.5 – 4.5 kg/hr',
    maxEnvelopeM: '2.50 × 1.50 × 1.00 m',
    energyEfficiencyPct: '20 – 45% (IR Reflective Loss)',
    surfaceRoughnessRaUm: '25 – 90 µm',
    layerThicknessMm: '0.3 – 1.2 mm',
    scores: {
      depositionSpeed: 58,
      buildVolume: 74,
      purityControl: 76,
      reflectiveMetals: 35,
      geometricResolution: 65,
      capexAccessibility: 62
    }
  },
  {
    id: 'ebm',
    processName: 'EBM (Electron Beam PBF)',
    isoCode: 'PBF-EB',
    feedstock: 'Spherical Metal Powder (45–105 µm)',
    environment: 'Vacuum (10⁻³ Torr He bleed)',
    depositionRateKgHr: '0.15 – 0.45 kg/hr',
    maxEnvelopeM: '0.35 × 0.35 × 0.43 m',
    energyEfficiencyPct: '80 – 90%',
    surfaceRoughnessRaUm: '20 – 50 µm',
    layerThicknessMm: '0.05 – 0.12 mm',
    scores: {
      depositionSpeed: 24,
      buildVolume: 28,
      purityControl: 94,
      reflectiveMetals: 90,
      geometricResolution: 84,
      capexAccessibility: 48
    }
  },
  {
    id: 'lpbf',
    processName: 'L-PBF (Laser Powder Bed)',
    isoCode: 'PBF-LB (SLM/DMLS)',
    feedstock: 'Fine Spherical Powder (15–45 µm)',
    environment: 'Argon Chamber (< 1000 ppm O₂)',
    depositionRateKgHr: '0.05 – 0.35 kg/hr',
    maxEnvelopeM: '0.60 × 0.60 × 0.80 m',
    energyEfficiencyPct: '15 – 35%',
    surfaceRoughnessRaUm: '6 – 18 µm (Net-Shape)',
    layerThicknessMm: '0.02 – 0.09 mm',
    scores: {
      depositionSpeed: 16,
      buildVolume: 32,
      purityControl: 82,
      reflectiveMetals: 42,
      geometricResolution: 98,
      capexAccessibility: 55
    }
  }
];

export const FUTURE_OUTLOOK_HORIZONS: FutureHorizon[] = [
  {
    id: 'horizon-1',
    phase: 'Horizon 01 · Near-Term Deployment',
    timeframe: '2026 – 2028',
    trlStatus: 'TRL 8–9 · In Qualification',
    title: 'Closed-Loop Multi-Spectral Telemetry & Born-Certified Digital Twins',
    coreProblemSolved: 'Eliminating destructive cut-up testing and reducing expensive post-build radiographic/ultrasonic NDT bottlenecks for flight-critical aerospace structures.',
    technicalArchitecture: 'Next-generation coaxial pyrometry, backscattered electron (BSE) imaging, and IRISS closed-loop PID controllers log voxel-by-voxel melt pool geometry, cooling rate, and beam current at 1 kHz directly onto a 3D spatial mesh.',
    industrialDeliverable: 'Automated generation of a "Digital Part Birth Certificate" aligned with SAE AMS 4999B and FAA/EASA Part 21 qualification protocols, flagging sub-millimeter lack-of-fusion or porosity anomalies in situ.',
    keyMetrics: [
      { label: 'In-Situ Sampling Frequency', value: '1,000 Hz' },
      { label: 'Post-Build NDT Cost Reduction', value: '-45%' }
    ]
  },
  {
    id: 'horizon-2',
    phase: 'Horizon 02 · Mid-Term Integration',
    timeframe: '2028 – 2030',
    trlStatus: 'TRL 6–7 · Industrial Pilot',
    title: 'In-Situ Microstructural Engineering & Interpass Grain Refinement',
    coreProblemSolved: 'Overcoming the coarse columnar prior-β grain structure and Z-axis mechanical anisotropy inherent to slow vacuum cooling without requiring oversized HIP vessels.',
    technicalArchitecture: 'Integration of programmable MHz electromagnetic beam shaping (dynamic vortex/elliptical oscillation), ultrasonic substrate excitation, and vacuum-compatible interpass high-pressure rolling or laser-shock peening heads.',
    industrialDeliverable: 'As-deposited equiaxed grain structures in Ti-6Al-4V and Inconel 718 that exceed wrought forging fatigue endurance limits directly out of the vacuum chamber.',
    keyMetrics: [
      { label: 'Prior-β Grain Size Reduction', value: '8.5× Finer' },
      { label: 'Anisotropy Delta (XY vs Z)', value: '< 1.5%' }
    ]
  },
  {
    id: 'horizon-3',
    phase: 'Horizon 03 · Factory Convergence',
    timeframe: '2029 – 2032',
    trlStatus: 'TRL 5–6 · Cell Prototyping',
    title: 'Modular Airlock Vacuum Cells & Automated Hybrid CNC Pipelines',
    coreProblemSolved: 'Breaking the batch cycle penalty of chamber pump-down and manual crane transfer between the EBAM vacuum vessel and 5-axis CNC machining centers.',
    technicalArchitecture: 'Zero-point kinematic palletization with vacuum load-lock antechambers, allowing preheated substrates to enter the main deposition chamber without breaking high vacuum, coupled to automated millimeter-wave radar scanning for instant CNC adaptive toolpath generation.',
    industrialDeliverable: 'Lights-out 24/7 digital foundry lines achieving >82% electron beam arc-on utilization and seamless additive-to-subtractive part handoff.',
    keyMetrics: [
      { label: 'Chamber Pump-Down Overhead', value: '< 6 min (Airlock)' },
      { label: 'Spindle Adaptive Registration', value: '± 25 µm' }
    ]
  },
  {
    id: 'horizon-4',
    phase: 'Horizon 04 · Strategic Frontier',
    timeframe: '2031 – 2035+',
    trlStatus: 'TRL 4–5 · Defense & Space R&D',
    title: 'Multi-Wire Computational Metallurgy & In-Space Vacuum Manufacturing',
    coreProblemSolved: 'Replacing monolithic single-alloy components with spatially tailored multi-metal architectures and leveraging ambient hard vacuum in orbital/lunar environments.',
    technicalArchitecture: '3- and 4-wire coaxial electron beam heads driven by CALPHAD thermodynamic phase-diagram solvers that dynamically avoid brittle intermetallic phases (σ, μ, Laves) while depositing in terrestrial factories or in the natural vacuum of Low Earth Orbit and the Lunar surface.',
    industrialDeliverable: 'Monolithic rocket engines, nuclear micro-reactors, and orbital trusses fabricated on-demand with zero atmospheric shielding overhead.',
    keyMetrics: [
      { label: 'Simultaneous Wire Feedstocks', value: 'Up to 4 Alloys' },
      { label: 'Heavy Forging Press Substitution', value: '> 35% of Tier-1 SKUs' }
    ]
  }
];
