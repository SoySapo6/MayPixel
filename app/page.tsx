import VideoDownloader from "@/components/video-downloader"
import AnimatedBackground from "@/components/animated-background"
import Footer from "@/components/footer"
import DownloadHistory from "@/components/download-history"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-black text-white">
      <AnimatedBackground />
      <div className="container max-w-4xl mx-auto px-4 py-8 relative z-10 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Pixel Vídeos
          </h1>
          <p className="text-center text-white mb-8">Baixe seus vídeos favoritos com apenas alguns cliques</p>
          <VideoDownloader />
        </div>
      </div>
      <Footer />
      <DownloadHistory />
    </main>
  )
}
