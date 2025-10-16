import { formConfig } from "./inputs";


export function generateTableSummaryData(data: FormData) {
  const summary: { category: string; rows: { field: string; value: any }[] }[] = [];

  Object.entries(formConfig.steps).forEach(([stepName, stepConfig]) => {
    const stepFields = stepConfig.formFields || [];
    const rows = stepFields.map((field) => {
      const fieldKey = field.key;
      const value = data[fieldKey];
      return { field: field.name, value: formatValue(value) };
    });

    if (rows.length > 0) {
      summary.push({ category: capitalize(stepName), rows });
    }
  });

  return summary;
}


function formatValue(value: any): string {
  if (typeof value === "boolean") {
    return value ? "✅ Abilitato" : "❌ Disabilitato";
  }
  if (value === "true" || value === true) {
    return "✅ Abilitato";
  }
  if (value === "false" || value === false) {
    return "❌ Disabilitato";
  }
  if (value === null || value === undefined || value === "") {
    return "⚠️ Non configurato";
  }
  return value.toString();
}


function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}