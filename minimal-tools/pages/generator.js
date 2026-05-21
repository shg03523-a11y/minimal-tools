import Link from 'next/link'
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
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setText(texts[Math.floor(Math.random() * texts.length)])
    setCopied(false)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      alert('复制失败')
    }
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">← 返回</Link>
      <div className="card">
        <h2>文案生成</h2>
        <p style={{ fontSize: 18, margin: '16px 0', minHeight: 30 }}>
          {text || '点击下方按钮生成一句暖心文案'}
        </p>
        <div className="button-group">
          <button onClick={generate}>随机生成</button>
          <button
            className="btn-secondary"
            onClick={copy}
            disabled={!text}
          >
            {copied ? '已复制！' : '复制'}
          </button>
        </div>
      </div>
    </div>
  )
}
