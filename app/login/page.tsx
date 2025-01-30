'use client';

import { AuthShell } from '@/components/layout/auth-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, LogIn, Mail } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const email = watch('email');
  const password = watch('password');
  const isButtonDisabled = !email || !password || !isValid;

  const onSubmit = async (data: LoginFormData) => {
    // TODO: ログイン処理の実装
    console.log(data);
  };

  return (
    <AuthShell>
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="font-heading text-2xl font-bold">
                アカウントにログイン
              </h1>
              <p className="text-muted-foreground mt-2">
                読書記録を始めましょう
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-9"
                    {...register('email')}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    {...register('password')}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                  />
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className={`w-full gap-2 transition-all duration-200 ${
                  isButtonDisabled
                    ? 'bg-plum-light text-plum opacity-50 cursor-not-allowed'
                    : 'bg-plum hover:bg-plum-dark text-white shadow-sm hover:shadow-md'
                }`}
                disabled={isButtonDisabled}>
                <LogIn className="h-4 w-4" />
                ログイン
              </Button>
            </form>

            <div className="text-center">
              <Link
                href="/reset-password"
                className="text-sm text-primary-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                パスワードをお忘れですか？
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </AuthShell>
  );
}
