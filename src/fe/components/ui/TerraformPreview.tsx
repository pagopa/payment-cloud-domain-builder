import React from "react";
import { generateTableSummaryData } from "../../utils/terraform";

interface Summary {
  category: string;
  rows: { field: string; value: string, id: string }[];
  enabled: boolean;
}

export const SummaryTable: React.FC<{ summaryData: Summary[] }> = ({ summaryData }) => (
  <div className="overflow-auto bg-white dark:bg-zinc-900 rounded-lg border border-zinc-400 dark:border-zinc-800 shadow-md">
    <table className="min-w-full table-auto text-left text-sm text-zinc-600 dark:text-zinc-300">
      <thead>
        <tr className="bg-white dark:bg-zinc-700">
          <th className="px-4 py-2 text-left text-sm font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-200">
            Campo
          </th>
          <th className="px-4 py-2 text-left text-sm font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-200">
            Valore
          </th>
        </tr>
      </thead>
      <tbody>
        {summaryData
          // Filtra le categorie che hanno almeno un campo configurato
          .filter((section) => section.rows.some((row) => row.value.trim() !== ""))
            .filter(section => section.enabled )
          .map((section) => (
            <React.Fragment key={section.category}>
              {/* Separatore Evidenziato per Categoria */}
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-3 font-semibold uppercase bg-emerald-900 text-white border border-blue-500"
                >
                  {section.category}
                </td>
              </tr>
              {/* Righe dei Campi Configurati */}
              {section.rows
                  .filter((row) => row.value.trim() !== "")
                  .filter((row) => !row.id.startsWith("include_"))
                  .map((row, rowIndex) => (
                      <tr
                          key={rowIndex}
                          className="dark:hover:bg-zinc-700 dark:bg-zinc-900 transition-colors duration-150"
                      >
                          <td className="px-4 py-2 border-b border-zinc-400 dark:border-zinc-800">{row.field}</td>
                          <td className="px-4 py-2 border-b border-zinc-400 dark:border-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100">
                              {row.value}
                          </td>
                      </tr>
                  ))}

            </React.Fragment>
          ))}
      </tbody>
    </table>
  </div>
);


export const TerraformPreview = ({ formData, handleGenerateWorkflow, setShowSummary}, ) => {
  const summaryData = generateTableSummaryData(formData);

  return (
    <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-emerald-800 shadow-inner hover:shadow-emerald-500/10 transition-shadow">
      <h2 className="text-2xl font-semibold text-emerald-400 mb-3">
        Configurazione Completa
      </h2>
      <div className="text-zinc-600 dark:text-zinc-200 mb-2 text-sm">
        Ecco un riepilogo dettagliato della configurazione.
      </div>

      {/* Tabella riepilogativa */}
      <SummaryTable summaryData={summaryData} />

      <div className="flex gap-4 mt-6">
        <button
          className="bg-zinc-600 hover:bg-white dark:bg-zinc-700 text-white px-4 py-2 rounded shadow transition-colors"
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
          Genera Dominio!
        </button>
      </div>
    </div>
  );
};