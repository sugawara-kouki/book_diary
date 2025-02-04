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
type BookShelfRouteLoaderBookDataType = {
  title: string;
  author: string;
  status: string;
  readDate: Date;
  pageCount: number | null;
  currentPage: number | null;
};
type BookShelfRouteLoaderBookAddProgressDataType =
  BookShelfRouteLoaderBookDataType & {
    progress: number;
  };
type BookShelfRouteLoaderResponseDataType = {
  [key: string]: BookShelfRouteLoaderBookDataType[];
};
interface BookShelfRouteLoaderResponse
  extends CommonRouteResponse<BookShelfRouteLoaderResponseDataType> {}

export type {
  BookShelfRouteActionResponse,
  BookShelfRouteLoaderBookAddProgressDataType,
  BookShelfRouteLoaderBookDataType,
  BookShelfRouteLoaderResponse,
  BookShelfRouteLoaderResponseDataType,
  CommonRouteResponse,
  HomeRouteLoaderBookAddProgressDataType,
  HomeRouteLoaderBookDataType,
  HomeRouteLoaderResponse
};
