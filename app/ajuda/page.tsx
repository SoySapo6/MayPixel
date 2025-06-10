import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AnimatedBackground from "@/components/animated-background"
import Footer from "@/components/footer"
import { ArrowLeft, Youtube, FileVideo, Instagram, TwitterIcon, Facebook, HardDrive, Music } from "lucide-react"

export default function HelpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-black text-white">
      <AnimatedBackground />
      <div className="container max-w-4xl mx-auto px-4 py-8 relative z-10 flex-grow flex flex-col">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o início
            </Button>
          </Link>
        </div>

        <Card className="w-full bg-gray-900/80 backdrop-blur-sm border-purple-500/50 shadow-xl shadow-purple-900/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Como usar o Pixel Vídeos</CardTitle>
            <CardDescription className="text-gray-300">
              Guia rápido para baixar vídeos de diversas plataformas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Instruções Gerais</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-200">
                <li>Cole a URL do vídeo que deseja baixar no campo de texto</li>
                <li>Clique no botão "Buscar"</li>
                <li>Aguarde o carregamento do vídeo</li>
                <li>Quando o vídeo aparecer, clique no botão de download abaixo do player</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">Plataformas Suportadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PlatformHelp
                  icon={<Youtube className="h-5 w-5 text-red-500" />}
                  name="YouTube"
                  example="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
                <PlatformHelp
                  icon={<FileVideo className="h-5 w-5 text-cyan-400" />}
                  name="TikTok"
                  example="https://www.tiktok.com/@username/video/1234567890123456789"
                />
                <PlatformHelp
                  icon={<Instagram className="h-5 w-5 text-pink-500" />}
                  name="Instagram"
                  example="https://www.instagram.com/p/CdEfGhIjKlM/"
                />
                <PlatformHelp
                  icon={<TwitterIcon className="h-5 w-5 text-blue-400" />}
                  name="Twitter"
                  example="https://twitter.com/username/status/1234567890123456789"
                />
                <PlatformHelp
                  icon={<Facebook className="h-5 w-5 text-blue-500" />}
                  name="Facebook"
                  example="https://www.facebook.com/watch/?v=1234567890123456"
                />
                <PlatformHelp
                  icon={<Music className="h-5 w-5 text-yellow-500" />}
                  name="Kwai"
                  example="https://kwai.com/v2/user/share/1234567890123456789"
                />
                <PlatformHelp
                  icon={<HardDrive className="h-5 w-5 text-green-500" />}
                  name="Google Drive"
                  example="https://drive.google.com/file/d/1234567890abcdef/view"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">Perguntas Frequentes</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-white">O download é gratuito?</h4>
                  <p className="text-gray-300 mt-1">Sim, todos os downloads são gratuitos e sem limitações.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-white">Posso baixar vídeos privados?</h4>
                  <p className="text-gray-300 mt-1">
                    Não, apenas vídeos públicos podem ser baixados através do nosso serviço.
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-white">Qual a qualidade dos vídeos baixados?</h4>
                  <p className="text-gray-300 mt-1">
                    A qualidade depende da plataforma e do vídeo original. Geralmente, oferecemos a melhor qualidade
                    disponível.
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-white">Meus dados estão seguros?</h4>
                  <p className="text-gray-300 mt-1">
                    Sim, não armazenamos as URLs dos vídeos em nossos servidores. O histórico é salvo apenas localmente
                    no seu navegador.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  )
}

function PlatformHelp({ icon, name, example }: { icon: React.ReactNode; name: string; example: string }) {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium text-white">{name}</span>
      </div>
      <div className="text-xs text-gray-400">Exemplo:</div>
      <div className="text-sm text-gray-300 break-all mt-1">{example}</div>
    </div>
  )
}
