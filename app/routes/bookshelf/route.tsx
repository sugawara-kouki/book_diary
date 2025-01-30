import { BookCard } from '~/components/book-card';
import { Shell } from '~/components/layout/shell';
import { PageHeader } from '~/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

const books = {
  reading: [
    {
      title: '人間失格',
      author: '太宰治',
      coverUrl:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800',
      progress: 65
    },
    {
      title: 'こころ',
      author: '夏目漱石',
      coverUrl:
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800',
      progress: 30
    }
  ],
  completed: [
    {
      title: '羅生門',
      author: '芥川龍之介',
      coverUrl:
        'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800',
      progress: 100
    },
    {
      title: '坊っちゃん',
      author: '夏目漱石',
      coverUrl:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800',
      progress: 100
    }
  ],
  plan: [
    {
      title: '雪国',
      author: '川端康成',
      coverUrl:
        'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800',
      progress: 0
    },
    {
      title: '銀河鉄道の夜',
      author: '宮沢賢治',
      coverUrl:
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800',
      progress: 0
    }
  ]
};

export default function Bookshelf() {
  const allBooks = [...books.reading, ...books.completed, ...books.plan];

  return (
    <Shell>
      <div className="space-y-8">
        <PageHeader
          title="本棚"
          description="あなたの読書コレクション"
        />

        <Tabs
          defaultValue="all"
          className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="reading">読書中</TabsTrigger>
            <TabsTrigger value="completed">読了</TabsTrigger>
            <TabsTrigger value="plan">読みたい本</TabsTrigger>
          </TabsList>

          <TabsContent
            value="all"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBooks.map((book, index) => (
              <BookCard
                key={index}
                {...book}
              />
            ))}
          </TabsContent>

          <TabsContent
            value="reading"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.reading.map((book, index) => (
              <BookCard
                key={index}
                {...book}
              />
            ))}
          </TabsContent>

          <TabsContent
            value="completed"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.completed.map((book, index) => (
              <BookCard
                key={index}
                {...book}
              />
            ))}
          </TabsContent>

          <TabsContent
            value="plan"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.plan.map((book, index) => (
              <BookCard
                key={index}
                {...book}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
}
