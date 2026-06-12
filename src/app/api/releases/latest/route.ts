import { NextResponse } from 'next/server';
import { fetchLatestRelease } from '@/utils/github';

export async function GET() {
  try {
    const latest = await fetchLatestRelease();
    if (!latest) {
      return NextResponse.json(
        { error: 'No releases available yet.' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      version: latest.version,
      releaseDate: latest.releaseDate,
      apkUrl: latest.apkUrl,
      releaseNotes: latest.releaseNotes,
      size: latest.size
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve latest release information' },
      { status: 500 }
    );
  }
}
