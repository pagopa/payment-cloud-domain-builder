import { formConfig } from '@/utils/inputs';

type InferFieldType<T> =
    T extends { type: 'boolean' } ? boolean :
        T extends { type: 'select' | 'text' | 'textarea' | 'hidden' | 'static' } ? string :
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
  // extra fields for formFields, if needed
};

type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export const defaultForm: CustomFormData = (() => {
  const form: any = {};

  Object.values(formConfig.steps).forEach((step) => {
    step.formFields.forEach((field) => {
      switch (field.type) {
        case 'boolean':
          form[field.key] = field.value || false;
          break;
        case 'hidden':
          form[field.key] = field.value;
          break;
        case 'static':
          form[field.key] = field.value;
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