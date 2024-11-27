import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');

    const blob = await response.blob();
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="cocktail.png"',
      },
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return new NextResponse('Failed to download image', { status: 500 });
  }
}
