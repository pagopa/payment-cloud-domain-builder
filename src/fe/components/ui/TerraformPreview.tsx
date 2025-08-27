import React from "react";
import { generateTableSummaryData } from "../../utils/terraform"; // Funzionalità per creare i dati del riassunto

interface Summary {
  category: string;
  rows: { field: string; value: string }[];
}

const SummaryTable: React.FC<{ summaryData: Summary[] }> = ({
  summaryData,
}) => (
  <div className="overflow-auto bg-zinc-800 rounded-lg border border-zinc-700 shadow-lg">
    <table className="min-w-full table-auto text-left text-sm text-zinc-300">
      <thead className="bg-zinc-700">
        <tr>
          <th className="px-4 py-2">Campo</th>
          <th className="px-4 py-2">Valore</th>
        </tr>
      </thead>
      <tbody>
        {summaryData.map((section) => (
          <React.Fragment key={section.category}>
            <tr className="bg-indigo-700 text-white">
              <td colSpan={2} className="p-4 font-semibold">
                {section.category}
              </td>
            </tr>
            {section.rows.map((row, index) => (
              <tr key={index} className="border-b border-zinc-600">
                <td className="p-4">{row.field}</td>
                <td className="p-4">{row.value}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export const TerraformPreview = ({ formData, handleGenerateWorkflow, setShowSummary}: { formData: any }, ) => {
  // Genera il riassunto a partire dai dati del form
  const summaryData = generateTableSummaryData(formData);

  return (
    <div className="p-6 rounded-2xl bg-zinc-800 border border-emerald-800 shadow-inner hover:shadow-emerald-500/10 transition-shadow">
      <h2 className="text-2xl font-semibold text-emerald-400 mb-3">
        Configurazione Completa
      </h2>
      <div className="text-zinc-200 mb-2 text-sm">
        Ecco un riepilogo dettagliato della configurazione.
      </div>

      {/* Tabella riepilogativa */}
      <SummaryTable summaryData={summaryData} />

      <div className="flex gap-4 mt-6">
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded shadow transition-colors"
          onClick={() => setShowSummary(false)}
        >
          Torna al Wizard
        </button>

        <button
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 group transition-all hover:scale-[1.02] ml-auto"
          onClick={handleGenerateWorkflow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:animate-spin"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a 1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          Genera Workflow!
        </button>
      </div>
    </div>
  );
};