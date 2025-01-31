import { ActionFunction, json } from '@remix-run/node';
import { loginSchema } from '~/types/auth';

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return json({ message: '入力内容に誤りがあります。' }, { status: 400 });
  }

  // フォームデータを取得して、各値を変数に格納
  const { email, password } = result.data;

  // TODO:: 認証ロジック. DBからデータを取得して、ユーザが存在しているか確かめる
  if (email === 'k-sugawara@pro-vision.jp' && password === 'Kouki_1027') {
    return json({ message: 'ログインに成功しました。' }, { status: 200 });
  }

  return json(
    { message: 'メールアドレスまたはパスワードが正しくありません。' },
    { status: 401 }
  );
};
