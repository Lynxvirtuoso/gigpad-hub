import { GIGPAD_CONFIG } from '@/config/gigpad';

export interface ParsedReleaseNotes {
  features: string[];
  improvements: string[];
  bugFixes: string[];
  rawBody: string;
}

export interface GitHubRelease {
  version: string;
  releaseDate: string;
  apkUrl: string;
  releaseNotes: string;
  parsedNotes: ParsedReleaseNotes;
  size?: string;
  checksum?: string;
  prerelease: boolean;
  draft: boolean;
}

export function parseReleaseNotes(markdown: string): ParsedReleaseNotes {
  const features: string[] = [];
  const improvements: string[] = [];
  const bugFixes: string[] = [];

  let currentSection: 'features' | 'improvements' | 'bugFixes' | null = null;

  const lines = markdown.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const lowerLine = line.toLowerCase();
    
    // Check headers to toggle section context
    if (line.startsWith('#')) {
      if (lowerLine.includes('feature') || lowerLine.includes('add')) {
        currentSection = 'features';
      } else if (lowerLine.includes('improvement') || lowerLine.includes('enhance') || lowerLine.includes('update')) {
        currentSection = 'improvements';
      } else if (lowerLine.includes('fix') || lowerLine.includes('bug')) {
        currentSection = 'bugFixes';
      } else {
        currentSection = null;
      }
      continue;
    }

    if (line.startsWith('-') || line.startsWith('*')) {
      const bulletText = line.substring(1).trim();
      if (currentSection === 'features') {
        features.push(bulletText);
      } else if (currentSection === 'improvements') {
        improvements.push(bulletText);
      } else if (currentSection === 'bugFixes') {
        bugFixes.push(bulletText);
      }
    }
  }

  return { features, improvements, bugFixes, rawBody: markdown };
}

export async function fetchGitHubReleases(): Promise<GitHubRelease[]> {
  try {
    const res = await fetch('https://api.github.com/repos/Lynxvirtuoso/gigpad-release/releases', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GigPad-Hub-Website'
      },
      next: { revalidate: 300 } // 5 minutes caching/revalidation
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    let data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('Releases list was empty, trying to fetch latest release directly...');
      const latestRes = await fetch('https://api.github.com/repos/Lynxvirtuoso/gigpad-release/releases/latest', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GigPad-Hub-Website'
        },
        next: { revalidate: 300 }
      });
      if (latestRes.ok) {
        const latestData = await latestRes.json();
        data = [latestData];
      } else {
        throw new Error('No releases found in GitHub response');
      }
    }

    return data
      .filter((rel: any) => !rel.draft) // exclude draft releases
      .map((rel: any) => {
        // Search for an APK asset
        const apkAsset = rel.assets?.find((asset: any) => asset.name.endsWith('.apk'));
        const sizeMb = apkAsset ? `${(apkAsset.size / (1024 * 1024)).toFixed(1)} MB` : 'N/A';
        const downloadUrl = apkAsset?.browser_download_url || `https://github.com/Lynxvirtuoso/gigpad-release/releases/download/${rel.tag_name}/gigpad-${rel.tag_name}.apk`;
        const body = rel.body || '';

        return {
          version: rel.tag_name,
          releaseDate: new Date(rel.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          apkUrl: downloadUrl,
          releaseNotes: body,
          parsedNotes: parseReleaseNotes(body),
          size: sizeMb,
          prerelease: !!rel.prerelease,
          draft: !!rel.draft
        };
      });
  } catch (error) {
    console.warn('Error fetching releases from GitHub:', error);
    return [];
  }
}

export async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  const releases = await fetchGitHubReleases();
  return releases.length > 0 ? releases[0] : null;
}
