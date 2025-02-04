import { SignedIn, SignedOut } from '@clerk/remix';
import { getAuth } from '@clerk/remix/ssr.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BookCard } from '~/components/book-card';
import { Shell } from '~/components/layout/shell';
import { calculateProgress } from '~/lib/calculation';
import prismaClient from '~/lib/prisma';
import {
  HomeRouteLoaderBookAddProgressDataType,
  HomeRouteLoaderBookDataType,
  HomeRouteLoaderResponse
} from '~/types/api-response';

export const loader = async (
  args: LoaderFunctionArgs
): Promise<HomeRouteLoaderResponse> => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return {
      statusCode: 401,
      success: false,
      error: 'ログインを行い、再度お試しください。'
    };
  }

  try {
    // **************************************
    // 自身の最新の投稿を3件取得するカタマリ
    // **************************************
    const latestBooks = await prismaClient.book.findMany({
      where: {
        userID: userId,
        status: 'reading'
      },
      select: { title: true, author: true, pageCount: true, currentPage: true },
      orderBy: {
        readDate: 'desc'
      },
      // 最新の投稿3件
      take: 3
    });

    // **************************************
    // 自身以外のユーザの最新の投稿を9件取得するカタマリ
    // **************************************
    const otherBooks = await prismaClient.book.findMany({
      where: {
        NOT: {
          userID: userId
        },
        status: 'reading'
      },
      select: { title: true, author: true, pageCount: true, currentPage: true },
      orderBy: {
        readDate: 'desc'
      },
      // 最新の投稿9件
      take: 9
    });

    // ループして進捗率を追加するメソッド
    const addProgress = (
      books: HomeRouteLoaderBookDataType[]
    ): HomeRouteLoaderBookAddProgressDataType[] => {
      return books.map((book) => {
        return {
          ...book,
          // 進捗率算出&追加
          progress: calculateProgress(book.currentPage, book.pageCount)
        };
      });
    };

    return {
      statusCode: 200,
      success: true,
      data: {
        latestBooks: addProgress(latestBooks),
        otherBooks: addProgress(otherBooks)
      }
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      success: false,
      error: 'エラーが発生しました。画面を開きなおして下さい。'
    };
  }
};

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();
  // loaderData.data が undefined のときはロード中
  // statusCode が 200 以外はエラー
  if (loaderData.statusCode !== 200 || !loaderData.data) {
    return (
      <Shell>
        <h1>{loaderData.error}</h1>
      </Shell>
    );
  }
  const { latestBooks, otherBooks } = loaderData.data;

  return (
    <Shell>
      <section>
        <SignedIn>
          <h2 className="font-heading text-2xl font-semibold mb-6">
            現在読んでいる本
          </h2>

          {/* 最新の「読書中」ステータスの本を最大3つ取得する */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBooks.length > 0 ? (
              latestBooks.map((book, index) => (
                <BookCard
                  key={index}
                  title={book.title}
                  author={book.author}
                  progress={book.progress}
                />
              ))
            ) : (
              <p>
                読書中の本はありません。
                <br />
                本棚ページから書籍を登録してみよう！
              </p>
            )}
          </div>
        </SignedIn>
        <SignedOut>
          <p>サインインして、読書中の書籍を登録しましょう！</p>
        </SignedOut>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">
          みんなが読んでいる本
        </h2>

        {/* 自身以外のユーザの最新の「読書中」ステータスの本を最大9つ取得する */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherBooks.length > 0 ? (
            otherBooks.map((book, index) => (
              <BookCard
                key={index}
                title={book.title}
                author={book.author}
                progress={book.progress}
              />
            ))
          ) : (
            <p>
              読書中の本がないようです...
              <br />
              みんなに周知して登録してもらおう！
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}
