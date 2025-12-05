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

  const response = await fetch('/api/github-dispatch', {
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