import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState('')
  const target = new Date('2026-06-01') // 可改成你想要的日期

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = target - now
      if (diff <= 0) {
        setTimeLeft('时间到！')
        return
      }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${d}天 ${h}时 ${m}分 ${s}秒`)
    }, 1000)
    return () => clearInterval(timer)
  }, [target])

  return (
    <div className="container">
      <div className="card">
        <h2>倒计时</h2>
        <div style={{ fontSize: 20, fontWeight: 500 }}>
          {timeLeft}
        </div>
      </div>
    </div>
  )
}
