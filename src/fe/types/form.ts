import { formConfig } from '../utils/inputs';

type InferFieldType<T> =
    T extends { type: 'boolean' } ? boolean :
        T extends { type: 'select' | 'text' | 'textarea' | 'hidden' } ? string :
            T extends { type: 'number' } ? number :
                string;

type GenerateFormDataType = {
  [K in keyof typeof formConfig.steps]: typeof formConfig.steps[K] extends { formFields: infer F }
      ? F extends Array<infer Field>
          ? Field extends { key: infer Key; type: infer Type }
              ? Key extends string
                  ? { [P in Key]: InferFieldType<Field> }
                  : never
              : never
          : never
      : never;
}[keyof typeof formConfig.steps];

export type CustomFormData = UnionToIntersection<GenerateFormDataType> & {
  // extra fields for formFields
  location_mapping: Record<string, string>;
  location_string_mapping: Record<string, string>;
};

type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export const defaultForm: CustomFormData = (() => {
  const form: any = {
    location_mapping: {},
    location_string_mapping: {},
  };

  Object.values(formConfig.steps).forEach((step) => {
    step.formFields.forEach((field) => {
      switch (field.type) {
        case 'boolean':
          form[field.key] = false;
          break;
        case 'hidden':
          form[field.key] = false;
          break;
        case 'number':
          form[field.key] = 0;
          break;
        case 'select':
        case 'text':
        case 'textarea':
        case 'password':
        case 'date':
        default:
          form[field.key] = '';
          break;
      }
    });
  });

  return form as CustomFormData;
})();