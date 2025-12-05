'use server';

import type { Feedback, ActionResponse } from '@/components/feedback';

export async function onRateAction(
  url: string,
  feedback: Feedback
): Promise<ActionResponse> {
  // Log feedback for now - can be extended to:
  // - Send to GitHub Discussions
  // - Store in database
  // - Send to analytics (PostHog, etc.)
  console.log('[Feedback]', {
    url,
    opinion: feedback.opinion,
    message: feedback.message,
    timestamp: new Date().toISOString(),
  });

  // Return empty response - can return githubUrl if integrating with GitHub Discussions
  return {
    githubUrl: '',
  };
}
