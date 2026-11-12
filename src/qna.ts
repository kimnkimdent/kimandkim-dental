// 궁금해요 Q&A. 내용은 src/data/qna.json에 있다(편집 화면 Pages CMS에서 원장님·담당자가 직접 추가·수정).
// 이 파일은 그 내용을 사이트에서 쓰기 좋게 정리만 한다.
// - 질문에 id가 없으면 '분류-번호'(예: implant-6)로 자동으로 붙인다. id는 주소 끝 #id로 바로 이동하는 데 쓴다.
// - 각 진료 페이지의 "자주 묻는 질문"은 여기서 분류(id)로 가져온다.
// 원칙: 결론부터 답한다 / 지역 키워드(파주·운정·운정신도시·야당동)는 질문 또는 답변 중 한 곳에만 / 의료광고 표현 검수 후 게시.
import data from './data/qna.json';

export type QA = { id: string; q: string; a: string };
export type QnaGroup = { id: string; tab: string; title: string; items: QA[] };

type RawQA = { id?: string; q: string; a: string };
type RawGroup = { id: string; tab: string; title: string; items?: RawQA[] };

export const qnaUpdated: string = String(data.updated).slice(0, 10); // 최종 검수일(YYYY-MM-DD)
export const qnaAuthor: string = data.author;

export const qna: QnaGroup[] = (data.groups as RawGroup[]).map((g) => {
  const used = new Set((g.items ?? []).map((it) => it.id).filter(Boolean));
  let n = 0;
  const nextId = () => {
    do n++;
    while (used.has(`${g.id}-${n}`));
    used.add(`${g.id}-${n}`);
    return `${g.id}-${n}`;
  };
  return {
    id: g.id,
    tab: g.tab,
    title: g.title,
    items: (g.items ?? [])
      .filter((it) => it.q?.trim() && it.a?.trim())
      .map((it) => ({ id: it.id?.trim() || nextId(), q: it.q.trim(), a: it.a.trim() })),
  };
});

export const allQna = qna.flatMap((g) => g.items);
export const groupOf = (id: string) => qna.find((g) => g.id === id)!;
