'use server';

import type { Feedback, ActionResponse } from '@/components/feedback';
import { onRateAction as githubRateAction } from '@/lib/github';

export async function onRateAction(
  url: string,
  feedback: Feedback
): Promise<ActionResponse> {
  // Log feedback
  console.log('[Feedback]', {
    url,
    opinion: feedback.opinion,
    message: feedback.message,
    timestamp: new Date().toISOString(),
  });

  // If GitHub App is configured, send to GitHub Discussions
  if (process.env.GITHUB_APP_ID && process.env.GITHUB_APP_PRIVATE_KEY) {
    try {
      return await githubRateAction(url, feedback);
    } catch (error) {
      console.error('[Feedback] GitHub integration error:', error);
      // Fall through to return empty response
    }
  }

  return {
    githubUrl: '',
  };
}
