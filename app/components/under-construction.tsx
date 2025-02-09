import { Wrench } from 'lucide-react';
import { Card } from './ui/card';

const UnderConstruction = () => {
  return (
    <Card className="p-6 bg-muted/50">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Wrench className="h-5 w-5" />
        <p>この機能は現在開発中です。もうしばらくお待ちください。</p>
      </div>
    </Card>
  );
};

export default UnderConstruction;
