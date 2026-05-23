'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown, FiChevronRight, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

// preset credentials for quick testing
const PRESETS = [
  { label: 'User A', username: 'emilys',    password: 'emilyspass'    },
  { label: 'User B', username: 'michaelw',  password: 'michaelwpass'  },
  { label: 'User C', username: 'sophiab',   password: 'sophiabpass'   },
]

// helper to decode JWT payload (no error handling for simplicity)
function decodeJWT(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch { return null }
}

function StatusBadge({ code }) {
  const ok = code >= 200 && code < 300
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
      padding: '3px 10px', borderRadius: '999px',
      background: ok ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
      border: `1px solid ${ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
      color: ok ? '#22c55e' : '#ef4444',
      letterSpacing: '0.08em',
    }}>
      {code} {ok ? 'OK' : 'ERROR'}
    </span>
  )
}

function JsonLine({ k, v, depth = 0 }) {
  const [open, setOpen] = useState(true)
  const isObj  = v !== null && typeof v === 'object' && !Array.isArray(v)
  const isArr  = Array.isArray(v)
  const indent = depth * 16

  if (isObj || isArr) {
    const entries = isArr ? v.map((x, i) => [i, x]) : Object.entries(v)
    const bracket = isArr ? ['[', ']'] : ['{', '}']
    return (
      <div style={{ paddingLeft: indent }}>
        <span>
          {k !== undefined && (
            <span style={{ color: 'var(--accent2)' }}>&quot;{k}&quot;</span>
          )}
          {k !== undefined && <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>}
          <button onClick={() => setOpen(o => !o)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem', padding: '0 4px', display: 'flex', alignItems: 'center', gap: '2px',
          }}>
            {open ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />} {bracket[0]}
            {!open && <span style={{ color: 'rgba(255,255,255,0.25)' }}>
              {isArr ? `${v.length} items` : `${entries.length} keys`}
            </span>}
            {!open && bracket[1]}
          </button>
        </span>
        {open && (
          <div>
            {entries.map(([ek, ev]) => (
              <JsonLine key={ek} k={ek} v={ev} depth={depth + 1} />
            ))}
            <span style={{ paddingLeft: 0, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              {bracket[1]}
            </span>
          </div>
        )}
      </div>
    )
  }

  const valColor = typeof v === 'string'
    ? '#86efac'
    : typeof v === 'number'
      ? '#fca5a5'
      : typeof v === 'boolean'
        ? '#fde68a'
        : 'rgba(255,255,255,0.5)'

  return (
    <div style={{ paddingLeft: indent, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', lineHeight: 1.8 }}>
      {k !== undefined && <span style={{ color: 'var(--accent2)' }}>&quot;{k}&quot;</span>}
      {k !== undefined && <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>}
      <span style={{ color: valColor }}>
        {typeof v === 'string' ? `"${v}"` : String(v)}
      </span>
    </div>
  )
}

// terminal-like log component with auto-scroll
function TerminalLog({ logs }) {
  const bottomRef = useRef(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [logs])

  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
      lineHeight: 1.9, color: 'rgba(255,255,255,0.5)',
      maxHeight: '110px', overflowY: 'auto',
      scrollbarWidth: 'none',
    }}>
      {logs.map((log, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
          <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{log.time}</span>
          <span style={{ color: log.color ?? 'rgba(255,255,255,0.5)' }}>{log.text}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

// main section component
export default function ApiDemo() {
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)

  const [username,  setUsername]  = useState('emilys')
  const [password,  setPassword]  = useState('emilyspass')
  const [showPass,  setShowPass]  = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [response,  setResponse]  = useState(null)
  const [error,     setError]     = useState(null)
  const [logs,      setLogs]      = useState([
    { time: '00:00:00', text: '> API Demo ready. Select a preset or enter credentials.', color: 'rgba(255,255,255,0.3)' },
  ])
  const [tab, setTab] = useState('response') // response | token | decoded

  const addLog = (text, color) => {
    const now = new Date()
    const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(n => String(n).padStart(2, '0')).join(':')
    setLogs(prev => [...prev, { time, text, color }])
  }

  const handleSubmit = async () => {
    if (!username || !password) return
    setLoading(true)
    setResponse(null)
    setError(null)
    setTab('response')

    addLog(`> POST https://dummyjson.com/user/login`, 'var(--accent2)')
    addLog(`> Sending credentials for "${username}"...`, 'rgba(255,255,255,0.4)')

    try {
      const res = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Login failed')

      addLog(`> ${res.status} OK — token received`, '#22c55e')
      addLog(`> JWT expires in 30 mins`, 'rgba(255,255,255,0.3)')
      setResponse({ status: res.status, data })
    } catch (err) {
      addLog(`> Error: ${err.message}`, '#ef4444')
      setError(err.message)
      setResponse({ status: 400, data: null })
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setResponse(null)
    setError(null)
    setUsername('emilys')
    setPassword('emilyspass')
    setLogs([{ time: '00:00:00', text: '> Cleared. Ready for next request.', color: 'rgba(255,255,255,0.3)' }])
  }

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      })
      gsap.from('.apidemo-panel', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        y: 48, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const decoded = response?.data?.accessToken ? decodeJWT(response.data.accessToken) : null

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.78rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  }

  const tabStyle = (key) => ({
    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '5px 14px', borderRadius: '999px',
    border: `1px solid ${tab === key ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
    background: tab === key ? 'rgba(99,102,241,0.15)' : 'transparent',
    color: tab === key ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
    cursor: 'pointer', transition: 'all 0.2s ease',
  })

  return (
    <section
      ref={sectionRef}
      id="api-demo"
      style={{
        position: 'relative', width: '100%',
        padding: '120px 0 140px',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* bg decoration */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* header */}
        <div ref={headerRef} style={{ marginBottom: '56px' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.3em', color: 'var(--accent)',
            textTransform: 'uppercase', marginBottom: '14px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--accent)' }} />
            API Integration
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em',
            lineHeight: 1.05, margin: '0 0 14px',
          }}>
            Login API{' '}
            <span style={{ WebkitTextStroke: '1px var(--accent)', color: 'transparent' }}>
              Demo
            </span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: 'var(--text-muted)', letterSpacing: '0.03em',
          }}>
            Live fetch ke{' '}
            <span style={{ color: 'var(--accent2)' }}>dummyjson.com/user/login</span>
            {' '}— JWT token handling, decoded payload, real API response.
          </p>
        </div>

        {/* 2 panel layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}>

          {/* form */}
          <div className="apidemo-panel" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px', padding: '28px',
            display: 'flex', flexDirection: 'column', gap: '20px',
          }}>
            {/* panel header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '3px', height: '18px', borderRadius: '2px', background: 'var(--accent)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
              }}>Request Config</span>
            </div>

            {/* Endpoint pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 14px', borderRadius: '10px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.18)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                padding: '2px 8px', borderRadius: '999px',
                background: 'rgba(99,102,241,0.2)', color: 'var(--accent)',
                letterSpacing: '0.06em', flexShrink: 0,
              }}>POST</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.5)', overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                /user/login
              </span>
            </div>

            {/* Presets */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)', marginBottom: '8px',
              }}>Quick Presets</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {PRESETS.map(p => (
                  <button key={p.label}
                    onClick={() => { setUsername(p.username); setPassword(p.password) }}
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                      padding: '5px 12px', borderRadius: '999px',
                      background: username === p.username ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${username === p.username ? 'rgba(99,102,241,0.45)' : 'rgba(255,255,255,0.08)'}`,
                      color: username === p.username ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div>
              <label style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '6px',
              }}>Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. emilys"
                style={inputStyle}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(99,102,241,0.5)'
                  e.target.style.boxShadow   = '0 0 0 3px rgba(99,102,241,0.1)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.target.style.boxShadow   = 'none'
                }}
              />
            </div>

            {/* pw */}
            <div>
              <label style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)', display: 'block', marginBottom: '6px',
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="password"
                  style={{ ...inputStyle, paddingRight: '44px' }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(99,102,241,0.5)'
                    e.target.style.boxShadow   = '0 0 0 3px rgba(99,102,241,0.1)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.target.style.boxShadow   = 'none'
                  }}
                />
                <button onClick={() => setShowPass(s => !s)} style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)',
                  padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'color 0.2s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSubmit}
                disabled={loading || !username || !password}
                style={{
                  flex: 1, padding: '11px 0', borderRadius: '10px',
                  background: loading ? 'rgba(99,102,241,0.4)' : 'var(--accent)',
                  border: '1px solid var(--accent)',
                  color: '#fff', fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: loading ? 'none' : '0 0 20px rgba(99,102,241,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      display: 'inline-block', width: '12px', height: '12px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff', borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite',
                    }} />
                    Fetching...
                  </>
                ) : (
                  <>
                    <FiCheck size={14} />
                    Execute
                  </>
                )}
              </button>
              <button onClick={handleClear} style={{
                padding: '11px 16px', borderRadius: '10px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.color = '#ef4444' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
              >
                Clear
              </button>
            </div>

            {/* Terminal log */}
            <div style={{
              padding: '14px', borderRadius: '10px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)',
                textTransform: 'uppercase', marginBottom: '8px',
              }}>Terminal</p>
              <TerminalLog logs={logs} />
            </div>
          </div>

          {/* ── RIGHT — Response Panel ── */}
          <div className="apidemo-panel" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px', padding: '28px',
            minHeight: '480px',
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            {/* Panel header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '3px', height: '18px', borderRadius: '2px', background: 'var(--accent2)' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>Response</span>
              </div>
              {response && <StatusBadge code={response.status} />}
            </div>

            {/* Tabs */}
            {response?.data && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['response', 'token', 'decoded'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={tabStyle(t)}>
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* Content */}
            <div style={{
              flex: 1, borderRadius: '10px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '16px',
              overflowY: 'auto', maxHeight: '420px',
              scrollbarWidth: 'none',
            }}>
              <AnimatePresence mode="wait">
                {/* Empty state */}
                {!response && !loading && (
                  <motion.div key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{
                      height: '100%', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: '12px',
                      paddingTop: '60px',
                    }}
                  >
                    <div style={{ fontSize: '2rem', opacity: 0.2 }}>⚡</div>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.6,
                    }}>
                      Response will appear here.<br />Hit Execute to fetch.
                    </p>
                  </motion.div>
                )}

                {/* Loading */}
                {loading && (
                  <motion.div key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px' }}
                  >
                    {[100, 70, 85, 55, 90].map((w, i) => (
                      <div key={i} style={{
                        height: '12px', borderRadius: '4px', width: `${w}%`,
                        background: 'rgba(255,255,255,0.06)',
                        animation: `skeleton-pulse 1.4s ease infinite ${i * 0.1}s`,
                      }} />
                    ))}
                  </motion.div>
                )}

                {/* Error */}
                {!loading && error && (
                  <motion.div key="error"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#f87171', lineHeight: 1.8 }}
                  >
                    <div style={{ marginBottom: '8px', color: '#ef4444', fontWeight: 700 }}>✖ Request Failed</div>
                    {error}
                  </motion.div>
                )}

                {/* Response tab */}
                {!loading && response?.data && tab === 'response' && (
                  <motion.div key="response-tab"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  >
                    {Object.entries(response.data)
                      .filter(([k]) => k !== 'accessToken' && k !== 'refreshToken')
                      .map(([k, v]) => <JsonLine key={k} k={k} v={v} />)
                    }
                  </motion.div>
                )}

                {/* Token tab */}
                {!loading && response?.data && tab === 'token' && (
                  <motion.div key="token-tab"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    {['accessToken', 'refreshToken'].map(key => (
                      response.data[key] && (
                        <div key={key}>
                          <p style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.2)', marginBottom: '6px',
                          }}>{key}</p>
                          <div style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                            color: '#86efac', wordBreak: 'break-all', lineHeight: 1.7,
                            padding: '10px', borderRadius: '8px',
                            background: 'rgba(134,239,172,0.05)',
                            border: '1px solid rgba(134,239,172,0.12)',
                          }}>
                            {response.data[key]}
                          </div>
                        </div>
                      )
                    ))}
                  </motion.div>
                )}

                {/* Decoded JWT tab */}
                {!loading && response?.data && tab === 'decoded' && decoded && (
                  <motion.div key="decoded-tab"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      color: 'rgba(255,255,255,0.2)', marginBottom: '12px', letterSpacing: '0.1em',
                    }}>// JWT Payload Decoded</p>
                    {Object.entries(decoded).map(([k, v]) => <JsonLine key={k} k={k} v={v} />)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}