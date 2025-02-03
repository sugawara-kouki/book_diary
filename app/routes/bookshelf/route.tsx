'use client';

import { getAuth } from '@clerk/remix/ssr.server';
import { PrismaClient, type Book } from '@prisma/client';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { BookCard } from '~/components/book-card';
import { BookDrawer } from '~/components/book-drawer';
import { Shell } from '~/components/layout/shell';
import { PageHeader } from '~/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

interface ActionDataType {
  message: string;
  book?: Book;
}
export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  const prisma = new PrismaClient();

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const status = formData.get('status') as string;
  const { userId } = await getAuth(args);

  if (!userId) {
    return json(
      { message: 'ログインをしなおして、再度お試しください。' },
      { status: 401 }
    );
  }

  if (!title || !author || !status) {
    return json(
      { message: 'データ登録に必要なパラメータが不足しています。' },
      { status: 400 }
    );
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
      { message: 'データが正常に登録されました。', book: newBook },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return json(
      { message: 'エラーが発生しました。再度登録をお試しください。' },
      { status: 500 }
    );
  }
};

interface LoaderDataType {
  message: string;
  groupedBooks?: {
    [key: string]: Book[];
  };
}
type GroupedBooks = {
  [key: string]: Book[];
};
export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return json(
      { message: 'ログインをしなおして、再度お試しください。' },
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
    return json(
      { message: '該当するデータが見つかりませんでした。' },
      { status: 200 }
    );
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
  const actionData = useActionData<ActionDataType>();
  const loaderData = useLoaderData<LoaderDataType>();
  const groupedBooks = loaderData?.groupedBooks || {};

  useEffect(() => {
    if (!actionData) {
      return;
    }

    // 条件に応じて、void関数を変数に格納
    const toastType = actionData.book ? toast.success : toast.error;
    // エラーと正常時の使い分けを実現
    toastType(actionData.message);
  }, [actionData]);

  return (
    <Shell>
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
      <Toaster
        richColors
        position="top-center"
      />
    </Shell>
  );
}
