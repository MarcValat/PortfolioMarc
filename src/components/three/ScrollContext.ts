import { createContext } from 'react'

export const ScrollContext = createContext<{
  scrollRef: React.RefObject<number>
  limitRef: React.RefObject<number>
}>({
  scrollRef: { current: 0 },
  limitRef: { current: 1 },
})
