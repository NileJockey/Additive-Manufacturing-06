# EBAM Technical Monograph & Process Workbench

An interactive engineering monograph and process simulation workbench for **Electron Beam Additive Manufacturing (EBAM)**—standardized under **ISO/ASTM 52900** as wire-fed **Directed Energy Deposition using an Electron Beam (DED-EB)**.

## Key Features

1. **Interactive EBAM Vacuum Workcell & Process Physics Simulator**
   - Inspect all 6 core subsystems (`SYS-01` through `SYS-06`) of a high-vacuum EBAM chamber (`10⁻⁴ to 10⁻⁵ Torr`).
   - Adjust accelerating voltage (`30–60 kV`), beam current (`80–600 mA`), CNC gantry travel speed (`4–25 mm/s`), wire diameter (`1.14–3.2 mm`), and nozzle mode (`Single` vs. `Dual-Wire`) to simulate mass deposition rate (`kg/hr`), absorbed kinetic beam power (`kW`), linear heat input (`J/mm`), and melt pool stability.
2. **Allowed Materials & Metallurgical Compatibility Matrix**
   - Searchable, sortable engineering database covering 10 qualified alloy families across Titanium (`Ti-6Al-4V`, `Ti-6242`), Refractory Metals (`Tantalum Ta-10W`, `Pure Tungsten`, `Niobium C-103`), Nickel Superalloys (`Inconel 718`, `Inconel 625`), High-Conductivity Copper (`OFHC Cu / CuCrZr`), and Specialty Steels/Nuclear Alloys (`316L`, `Zircaloy-4`, `NAB`).
3. **Industrial Applications & Buy-to-Fly (BTF) Economics Calculator**
   - Validated aerospace, defense, naval, and nuclear case studies alongside an interactive calculator comparing conventional die forging + CNC hog-out against near-net-shape EBAM wire preforms.
4. **Points of Strength vs. Drawbacks & Multi-Process Benchmark**
   - Detailed analysis of EBAM's strengths and physical limitations, plus an interactive 6-axis radar chart benchmarking EBAM against `WAAM`, `Laser DED`, `EBM`, and `L-PBF`.
5. **2026–2035 Industrial Integration Roadmap & Line Configurator**
   - Four technological horizons and an interactive factory line configurator for cell architecture, NDT qualification, and hybrid CNC integration.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```
