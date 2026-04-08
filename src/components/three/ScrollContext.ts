import { createContext } from 'react'

export const ScrollContext = createContext<{ scrollRef: React.RefObject<number> }>({
  scrollRef: { current: 0 },
})
