import { cn } from '@/lib/cn';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AvatarCircles } from '@/components/ui/avatar-circles';

export type Author = { name: string; avatar?: string; position?: string };

interface AuthorCardProps {
  name: string;
  avatar?: string;
  position?: string;
  className?: string;
}

export function AuthorCard({ name, avatar, position, className }: AuthorCardProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Avatar className="w-10 h-10">
        {avatar ? (
          <AvatarImage src={avatar} alt={name} />
        ) : (
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1">
        <h3 className="text-sm font-semibold tracking-tight">{name}</h3>
        {position && (
          <p className="text-xs text-muted-foreground">{position}</p>
        )}
      </div>
    </div>
  );
}

export function AuthorsInline({
  authors,
  className,
}: {
  authors: Array<Author | string> | Author | string;
  className?: string;
}) {
  const input = Array.isArray(authors) ? authors : [authors];
  const list: Author[] = (input as Array<Author | string>).map((a) =>
    typeof a === 'string' ? { name: a } : a
  );

  const avatars = list
    .filter((a) => !!a.avatar)
    .map((a) => ({ imageUrl: a.avatar ?? '', profileUrl: '#' }));

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {avatars.length > 0 ? (
        <AvatarCircles
          avatarUrls={avatars.slice(0, 3)}
          numPeople={list.length > 3 ? list.length - 3 : 0}
        />
      ) : (
        <div className="flex -space-x-3">
          {list.slice(0, 3).map((a, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium border border-border"
            >
              {a.name.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      )}
      <div className="text-sm text-foreground font-medium">
        {list.map((a) => a.name).join(', ')}
      </div>
    </div>
  );
}

export function AuthorsStack({
  authors,
  className,
}: {
  authors: Array<Author | string>;
  className?: string;
}) {
  const list = authors.map((a) => (typeof a === 'string' ? { name: a } : a));

  return (
    <div className={cn('space-y-4', className)}>
      {list.map((a, idx) => (
        <AuthorCard
          key={idx}
          name={a.name}
          avatar={a.avatar}
          position={a.position}
        />
      ))}
    </div>
  );
}
