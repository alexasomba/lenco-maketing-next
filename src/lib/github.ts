import { App, Octokit } from 'octokit';
import type { ActionResponse, Feedback } from '@/components/feedback';

// Configure via environment variables or use defaults
export const repo = process.env.GITHUB_FEEDBACK_REPO || 'lenco-maketing-next';
export const owner = process.env.GITHUB_FEEDBACK_OWNER || 'alexasomba';
export const DocsCategory = process.env.GITHUB_FEEDBACK_CATEGORY || 'Docs Feedback';

let instance: Octokit | undefined;

async function getOctokit(): Promise<Octokit> {
  if (instance) return instance;

  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId || !privateKey) {
    throw new Error(
      'No GitHub keys provided for Github app, docs feedback feature will not work.'
    );
  }

  const app = new App({
    appId,
    privateKey,
  });

  const { data } = await app.octokit.request(
    'GET /repos/{owner}/{repo}/installation',
    {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  instance = await app.getInstallationOctokit(data.id);
  return instance;
}

interface RepositoryInfo {
  id: string;
  discussionCategories: {
    nodes: {
      id: string;
      name: string;
    }[];
  };
}

let cachedDestination: RepositoryInfo | undefined;

async function getFeedbackDestination() {
  if (cachedDestination) return cachedDestination;

  const octokit = await getOctokit();

  const { repository }: { repository: RepositoryInfo } = await octokit.graphql(`
    query {
      repository(owner: "${owner}", name: "${repo}") {
        id
        discussionCategories(first: 25) {
          nodes { id name }
        }
      }
    }
  `);

  return (cachedDestination = repository);
}

export async function onRateAction(
  url: string,
  feedback: Feedback
): Promise<ActionResponse> {
  'use server';

  const octokit = await getOctokit();
  const destination = await getFeedbackDestination();

  if (!octokit || !destination) {
    throw new Error('GitHub comment integration is not configured.');
  }

  const category = destination.discussionCategories.nodes.find(
    (cat) => cat.name === DocsCategory
  );

  if (!category) {
    throw new Error(
      `Please create a "${DocsCategory}" category in GitHub Discussions`
    );
  }

  const title = `Feedback for ${url}`;
  const body = `[${feedback.opinion}] ${feedback.message}\n\n> Forwarded from user feedback.`;

  // Check if a discussion already exists for this page
  const {
    search: {
      nodes: [existingDiscussion],
    },
  }: {
    search: {
      nodes: { id: string; url: string }[];
    };
  } = await octokit.graphql(`
    query {
      search(type: DISCUSSION, query: ${JSON.stringify(
        `${title} in:title repo:${owner}/${repo} author:@me`
      )}, first: 1) {
        nodes {
          ... on Discussion { id, url }
        }
      }
    }
  `);

  let discussion = existingDiscussion;

  if (discussion) {
    // Add comment to existing discussion
    await octokit.graphql(`
      mutation {
        addDiscussionComment(input: { body: ${JSON.stringify(body)}, discussionId: "${discussion.id}" }) {
          comment { id }
        }
      }
    `);
  } else {
    // Create new discussion
    const result: {
      createDiscussion: {
        discussion: { id: string; url: string };
      };
    } = await octokit.graphql(`
      mutation {
        createDiscussion(input: { repositoryId: "${destination.id}", categoryId: "${category.id}", body: ${JSON.stringify(body)}, title: ${JSON.stringify(title)} }) {
          discussion { id, url }
        }
      }
    `);

    discussion = result.createDiscussion.discussion;
  }

  return {
    githubUrl: discussion.url,
  };
}
