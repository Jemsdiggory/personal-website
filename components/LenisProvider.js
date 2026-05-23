'use client'

import { useLenis } from '@/hooks/useLenis'

export default function LenisProvider({ children }) {
  useLenis()

  return <>{children}</>
}