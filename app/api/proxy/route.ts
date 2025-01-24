import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const targetUrl = "http://13.212.79.188/chat/share"
  const url = new URL(request.url)
  const params = url.searchParams

  try {
    const response = await fetch(`${targetUrl}?${params.toString()}`, {
      headers: {
        Authorization: "Bearer ragflow-IzMDUxYmJlZDgwMjExZWZhOWVkMDI0Mm",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    })

    const contentType = response.headers.get("content-type")
    const html = await response.text()

    // Return the response with appropriate headers
    return new NextResponse(html, {
      headers: {
        "Content-Type": contentType || "text/html;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return new NextResponse("Error fetching content", { status: 500 })
  }
}

