'use client';

import { getAuth } from '@clerk/remix/ssr.server';
import { PrismaClient, type Book } from '@prisma/client';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { BookCard } from '~/components/book-card';
import { BookDrawer } from '~/components/book-drawer';
import { Shell } from '~/components/layout/shell';
import { PageHeader } from '~/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

// const books = {
//   reading: [
//     {
//       title: '人間失格',
//       author: '太宰治',
//       coverUrl:
//         'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800',
//       progress: 65
//     },
//     {
//       title: 'こころ',
//       author: '夏目漱石',
//       coverUrl:
//         'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800',
//       progress: 30
//     }
//   ],
//   completed: [
//     {
//       title: '羅生門',
//       author: '芥川龍之介',
//       coverUrl:
//         'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800',
//       progress: 100
//     },
//     {
//       title: '坊っちゃん',
//       author: '夏目漱石',
//       coverUrl:
//         'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800',
//       progress: 100
//     }
//   ],
//   plan: [
//     {
//       title: '雪国',
//       author: '川端康成',
//       coverUrl:
//         'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=800',
//       progress: 0
//     },
//     {
//       title: '銀河鉄道の夜',
//       author: '宮沢賢治',
//       coverUrl:
//         'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800',
//       progress: 0
//     }
//   ]
// };

type GroupedBooks = {
  [key: string]: Book[];
};

export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  const prisma = new PrismaClient();

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const status = formData.get('status') as string;
  const { userId } = await getAuth(args);

  if (!userId) {
    return json({ message: 'ログインしてください' }, { status: 401 });
  }

  if (!title || !author || !status) {
    return json({ message: 'パラメータが不足しています。' }, { status: 400 });
  }

  // DBにデータを登録する
  try {
    const newBook = await prisma.book.create({
      data: {
        title: title,
        author: author,
        status: status,
        userID: userId
      }
    });
    return json(
      { message: 'データが正常に作成されたお', book: newBook },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return json({ message: 'エラーが発生したお' }, { status: 500 });
  }
};

interface LoaderDataType {
  message: string;
  groupedBooks?: {
    [key: string]: Book[];
  };
}
export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return json(
      { message: 'ログインしていません。ログインをしてください。' },
      { status: 401 }
    );
  }

  const prisma = new PrismaClient();

  const bookData = await prisma.book.findMany({
    where: {
      userID: userId
    }
  });

  if (bookData.length < 1) {
    return json({ message: 'データがありませんでした。' }, { status: 200 });
  }

  // 取得したデータをステータスごとに配列に格納
  const groupedBooks: GroupedBooks = bookData.reduce((acc, book) => {
    const status = book.status;

    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(book);
    return acc;
  }, {} as GroupedBooks);

  return json({ message: 'データ取得成功！', groupedBooks }, { status: 200 });
};

export default function Bookshelf() {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<LoaderDataType>();
  const groupedBooks = loaderData?.groupedBooks || {};

  return (
    <Shell>
      {actionData?.message && <p>{actionData?.message}</p>}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <PageHeader
            title="本棚"
            description="あなたの読書コレクション"
          />
          <BookDrawer />
        </div>

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
            {Object.values(groupedBooks)
              .flat()
              .map((book, index) => (
                <BookCard
                  key={index}
                  title={book.title}
                  author={book.author}
                />
              ))}
          </TabsContent>

          <TabsContent
            value="reading"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedBooks.reading &&
              groupedBooks.reading.map((book, index) => (
                <BookCard
                  key={index}
                  title={book.title}
                  author={book.author}
                />
              ))}
          </TabsContent>

          <TabsContent
            value="completed"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedBooks.completed &&
              groupedBooks.completed.map((book, index) => (
                <BookCard
                  key={index}
                  title={book.title}
                  author={book.author}
                  progress={100}
                />
              ))}
          </TabsContent>

          <TabsContent
            value="plan"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedBooks.plan &&
              groupedBooks.plan.map((book, index) => (
                <BookCard
                  key={index}
                  title={book.title}
                  author={book.author}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
}
