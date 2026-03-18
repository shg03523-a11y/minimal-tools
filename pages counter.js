'use client'
import { useState } from 'react'

export default function Counter() {
  const [text, setText] = useState('')

  return (
    <div className="container">
      <div className="card">
        <h2>字数统计</h2>
        <textarea
          rows={6}
          placeholder="输入文字..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>
          总字符数：{text.length} | 汉字数：{(text.match(/[\u4e00-\u9fa5]/g) || []).length}
        </div>
      </div>
    </div>
  )
}