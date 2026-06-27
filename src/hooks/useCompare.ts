import { useCompareStore } from "../store/compareStore"

export function useCompare() {
  const items = useCompareStore((s) => s.items)
  const addItem = useCompareStore((s) => s.addItem)
  const removeItem = useCompareStore((s) => s.removeItem)
  const clearAll = useCompareStore((s) => s.clearAll)
  const isInCompare = useCompareStore((s) => s.isInCompare)
  return { items, addItem, removeItem, clearAll, isInCompare }
}
