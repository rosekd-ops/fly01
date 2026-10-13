// 오늘의 응원 한마디 API (Vercel 서버리스 함수)
// GET /api/message?name=닉네임 → { name, message }

const MESSAGES = [
  "{name}, 오늘도 여기까지 온 것만으로 충분히 잘하고 있어요!",
  "{name}의 작은 한 걸음이 내일의 큰 변화를 만들어요.",
  "{name}, 천천히 가도 괜찮아요. 멈추지만 않으면 돼요.",
  "오늘 {name}이(가) 웃을 일이 꼭 하나는 생길 거예요.",
  "{name}, 지금의 노력은 절대 사라지지 않아요.",
  "{name}은(는) 생각보다 훨씬 강한 사람이에요.",
  "{name}, 실수해도 괜찮아요. 그게 배우는 중이라는 증거예요.",
  "{name}의 하루에 따뜻한 햇살이 함께하길 바라요.",
  "{name}, 오늘은 스스로에게 조금 더 다정해져 보세요.",
  "{name}이(가) 해낸 일들을 잠깐 떠올려 보세요. 정말 멋져요!",
  "{name}, 숨 한 번 크게 쉬고 다시 시작해 봐요.",
  "{name}의 꾸준함이 결국 빛을 볼 거예요.",
  "{name}, 오늘 하루도 정말 수고 많았어요.",
  "{name}을(를) 응원하는 사람이 분명 여기 있어요!",
  "{name}, 좋은 일은 생각보다 가까이에 있어요.",
];

const MAX_NAME_LENGTH = 20;

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "GET 요청만 지원해요." });
  }

  const raw = typeof req.query.name === "string" ? req.query.name : "";
  const name = raw.trim().slice(0, MAX_NAME_LENGTH) || "여러분";

  const template = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const message = template.replaceAll("{name}", name);

  return res.status(200).json({ name, message });
}
