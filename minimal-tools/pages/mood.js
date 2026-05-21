import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const themes = [
  { name: '天蓝', style: { background: '#e0f2fe', color: '#0c4a6e' } },
  { name: '暖橙', style: { background: '#ffedd5', color: '#7c2d12' } },
  { name: '柔绿', style: { background: '#dcfce7', color: '#14532d' } },
  { name: '薰衣草', style: { background: '#f3e8ff', color: '#4c1d95' } },
  { name: '玫瑰', style: { background: '#ffe4e6', color: '#881337' } },
]

const moods = ['开心', '平静', '疲惫', '治愈', '焦虑', '温暖', '自由']

export default function Mood() {
  const [mood, setMood] = useState('')
  const [themeIndex, setThemeIndex] = useState(0)
  const [html2canvas, setHtml2canvas] = useState(null)
  const cardRef = useRef(null)

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
        scale: 2,
      })
      const link = document.createElement('a')
      link.download = `mood-${mood}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      alert('保存失败：' + e.message)
    }
  }

  const currentTheme = themes[themeIndex]

  return (
    <div className="container">
      <Link href="/" className="back-link">← 返回</Link>
      <div className="card">
        <h2>心情卡片</h2>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <option value="">选择心情</option>
          {moods.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {mood && (
          <>
            <div className="theme-selector">
              {themes.map((t, i) => (
                <div
                  key={t.name}
                  className={`theme-dot${i === themeIndex ? ' active' : ''}`}
                  style={{ background: t.style.background }}
                  onClick={() => setThemeIndex(i)}
                  title={t.name}
                />
              ))}
            </div>

            <div
              ref={cardRef}
              className="mood-card"
              style={{
                background: currentTheme.style.background,
                color: currentTheme.style.color,
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
