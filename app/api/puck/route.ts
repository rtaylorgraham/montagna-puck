import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path') || '/';

  try {
    const page = await prisma.page.findUnique({
      where: { path },
    });

    if (page) {
      return NextResponse.json(page.published ? page.data : (page.draft || page.data));
    }

    return NextResponse.json(null);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(null);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { path, data, published } = await request.json();

    const existingPage = await prisma.page.findUnique({
      where: { path },
    });

    if (existingPage) {
      // Update existing page
      const updatedPage = await prisma.page.update({
        where: { path },
        data: {
          draft: published ? null : data,
          data: published ? data : existingPage.data,
          published,
          updatedAt: new Date(),
        },
      });
      return NextResponse.json(updatedPage);
    } else {
      // Create new page
      const newPage = await prisma.page.create({
        data: {
          path,
          data: published ? data : {},
          draft: published ? null : data,
          published,
        },
      });
      return NextResponse.json(newPage);
    }
  } catch (error) {
    console.error('Error saving page:', error);
    return NextResponse.json(
      { error: 'Failed to save page' },
      { status: 500 }
    );
  }
}