import { formConfig } from "./inputs"; // Assicurati che il path sia corretto


export function generateTableSummaryData(data: FormData) {
  const summary: { category: string; rows: { field: string; value: any }[] }[] = [];

  Object.entries(formConfig.steps).forEach(([stepName, stepConfig]) => {
    if (!stepConfig.include) return;

    const stepFields = stepConfig.formFields || [];
    const rows = stepFields.map((field) => {
      const fieldKey = formatFieldKey(field.name);
      const value = data[fieldKey];
      return { field: field.name, value: formatValue(value) };
    });

    if (rows.length > 0) {
      summary.push({ category: capitalize(stepName), rows });
    }
  });

  return summary;
}

// Funzione per normalizzare chiavi
function formatFieldKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "_");
}

// Aiuto per formattare i valori
function formatValue(value: any): string {
  if (typeof value === "boolean") {
    return value ? "✅ Abilitato" : "❌ Disabilitato";
  }
  if (value === null || value === undefined || value === "") {
    return "⚠️ Non configurato";
  }
  return value.toString();
}

// Capitalizza stringhe
function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}