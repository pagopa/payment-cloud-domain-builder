// services/api.ts
import { FormData } from '../types/types';

export async function triggerGithubWorkflow(formData: FormData): Promise<any> {
  const response = await fetch('/api/github-dispatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      formData: formData
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}