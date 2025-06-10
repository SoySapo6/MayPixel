"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Download,
  Loader2,
  Youtube,
  AlertCircle,
  ExternalLink,
  Instagram,
  TwitterIcon,
  Facebook,
  HardDrive,
  Globe,
  FileVideo,
  Music,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import LoadingAnimation from "./loading-animation"
import { useToast } from "@/hooks/use-toast"

type VideoSource = "youtube" | "tiktok" | "instagram" | "twitter" | "facebook" | "drive" | "kwai" | "other" | null

interface VideoData {
  url: string
  downloadUrl: string
  title?: string
  thumbnail?: string
  duration?: string
  platform?: string
}

export default function VideoDownloader() {
  const [url, setUrl] = useState("")
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState("")
  const [videoSource, setVideoSource] = useState<VideoSource>(null)
  const { toast } = useToast()

  const detectVideoSource = (url: string): VideoSource => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube"
    } else if (url.includes("tiktok.com")) {
      return "tiktok"
    } else if (url.includes("instagram.com")) {
      return "instagram"
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      return "twitter"
    } else if (url.includes("facebook.com") || url.includes("fb.watch")) {
      return "facebook"
    } else if (url.includes("drive.google.com")) {
      return "drive"
    } else if (url.includes("kwai.com") || url.includes("kw.ai")) {
      return "kwai"
    } else if (url.includes("http")) {
      return "other"
    }
    return null
  }

  const getSourceIcon = (source: VideoSource) => {
    switch (source) {
      case "youtube":
        return <Youtube className="h-5 w-5 text-red-500" />
      case "tiktok":
        return <FileVideo className="h-5 w-5 text-cyan-400" />
      case "instagram":
        return <Instagram className="h-5 w-5 text-pink-500" />
      case "twitter":
        return <TwitterIcon className="h-5 w-5 text-blue-400" />
      case "facebook":
        return <Facebook className="h-5 w-5 text-blue-500" />
      case "drive":
        return <HardDrive className="h-5 w-5 text-green-500" />
      case "kwai":
        return <Music className="h-5 w-5 text-yellow-500" />
      case "other":
        return <Globe className="h-5 w-5 text-gray-400" />
      default:
        return null
    }
  }

  const getSourceColor = (source: VideoSource) => {
    switch (source) {
      case "youtube":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "tiktok":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
      case "instagram":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20"
      case "twitter":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20"
      case "facebook":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "drive":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "kwai":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "other":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      default:
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    }
  }

  const getPlatformName = (source: VideoSource) => {
    switch (source) {
      case "youtube":
        return "YouTube"
      case "tiktok":
        return "TikTok"
      case "instagram":
        return "Instagram"
      case "twitter":
        return "Twitter"
      case "facebook":
        return "Facebook"
      case "drive":
        return "Google Drive"
      case "kwai":
        return "Kwai"
      case "other":
        return "Outro"
      default:
        return ""
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    setVideoSource(detectVideoSource(newUrl))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      setError("Por favor, insira uma URL de vídeo")
      return
    }

    setIsLoading(true)
    setError("")
    setVideoData(null)

    try {
      const response = await fetch(`/api/fetch-video?url=${encodeURIComponent(url)}`)

      if (!response.ok) {
        throw new Error("Falha ao buscar o vídeo")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (typeof window !== "undefined") {
        try {
          const historyStr = localStorage.getItem("videoDownloadHistory") || "[]"
          const history = JSON.parse(historyStr)
          const newHistory = [
            {
              url: url,
              platform: videoSource || "other",
              timestamp: Date.now(),
            },
            ...history,
          ].slice(0, 10)

          localStorage.setItem("videoDownloadHistory", JSON.stringify(newHistory))
        } catch (e) {
          console.error("Error saving to history:", e)
        }
      }

      setVideoData({
        url: data.url || data.download_url || data.media_url || data,
        downloadUrl: data.downloadUrl || `/api/fetch-video?url=${encodeURIComponent(url)}&download=true`,
        title: data.title || "",
        thumbnail: data.thumbnail || "",
        platform: data.platform || videoSource || "other",
      })

      toast({
        title: "Vídeo carregado com sucesso!",
        description: "Clique no botão de download para baixar o vídeo.",
        variant: "success",
      })
    } catch (err: any) {
      setError(`Falha ao buscar o vídeo: ${err.message || "Verifique a URL e tente novamente."}`)
      console.error(err)

      toast({
        title: "Erro ao carregar vídeo",
        description: err.message || "Verifique a URL e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!videoData?.downloadUrl) return

    try {
      setIsDownloading(true)

      const link = document.createElement("a")
      link.href = videoData.downloadUrl
      link.setAttribute("download", "") 
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download iniciado!",
        description: "Seu vídeo está sendo baixado.",
        variant: "success",
      })
    } catch (error) {
      console.error("Download error:", error)
      setError("Erro ao baixar o vídeo. Tente novamente.")

      toast({
        title: "Erro ao baixar vídeo",
        description: "Ocorreu um erro ao iniciar o download. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsDownloading(false)
      }, 2000)
    }
  }

  return (
    <Card className="w-full bg-gray-900/80 backdrop-blur-sm border-purple-500/50 shadow-xl shadow-purple-900/20">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Cole a URL do vídeo aqui..."
                value={url}
                onChange={handleUrlChange}
                className="flex-1 bg-gray-800 border-gray-700 focus:border-purple-500 text-white pl-10 pr-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {videoSource ? getSourceIcon(videoSource) : <ExternalLink className="h-4 w-4 text-gray-400" />}
              </div>
              {videoSource && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Badge variant="outline" className={`text-xs ${getSourceColor(videoSource)}`}>
                    {getPlatformName(videoSource)}
                  </Badge>
                </div>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg shadow-purple-900/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando
                </>
              ) : (
                "Buscar"
              )}
            </Button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isLoading && <LoadingAnimation />}

        {!isLoading && videoData && (
          <div className="mt-6 space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black border border-purple-500/30 shadow-lg shadow-purple-900/20">
              <video src={videoData.url} controls className="w-full h-full">
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>

            {videoData.title && (
              <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium">{videoData.title}</h3>
                {videoData.platform && (
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-400 mr-2">Fonte:</span>
                    <Badge variant="outline" className={`text-xs ${getSourceColor(videoData.platform as VideoSource)}`}>
                      {getPlatformName(videoData.platform as VideoSource)}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg shadow-purple-900/30 py-6 text-lg group"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Baixando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-6 w-6 group-hover:animate-bounce" />
                  Download
                </>
              )}
            </Button>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-white text-lg font-medium mb-4">Plataformas Suportadas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <PlatformCard icon={<Youtube className="h-6 w-6 text-red-500" />} name="YouTube" />
            <PlatformCard icon={<FileVideo className="h-6 w-6 text-cyan-400" />} name="TikTok" />
            <PlatformCard icon={<Instagram className="h-6 w-6 text-pink-500" />} name="Instagram" />
            <PlatformCard icon={<TwitterIcon className="h-6 w-6 text-blue-400" />} name="Twitter" />
            <PlatformCard icon={<Facebook className="h-6 w-6 text-blue-500" />} name="Facebook" />
            <PlatformCard icon={<Music className="h-6 w-6 text-yellow-500" />} name="Kwai" />
            <PlatformCard icon={<HardDrive className="h-6 w-6 text-green-500" />} name="Google Drive" />
            <PlatformCard icon={<Globe className="h-6 w-6 text-purple-400" />} name="Outros Sites" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PlatformCard({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors hover:bg-gray-800/80 group">
      <div className="transform group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-sm font-medium text-white">{name}</span>
    </div>
  )
}
