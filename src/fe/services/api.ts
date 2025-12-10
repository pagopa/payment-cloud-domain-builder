// services/api.ts
import { CustomFormData } from '@/types/form';
import { filterEmptyFields } from '@/utils/variables';

export interface ApiResponse {
  status: string;
  requestId?: string;
  duration?: number;
}


export async function triggerGithubWorkflow(formData: CustomFormData): Promise<any> {
  const filteredData = filterEmptyFields(formData);

    let apiUrl: string
    if (process.env.CONTEXT_ROOT) {
        apiUrl = `${process.env.CONTEXT_ROOT}/api/github-dispatch`;
    } else {
        apiUrl = "/domain-builder/api/github-dispatch"
    }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: filteredData
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}