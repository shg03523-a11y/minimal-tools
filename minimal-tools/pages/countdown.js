import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Countdown() {
  const [targetDate, setTargetDate] = useState('2026-06-01')
  const [timeLeft, setTimeLeft] = useState('')
  const timerRef = useRef(null)

  const updateCountdown = () => {
    const target = new Date(targetDate)
    const now = new Date()
    const diff = target - now
    if (diff <= 0) {
      setTimeLeft('时间到！')
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    setTimeLeft(`${d}天 ${h}时 ${m}分 ${s}秒`)
  }

  useEffect(() => {
    updateCountdown()
    timerRef.current = setInterval(updateCountdown, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [targetDate])

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    if (new Date(selectedDate) > new Date()) {
      setTargetDate(selectedDate)
    } else {
      alert('请选择一个大于当前时间的有效日期！')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="container">
      <Link href="/" className="back-link">← 返回</Link>
      <div className="card">
        <h2>自定义倒计时</h2>
        <div className="date-picker-row">
          <label style={{ marginRight: 10, fontSize: 16 }}>选择目标日期：</label>
          <input
            type="date"
            value={targetDate}
            onChange={handleDateChange}
            min={today}
          />
        </div>
        <div className="countdown-display">
          距离 {targetDate} 还有：{timeLeft}
        </div>
      </div>
    </div>
  )
}
