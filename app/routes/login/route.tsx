import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@remix-run/react';
import { Lock, LogIn, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthShell } from '~/components/layout/auth-shell';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { LoginFormData, loginSchema } from '~/types/auth';

export default function LoginRoute() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });
  const [serverError, setServerError] = useState<string | null>(null);

  const email = watch('email');
  const password = watch('password');
  const isButtonDisabled = !email || !password || !isValid;

  useEffect(() => {
    setServerError(null);
  }, [email, password]);

  const onSubmit = async (data: LoginFormData) => {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    });

    const resData = await response.json();

    if (!response.ok) {
      // エラーメッセージを抽出
      setServerError(resData.message);
      return;
    }

    console.log(resData);
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

              {serverError && (
                <p
                  id="server-error"
                  className="text-sm text-destructive">
                  {serverError}
                </p>
              )}

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
                to="/reset-password"
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
