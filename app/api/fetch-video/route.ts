import { type NextRequest, NextResponse } from "next/server"

const API_KEY = "3e39fa09b0"
const API_BASE_URL = "https://nodz-apis.com.br/api/downloads"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const videoUrl = searchParams.get("url")
  const download = searchParams.get("download") === "true"

  if (!videoUrl) {
    return NextResponse.json({ error: "URL do vídeo é obrigatória" }, { status: 400 })
  }

  try {

    let platformEndpoint = "youtube/video"
    let platform = "youtube"

    if (videoUrl.includes("tiktok.com")) {
      platformEndpoint = "tiktok/video"
      platform = "tiktok"
    } else if (videoUrl.includes("instagram.com")) {
      platformEndpoint = "instagram/video"
      platform = "instagram"
    } else if (videoUrl.includes("twitter.com") || videoUrl.includes("x.com")) {
      platformEndpoint = "twitter/video"
      platform = "twitter"
    } else if (videoUrl.includes("facebook.com") || videoUrl.includes("fb.watch")) {
      platformEndpoint = "facebook/video"
      platform = "facebook"
    } else if (videoUrl.includes("drive.google.com")) {
      platformEndpoint = "drive/video"
      platform = "drive"
    } else if (videoUrl.includes("kwai.com") || videoUrl.includes("kw.ai")) {
      platformEndpoint = "kwai/video"
      platform = "kwai"
    }

    const apiUrl = `${API_BASE_URL}/${platformEndpoint}?url=${encodeURIComponent(videoUrl)}&apiKey=${API_KEY}`

    if (download) {
      const videoResponse = await fetch(apiUrl)

      if (!videoResponse.ok) {
        throw new Error(`API responded with status: ${videoResponse.status}`)
      }

      const contentDisposition = videoResponse.headers.get("content-disposition")
      let filename = `PixelVídeos-${Date.now()}.mp4`

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1]
        }
      } else {
        filename = `${platform}-PixelVídeos-${Date.now()}.mp4`
      }

      const contentType = videoResponse.headers.get("content-type") || "video/mp4"

      const videoBlob = await videoResponse.blob()

      return new NextResponse(videoBlob, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-cache",
        },
      })
    }

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}): ${errorText}`)
      throw new Error(`API responded with status: ${response.status}`)
    }
    
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      return NextResponse.json({
        ...data,
        downloadUrl: `/api/fetch-video?url=${encodeURIComponent(videoUrl)}&download=true`,
        platform,
      })
    } else {
    
      return NextResponse.json({
        url: apiUrl,
        downloadUrl: `/api/fetch-video?url=${encodeURIComponent(videoUrl)}&download=true`,
        platform,
      })
    }
  } catch (error) {
    console.error("Error fetching video:", error)
    return NextResponse.json({ error: "Falha ao buscar o vídeo" }, { status: 500 })
  }
}
