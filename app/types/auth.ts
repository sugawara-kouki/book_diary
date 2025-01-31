import { z } from 'zod';

/**
 * ログインフォームのバリデーションスキーマ
 */
export const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください')
});

/**
 * ログインフォームのデータ型
 */
export type LoginFormData = z.infer<typeof loginSchema>;
