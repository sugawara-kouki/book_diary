import { Book } from '@prisma/client';
import { TabsContent } from '@radix-ui/react-tabs';
import { BookCard } from '../book-card';

type BookTabContentProps = {
  books: Book[] | undefined;
  tabsValue: 'all' | 'reading' | 'completed' | 'plan';
};

export const BookTabsContent = ({ books, tabsValue }: BookTabContentProps) => {
  return (
    <TabsContent
      value={tabsValue}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books && books.length > 0 ? (
        books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            // TODO:: 進捗をページ数とかで判定するようにする
            progress={0}
          />
        ))
      ) : (
        <p>該当するデータがありませんでした。</p>
      )}
    </TabsContent>
  );
};
