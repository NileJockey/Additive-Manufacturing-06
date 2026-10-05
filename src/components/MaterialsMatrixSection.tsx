import React, { useState, useMemo } from 'react';
import { ALLOWED_MATERIALS, AlloyMaterial } from '../data/ebamData';
import { Search, ArrowUpDown, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'All Alloys',
  'Titanium',
  'Refractory',
  'Nickel Superalloy',
  'Copper & High-Conductivity',
  'Specialty Steel & Nuclear'
] as const;

type SortField = 'meltingPointC' | 'utsMpa' | 'nominalRateKgHr' | 'densityGcm3';

export const MaterialsMatrixSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Alloys');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('nominalRateKgHr');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedAlloy, setSelectedAlloy] = useState<AlloyMaterial>(ALLOWED_MATERIALS[0]);

  const filteredMaterials = useMemo(() => {
    return ALLOWED_MATERIALS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Alloys' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.designation.toLowerCase().includes(q) ||
        item.commonName.toLowerCase().includes(q) ||
        item.standardSpec.toLowerCase().includes(q) ||
        item.keyApplications.some((app) => app.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      const diff = a[sortField] - b[sortField];
      return sortAsc ? diff : -diff;
    });
  }, [selectedCategory, searchQuery, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <section id="materials" className="py-20 border-b border-slate-800/80">
      <div className="max-w-[1360px] mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-5">
            <div className="text-xs font-mono text-cyan-400 tracking-wider mb-3">
              02. Allowed Materials & Metallurgical Spectrum
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-50 leading-tight">
              Weldable Wire Feedstocks from Reactive Titanium to 3,422 °C Tungsten
            </h2>
          </div>
          <div className="lg:col-span-7 text-slate-300 text-[15px] leading-relaxed space-y-4 max-w-prose">
            <p>
              The fundamental rule governing EBAM material eligibility is straightforward: <strong className="text-slate-100 font-semibold">any electrically conductive metal or alloy that can be drawn into continuous wire or rod feedstock and fusion-welded can be additively manufactured via EBAM.</strong> Because heating occurs via electron-lattice kinetic collision inside a <span className="font-mono text-slate-100">10⁻⁴ Torr</span> vacuum, EBAM circumvents the two greatest barriers of laser-based Directed Energy Deposition: atmospheric oxidation of reactive metals and optical infrared reflection off conductive metals.
            </p>
            <p>
              Furthermore, equipping the electron gun carriage with <strong className="text-slate-100 font-semibold">dual independent wire feeders</strong> permits real-time switching between coarse wire (for high-rate bulk core build-up) and fine wire (for perimeter accuracy), or simultaneous co-feeding of two distinct alloys to synthesize <strong className="text-slate-100 font-semibold">Functionally Graded Materials (FGMs)</strong> and bimetallic structures.
            </p>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="mt-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Interactive Category Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0D111A] p-1.5 rounded-lg border border-slate-800">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full xl:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter alloy, spec (e.g. AMS 4999), use..."
              className="w-full bg-[#0D111A] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Master-Detail Layout: Left Interactive Table, Right Deep Metallurgical Dossier */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Tabular Alloy Matrix */}
          <div className="lg:col-span-7 bg-[#0D111A] border border-slate-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#090C12] text-[11px] font-mono text-slate-400">
                    <th className="py-3.5 px-4 font-medium">Alloy Designation & Family</th>
                    <th className="py-3.5 px-3 font-medium">
                      <button
                        type="button"
                        onClick={() => handleSort('nominalRateKgHr')}
                        className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors whitespace-nowrap"
                      >
                        Dep. Rate
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="py-3.5 px-3 font-medium">
                      <button
                        type="button"
                        onClick={() => handleSort('meltingPointC')}
                        className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors whitespace-nowrap"
                      >
                        Melt Pt.
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="py-3.5 px-3 font-medium">
                      <button
                        type="button"
                        onClick={() => handleSort('utsMpa')}
                        className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors whitespace-nowrap"
                      >
                        UTS / Yield
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="py-3.5 px-3 font-medium">
                      <button
                        type="button"
                        onClick={() => handleSort('densityGcm3')}
                        className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors whitespace-nowrap"
                      >
                        Density
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-xs">
                  {filteredMaterials.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        No alloys match the current filter criteria. Try clearing the search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredMaterials.map((alloy) => {
                      const isSelected = selectedAlloy.id === alloy.id;
                      return (
                        <tr
                          key={alloy.id}
                          onClick={() => setSelectedAlloy(alloy)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-cyan-950/30 text-slate-50'
                              : 'hover:bg-slate-900/70 text-slate-300'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-100">
                              {alloy.designation}
                            </div>
                            {/* Unboxed metadata with typographic separator per Zero-Pill rule */}
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              <span>{alloy.category}</span>
                              <span className="mx-1.5" aria-hidden="true">·</span>
                              <span className="font-mono">{alloy.standardSpec}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 font-mono tabular-nums text-cyan-400 whitespace-nowrap">
                            {alloy.depositionRateKgHr}
                          </td>
                          <td className="py-3.5 px-3 font-mono tabular-nums whitespace-nowrap">
                            {alloy.meltingPointC.toLocaleString()} °C
                          </td>
                          <td className="py-3.5 px-3 font-mono tabular-nums whitespace-nowrap">
                            {alloy.utsMpa} / {alloy.yieldMpa} MPa
                          </td>
                          <td className="py-3.5 px-3 font-mono tabular-nums whitespace-nowrap">
                            {alloy.densityGcm3.toFixed(2)} g/cm³
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-[#090C12] border-t border-slate-800 text-[11px] font-mono text-slate-400 flex flex-wrap justify-between gap-2">
              <span>Click any row to inspect vacuum metallurgy & post-processing protocol</span>
              <span className="tabular-nums">Showing {filteredMaterials.length} of {ALLOWED_MATERIALS.length} qualified families</span>
            </div>
          </div>

          {/* Right 5 Columns: Selected Alloy Metallurgical Dossier */}
          <div className="lg:col-span-5 bg-[#0D111A] border border-slate-800 rounded-lg p-6">
            <div className="pb-4 border-b border-slate-800">
              <div className="text-xs font-mono text-cyan-400">
                {selectedAlloy.category} · {selectedAlloy.standardSpec}
              </div>
              <h3 className="text-2xl font-serif font-medium text-slate-50 mt-1">
                {selectedAlloy.designation}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedAlloy.commonName}
              </p>
            </div>

            {/* Quantitative Mechanical & Physical Spec Grid */}
            <div className="grid grid-cols-3 gap-3 py-4 border-b border-slate-800">
              <div>
                <div className="text-[11px] font-mono text-slate-400">ULTIMATE TENSILE</div>
                <div className="mt-0.5 flex items-baseline">
                  <span className="text-xl font-mono font-semibold text-slate-100 tabular-nums">
                    {selectedAlloy.utsMpa}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">MPa</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">0.2% YIELD</div>
                <div className="mt-0.5 flex items-baseline">
                  <span className="text-xl font-mono font-semibold text-slate-100 tabular-nums">
                    {selectedAlloy.yieldMpa}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">MPa</span>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">ELONGATION</div>
                <div className="mt-0.5 flex items-baseline">
                  <span className="text-xl font-mono font-semibold text-slate-100 tabular-nums">
                    {selectedAlloy.elongationPct.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">%</span>
                </div>
              </div>
            </div>

            {/* Detailed Metallurgical Sections */}
            <div className="space-y-4 pt-4 text-xs leading-relaxed">
              <div>
                <div className="font-mono text-slate-400 mb-1">
                  Vacuum Melt Pool Behavior & Vapor Pressure Dynamics
                </div>
                <p className="text-slate-200">{selectedAlloy.vacuumBehavior}</p>
              </div>

              <div>
                <div className="font-mono text-slate-400 mb-1">
                  Solidification Microstructure & Grain Morphology
                </div>
                <p className="text-slate-300">{selectedAlloy.metallurgicalNotes}</p>
              </div>

              <div>
                <div className="font-mono text-slate-400 mb-1">
                  Mandatory Thermal & Subtractive Post-Processing
                </div>
                <p className="text-slate-300">{selectedAlloy.postProcessing}</p>
              </div>

              <div>
                <div className="font-mono text-slate-400 mb-1">
                  Dual-Wire / Functionally Graded Material (FGM) Pairing
                </div>
                <p className="text-cyan-200/90">{selectedAlloy.dualWireCompatibility}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="font-mono text-slate-400 mb-1.5">
                  Primary Qualified Components
                </div>
                <div className="text-slate-200 font-medium">
                  {selectedAlloy.keyApplications.join(' · ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Material Limitation Callout: What Cannot Be Processed in EBAM? */}
        <div className="mt-8 bg-[#0D111A] border border-slate-800 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4">
              <div className="text-xs font-mono text-amber-400 mb-1">
                METALLURGICAL EXCLUSION BOUNDARY
              </div>
              <h3 className="text-lg font-serif font-medium text-slate-100">
                Which Materials Are Excluded or Restricted in EBAM?
              </h3>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
              <div>
                <div className="font-semibold text-slate-100 mb-1">
                  1. High-Zinc / Brass / Mg Alloys
                </div>
                <p>
                  Alloys containing high concentrations of Zinc (e.g., 7000-series Al-Zn or yellow brass), Cadmium, or Lead boil violently at <span className="font-mono">10⁻⁴ Torr</span> vacuum, causing melt pool spatter, porosity, and heavy chamber condensation.
                </p>
              </div>
              <div>
                <div className="font-semibold text-slate-100 mb-1">
                  2. Non-Conductive Ceramics & Polymers
                </div>
                <p>
                  Because an electron beam transfers negative charge (<span className="font-mono">q = -e</span>), electrically insulating substrates accumulate surface charge rapidly, deflecting and destabilizing the incoming beam.
                </p>
              </div>
              <div>
                <div className="font-semibold text-slate-100 mb-1">
                  3. Crack-Sensitive Cast Superalloys
                </div>
                <p>
                  Non-weldable high-<span className="font-mono">γ′</span> nickel alloys (e.g., CM247LC, Mar-M247) and brittle intermetallics that cannot be drawn into flexible spooled wire or suffer severe liquidation cracking remain restricted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
