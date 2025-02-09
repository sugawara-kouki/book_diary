import { Shell } from '~/components/layout/shell';
import { PageHeader } from '~/components/page-header';
import UnderConstruction from '~/components/under-construction';

export default function Statistics() {
  return (
    <Shell>
      <div className="space-y-8">
        <PageHeader
          title="統計"
          description="あなたの読書活動の分析"
        />

        {/* 開発中コンポーネントを表示 */}
        <UnderConstruction />

        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              className="p-6 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))}
        </div> */}

        {/* <Card className="p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-[300px] w-full" />
        </Card> */}

        {/* <div className="grid sm:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </Card>
        </div> */}
      </div>
    </Shell>
  );
}
