import React from 'react';

// import the example MDX content we added under content/docs
import Example from '../../../content/docs/ui/manual-installation/next.mdx';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto prose dark:prose-invert">
      <Example />
    </main>
  );
}
