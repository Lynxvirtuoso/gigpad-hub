import { NextResponse } from 'next/server';
import { fetchGitHubReleases } from '@/utils/github';

export async function GET() {
  try {
    const releases = await fetchGitHubReleases();
    return NextResponse.json(releases);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve release history' },
      { status: 500 }
    );
  }
}
