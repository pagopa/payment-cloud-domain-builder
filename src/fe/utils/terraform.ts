import { formConfig } from "./inputs";


export function generateTableSummaryData(data: FormData) {
  const summary: { category: string; rows: { field: string; value: any, id: string }[]; enabled: boolean, missingFields: boolean }[] = [];


  Object.entries(formConfig.steps).forEach(([stepName, stepConfig]) => {
    const stepFields = stepConfig.formFields || [];
    const rows = stepFields.map((field) => {
      const fieldKey = field.key;
      const fieldData = formatValue(data[fieldKey])
      return { field: field.name, value: fieldData.value, id: fieldKey, present: fieldData.present };
    });


      var include_step = stepFields
          .filter(field => field.key.startsWith("include_"))
          .map((field): boolean => {
              return data[field.key] === "true" || data[field.key] === true;
          })
          .pop();
      const stepEnabled: boolean = include_step === undefined ? false : include_step;

    if (rows.length > 0) {
      summary.push({ category: capitalize(stepConfig.name), rows: rows, enabled: stepEnabled, missingFields: rows.some(row => row.present === false)  });
    }
  });

  return summary;
}


function formatValue(value: any): { value: string, present: boolean }  {
  if (typeof value === "boolean") {
    return value ? {value: "✅ Abilitato", present: true} : {value: "⛔️ Disabilitato", present: true};
  }
  if (value === "true" || value === true) {
    return {value: "✅ Abilitato", present: true};
  }
  if (value === "false" || value === false) {
    return {value: "⛔️ Disabilitato", present: true};
  }
  if (value === null || value === undefined || value === "") {
    return {value: "⚠️ Non configurato", present: false};
  }
  return {value: value.toString(), present: true};
}


function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}