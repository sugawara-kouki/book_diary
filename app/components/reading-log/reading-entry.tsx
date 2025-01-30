import { Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '../ui/card';

interface ReadingEntryProps {
  date: string;
  content: string;
}

export function ReadingEntry({ date, content }: ReadingEntryProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <CalendarIcon className="h-4 w-4" />
        <span>{date}</span>
      </div>
      <p>{content}</p>
    </Card>
  );
}
