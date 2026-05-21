import Link from 'next/link'
import { useState } from 'react'

export default function Counter() {
  const [text, setText] = useState('')

  const chars = text.length
  const chineseChars = (text.match(/[一-龥]/g) || []).length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text === '' ? 0 : text.split('\n').length

  return (
    <div className="container">
      <Link href="/" className="back-link">← 返回</Link>
      <div className="card">
        <h2>字数统计</h2>
        <textarea
          rows={6}
          placeholder="输入文字..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="stats-row">
          <span className="stat-item">总字符：{chars}</span>
          <span className="stat-item">汉字：{chineseChars}</span>
          <span className="stat-item">单词：{words}</span>
          <span className="stat-item">行数：{lines}</span>
        </div>
      </div>
    </div>
  )
}
