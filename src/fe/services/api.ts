// services/api.ts
import { FormData } from '../types/types';
import { filterEmptyFields } from '../utils/variables';

export async function triggerGithubWorkflow(formData: FormData): Promise<any> {
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