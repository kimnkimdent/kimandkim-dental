// 문장 줄바꿈: 화면에 보이는 글에서 마침표로 끝난 문장 다음 문장은 새 줄에서 시작하게 한다.
// (예: "…살핍니다. 필요하면…" → "…살핍니다.<br>필요하면…")
// - <head>, <script>, <style>, 태그 속성(alt·설명 등)은 건드리지 않는다. 화면 글자만 바꾼다.
// - 숫자 사이 마침표(2026.11)나 "※" 안내 문구, 줄바꿈을 원하지 않는 곳(data-keep-line 표시)은 그대로 둔다.
import { defineMiddleware } from 'astro:middleware';

const SENT = /([가-힣)”’"']\.)[ \t]+(?=[가-힣A-Za-z0-9(“‘"'])/g;

function breakSentences(body: string) {
  // 스크립트·스타일·줄바꿈 제외 구역은 통째로 건너뛴다.
  const parts = body.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]*data-keep-line[^>]*>[\s\S]*?<\/(?:p|div|span)>)/g);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part.replace(/>([^<]+)</g, (m, text: string) => (text.includes('※') ? m : '>' + text.replace(SENT, '$1<br>') + '<'));
    })
    .join('');
}

export const onRequest = defineMiddleware(async (_ctx, next) => {
  const res = await next();
  if (!res.headers.get('content-type')?.includes('text/html')) return res;
  const html = await res.text();
  const i = html.indexOf('<body');
  const out = i < 0 ? html : html.slice(0, i) + breakSentences(html.slice(i));
  return new Response(out, { status: res.status, headers: res.headers });
});
