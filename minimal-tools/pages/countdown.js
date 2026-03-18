'use client'
import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState('')
  const target = new Date('2026-06-01') // 可修改目标日期

  useEffect(() => {
    const updateCountdown = () => {
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
    }

    // 初始化执行一次
    updateCountdown()
    // 每秒更新一次
    const timer = setInterval(updateCountdown, 1000)
    
    // 清理定时器
    return () => clearInterval(timer)
  }, [target])

  return (
    <div className="container">
      <div className="card">
        <h2>倒计时</h2>
        <div style={{ fontSize: 20, fontWeight: 500 }}>
          距离 2026-06-01 还有：{timeLeft}
        </div>
      </div>
    </div>
  )
}
