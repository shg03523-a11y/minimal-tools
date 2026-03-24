'use client'
import { useState, useEffect } from 'react'

export default function Countdown() {
  // 初始目标时间（可作为默认值）
  const [targetDate, setTargetDate] = useState('2026-06-01')
  // 解析为Date对象（供倒计时计算使用）
  const target = new Date(targetDate)
  const [timeLeft, setTimeLeft] = useState('')
  // 用于存储定时器（方便清理）
  const [timer, setTimer] = useState(null)

  // 处理倒计时更新逻辑
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

  // 监听目标时间变化，重新初始化倒计时
  useEffect(() => {
    // 立即执行一次更新
    updateCountdown()
    // 清除旧定时器（避免多个定时器同时运行）
    if (timer) clearInterval(timer)
    // 新建每秒更新的定时器
    const newTimer = setInterval(updateCountdown, 1000)
    setTimer(newTimer)

    // 组件卸载时清理定时器
    return () => clearInterval(newTimer)
  }, [targetDate])

  // 处理用户选择日期的逻辑
  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    // 校验日期是否有效（且不能早于当前时间）
    if (selectedDate && new Date(selectedDate) > new Date()) {
      setTargetDate(selectedDate)
    } else {
      alert('请选择一个大于当前时间的有效日期！')
    }
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <div className="card" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>自定义倒计时</h2>
        
        {/* 日期选择器 */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <label style={{ marginRight: '10px', fontSize: '16px' }}>选择目标日期：</label>
          <input
            type="date"
            value={targetDate}
            onChange={handleDateChange}
            style={{
              padding: '8px 12px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            min={new Date().toISOString().split('T')[0]} // 限制选择的最小日期为今天
          />
        </div>

        {/* 倒计时展示 */}
        <div style={{ fontSize: 20, fontWeight: 500, textAlign: 'center' }}>
          距离 {targetDate} 还有：{timeLeft}
        </div>
      </div>
    </div>
  )
}
