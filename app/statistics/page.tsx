"use client"

import { Shell } from "@/components/layout/shell"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stats/stat-card"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const readingData = [
  { date: "3/14", pages: 25 },
  { date: "3/15", pages: 30 },
  { date: "3/16", pages: 20 },
  { date: "3/17", pages: 45 },
  { date: "3/18", pages: 35 },
  { date: "3/19", pages: 40 },
  { date: "3/20", pages: 50 }
]

export default function Statistics() {
  return (
    <Shell>
      <div className="space-y-8">
        <PageHeader
          title="統計"
          description="あなたの読書活動の分析"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="今月の読了数" value="3冊" />
          <StatCard title="今月の読書時間" value="32時間" />
          <StatCard title="今月の読書ページ数" value="845ページ" />
          <StatCard title="連続読書日数" value="7日" />
        </div>

        <Card className="p-6">
          <h2 className="font-heading text-xl font-semibold mb-6">1日あたりの読書ページ数</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pages"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-heading text-xl font-semibold mb-4">ジャンル別読書量</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>小説</span>
                  <span>45%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>ビジネス</span>
                  <span>30%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[30%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>自己啓発</span>
                  <span>15%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[15%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>その他</span>
                  <span>10%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[10%]" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-heading text-xl font-semibold mb-4">読書目標の進捗</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>年間読書目標</span>
                  <span>24/50冊</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[48%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>月間読書時間目標</span>
                  <span>32/40時間</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[80%]" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Shell>
  )
}