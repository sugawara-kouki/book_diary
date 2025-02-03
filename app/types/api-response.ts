import { Book } from '@prisma/client';

/**
 * APIレスポンスデータの基底インターフェース
 */
interface CommonApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

/**
 * BookShelfルートのaction用レスポンスインターフェース
 */
interface BookShelfApiResponse extends CommonApiResponse<Book> {}

/**
 * BookShelfルートのloader用レスポンスインターフェース
 */
type GroupedBooksType = {
  [key: string]: Book[];
};
interface GroupedBookShelfApiResponse
  extends CommonApiResponse<GroupedBooksType> {}

export type {
  BookShelfApiResponse,
  CommonApiResponse,
  GroupedBookShelfApiResponse,
  GroupedBooksType
};
