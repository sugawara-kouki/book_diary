import { z } from 'zod';

/**
 * 本追加のバリデーションスキーマ
 */
export const bookInputSchema = z.object({
  // タイトル
  title: z
    .string()
    .min(1, 'タイトルは入力必須です')
    .max(255, '255文字以内で入力してください'),
  // 著者
  author: z
    .string()
    .min(1, '著者名は入力必須です')
    .max(50, '50文字以内で入力して下さい'),
  // 読書状態
  status: z.enum(['plan', 'reading', 'completed']),
  // 全ページ数
  totalPage: z
    .string()
    .refine((value) => /^[0-9]+$/.test(value), '数字のみを入力してください。') // 数字のみのチェック
    .refine((value) => parseInt(value) > 0, '1以上の整数を入力してください。') // 1以上の整数チェック
    .refine(
      (value) => parseInt(value) <= 99999,
      '5桁以内の整数を入力してください。'
    ) // 5桁以内のチェック
    .transform((value) => parseInt(value))
});

/**
 * 本追加のデータ型
 */
export type BookInputType = z.infer<typeof bookInputSchema>;
