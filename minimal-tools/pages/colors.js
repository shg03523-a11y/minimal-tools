import Link from 'next/link'
import { useState } from 'react'

export default function Colors() {
  const [colors, setColors] = useState([])
  const [locked, setLocked] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const randomColor = () =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')

  const generate = () => {
    if (colors.length === 0) {
      const newColors = Array.from({ length: 5 }, randomColor)
      setColors(newColors)
      setLocked(new Array(5).fill(false))
      return
    }
    setColors(colors.map((c, i) => (locked[i] ? c : randomColor())))
  }

  const toggleLock = (i) => {
    setLocked(locked.map((l, idx) => (idx === i ? !l : l)))
  }

  const copyColor = async (color, i) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedIndex(i)
      setTimeout(() => setCopiedIndex(null), 1200)
    } catch {
      alert('复制失败')
    }
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">← 返回</Link>
      <div className="card">
        <h2>配色工具</h2>
        <button onClick={generate}>
          {colors.length === 0 ? '生成一组配色' : '重新生成'}
        </button>
        {colors.length > 0 && (
          <div>
            <div className="color-swatches">
              {colors.map((c, i) => (
                <div
                  key={i}
                  className="color-swatch"
                  style={{ background: c }}
                  onClick={() => copyColor(c, i)}
                  title="点击复制色值"
                >
                  {copiedIndex === i ? '已复制！' : c}
                </div>
              ))}
            </div>
            <div className="color-swatches" style={{ height: 'auto', marginTop: 8 }}>
              {colors.map((c, i) => (
                <button
                  key={i}
                  className="lock-btn"
                  style={{ flex: 1 }}
                  onClick={() => toggleLock(i)}
                >
                  {locked[i] ? '🔒 锁定' : '🔓 解锁'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
