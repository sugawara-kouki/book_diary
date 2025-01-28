"use client"

import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock } from "lucide-react"

interface CurrentBookProps {
  title: string
  author: string
  coverUrl: string
  currentPage: number
  totalPages: number
  readingTime: string
}

export function CurrentBook({
  title,
  author,
  coverUrl,
  currentPage,
  totalPages,
  readingTime
}: CurrentBookProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative aspect-[3/4] w-20">
            <img
              src={coverUrl}
              alt={title}
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold">{title}</h2>
            <p className="text-muted-foreground">{author}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>現在のページ: {currentPage}/{totalPages}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>読書時間: {readingTime}</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">今日の感想</label>
          <Textarea
            placeholder="今日読んだ部分の感想や印象に残った箇所を記録しましょう..."
            className="min-h-[150px]"
          />
        </div>

        <Button className="w-full">記録を保存</Button>
      </div>
    </Card>
  )
}