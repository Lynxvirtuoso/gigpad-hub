export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ReleaseInfo {
  version: string;
  releaseDate: string;
  fileSize: string;
  downloadUrl: string; // Configuration placeholder for future integration
  checksum?: string;
}

export interface ChangelogEntry {
  version: string;
  releaseDate: string;
  isLatest?: boolean;
  features: string[];
  improvements: string[];
  bugFixes: string[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface DocArticle {
  slug: string;
  title: string;
  category: string;
  content: string; // Markdown content
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export const GIGPAD_CONFIG = {
  projectName: 'GigPad',
  tagline: 'Your Digital Songbook for Every Performance',
  altTagline: 'Manage Songs. Detect Chords. Perform Better.',
  description: 'GigPad is a free, modern Android application for musicians, worship teams, bands, and performers to seamlessly manage songs, transpose chords, detect keys, and build custom setlists for live performances.',
  
  release: {
    version: 'v1.4.2',
    releaseDate: 'June 08, 2026',
    fileSize: '16.4 MB',
    downloadUrl: '#', // Config placeholder
    checksum: 'sha256-4c28f118a8f56ef4827d09b626d7f02d08de32810a9042b947c94df6d8e2026b'
  } as ReleaseInfo,

  stats: [
    { label: 'Total Downloads', value: '4.8k+', description: 'Total installs from all release channels' },
    { label: 'Current Release', value: 'v1.4.2', description: 'Active version released June 2026' },
    { label: 'Community Feedback', value: '180+', description: 'Submissions and feature requests' },
    { label: 'Offline Compatibility', value: '100%', description: 'No internet connection required' }
  ] as StatItem[],

  features: [
    {
      id: 'song-editor',
      title: 'Built-in Song Editor',
      description: 'Create and edit songs using clean ChordPro notation or standard plain text formats. Highlight chords, add comments, and format sections easily.',
      iconName: 'FileText'
    },
    {
      id: 'chord-detection',
      title: 'Smart Chord Detection',
      description: 'Automatically analyze lyrics text to detect chords, aligning them beautifully above lyrics, and prepare them for seamless transposing.',
      iconName: 'SearchCode'
    },
    {
      id: 'song-library',
      title: 'Dynamic Song Library',
      description: 'Organize your entire repertoire. Categorize by artist, key, tempo, tags, or custom collections with easy search and filter options.',
      iconName: 'Library'
    },
    {
      id: 'fast-search',
      title: 'Lightning-Fast Search',
      description: 'Search songs by title, lyrics snippet, artist, or tags in milliseconds. Never experience delays during live performances.',
      iconName: 'Search'
    },
    {
      id: 'setlists',
      title: 'Live Setlist Planner',
      description: 'Build, order, and save setlists for worship sets, gigs, or practice sessions. Swipe between songs seamlessly on stage.',
      iconName: 'Layers'
    },
    {
      id: 'offline-access',
      title: '100% Offline Access',
      description: 'Your library is stored locally on your device. Access all chords, lyrics, and setlists offline without requiring cell service or WiFi.',
      iconName: 'WifiOff'
    },
    {
      id: 'chord-transposition',
      title: 'Instant Transposition',
      description: 'Change the key of any song instantly with one tap. Supports flats/sharps formatting and capoing configuration.',
      iconName: 'Music'
    },
    {
      id: 'performance-mode',
      title: 'Optimized Performance Mode',
      description: 'Toggle auto-scrolling, keep screen awake, and use large text sizes designed specifically for dark stages and music stands.',
      iconName: 'PlayCircle'
    },
    {
      id: 'auto-save',
      title: 'Auto-Save System',
      description: 'Never lose a song tweak. Every edit, transpose choice, and setlist order modification is saved immediately to local storage.',
      iconName: 'Save'
    },
    {
      id: 'cloud-sync',
      title: 'Future Cloud Sync',
      description: 'Upcoming optional cloud integration to backup, sync, and share your song libraries across multiple devices and team members.',
      iconName: 'Cloud'
    }
  ] as Feature[],

  changelog: [
    {
      version: 'v1.4.2',
      releaseDate: 'June 08, 2026',
      isLatest: true,
      features: [
        'Added chord transposition support using a slider control',
        'Implemented auto-scroll with adjustable speed presets'
      ],
      improvements: [
        'Enhanced chord recognition accuracy for complex jazz extensions (e.g., Cmaj7, Am9)',
        'Updated UI layout for tablet devices to support split screen side-by-side mode'
      ],
      bugFixes: [
        'Fixed issue where screen would turn off while in performance mode',
        'Resolved crash when importing corrupted ChordPro files'
      ]
    },
    {
      version: 'v1.3.0',
      releaseDate: 'April 20, 2026',
      features: [
        'Introduced Setlists Manager to group songs for specific events',
        'Added PDF and Text file import helper tools'
      ],
      improvements: [
        'Reduced app bundle size by optimizing local database structures',
        'Improved fast search indexing performance'
      ],
      bugFixes: [
        'Fixed chord wrapping issues on smaller screens',
        'Corrected text encoding bugs when exporting lyrics'
      ]
    },
    {
      version: 'v1.2.0',
      releaseDate: 'February 15, 2026',
      features: [
        'Created custom Song Editor with syntax highlighting for chords',
        'Added basic dark mode styling toggle'
      ],
      improvements: [
        'Redesigned song view page with custom font sizing controls'
      ],
      bugFixes: [
        'Fixed cursor jumping bug in editor screen'
      ]
    }
  ] as ChangelogEntry[],

  roadmap: [
    {
      id: 'rm-1',
      title: 'Smart Chord Transposer',
      description: 'Allow instant transposition of chord symbols to any key with custom flat/sharp preferences.',
      status: 'completed'
    },
    {
      id: 'rm-2',
      title: 'Auto-Scroll & Setlists',
      description: 'Add auto-scrolling options for long sheets and simple setlist ordering capabilities.',
      status: 'completed'
    },
    {
      id: 'rm-3',
      title: 'Cloud Backup & Sync',
      description: 'Optional secure user accounts to backup databases and sync sets across Android devices.',
      status: 'in-progress'
    },
    {
      id: 'rm-4',
      title: 'Worship/Band Team Sharing',
      description: 'Share song edits and active setlists to worship/band members directly within the app.',
      status: 'planned'
    },
    {
      id: 'rm-5',
      title: 'iOS Application Version',
      description: 'Port the songbook experience to iOS, built using React Native or Compose Multiplatform.',
      status: 'planned'
    },
    {
      id: 'rm-6',
      title: 'MIDI Bluetooth Controller Support',
      description: 'Connect bluetooth page-turner pedals or MIDI controllers to trigger scrolling and next-song actions.',
      status: 'planned'
    }
  ] as RoadmapItem[],

  faqs: [
    {
      question: 'Is GigPad free?',
      answer: 'Yes! GigPad is completely free to download and use. There are no ads, paywalls, or locked features. All core utilities, editors, transposition tools, and setlist features are fully accessible.'
    },
    {
      question: "Why isn't GigPad on the Google Play Store?",
      answer: 'GigPad is currently distributed as an APK file to avoid Google Developer fees and policies, allowing us to maintain this project as a 100% free, open-source hobby utility for performers without operational overhead. We might submit to Google Play Store and F-Droid in the future.'
    },
    {
      question: 'How do I update GigPad to the latest version?',
      answer: 'You can update GigPad by downloading the latest APK version from this official website and running the installer. Android will install the update over your current app without deleting your local song library or setlists.'
    },
    {
      question: 'Does GigPad work offline?',
      answer: 'Absolutely. GigPad is designed offline-first. Your entire song library, custom editors, and setlist planners run locally on your Android device database. You do not need any active internet or cellular connection during rehearsals or live shows.'
    },
    {
      question: 'How do I report bugs or submit feature suggestions?',
      answer: 'We love community feedback! You can submit bug reports, request new features, or share general feedback through our Feedback Portal on this website, or file an issue directly on our official GitHub repository.'
    }
  ] as FAQItem[],

  docs: [
    {
      slug: 'installing-gigpad',
      title: 'Installing GigPad',
      category: 'Getting Started',
      content: `### Installing GigPad via APK

Because GigPad is currently distributed outside of the Google Play Store, you will need to perform a simple side-loading installation.

#### Step 1: Download the APK
Visit the **Download Center** on our home page or [Downloads](/downloads) page and tap the **Download APK** button to fetch the latest version of the app (\`gigpad-v1.4.2.apk\`).

#### Step 2: Enable "Unknown Sources"
If you haven't installed apps outside the Play Store before, your device might show a security warning.
1. Open your device **Settings**.
2. Navigate to **Security** or **Privacy**.
3. Locate **Install Unknown Apps** or **Unknown Sources** and toggle the permission to **Allowed** for your browser or file manager.

#### Step 3: Install the File
1. Open your device's **Downloads** folder using a file manager.
2. Tap the downloaded file \`gigpad-v1.4.2.apk\`.
3. Select **Install** when prompted by the package installer.
4. Once completed, tap **Open** or find GigPad in your app drawer.

> [!NOTE]
> Installing updates follows the same steps. Your current data is fully safe and will not be overwritten or lost during updates.`
    },
    {
      slug: 'creating-songs',
      title: 'Creating Songs',
      category: 'Song Library',
      content: `### Creating and Adding Songs

GigPad lets you add songs to your digital library using standard text formats or the flexible ChordPro notation.

#### How to Add a Song
1. Open GigPad and tap the floating **+ (Add)** button on the bottom right of the home screen.
2. Choose **Create New Song**.
3. Fill in the song details:
   - **Title**: The name of the song.
   - **Artist/Author**: Optional field for search filters.
   - **Key**: The native musical key of the song (e.g., G, C, Am).
   - **Tempo (BPM)**: Set the tempo if you want to use auto-scroll helpers.

#### Using ChordPro Notation
ChordPro is a simple markdown format for placing chords inline inside brackets. GigPad parses chords automatically:
\`\`\`text
{title: Amazing Grace}
{artist: John Newton}

[G]Amazing [G7]grace, how [C]sweet the [G]sound
That [G]saved a [Em]wretch like [A7]me[D7]
\`\`\`

#### Plain Text Input
You can also write standard lyrics with chords on lines above lyrics:
\`\`\`text
G        G7         C          G
Amazing grace, how sweet the sound
\`\`\`
GigPad's analyzer will automatically detect chords on separate lines and group them together.`
    },
    {
      slug: 'managing-songs',
      title: 'Managing Songs',
      category: 'Song Library',
      content: `### Managing Your Repertoire

Keep your digital songbook clean, categorized, and searchable.

#### Editing Existing Songs
To edit a song, open it in the viewer screen, then tap the **Edit (Pencil)** icon in the top header. You can change text, relocate chords, or update metadata.

#### Categorization & Tags
- **Favorites**: Tap the star icon next to a song to pin it to your favorites category.
- **Search Filters**: Use the search input to instantly filter by song title or lyrics contents.
- **Filter by Key**: View only songs written in a specific key to plan transitions.
- **Archive/Delete**: Swipe left on any item in the song library view to delete or archive.`
    },
    {
      slug: 'chord-detection',
      title: 'Chord Detection & Parsing',
      category: 'Advanced Features',
      content: `### Chord Detection Capabilities

GigPad includes a built-in parser that analyzes song sheets and isolates chord symbols (like \`Cmaj7\`, \`F#min/A\`, \`D9\`) from lyrics text.

#### How Chord Detection Works
When you save a plain text song:
1. The parser scans the text line by line.
2. If a line consists primarily of musical notation words separated by spaces, it marks the line as a **Chord Line**.
3. These chords are rendered with an accent color and custom spacing.
4. When you transpose the song, only the detected chord tokens change. The lyrics remain unchanged.

#### Making Detection More Reliable
To ensure GigPad detects your chords accurately:
- Keep chords on their own line above the lyrics they correspond to.
- Avoid mixing notes/comments with chords on the same line. If you want to add comments, wrap them in curly brackets like \`{comment: Verse 1}\` or prefix them with a hashtag \`#\`.`
    },
    {
      slug: 'setlists',
      title: 'Managing Setlists',
      category: 'Performance',
      content: `### Live Setlists & Playlists

A Setlist is a custom, re-ordered selection of songs designed for an upcoming worship service, concert, rehearsal, or gig.

#### Creating a Setlist
1. Open the drawer menu and select **Setlists**.
2. Tap **Create Setlist** and name it (e.g., "Sunday Service - June 14").
3. Tap **Add Songs** and check the songs from your library to add.
4. Drag and drop songs in the setlist list view to change their order.

#### On-Stage Performance Mode
When viewing a song from inside an active setlist:
- Swipe left or right to move instantly to the next/previous song.
- A footer bar will show the next song title so you are always prepared.
- Auto-scroll settings will carry over between songs.`
    },
    {
      slug: 'troubleshooting',
      title: 'Troubleshooting & Support',
      category: 'Help',
      content: `### Troubleshooting Common Issues

Find solutions to common questions and issues with GigPad.

#### Screen turns off during live performance
Make sure **Performance Mode** is active inside the song viewer. This tells Android to bypass the system screen timeout and keep the screen active.

#### Chords are misaligned with lyrics
This can happen if you copy/paste text that uses tabs rather than spaces, or if your font settings are set to non-monospace inside the editor.
- Try editing the song and replacing any tab characters with standard spacebars.
- Check that the song is imported using standard ChordPro format (\`[C]Lyrics\`) which is completely immune to font-size alignments.

#### Contact Support
If you encounter a bug or crash:
1. Go to the [Feedback Portal](/feedback) on this website.
2. Submit a **Bug Report** with details on your device model, Android version, and steps to reproduce the issue.
3. We will inspect the log and release an update in the next version.`
    }
  ] as DocArticle[],

  about: {
    story: 'GigPad was born out of frustration. As active performing musicians, worship leaders, and acoustic gig players, our team struggled to manage paper binders, messy folders, and clunky PDF readers that did not support transposing keys on the fly. We wanted a clean, fast, offline-first Android app dedicated exclusively to lyrics and chords without bloated features or expensive subscription pricing. GigPad is our answer to the community.',
    vision: 'Our vision is to empower music leaders and performers to focus on their art without technical distractions. We aim to keep GigPad completely free and privacy-focused, maintaining offline reliability as our primary tenet.',
    contributors: [
      { name: 'Lingeswaran', role: 'Lead App Developer & Founder', avatar: '' },
      { name: 'Open Source Community', role: 'Translators & Beta Testers', avatar: '' }
    ]
  }
};
