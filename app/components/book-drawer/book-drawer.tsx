import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '~/components/ui/drawer';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import useBookDrawerHook from './hook';

export function BookDrawer() {
  const [open, setOpen] = useState(false);
  const {
    errors,
    fetcher,
    isButtonDisabled,
    register,
    onSubmit,
    handleSubmit
  } = useBookDrawerHook();

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          本を追加
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="px-6">
            <DrawerTitle>本を追加</DrawerTitle>
            <DrawerDescription>
              読みたい本や読んでいる本を追加しましょう
            </DrawerDescription>
          </DrawerHeader>
          <fetcher.Form
            method="post"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="px-6 overflow-y-auto">
              <div className="space-y-2 pb-2">
                <Label
                  htmlFor="title"
                  className="required">
                  タイトル
                </Label>
                <Input
                  id="title"
                  placeholder="本のタイトルを入力"
                  {...register('title')}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                  required
                />
                {errors.title && (
                  <p
                    id="title-error"
                    className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 pb-2">
                <Label
                  htmlFor="author"
                  className="required">
                  著者
                </Label>
                <Input
                  id="author"
                  placeholder="著者名を入力"
                  {...register('author')}
                  aria-describedby={errors.author ? 'author-error' : undefined}
                  required
                />
                {errors.author && (
                  <p
                    id="author-error"
                    className="text-sm text-destructive">
                    {errors.author.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 pb-2">
                <Label
                  htmlFor="status"
                  className="required">
                  読書状態
                </Label>
                <select
                  id="status"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  {...register('status')}
                  aria-describedby={errors.status ? 'status-error' : undefined}
                  required>
                  <option value="plan">読みたい本</option>
                  <option value="reading">読書中</option>
                  <option value="completed">読了</option>
                </select>
                {errors.status && (
                  <p
                    id="status-error"
                    className="text-sm text-destructive">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="required">ページ数</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="totalPage"
                      className="text-sm text-muted-foreground">
                      全ページ数
                    </Label>
                    <Input
                      id="totalPage"
                      type="text"
                      inputMode="numeric"
                      pattern="[1-9][0-9]*"
                      placeholder="全ページ数"
                      required
                      aria-label="全ページ数を入力"
                      aria-describedby={
                        errors.totalPage ? 'totalPage-error' : undefined
                      }
                      {...register('totalPage')}
                    />
                    {errors.totalPage ? (
                      <p
                        id="totalPage-error"
                        className="text-sm text-destructive">
                        {errors.totalPage.message}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        1以上の整数を入力してください
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter className="px-6 mt-4">
              <Button
                disabled={isButtonDisabled}
                className="w-full sm:w-auto"
                type="submit"
                onClick={() => setOpen(false)}>
                追加する
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto">
                  キャンセル
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </fetcher.Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
