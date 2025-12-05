export type Author = {
  alias: string;
  name: string;
  position?: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
};

const AUTHORS: Record<string, Author> = {
  'alex-asomba': {
    alias: 'alex-asomba',
    name: 'Alex Asomba',
    position: 'Writer',
    avatar: '/images/authors/alex-asomba.svg',
    bio: 'Product & developer marketer. Writes about payments, businesses and developer experience.',
    twitter: 'alexasomba',
    linkedin: 'https://www.linkedin.com/in/alexasomba',
  },
  'lenco-team': {
    alias: 'lenco-team',
    name: 'Lenco Team',
    position: 'Editorial',
    avatar: '/images/authors/lenco-team.svg',
    bio: 'The Lenco content & product team.',
    twitter: 'lencohq',
    linkedin: 'https://www.linkedin.com/company/lencohq',
  },
};

export function getAuthor(alias: string): Author | undefined {
  return AUTHORS[alias];
}

export function getAuthors(aliases?: string[] | string): Author[] {
  if (!aliases) return [];
  if (typeof aliases === 'string') aliases = [aliases];
  return aliases.map((a) => AUTHORS[a]).filter(Boolean) as Author[];
}

export function allAuthors() {
  return Object.values(AUTHORS);
}
