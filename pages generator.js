import { useState } from 'react'

export default function Generator() {
  const texts = [
    '今天也要开心',
    '人间值得',
    '慢慢来比较快',
    '保持热爱，奔赴山海',
    '生活平凡，但也浪漫',
    '你超棒的，不要否定自己',
  ]

  const [text, setText] = useState('')

  return (
    <div className="container">
      <div className="card">
        <h2>文案生成</h2>
        <p style={{ fontSize: 18, margin: '16px 0', minHeight: 30 }}>
          {text}
        </p>
        <button onClick={() => setText(texts[Math.floor(Math.random() * texts.length)])}>
          随机生成
        </button>
      </div>
    </div>
  )
}
