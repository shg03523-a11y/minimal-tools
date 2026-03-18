'use client'
import Link from 'next/link'

export default function Home() {
  const tools = [
    { name: '文案生成', path: '/generator' },
    { name: '配色工具', path: '/colors' },
    { name: '字数统计', path: '/counter' },
    { name: '心情卡片', path: '/mood' },
    { name: '倒计时', path: '/countdown' },
    { name: '关于我', path: '/about' },
  ]

  return (
    <div className="container">
      <h1>Minimal Tools</h1>
      {tools.map((t) => (
        <div className="card" key={t.path}>
          <Link href={t.path}>{t.name}</Link>
        </div>
      ))}
    </div>
  )
}
