import { useState } from 'react'
import html2canvas from 'html2canvas'
import { useRef } from 'react'

export default function Mood() {
  const [mood, setMood] = useState('')
  const cardRef = useRef(null)

  const moods = [
    '开心', '平静', '疲惫', '治愈', '焦虑', '温暖', '自由'
  ]

  const save = async () => {
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current)
    const link = document.createElement('a')
    link.download = 'mood-card.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="container">
      <div className="card">
        <h2>心情卡片</h2>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ padding: 10, borderRadius: 10, width: '100%', marginBottom: 20 }}
        >
          <option value="">选择心情</option>
          {moods.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {mood && (
          <div
            ref={cardRef}
            style={{
              padding: 30,
              background: '#e0f2fe',
              borderRadius: 16,
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 600,
              margin: '20px 0'
            }}
          >
            今日心情：{mood}
          </div>
        )}

        {mood && (
          <button onClick={save}>保存为图片</button>
        )}
      </div>
    </div>
  )
}
