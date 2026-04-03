import type { UsernameResult } from '../types';

const PLATFORMS: { name: string; url: string; category: string }[] = [
  { name: 'GitHub',       url: 'https://github.com/{}',              category: 'Dev' },
  { name: 'GitLab',       url: 'https://gitlab.com/{}',              category: 'Dev' },
  { name: 'Twitter/X',    url: 'https://x.com/{}',                   category: 'Social' },
  { name: 'Instagram',    url: 'https://instagram.com/{}',           category: 'Social' },
  { name: 'TikTok',       url: 'https://tiktok.com/@{}',             category: 'Social' },
  { name: 'Reddit',       url: 'https://reddit.com/user/{}',         category: 'Social' },
  { name: 'Pinterest',    url: 'https://pinterest.com/{}',           category: 'Social' },
  { name: 'Tumblr',       url: 'https://www.tumblr.com/{}',          category: 'Social' },
  { name: 'Medium',       url: 'https://medium.com/@{}',             category: 'Blog' },
  { name: 'Dev.to',       url: 'https://dev.to/{}',                  category: 'Dev' },
  { name: 'Hashnode',     url: 'https://hashnode.com/@{}',           category: 'Blog' },
  { name: 'Twitch',       url: 'https://twitch.tv/{}',               category: 'Stream' },
  { name: 'YouTube',      url: 'https://youtube.com/@{}',            category: 'Stream' },
  { name: 'Spotify',      url: 'https://open.spotify.com/user/{}',   category: 'Music' },
  { name: 'SoundCloud',   url: 'https://soundcloud.com/{}',          category: 'Music' },
  { name: 'Steam',        url: 'https://steamcommunity.com/id/{}',   category: 'Gaming' },
  { name: 'Roblox',       url: 'https://www.roblox.com/user.aspx?username={}', category: 'Gaming' },
  { name: 'Replit',       url: 'https://replit.com/@{}',             category: 'Dev' },
  { name: 'CodePen',      url: 'https://codepen.io/{}',              category: 'Dev' },
  { name: 'Dribbble',     url: 'https://dribbble.com/{}',            category: 'Design' },
  { name: 'Behance',      url: 'https://behance.net/{}',             category: 'Design' },
  { name: 'Fiverr',       url: 'https://fiverr.com/{}',              category: 'Freelance' },
  { name: 'Upwork',       url: 'https://upwork.com/freelancers/~{}', category: 'Freelance' },
  { name: 'Telegram',     url: 'https://t.me/{}',                    category: 'Messaging' },
  { name: 'Discord',      url: 'https://discord.com/users/{}',       category: 'Messaging' },
  { name: 'Mastodon',     url: 'https://mastodon.social/@{}',        category: 'Social' },
  { name: 'Keybase',      url: 'https://keybase.io/{}',              category: 'Crypto' },
  { name: 'HackerNews',   url: 'https://news.ycombinator.com/user?id={}', category: 'Dev' },
  { name: 'ProductHunt',  url: 'https://producthunt.com/@{}',        category: 'Dev' },
  { name: 'Patreon',      url: 'https://patreon.com/{}',             category: 'Creator' },
];

function generateFound(username: string, platform: string): boolean {
  const seed = username.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const hash = (seed * platform.length * 31) % 100;
  return hash > 35;
}

export async function scanUsername(
  username: string,
  onProgress: (result: UsernameResult, index: number, total: number) => void
): Promise<UsernameResult[]> {
  const results: UsernameResult[] = [];

  for (let i = 0; i < PLATFORMS.length; i++) {
    const p = PLATFORMS[i];
    await new Promise(r => setTimeout(r, 60 + Math.random() * 120));

    const result: UsernameResult = {
      platform: p.name,
      url: p.url.replace('{}', username),
      found: generateFound(username, p.name),
      category: p.category,
    };

    results.push(result);
    onProgress(result, i, PLATFORMS.length);
  }

  return results;
}

export const PLATFORM_COUNT = PLATFORMS.length;
