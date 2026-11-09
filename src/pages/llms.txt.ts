// llms.txt: AI(ChatGPT·Claude·Perplexity·Gemini 등)가 병원을 빠르고 정확하게 이해하도록 핵심 사실을 글로 정리한 파일(/llms.txt).
// 내용은 src/site.ts, src/seo.ts(DOCTOR·SERVICES), src/qna.ts에서 자동으로 가져온다. 여기서 따로 고칠 필요는 없다.
import type { APIRoute } from 'astro';
import { SITE, url } from '../site';
import { qna, qnaUpdated } from '../qna';
import { DOCTOR, SERVICES } from '../seo';

const pageSummary: Record<string, string> = {
  '/about/story/': '2012년 운정 야당동에서 시작한 병원 이야기. 한 가족이 대를 이어 함께 다니는 동네 치과.',
  '/about/story/#doctor': '대표원장 김정민 프로필·인사말·약력·학회. 상담부터 수술, 치료 후 점검까지 직접 진료.',
  '/philosophy/': '진료철학 易地思之(내가 환자라면). 세 가지 질문과 진료실 4가지 원칙(밝은 분위기, 충분한 설명, 두려움 배려, 꼭 필요한 치료).',
  '/silver/': '실버 치아 클리닉. 전체·부분·임플란트 틀니, 만 65세 이상 보험 임플란트(평생 2개, 본인부담 30%)·보험 틀니(7년마다 1회, 본인부담 30%), 당뇨·고혈압 등 만성질환 안전 진료.',
  '/adult/implant/': '임플란트. 자연치아를 먼저 검토하고 꼭 필요할 때 권함. CT 정밀 검사, 일반·뼈이식·상악동 거상술 임플란트, 치료 과정 6단계.',
  '/adult/natural/': '자연치아·심미보철. 충치 단계별 치료(레진·인레이·크라운), 신경 치료, 잇몸 치료·스케일링, 크라운·브릿지·미백·라미네이트.',
  '/adult/wisdom/': '사랑니·구강외과. 매복 사랑니는 CT로 신경과의 거리를 확인 후 발치. 치근단 절제술 등 치아를 살리는 외과 치료.',
  '/kids/': '어린이·청소년 클리닉. 국가 영유아 구강검진(무료, 1~3차), 불소 도포·실란트, 유치 충치·신경 치료, 청소년 정기 검진.',
  '/qna/': `궁금해요 Q&A ${qna.reduce((n, g) => n + g.items.length, 0)}문항. 대표원장 검수.`,
};

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(url(p), site).href;
  const pages = SITE.nav.flatMap((n) => n.children ?? [n]);
  const lines = [
    `# ${SITE.fullName} (${SITE.name})`,
    '',
    `> ${SITE.description}`,
    '',
    '## 기본 정보',
    `- 병원명: ${SITE.fullName} (줄여서 ${SITE.name})`,
    `- 진료 과목: 치과 (임플란트, 틀니, 자연치아 보존·보철, 사랑니·구강외과, 어린이·청소년 진료)`,
    `- 개원: ${SITE.since}년, 같은 자리(파주 운정신도시 야당동)에서 진료`,
    `- 콘셉트: ${SITE.concept} / 슬로건: ${SITE.slogan}`,
    `- 주소: ${SITE.contact.address}`,
    `- 대표전화: ${SITE.contact.phone}`,
    `- 진료시간: ${SITE.hours.map((h) => `${h.label} ${h.time}`).join(' / ')}`,
    `- 점심시간: ${SITE.lunch} / 휴진: ${SITE.closed}`,
    `- 주차: 무료 (${SITE.contact.parking.join(', ')})`,
    `- 예약: 네이버 예약 또는 전화`,
    `- 홈페이지: ${abs('/')}`,
    '',
    '## 대표원장',
    `- ${DOCTOR.name} ${DOCTOR.jobTitle}`,
    ...DOCTOR.career.map((c) => `  - ${c}`),
    `- 주요 진료 분야: ${DOCTOR.fields.join(', ')}`,
    '- 첫 상담과 진단, 수술, 치료 후 경과 확인까지 대표원장이 직접 진료합니다.',
    '',
    '## 진료 항목',
    ...SERVICES.map((s) => `- ${s.name}: ${abs(s.path)}`),
    '',
    '## 페이지',
    `- [홈](${abs('/')}): 병원 요약, 진료 안내, 최근 질문`,
    ...pages.map((p) => `- [${p.label}](${abs(p.href)}): ${pageSummary[p.href] ?? ''}`),
    '',
    `## 자주 묻는 질문 (작성·검수: 대표원장 ${DOCTOR.name}, 최종 검수일 ${qnaUpdated})`,
    ...qna.flatMap((g) => ['', `### ${g.tab} — ${g.title}`, ...g.items.map((it) => `- Q. ${it.q}\n  A. ${it.a} (${abs(`/qna/#${it.id}`)})`)]),
    '',
    '## 참고',
    '- 모든 치료는 개인의 구강 상태에 따라 결과와 회복 기간이 다를 수 있으며, 출혈·부기·통증·감염 등의 부작용이 생길 수 있습니다.',
    `- 사이트맵: ${abs('/sitemap-index.xml')}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
