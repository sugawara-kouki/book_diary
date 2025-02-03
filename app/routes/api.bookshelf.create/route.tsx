import { getAuth } from '@clerk/remix/ssr.server';
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import prismaClient from '~/lib/prisma';
import { BookShelfApiResponse } from '~/types/api-response';

export const action: ActionFunction = async (
  args: ActionFunctionArgs
): Promise<BookShelfApiResponse> => {
  const formData = await args.request.formData();

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const status = formData.get('status') as string;
  const { userId } = await getAuth(args);

  if (!userId) {
    return {
      statusCode: 401,
      success: false,
      error: 'ログインを行い、再度お試しください。'
    };
  }

  if (!title || !author || !status) {
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
        title: title,
        author: author,
        status: status,
        userID: userId
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
