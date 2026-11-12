// 검색엔진(구글·네이버·다음)과 AI(ChatGPT·Claude·Perplexity·Gemini)가 읽는 구조화데이터(JSON-LD). 화면에는 보이지 않는다.
// 병원 정보는 src/site.ts, 원장 정보는 아래 DOCTOR, 질문은 src/qna.ts에서 가져온다. 그쪽만 고치면 여기도 따라 바뀐다.
import { SITE, url } from './site';
import type { QA } from './qna';

export const topics = [
  '파주 치과', '운정 치과', '운정신도시 치과', '야당동 치과', '파주 임플란트', '운정 임플란트',
  '보험 임플란트', '틀니', '보험 틀니', '임플란트 틀니', '뼈이식 임플란트', '상악동 거상술',
  '자연치아 보존', '충치 치료', '신경 치료', '크라운', '잇몸 치료', '스케일링',
  '사랑니 발치', '매복 사랑니', '치근단 절제술', '어린이 치과', '영유아 구강검진', '실란트', '만성질환자 치과 진료',
];

// 대표원장 정보(대표원장 소개 페이지와 구조화데이터가 함께 쓴다)
export const DOCTOR = {
  name: SITE.legal.representative,
  jobTitle: '대표원장',
  alumni: '경희대학교 치과대학',
  career: [
    '경희대학교 치과대학 졸업',
    '전) 복음병원 치과 과장',
    'GAO Implant course 수료',
    'AAID 미국 임플란트 학회 정회원',
    'ICOI 세계 구강 임플란트 학회 정회원',
    'AACD 미국 심미치과학회 정회원',
  ],
  memberOf: [
    { name: 'American Academy of Implant Dentistry (AAID)', alt: '미국 임플란트 학회' },
    { name: 'International Congress of Oral Implantologists (ICOI)', alt: '세계 구강 임플란트 학회' },
    { name: 'American Academy of Cosmetic Dentistry (AACD)', alt: '미국 심미치과학회' },
  ],
  fields: ['임플란트', '구강외과', '보존·보철', '실버·어린이 진료'],
};

// 진료 항목(검색엔진이 "이 치과에서 무엇을 하는지" 판단하는 단서). 페이지와 연결된다.
export const SERVICES = [
  { name: '임플란트', path: '/adult/#implant', procedureType: 'SurgicalProcedure' },
  { name: '뼈이식 임플란트', path: '/adult/#implant', procedureType: 'SurgicalProcedure' },
  { name: '상악동 거상술 임플란트', path: '/adult/#implant', procedureType: 'SurgicalProcedure' },
  { name: '보험 임플란트(만 65세 이상)', path: '/silver/', procedureType: 'SurgicalProcedure' },
  { name: '틀니(전체·부분·임플란트 틀니)', path: '/silver/', procedureType: 'TherapeuticProcedure' },
  { name: '보험 틀니(만 65세 이상)', path: '/silver/', procedureType: 'TherapeuticProcedure' },
  { name: '충치 치료(레진·인레이·온레이)', path: '/adult/#natural', procedureType: 'TherapeuticProcedure' },
  { name: '신경 치료', path: '/adult/#natural', procedureType: 'TherapeuticProcedure' },
  { name: '크라운·브릿지', path: '/adult/#natural', procedureType: 'TherapeuticProcedure' },
  { name: '잇몸 치료·스케일링', path: '/adult/#natural', procedureType: 'TherapeuticProcedure' },
  { name: '미백·라미네이트', path: '/adult/#natural', procedureType: 'TherapeuticProcedure' },
  { name: '사랑니 발치', path: '/adult/#wisdom', procedureType: 'SurgicalProcedure' },
  { name: '치근단 절제술', path: '/adult/#wisdom', procedureType: 'SurgicalProcedure' },
  { name: '국가 영유아 구강검진', path: '/kids/', procedureType: 'DiagnosticProcedure' },
  { name: '불소 도포·실란트', path: '/kids/', procedureType: 'TherapeuticProcedure' },
  { name: '어린이 충치 치료', path: '/kids/', procedureType: 'TherapeuticProcedure' },
];

const abs = (path: string, site: URL) => new URL(url(path), site).href;
export const ids = (site: URL) => ({
  dentist: abs('/#dentist', site),
  website: abs('/#website', site),
  doctor: abs('/about/story/#doctor', site),
});

// 모든 페이지 공통: 치과(병원) + 원장 + 웹사이트
export function baseSchema(site: URL) {
  const id = ids(site);
  const c = SITE.contact;
  return [
    {
      '@context': 'https://schema.org',
      '@type': ['Dentist', 'MedicalClinic'],
      '@id': id.dentist,
      name: SITE.fullName,
      alternateName: [SITE.name, '김앤김 치과', '파주 김앤김치과', '운정 김앤김치과', 'Kim & Kim Dental Clinic'],
      slogan: SITE.slogan,
      description: SITE.description,
      disambiguatingDescription: SITE.summary,
      abstract: SITE.summary,
      url: abs('/', site),
      logo: abs('/logo.png', site),
      image: [abs(SITE.ogImage, site), abs('/logo.png', site)],
      telephone: '+82-31-8071-2500',
      foundingDate: String(SITE.since),
      ...(SITE.legal.businessNumber ? { taxID: SITE.legal.businessNumber } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.street,
        addressLocality: c.city,
        addressRegion: c.region,
        addressCountry: 'KR',
      },
      hasMap: c.map,
      sameAs: [c.blog], // 공식 채널. TODO: 네이버 플레이스·인스타그램 주소, 좌표(geo)를 받으면 추가
      // 평일은 점심시간(13:00~14:00)을 빼고 오전·오후로 나눠 알린다. 토요일은 점심시간 없음.
      openingHoursSpecification: SITE.hours.flatMap((h) =>
        h.days.includes('Saturday')
          ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.open, closes: h.close }]
          : [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.open, closes: '13:00' },
              { '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: '14:00', closes: h.close },
            ],
      ),
      amenityFeature: [{ '@type': 'LocationFeatureSpecification', name: '무료 주차', value: true }],
      isAcceptingNewPatients: true,
      medicalSpecialty: 'Dentistry',
      knowsLanguage: 'ko',
      knowsAbout: topics,
      areaServed: ['경기도 파주시', '운정신도시', '야당동', '와동동', '목동동'].map((name) => ({ '@type': 'Place', name })),
      founder: { '@id': id.doctor },
      employee: { '@id': id.doctor },
      availableService: SERVICES.map((s) => ({ '@type': 'MedicalProcedure', name: s.name, procedureType: `https://schema.org/${s.procedureType}`, url: abs(s.path, site) })),
      potentialAction: { '@type': 'ReserveAction', target: c.booking, name: '네이버 예약' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': id.doctor,
      name: DOCTOR.name,
      jobTitle: DOCTOR.jobTitle,
      honorificSuffix: '원장',
      description: `${SITE.fullName} 대표원장. ${DOCTOR.career.join(', ')}.`,
      image: abs('/doctor.jpg', site),
      url: abs('/about/story/#doctor', site),
      worksFor: { '@id': id.dentist },
      alumniOf: { '@type': 'CollegeOrUniversity', name: DOCTOR.alumni },
      memberOf: DOCTOR.memberOf.map((m) => ({ '@type': 'Organization', name: m.name, alternateName: m.alt })),
      knowsAbout: DOCTOR.fields,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': id.website,
      name: SITE.fullName,
      alternateName: SITE.name,
      url: abs('/', site),
      inLanguage: 'ko-KR',
      publisher: { '@id': id.dentist },
    },
  ];
}

// 페이지 자체 정보. 진료 페이지는 MedicalWebPage(원장 검수 표시, 다루는 진료 항목 포함)
export function pageSchema(
  site: URL,
  o: { path: string; title: string; description: string; image: string; medical?: boolean; procedures?: string[]; modified: string },
) {
  const id = ids(site);
  return {
    '@context': 'https://schema.org',
    '@type': o.medical ? 'MedicalWebPage' : 'WebPage',
    '@id': abs(o.path, site) + '#webpage',
    url: abs(o.path, site),
    name: o.title,
    description: o.description,
    inLanguage: 'ko-KR',
    isPartOf: { '@id': id.website },
    about: { '@id': id.dentist },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(o.image, site) },
    dateModified: o.modified,
    // AI 음성·요약이 읽기 좋은 부분: 페이지 제목과 첫 설명
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '[data-speakable]'] },
    ...(o.medical
      ? {
          lastReviewed: o.modified,
          reviewedBy: { '@id': id.doctor },
          audience: { '@type': 'PeopleAudience', geographicArea: { '@type': 'Place', name: '경기도 파주시' } },
          ...(o.procedures?.length ? { mainEntity: o.procedures.map((name) => ({ '@type': 'MedicalProcedure', name })) } : {}),
        }
      : {}),
  };
}

// 페이지 위치(홈 > 현재 페이지)
export function breadcrumb(site: URL, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: '홈', path: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path, site) })),
  };
}

// 자주 묻는 질문(궁금해요 Q&A 페이지에만 붙인다. 같은 질문을 여러 페이지에 중복해서 붙이지 않는다)
export function faqSchema(site: URL, items: QA[], modified: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    dateModified: modified,
    author: { '@id': ids(site).doctor },
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      '@id': abs(`/qna/#${it.id}`, site),
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a, author: { '@id': ids(site).doctor } },
    })),
  };
}
