import { zodResolver } from '@hookform/resolvers/zod';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BookShelfApiResponse } from '~/types/api-response';
import { BookInputType, bookInputSchema } from '~/types/book';

const useBookDrawerHook = () => {
  const fetcher = useFetcher<BookShelfApiResponse>();
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<BookInputType>({
    resolver: zodResolver(bookInputSchema),
    mode: 'all'
  });

  const title = watch('title');
  const author = watch('author');
  const status = watch('status');
  const isButtonDisabled = !title || !author || !status || !isValid;

  const onSubmit = async (submitData: BookInputType) => {
    // データ登録ルートにpost
    await fetcher.submit(submitData, {
      method: 'post',
      action: '/api/bookshelf/create'
    });
    // フォームをリセット
    reset();
  };

  useEffect(() => {
    const fetchData = fetcher?.data;
    if (!fetchData) {
      return;
    }

    // レスポンスの成功フラグを見て、画面に表示するメッセージを分岐
    if (fetchData.success) {
      toast.success('データを正常に登録しました。');
    } else {
      toast.error(fetchData.error);
    }
  }, [fetcher.data]);

  return {
    errors,
    fetcher,
    isButtonDisabled,
    register,
    onSubmit,
    handleSubmit
  };
};

export default useBookDrawerHook;
