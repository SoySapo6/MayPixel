"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Clock, X } from "lucide-react"

interface HistoryItem {
  url: string
  platform: string
  timestamp: number
}

export default function DownloadHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedHistory = localStorage.getItem("videoDownloadHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Error parsing history:", e)
      }
    }
  }, [])

  const addToHistory = (item: Omit<HistoryItem, "timestamp">) => {
    const newItem = { ...item, timestamp: Date.now() }
    const newHistory = [newItem, ...history].slice(0, 10) 
    setHistory(newHistory)
    localStorage.setItem("videoDownloadHistory", JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("videoDownloadHistory")
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-gray-900/80 text-white border-purple-500/50 hover:bg-gray-800 hover:text-purple-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Clock className="h-4 w-4 mr-2" />
        Histórico
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-900 border-purple-500/50 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Histórico de Downloads</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500" onClick={clearHistory}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Nenhum download no histórico</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/30"
                    >
                      <div className="flex justify-between items-start">
                        <div className="text-sm text-gray-300 truncate max-w-[200px]">{item.url}</div>
                        <div className="text-xs text-purple-400">{item.platform}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{formatDate(item.timestamp)}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
