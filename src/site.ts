// 병원 정보. 이름·연락처·진료시간·주소·메뉴는 여기서만 바꾸면 전 페이지(상단 메뉴, 하단 방문 안내, 고정 버튼, 바닥글, 검색용 정보)에 반영된다.
export const SITE = {
  name: '김앤김치과',
  fullName: '김앤김치과의원',
  slogan: '우리 가족 치아 건강엔, 김앤김치과',
  concept: '한 가족의 시간을 함께해 온 치과',
  description:
    '2012년부터 파주 운정신도시 야당동에서 진료해 온 김앤김치과. 대표원장이 임플란트, 보험 임플란트·틀니, 자연치아 보존, 어린이 진료까지 직접 진료합니다.',
  // 병원 요약(AI 인용용). 화면에는 안 보이고 구조화데이터·llms.txt에 들어간다.
  summary:
    '김앤김치과는 2012년부터 파주 운정신도시 야당동에서 진료해 온 치과입니다. 대표원장 김정민이 임플란트, 틀니, 자연치아 보존, 어린이 진료까지 직접 진료합니다.',
  locale: 'ko_KR',
  ogImage: '/og-v2.jpg', // 1200x630 공유 이미지(카톡·SNS 링크 미리보기). public/og-v2.jpg (바꿀 때마다 파일 이름 숫자를 올려야 카톡이 새 그림을 가져감)
  since: 2012,
  // 검색엔진 소유 확인 코드. 검색 등록 단계에서 채운다.
  verification: {
    google: '',
    naver: '',
    daum: '',
  },
  // 상단 메뉴. children이 있으면 마우스를 올리면(휴대폰은 펼치면) 하위 메뉴가 나온다.
  nav: [
    {
      href: '/about/story/',
      label: '병원소개',
      children: [
        { href: '/about/story/', label: '김앤김 이야기' },
        { href: '/about/story/#doctor', label: '대표원장 소개' },
      ],
    },
    { href: '/philosophy/', label: '진료철학' },
    {
      href: '/silver/',
      label: '실버 클리닉',
      children: [
        { href: '/silver/#denture', label: '틀니 클리닉' },
        { href: '/silver/#insurance', label: '보험 임플란트·틀니' },
        { href: '/silver/#safe', label: '만성질환 안전 진료' },
        { href: '/silver/#care', label: '잇몸·시린 이 관리' },
      ],
    },
    {
      href: '/adult/',
      label: '청장년 클리닉',
      children: [
        { href: '/adult/#implant', label: '임플란트' },
        { href: '/adult/#natural', label: '자연치아·심미보철' },
        { href: '/adult/#wisdom', label: '사랑니·구강외과' },
      ],
    },
    {
      href: '/kids/',
      label: '어린이·청소년 클리닉',
      children: [
        { href: '/kids/#first', label: '처음 오는 아이' },
        { href: '/kids/#checkup', label: '영유아 구강검진' },
        { href: '/kids/#care', label: '어린이 치료' },
        { href: '/kids/#teen', label: '청소년 치아 관리' },
      ],
    },
    {
      href: '/qna/',
      label: '궁금해요 Q&A',
      children: [
        { href: '/qna/#silver', label: '실버' },
        { href: '/qna/#implant', label: '임플란트' },
        { href: '/qna/#natural', label: '자연치아·심미' },
        { href: '/qna/#wisdom', label: '사랑니·구강외과' },
        { href: '/qna/#kids', label: '어린이·청소년' },
      ],
    },
  ] as { href: string; label: string; children?: { href: string; label: string }[] }[],
  contact: {
    phone: '031-8071-2500',
    // TODO(확인 필요): 네이버 예약 주소를 받으면 바꾼다. 지금은 네이버 지도 검색(플레이스에서 예약 가능)으로 연결.
    booking: 'https://map.naver.com/p/search/%EA%B9%80%EC%95%A4%EA%B9%80%EC%B9%98%EA%B3%BC',
    map: 'https://map.naver.com/p/search/%EA%B9%80%EC%95%A4%EA%B9%80%EC%B9%98%EA%B3%BC',
    kakaoMap: 'https://map.kakao.com/?q=%EA%B9%80%EC%95%A4%EA%B9%80%EC%B9%98%EA%B3%BC',
    blog: 'https://blog.naver.com/dent2500', // 네이버 블로그(공식)
    blogPhilosophy: 'https://blog.naver.com/dent2500/224362690669', // 블로그 진료철학 글(진료철학 페이지 버튼)
    address: '경기도 파주시 와석순환로 82, 대흥프라자 5층 (야당동)',
    region: '경기도',
    city: '파주시',
    street: '와석순환로 82, 대흥프라자 5층',
    parking: ['대흥프라자 지하 주차장', '건물 뒤편 1층 주차장', '건물 뒤 일방통행로 주차칸'],
  },
  // 진료시간(원고 확정). days는 검색엔진용 요일 코드.
  hours: [
    { label: '월 · 목 · 금', time: '10:00 ~ 18:30', days: ['Monday', 'Thursday', 'Friday'], open: '10:00', close: '18:30' },
    { label: '화 (야간진료)', time: '10:00 ~ 20:30', days: ['Tuesday'], open: '10:00', close: '20:30', highlight: true },
    { label: '토', time: '10:00 ~ 14:00 (점심시간 없음)', days: ['Saturday'], open: '10:00', close: '14:00' },
  ],
  lunch: '평일 13:00 ~ 14:00',
  closedDays: '수 · 일', // 정기 휴진 요일(진료시간 표에 '휴진' 줄로 나온다)
  closed: '수 · 일 휴진 / 공휴일은 전화 문의',
  legal: {
    representative: '김정민',
    businessNumber: '546-03-03111', // 사업자등록증(파주세무서)
  },
};

// GitHub Pages는 https://아이디.github.io/저장소명/ 아래에서 서비스되므로 내부 링크는 반드시 url()로 감쌀 것.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => base + path;
export const tel = `tel:${SITE.contact.phone.replace(/-/g, '')}`;

// 문장이 끝나는 곳(. ? ! 뒤)에서 줄을 바꾼다. 화면에 보이는 설명 글에만 쓴다(검색용 설명에는 쓰지 않음).
// 받는 쪽 글자에는 whitespace-pre-line이 있어야 줄바꿈이 보인다.
export const br = (s?: string) => (s ?? '').replace(/([.?!…][”’"']?)\s+(?=[^\s])/g, '$1\n');

// 오픈 전 원장님 확인용: true면 모든 페이지에 '검색에 나오지 않게' 표시. 정식 오픈 때 false로.
export const prelaunch = true;
