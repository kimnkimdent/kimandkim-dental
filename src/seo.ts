// 검색엔진·AI가 읽는 구조화데이터(JSON-LD). 화면에는 보이지 않는다.
// 병원 정보는 src/site.ts에서 가져오므로 그쪽만 고치면 여기도 따라 바뀐다.
import { SITE, url } from './site';
import type { QA } from './qna';

export const topics = ['파주 치과', '운정 치과', '운정신도시 치과', '야당동 치과', '임플란트', '보험 임플란트', '틀니', '보험 틀니', '자연치아 보존', '신경 치료', '사랑니 발치', '어린이 치과', '영유아 구강검진'];

const abs = (path: string, site: URL) => new URL(url(path), site).href;

// 모든 페이지 공통: 치과 + 웹사이트
export function baseSchema(site: URL) {
  const orgId = abs('/#dentist', site);
  const c = SITE.contact;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      '@id': orgId,
      name: SITE.fullName,
      alternateName: [SITE.name, '김앤김 치과', '파주 운정 김앤김치과'],
      description: SITE.description,
      url: abs('/', site),
      image: abs(SITE.ogImage, site),
      telephone: c.phone,
      foundingDate: String(SITE.since),
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.street,
        addressLocality: c.city,
        addressRegion: c.region,
        addressCountry: 'KR',
      },
      // TODO: 좌표(geo)·네이버 플레이스·블로그 주소를 받으면 sameAs와 함께 추가
      openingHoursSpecification: SITE.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.open,
        closes: h.close,
      })),
      founder: { '@type': 'Person', name: SITE.legal.representative, jobTitle: '대표원장' },
      medicalSpecialty: 'Dentistry',
      knowsAbout: topics,
      areaServed: ['파주시', '운정신도시', '야당동'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.fullName,
      url: abs('/', site),
      inLanguage: 'ko-KR',
      publisher: { '@id': orgId },
    },
  ];
}

// 페이지 위치(홈 > 현재 페이지)
export function breadcrumb(site: URL, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: '홈', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path, site),
    })),
  };
}

// 자주 묻는 질문
export function faqSchema(items: QA[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
  };
}
