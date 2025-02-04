import { getAuth } from '@clerk/remix/ssr.server';
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import prismaClient from '~/lib/prisma';
import { BookShelfRouteActionResponse } from '~/types/api-response';
import { bookInputSchema } from '~/types/book';

export const action: ActionFunction = async (
  args: ActionFunctionArgs
): Promise<BookShelfRouteActionResponse> => {
  const formData = await args.request.formData();

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const status = formData.get('status') as string;
  const totalPage = formData.get('totalPage') as string;
  const { userId } = await getAuth(args);

  if (!userId) {
    return {
      statusCode: 401,
      success: false,
      error: 'ログインを行い、再度お試しください。'
    };
  }

  const serverValidateResult = bookInputSchema.safeParse({
    title,
    author,
    status,
    totalPage
  });
  if (!serverValidateResult.success) {
    return {
      statusCode: 400,
      success: false,
      error: 'データ登録に必要なパラメータが不足しています。'
    };
  }

  // DBにデータを登録する
  try {
    const newBook = await prismaClient.book.create({
      data: {
        userID: userId,
        title: serverValidateResult.data.title,
        author: serverValidateResult.data.author,
        status: serverValidateResult.data.status,
        pageCount: serverValidateResult.data.totalPage
      }
    });
    return {
      statusCode: 201,
      success: true,
      data: newBook
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
