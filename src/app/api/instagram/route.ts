// app/api/instagram/route.ts
import { NextResponse } from 'next/server';

const IG_API = 'https://graph.instagram.com/me/media';
const FIELDS =
  'id,caption,media_url,permalink,thumbnail_url,media_type,timestamp';

export async function GET() {
  try {
    const token = process.env.IG_LONG_LIVED_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 500 });
    }

    const url = `${IG_API}?fields=${FIELDS}&access_token=${token}&limit=12`;
    const res = await fetch(url, {
      // s-maxage: CDN 캐시, stale-while-revalidate로 빠른 응답
      next: { revalidate: 300 }, // 5분 캐시
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const json = await res.json();
    return NextResponse.json(json, {
      // (선택) 캐시 헤더를 더 세밀히 제어하고 싶으면 아래 사용
      // headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=3600" }
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: (e as Error)?.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
