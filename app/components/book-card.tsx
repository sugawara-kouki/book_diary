import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';

interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
  progress: number;
}

export function BookCard({ title, author, coverUrl, progress }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[3/4] w-full">
          <img
            src={coverUrl}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-heading text-lg font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{author}</p>
        <div className="mt-4">
          <Progress
            value={progress}
            className="h-2"
          />
          <p className="mt-1 text-xs text-muted-foreground text-right">
            {progress}% 完了
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
