'use client'
import { useState, useRef, useEffect } from 'react'

export default function Mood() {
  const [mood, setMood] = useState('')
  const [html2canvas, setHtml2canvas] = useState(null)
  const cardRef = useRef(null)

  const moods = ['开心', '平静', '疲惫', '治愈', '焦虑', '温暖', '自由']

  useEffect(() => {
    import('html2canvas').then(module => {
      setHtml2canvas(() => module.default)
    })
  }, [])

  const save = async () => {
    if (!cardRef.current || !html2canvas) {
      alert('正在初始化，请稍后...')
      return
    }
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        logging: false,
        scale: 2 // 提高导出图片质量
      })
      
      const link = document.createElement('a')
      link.download = `mood-${mood}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      alert('保存失败：' + e.message)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>心情卡片</h2>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ marginBottom: 20 }}
        >
          <option value="">选择心情</option>
          {moods.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {mood && (
          <>
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
            <button onClick={save}>保存为图片</button>
          </>
        )}
      </div>
    </div>
  )
}