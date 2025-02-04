'use client';

import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Toaster } from 'sonner';
import { BookDrawer } from '~/components/book-drawer/book-drawer';
import { BookTabsContent } from '~/components/book-tabs-content/book-tabs-content';
import { Shell } from '~/components/layout/shell';
import { PageHeader } from '~/components/page-header';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import prismaClient from '~/lib/prisma';
import {
  BookShelfRouteLoaderResponse,
  BookShelfRouteLoaderResponseDataType
} from '~/types/api-response';

export const loader = async (
  args: LoaderFunctionArgs
): Promise<BookShelfRouteLoaderResponse> => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return {
      statusCode: 401,
      success: false,
      error: 'ログインを行い、再度お試しください。'
    };
  }

  try {
    const bookData = await prismaClient.book.findMany({
      where: {
        userID: userId
      },
      select: {
        title: true,
        author: true,
        status: true,
        pageCount: true,
        currentPage: true,
        readDate: true
      },
      orderBy: {
        readDate: 'desc'
      }
    });

    // 取得したデータをステータスごとに配列に格納
    const groupedBooks = bookData.reduce((acc, book) => {
      // データのステータス値をキーとしたオブジェクト配列を作成
      const status = book.status;
      // acc[status]がundefinedの時にから配列を追加
      acc[status] = acc[status] ?? [];
      acc[status].push(book);
      return acc;
    }, {} as BookShelfRouteLoaderResponseDataType);

    // それぞれのキーごとに日付の降順でソート
    const progressAddedGroupedBooks: BookShelfRouteLoaderResponseDataType = {};
    Object.keys(groupedBooks).forEach((key) => {
      progressAddedGroupedBooks[key] = groupedBooks[key].sort((a, b) => {
        return b.readDate.getTime() - a.readDate.getTime();
      });
    });
    return {
      statusCode: 200,
      success: true,
      data: progressAddedGroupedBooks
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      success: false,
      error: 'エラーが発生しました。再度登録をお試しください。'
    };
  }
};

export default function Bookshelf() {
  const loaderData = useLoaderData<typeof loader>();
  const groupedBooks = loaderData?.data || {};

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

          {/* カテゴリ all */}
          <BookTabsContent
            tabsValue="all"
            books={Object.values(groupedBooks)
              .flat()
              .sort((a, b) => {
                // 日付順 DESC
                // ステータスごとに配列になっていたものを再結合しているため
                // ソートも再度行う必要あり
                return b.readDate.getTime() - a.readDate.getTime();
              })}
          />

          {/* カテゴリ reading */}
          <BookTabsContent
            tabsValue="reading"
            books={groupedBooks.reading}
          />

          {/* カテゴリ completed */}
          <BookTabsContent
            tabsValue="completed"
            books={groupedBooks.completed}
          />

          {/* カテゴリ plan */}
          <BookTabsContent
            tabsValue="plan"
            books={groupedBooks.plan}
          />
        </Tabs>
      </div>

      {/* トースト */}
      <Toaster
        richColors
        position="top-center"
        duration={5000}
      />
    </Shell>
  );
}
