import { TabsContent } from '@radix-ui/react-tabs';
import { calculateProgress } from '~/lib/calculation';
import {
  BookShelfRouteLoaderBookAddProgressDataType,
  BookShelfRouteLoaderBookDataType
} from '~/types/api-response';
import { BookCard } from '../book-card';

type BookTabContentProps = {
  books: BookShelfRouteLoaderBookDataType[] | undefined;
  tabsValue: 'all' | 'reading' | 'completed' | 'plan';
};

export const BookTabsContent = ({ books, tabsValue }: BookTabContentProps) => {
  // progressの算出
  const addProgress = (
    books: BookShelfRouteLoaderBookDataType[]
  ): BookShelfRouteLoaderBookAddProgressDataType[] => {
    return books.map((book) => {
      return {
        ...book,
        // 進捗率算出&追加
        progress: calculateProgress(book.currentPage, book.pageCount)
      };
    });
  };

  return (
    <TabsContent
      value={tabsValue}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books && books.length > 0 ? (
        addProgress(books).map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            progress={book.progress}
          />
        ))
      ) : (
        <p>該当するデータがありませんでした。</p>
      )}
    </TabsContent>
  );
};
