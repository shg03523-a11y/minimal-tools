'use client'
import { useState } from 'react'

export default function Colors() {
  const [colors, setColors] = useState([])

  const randomColor = () =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')

  const generate = () => {
    setColors(Array.from({ length: 5 }, randomColor))
  }

  return (
    <div className="container">
      <div className="card">
        <h2>配色工具</h2>
        <button onClick={generate}>生成一组配色</button>
        <div style={{
          display: 'flex',
          gap: 10,
          marginTop: 20,
          height: 60
        }}>
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: c,
                borderRadius: 8,
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                fontWeight: 600,
                textShadow: '0 0 4px #000'
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}