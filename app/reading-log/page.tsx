"use client"

import { Shell } from "@/components/layout/shell"
import { PageHeader } from "@/components/page-header"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { CurrentBook } from "@/components/reading-log/current-book"
import { ReadingEntry } from "@/components/reading-log/reading-entry"

export default function ReadingLog() {
  return (
    <Shell>
      <div className="space-y-8">
        <PageHeader
          title="読書記録"
          description="日々の読書の記録と振り返り"
        />

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-6">
            <CurrentBook
              title="人間失格"
              author="太宰治"
              coverUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800"
              currentPage={156}
              totalPages={240}
              readingTime="2時間30分"
            />

            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-semibold">過去の記録</h2>
              <div className="space-y-4">
                <ReadingEntry
                  date="2024年3月20日"
                  content="主人公の葉蔵の心情描写が印象的だった。特に、他人との関係性における不安と葛藤が鮮明に描かれている部分が心に残った。"
                />
                <ReadingEntry
                  date="2024年3月19日"
                  content="序章から中盤にかけて、葉蔵の幼少期の描写が丁寧に描かれている。社会との距離感や、周囲との関係性の築き方に注目しながら読み進めた。"
                />
                <ReadingEntry
                  date="2024年3月18日"
                  content="読書を始めた。太宰治特有の文体と心理描写の深さに引き込まれる。"
                />
              </div>
            </div>
          </div>

          <div>
            <Card className="p-4">
              <Calendar
                mode="single"
                className="rounded-md border"
              />
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  )
}