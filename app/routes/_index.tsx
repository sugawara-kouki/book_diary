'use client';

import { BookCard } from '~/components/book-card';
import { Shell } from '~/components/layout/shell'

export default function Home() {
  return (
    <Shell>
      <section>
        <h2 className="font-heading text-2xl font-semibold mb-6">
          現在読んでいる本
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BookCard
            title="人間失格"
            author="太宰治"
            coverUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800"
            progress={65}
          />
          <BookCard
            title="こころ"
            author="夏目漱石"
            coverUrl="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800"
            progress={30}
          />
          <BookCard
            title="山月記"
            author="中島敦"
            coverUrl="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800"
            progress={85}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">
          最近の読書活動
        </h2>
        {/* Reading activity summary component would go here */}
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">
          おすすめの本
        </h2>
        {/* Recommended books component would go here */}
      </section>
    </Shell>
  );
}
