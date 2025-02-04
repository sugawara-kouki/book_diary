import { Book } from '@prisma/client';
// TODO:: 命名とか見直すべきです
/**
 * APIレスポンスデータの基底インターフェース
 */
interface CommonRouteResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

/**
 * Homeルートのloader用レスポンスインターフェース
 */
type HomeRouteLoaderBookDataType = {
  title: string;
  author: string;
  pageCount: number | null;
  currentPage: number | null;
};
type HomeRouteLoaderBookAddProgressDataType = HomeRouteLoaderBookDataType & {
  progress: number;
};
type HomeRouteLoaderResponseDataType = {
  latestBooks: HomeRouteLoaderBookAddProgressDataType[];
  otherBooks: HomeRouteLoaderBookAddProgressDataType[];
};
interface HomeRouteLoaderResponse
  extends CommonRouteResponse<HomeRouteLoaderResponseDataType> {}

/**
 * BookShelfルートのaction用レスポンスインターフェース
 */
interface BookShelfRouteActionResponse extends CommonRouteResponse<Book> {}

/**
 * BookShelfルートのloader用レスポンスインターフェース
 */
type BookShelfRouteLoaderResponseDataType = {
  [key: string]: Book[];
};
interface BookShelfRouteLoaderResponse
  extends CommonRouteResponse<BookShelfRouteLoaderResponseDataType> {}

export type {
  BookShelfRouteActionResponse,
  BookShelfRouteLoaderResponse,
  BookShelfRouteLoaderResponseDataType,
  CommonRouteResponse,
  HomeRouteLoaderBookAddProgressDataType,
  HomeRouteLoaderBookDataType,
  HomeRouteLoaderResponse
};
