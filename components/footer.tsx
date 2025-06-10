import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Github, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 bg-gray-900/60 backdrop-blur-sm border-t border-purple-900/30 mt-12 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Pixel Vídeos
            </h3>
            <p className="text-gray-200 text-sm">Baixe seus vídeos favoritos com facilidade</p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/ajuda">
              <Button
                variant="outline"
                size="sm"
                className="bg-purple-600/20 text-purple-300 border-purple-500/50 hover:bg-purple-700/30 hover:text-white"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Ajuda
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <p className="text-gray-200 text-sm mr-1">Redes:</p>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-purple-400 hover:text-white hover:bg-purple-600"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-purple-400 hover:text-white hover:bg-purple-600"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-purple-400 hover:text-white hover:bg-purple-600"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-purple-400 hover:text-white hover:bg-purple-600"
              >
                <Youtube size={18} />
                <span className="sr-only">Youtube</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-purple-400 hover:text-white hover:bg-purple-600"
              >
                <Github size={18} />
                <span className="sr-only">Github</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-300 text-xs">
          &copy; {new Date().getFullYear()} Pixel Vídeos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
