// llms.txt: AI(ChatGPT·Claude·Perplexity 등)가 병원을 빠르게 이해하도록 핵심 정보를 글로 정리한 파일(/llms.txt).
// 내용은 src/site.ts, src/qna.ts에서 자동으로 가져온다.
import type { APIRoute } from 'astro';
import { SITE, url } from '../site';
import { qna } from '../qna';

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(url(p), site).href;
  const pages = SITE.nav.flatMap((n) => n.children ?? [n]);
  const lines = [
    `# ${SITE.fullName} (${SITE.name})`,
    '',
    `> ${SITE.description}`,
    '',
    `- 콘셉트: ${SITE.concept}`,
    `- 대표원장: ${SITE.legal.representative} (경희대학교 치과대학 졸업, 전 복음병원 치과 과장, AAID·ICOI·AACD 정회원)`,
    `- 주소: ${SITE.contact.address}`,
    `- 전화: ${SITE.contact.phone}`,
    `- 진료시간: ${SITE.hours.map((h) => `${h.label} ${h.time}`).join(', ')} / 점심시간 ${SITE.lunch} / ${SITE.closed}`,
    `- 주차: 무료 (${SITE.contact.parking.join(', ')})`,
    `- 예약: ${SITE.contact.booking}`,
    '',
    '## 페이지',
    `- [홈](${abs('/')})`,
    ...pages.map((p) => `- [${p.label}](${abs(p.href)})`),
    '',
    '## 자주 묻는 질문',
    ...qna.flatMap((g) => [`### ${g.tab}`, ...g.items.map((it) => `- Q. ${it.q}\n  A. ${it.a}`)]),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
