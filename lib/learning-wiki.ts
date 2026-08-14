export type LearningSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  note?: string;
};

export type LearningReference = {
  label: string;
  href: string;
};

export type LearningPage = {
  slug: string;
  index: number;
  title: string;
  subtitle: string;
  category: "FOUNDATIONS" | "DATA & CMS" | "FRONTEND" | "DEVELOPMENT" | "DEPLOYMENT" | "TOOLS";
  questions: string[];
  why: string;
  confusion: string;
  simpleAnswer: string;
  sections: LearningSection[];
  remember: string[];
  later: string[];
  tools: string[];
  references?: LearningReference[];
};

export const learningPages: LearningPage[] = [
  {
    slug: "start-here",
    index: 0,
    title: "Start Here — 이 모든 도구는 결국 무엇을 위해 존재하는가?",
    subtitle: "decode.skin을 만들면서 만난 기술·SaaS·개발 도구를 하나의 시스템으로 보는 첫 지도",
    category: "FOUNDATIONS",
    questions: [
      "왜 웹사이트 하나 만드는데 Supabase, NocoDB, Directus, React, Next.js, GitHub, Vercel, Codex, VS Code, Docker, Render까지 계속 새로운 이름이 나오는 거야?",
      "각각이 따로 노는 것 같은데 결국 단 하나의 목표에 어떻게 연결되는 거야?"
    ],
    why: "실제 decode.skin을 만들면서 데이터베이스, CMS, 서버, 프론트엔드, 배포 도구가 순서대로 등장했고, 각 도구를 개별적으로 이해하기 전에 전체 시스템 안에서의 위치를 보고 싶어졌다.",
    confusion: "모든 제품명이 마치 같은 종류의 소프트웨어처럼 들렸지만 실제로는 DB, Admin, 프레임워크, 코드 에디터, 코딩 에이전트, 코드 저장소, 호스팅처럼 역할이 완전히 다르다.",
    simpleAnswer: "공동 목표는 하나다. 데이터를 안전하게 저장·관리하고, 코드를 만들어 인터넷에 배포해서, 브라우저에서 사람이 쓸 수 있는 제품으로 보여주는 것.",
    sections: [
      {
        title: "decode.skin의 현재 한 줄 아키텍처",
        paragraphs: [
          "NocoDB에서 데이터를 편하게 입력·수정하고 → Supabase에 원본을 저장하고 → Next.js/React 프론트엔드가 그 데이터를 읽어 화면을 만들고 → GitHub에 코드를 보관하고 → Vercel이 인터넷에 배포한다.",
          "Directus는 현재 보조 CMS/Admin으로 남아 있고, Render는 Directus를 인터넷에서 계속 실행시키는 서버 역할을 맡았다. Codex는 이 코드 프로젝트를 실제로 수정하는 개발 에이전트이고, VS Code는 사람이 코드를 직접 열고 편집하는 작업도구다."
        ]
      },
      {
        title: "도구를 이름이 아니라 역할로 분류하기",
        bullets: [
          "Data / Backend — PostgreSQL, Supabase",
          "Data Admin / CMS — NocoDB, Directus, WordPress 일부 역할",
          "Documentation / Source of Truth — Notion",
          "Frontend fundamentals — HTML, CSS, JavaScript",
          "Frontend structure — React, Next.js",
          "Coding workspace / agent — VS Code, Codex",
          "Code history / collaboration — Git, GitHub",
          "Deployment / hosting — Vercel, Render",
          "Runtime packaging — Docker",
          "Design / prototype — Figma, v0, Gamma"
        ],
        note: "새로운 도구 이름이 나오면 '이 도구는 어느 역할 칸에 들어가는가?'만 먼저 물으면 된다."
      },
      {
        title: "현재 실제 데이터 흐름",
        code: "NocoDB\n  ↓  입력/수정\nSupabase PostgreSQL\n  ↓  읽기\nNext.js + React Viewer\n  ↓\nVercel\n  ↓\nBrowser\n\nCodex → 코드를 수정 → GitHub → Vercel 재배포"
      }
    ],
    remember: [
      "도구가 많아 보여도 역할은 몇 개뿐이다: 저장, 관리, 제작, 보관, 배포.",
      "Supabase의 데이터와 GitHub의 코드는 서로 다른 자산이다.",
      "Admin 화면과 고객/위키 Viewer는 같은 화면일 필요가 없다."
    ],
    later: [
      "decode.skin MVP의 전체 시스템 지도를 이 페이지에서 계속 업데이트한다.",
      "새 도구를 도입할 때는 기존 도구와 역할이 중복되는지 먼저 확인한다."
    ],
    tools: ["Supabase", "NocoDB", "Directus", "Next.js", "React", "Codex", "VS Code", "GitHub", "Vercel", "Render", "Docker", "Notion", "Figma", "v0", "Gamma"]
  },
  {
    slug: "database-first-question",
    index: 1,
    title: "내 데이터는 어디에 저장해야 하지? — DB에서 시작한 이유",
    subtitle: "Treatment, Method, Modality, Clinic을 단순 문서가 아니라 연결된 데이터로 관리하려던 첫 출발",
    category: "DATA & CMS",
    questions: [
      "Supabase에서 마스터 데이터와 스키마를 만들지만 그 이후에는 더 편하게 관리할 수 없을까?",
      "Table, row, column, PK, FK, NULL은 대체 왜 필요한 거야?"
    ],
    why: "decode.skin은 시술 이름만 적는 문서가 아니라 Treatment ↔ Method ↔ Modality ↔ Device ↔ Clinic처럼 서로 연결되는 데이터를 계속 늘려가야 했다.",
    confusion: "처음에는 DB가 거대한 엑셀처럼 느껴졌고, 왜 UUID나 FK처럼 사람이 보기 불편한 값까지 필요한지 감이 오지 않았다.",
    simpleAnswer: "Database는 반복해서 재사용할 사실을 구조적으로 저장하는 원본이다. 화면은 바뀌어도 원본 데이터는 한 번 저장하고 여러 곳에서 재사용한다.",
    sections: [
      {
        title: "decode.skin에서 실제로 만든 것",
        bullets: [
          "treatments — RF Skin Tightening, HIFU Skin Tightening 등 시술 Master",
          "treatment_methods — External / Non-invasive, Injection, Microneedling",
          "modalities — Radiofrequency, Focused Ultrasound, Botulinum Toxin",
          "treatment_content — 각 Treatment의 내부 Intel 문서"
        ]
      },
      {
        title: "처음 이해한 최소 DB 언어",
        bullets: [
          "Table = 같은 종류의 데이터 목록",
          "Row = 한 개의 실제 기록",
          "Column = 그 기록이 가진 속성",
          "Primary Key = 각 row를 절대 헷갈리지 않게 하는 고유 ID",
          "Foreign Key = 다른 table의 row를 가리키는 연결고리",
          "NULL = 아직 값이 입력되지 않음"
        ]
      },
      {
        title: "왜 화면과 DB를 분리했나",
        code: "같은 Supabase 데이터\n├─ NocoDB에서는 Grid로 관리\n├─ Directus에서는 CMS Form으로 편집\n├─ Internal Viewer에서는 Wiki처럼 읽기\n└─ 고객 사이트에서는 Clinic/Treatment Card로 표시"
      }
    ],
    remember: [
      "DB는 화면이 아니라 원본 데이터 구조다.",
      "같은 데이터를 여러 화면에서 다르게 보여줄 수 있다.",
      "Schema 변경과 일상 데이터 수정은 같은 일이 아니다."
    ],
    later: [
      "Clinic, Device, Source, Audit, Price Observation을 추가할 때 같은 원칙을 재사용한다.",
      "가격과 감사처럼 시간에 따라 변하는 값은 기존 값을 덮어쓰기보다 observation/history로 쌓는다."
    ],
    tools: ["PostgreSQL", "Supabase"],
    references: [
      { label: "Supabase Database docs", href: "https://supabase.com/docs/guides/database/overview" }
    ]
  },
  {
    slug: "directus-why",
    index: 2,
    title: "Supabase를 직접 만지는 게 불편한데? — Directus가 등장한 이유",
    subtitle: "DB는 그대로 두고 사람이 쓰기 좋은 Admin/CMS 화면을 붙이는 경험",
    category: "DATA & CMS",
    questions: [
      "앞으로 클리닉 데이터도 Supabase에서 하나씩 직접 관리해야 해?",
      "Directus는 CMS로 편리한 DB 수정이나 add를 전문적으로 해주는 툴 아니야?"
    ],
    why: "SQL Editor와 Supabase Table Editor만으로 Treatment Intel을 계속 입력하기에는 day-to-day 작업 속도가 너무 느렸다.",
    confusion: "Directus가 데이터를 복사해서 자기 DB에 저장하는지, Supabase를 대신하는지, 아니면 단순 화면인지 구분이 필요했다.",
    simpleAnswer: "Directus는 현재 Supabase PostgreSQL 위에 붙은 전문 Admin/CMS다. Directus에서 저장하면 같은 Supabase row가 수정된다.",
    sections: [
      {
        title: "직접 써보면서 확인한 장점",
        bullets: [
          "Collection/Table을 사람이 읽기 쉬운 Form으로 편집",
          "FK 관계를 dropdown/related value 형태로 표시",
          "Markdown, divider, display template 같은 편집 UI metadata",
          "Role / permission / API 같은 CMS 기능",
          "DB를 SQL 없이 운영팀이 다룰 수 있는 Data Studio"
        ]
      },
      {
        title: "Directus가 Supabase를 대체한 것은 아니다",
        code: "Directus Data Studio\n      ↓ read / write\nSupabase PostgreSQL\n      ↑\n다른 Frontend / API도 같은 DB 사용"
      },
      {
        title: "실제 한계도 발견했다",
        paragraphs: [
          "Treatment Content 15개 필드를 입력하는 데는 괜찮았지만, Intel 문서를 읽고 공부하는 Viewer로서는 Form 느낌이 강해서 만족스럽지 않았다.",
          "이 경험이 나중에 'Admin과 Viewer는 다른 문제'라는 결론으로 이어졌다."
        ]
      }
    ],
    remember: [
      "Directus는 DB가 아니라 DB를 관리하는 레이어다.",
      "Directus의 강점은 CMS/Admin UX와 권한·관계·API 편의성이다.",
      "좋은 Admin이 반드시 좋은 Viewer인 것은 아니다."
    ],
    later: [
      "팀원이 생기고 편집 권한이 복잡해질 때 Directus의 permission 기능을 다시 평가한다.",
      "당장은 NocoDB가 일상 데이터 운영에 더 맞는지 비교한다."
    ],
    tools: ["Directus", "Supabase"],
    references: [
      { label: "Directus Data Model", href: "https://docs.directus.io/app/data-model" },
      { label: "Directus Data Studio", href: "https://docs.directus.io/user-guide/overview/data-studio-app" }
    ]
  },
  {
    slug: "docker-render-localhost",
    index: 3,
    title: "Docker, localhost, Render가 왜 연달아 나왔지?",
    subtitle: "Directus를 내 Mac에서 실행한 것과 인터넷 서버에서 계속 실행한 것의 차이",
    category: "DEPLOYMENT",
    questions: [
      "Docker가 Directus야?",
      "Render는 또 왜 필요한 거야?",
      "내 컴퓨터에서 localhost:8055로 되는데 왜 서버에 또 올려?"
    ],
    why: "Directus를 처음 Docker Desktop으로 로컬 실행한 뒤, Mac을 켜두지 않아도 인터넷에서 언제든 접속할 수 있게 만들 필요가 생겼다.",
    confusion: "Docker, Directus, Render가 하나의 연결 단계처럼 보여 각각이 프로그램인지 서버인지 구분하기 어려웠다.",
    simpleAnswer: "Directus는 앱, Docker는 그 앱을 표준화된 환경으로 실행하는 방식, Render는 그 앱을 인터넷 서버에서 계속 실행해주는 호스팅 서비스다.",
    sections: [
      {
        title: "로컬 테스트 때",
        code: "내 Mac\n└─ Docker Desktop\n   └─ Directus container\n      └─ localhost:8055\n         └─ Supabase"
      },
      {
        title: "클라우드로 옮긴 뒤",
        code: "Browser\n  ↓\nRender Web Service\n  └─ Directus Docker image\n       ↓\nSupabase PostgreSQL"
      },
      {
        title: "localhost의 의미",
        paragraphs: [
          "localhost는 '지금 내가 사용 중인 이 컴퓨터'를 뜻한다. localhost:8055는 내 Mac의 8055번 포트에서 Directus가 실행 중이라는 뜻이었다.",
          "Render에 올리면 localhost가 아니라 Render의 인터넷 주소를 통해 Directus에 접근하게 된다."
        ]
      }
    ],
    remember: [
      "Docker ≠ Directus.",
      "Render ≠ Docker.",
      "로컬 실행과 인터넷 배포는 다른 단계다."
    ],
    later: [
      "고객용 Next.js frontend는 Render가 아니라 Vercel에 배포하는 흐름을 비교한다.",
      "Docker는 나중에 앱을 같은 환경으로 재현해야 할 때 다시 중요해진다."
    ],
    tools: ["Docker", "Directus", "Render", "localhost"],
    references: [
      { label: "Docker overview", href: "https://docs.docker.com/get-started/docker-overview/" },
      { label: "Render Web Services", href: "https://render.com/docs/web-services" }
    ]
  },
  {
    slug: "editor-vs-viewer-wordpress",
    index: 4,
    title: "CMS는 만들었는데 왜 읽기가 이렇게 불편하지? — Editor와 Viewer의 분리",
    subtitle: "Directus를 Wiki처럼 쓰려다 WordPress까지 다시 떠올리게 된 이유",
    category: "DATA & CMS",
    questions: [
      "Directus는 데이터는 잘 보이는데 뷰어로서는 최악인데?",
      "이럴 줄 알았으면 그냥 WordPress를 구축할걸 그랬나?"
    ],
    why: "RF Skin Tightening의 15개 Intel 필드를 실제로 채운 뒤, 입력 화면은 작동하지만 공부하고 읽는 경험은 기대와 크게 달랐다.",
    confusion: "CMS라는 말을 '콘텐츠를 입력하고 예쁘게 보여주는 시스템 전체'로 생각했지만, headless CMS는 관리 화면과 실제 presentation layer가 분리될 수 있다.",
    simpleAnswer: "Editor/Admin과 Viewer/Frontend는 서로 다른 제품 문제다. Directus는 관리에 강하고, WordPress는 편집과 테마 기반 렌더링을 한 제품 안에서 더 밀접하게 제공한다.",
    sections: [
      {
        title: "왜 WordPress가 다시 떠올랐나",
        paragraphs: [
          "WordPress는 post/page 콘텐츠를 block editor로 작성하고 theme/template으로 frontend에 렌더링하는 경험이 강하다.",
          "하지만 decode.skin은 Treatment, Device, Clinic, Price, Audit처럼 관계형 Master Data가 핵심이므로 WordPress를 다시 관계형 DB처럼 확장해야 하는 부담이 생길 수 있다."
        ]
      },
      {
        title: "이 실험에서 얻은 원칙",
        code: "Data Admin / Editor\n= 데이터를 정확하고 빠르게 관리\n\nViewer / Frontend\n= 데이터를 읽고 이해하고 판단하기 좋게 표현"
      },
      {
        title: "결국 내린 선택",
        paragraphs: [
          "Master Data는 Supabase에 유지하고, Admin은 NocoDB/Directus 같은 전문 도구에 맡기고, Intel을 읽는 화면은 별도 HTML/CSS frontend로 만들기로 했다."
        ]
      }
    ],
    remember: [
      "CMS라는 이름만 보고 Viewer 품질까지 기대하면 안 된다.",
      "데이터 저장·관리·출력은 분리할 수 있다.",
      "WordPress가 나쁜 선택이 아니라, 현재 decode.skin의 Master Data 중심 구조와 목적이 다르다."
    ],
    later: [
      "Public Learning Page는 고객용 Next.js frontend에서 별도로 디자인한다.",
      "관리 편의성과 Viewer 품질을 각각 최적화한다."
    ],
    tools: ["Directus", "WordPress", "Supabase"],
    references: [
      { label: "WordPress Block Editor", href: "https://developer.wordpress.org/block-editor/" },
      { label: "WordPress Templates", href: "https://developer.wordpress.org/themes/core-concepts/templates/" }
    ]
  },
  {
    slug: "nocodb-return",
    index: 5,
    title: "그러고 보니 NocoDB로 뭐 만든다 그랬었지?",
    subtitle: "원래 설계했던 Editor/Admin 후보를 다시 꺼내 Directus와 직접 비교한 과정",
    category: "DATA & CMS",
    questions: [
      "그러고 보니 우리 NocoDB로 뭐 만든다 그랬었는데?",
      "NocoDB로도 해보면 안될까? Directus는 인터페이스가 너무 구린데."
    ],
    why: "Notion의 초기 Master Data Architecture에는 이미 'Supabase → NocoDB Editor/Admin'이 있었지만 Directus 실습 과정에서 잠시 잊혀졌다.",
    confusion: "NocoDB가 새로운 DB인지, 기존 Supabase 데이터를 복사하는지, Directus와 동시에 연결해도 되는지 확인이 필요했다.",
    simpleAnswer: "NocoDB도 기존 PostgreSQL/Supabase를 External Data Source로 연결해 같은 데이터를 spreadsheet-like UI로 관리할 수 있다.",
    sections: [
      {
        title: "원래 설계와 현재 구조의 변화",
        code: "초기 계획\nSupabase → NocoDB Editor/Admin\n\n실제 진행\nSupabase → Directus\n        ↘ NocoDB도 추가 연결해 비교"
      },
      {
        title: "직접 연결하며 확인한 것",
        bullets: [
          "Session Pooler host/username/database를 사용",
          "public schema를 External Data Source로 연결",
          "Allow Data Write/Edit = ON",
          "Allow Schema Change = OFF로 안전하게 시작",
          "기존 treatments / treatment_content가 즉시 Grid에 나타남"
        ]
      },
      {
        title: "SSL에서 시간을 쓴 이유와 교훈",
        paragraphs: [
          "SSL mode 드롭다운이 예상대로 작동하지 않아 연결 테스트가 반복해서 실패했고, Connection URL을 시도했다가 username placeholder까지 덮어써지는 시행착오가 있었다.",
          "최종적으로 이전에 성공했던 개별 connection 값으로 되돌리고 SSL을 끈 테스트 연결로 먼저 UI 검증을 진행했다. 운영 환경에서는 보안 설정을 별도로 정리해야 한다."
        ],
        note: "실험 단계의 목표가 'NocoDB UX 검증'일 때 인프라 세부문제 하나 때문에 전체 학습 흐름을 멈추지 않는 것도 중요한 판단이었다."
      }
    ],
    remember: [
      "NocoDB는 새 DB가 아니라 기존 DB를 관리하는 UI가 될 수 있다.",
      "외부 DB에 연결할 때 Data Write와 Schema Change 권한은 분리해서 생각한다.",
      "연결 문제와 제품 적합성 검증 문제를 섞지 않는다."
    ],
    later: [
      "NocoDB를 주력 Admin으로 채택하면 운영 전에 SSL 및 접근제어를 다시 확정한다.",
      "Clinic 대량 관리용 View를 만들어 실제 운영 적합성을 검증한다."
    ],
    tools: ["NocoDB", "Supabase", "PostgreSQL"],
    references: [
      { label: "NocoDB Data Sources", href: "https://nocodb.com/docs/product-docs/data-sources" },
      { label: "NocoDB Grid", href: "https://nocodb.com/docs/product-docs/views/view-types/grid" }
    ]
  },
  {
    slug: "directus-system-tables",
    index: 6,
    title: "왜 Supabase에 directus_* 테이블이 엄청 생겼지?",
    subtitle: "관리 도구 자체도 사용자·권한·설정·메타데이터를 저장해야 한다는 발견",
    category: "DATA & CMS",
    questions: [
      "Directus 연결하고 나서 Supabase에 테이블이 엄청 생겼어. 이게 뭐야?",
      "NocoDB에서 Directus table은 못 숨기나?"
    ],
    why: "NocoDB가 Supabase public schema 전체를 읽으면서 directus_users, directus_fields, directus_settings 등 수많은 시스템 테이블을 그대로 보여줬다.",
    confusion: "내가 만들지 않은 테이블이 갑자기 생겨 DB가 망가진 것처럼 보였다.",
    simpleAnswer: "Directus도 자신의 사용자, 역할, 권한, UI 설정, 관계 metadata를 저장할 DB가 필요하고, 같은 PostgreSQL에 directus_* 시스템 테이블을 생성한다.",
    sections: [
      {
        title: "시스템 테이블이 필요한 이유",
        bullets: [
          "누가 로그인할 수 있는가 — users",
          "누가 어떤 데이터를 볼 수 있는가 — roles / policies / permissions",
          "어떤 field를 어떤 interface로 보여줄 것인가 — fields metadata",
          "프로젝트 전역 설정 — settings"
        ]
      },
      {
        title: "왜 NocoDB에서 다 보였나",
        paragraphs: [
          "NocoDB에 public schema 전체를 연결했기 때문에 NocoDB는 decode.skin 업무 테이블과 Directus 시스템 테이블을 구분하지 않고 모두 외부 DB table로 인식했다."
        ]
      },
      {
        title: "실제 운영 원칙",
        note: "directus_* 테이블은 Directus가 사용하는 내부 데이터이므로 임의 삭제·수정하지 않는다. NocoDB에서는 가능하면 숨기거나 업무 테이블만 보는 View를 사용한다."
      }
    ],
    remember: [
      "SaaS/CMS도 내부적으로 metadata를 저장한다.",
      "내가 만든 business table과 system table은 역할이 다르다.",
      "시스템 테이블은 보인다고 해서 건드릴 필요가 없다."
    ],
    later: [
      "툴이 늘어나면 system schema와 business schema 분리 필요성을 검토할 수 있다.",
      "지금은 UI 불편 때문에 DB 구조를 성급하게 옮기지 않는다."
    ],
    tools: ["Directus", "NocoDB", "Supabase"]
  },
  {
    slug: "nocodb-vs-directus",
    index: 7,
    title: "NocoDB가 훨씬 편한데 Directus는 왜 필요하지?",
    subtitle: "가능/불가능보다 어떤 업무에서 더 편한지로 도구를 평가한 과정",
    category: "DATA & CMS",
    questions: [
      "NocoDB가 Directus보다 전체적으로 훨씬 관리가 쉬워보이는데?",
      "Directus의 관계 설정, 권한, API, schema metadata 같은 장점들은 Supabase나 NocoDB에서는 못 하는 거야?"
    ],
    why: "두 도구를 같은 Supabase DB에 실제로 연결해보니 NocoDB의 Grid 편집이 day-to-day 데이터 작업에 훨씬 직관적으로 느껴졌다.",
    confusion: "Directus가 더 전문적이라는 말이 '기능적으로 상위 제품'이라는 뜻인지, NocoDB/Supabase로는 못 하는 기능이 있다는 뜻인지 헷갈렸다.",
    simpleAnswer: "셋 다 겹치는 기능이 많다. 차이는 기능의 존재보다 어느 레이어에서 얼마나 편하게 제공하느냐에 가깝다.",
    sections: [
      {
        title: "현재 decode.skin 관점의 역할",
        bullets: [
          "Supabase — 실제 DB, Auth, RLS, 자동 Data API의 원천",
          "NocoDB — row를 많이 보고 빠르게 입력·수정·필터·정렬하는 운영 UI",
          "Directus — CMS form, 관계형 편집, 세밀한 permission, metadata 중심 운영 UI"
        ]
      },
      {
        title: "관계 설정",
        paragraphs: [
          "진짜 FK 관계의 원천은 PostgreSQL/Supabase다. Directus와 NocoDB는 그 관계를 사람이 편집하기 좋은 UI로 보여줄 수 있다."
        ]
      },
      {
        title: "권한",
        paragraphs: [
          "고객 사이트 보안은 Supabase Auth + Row Level Security로 DB 레벨에서 강제할 수 있다. Directus는 운영팀이 CMS 안에서 role/field/item 권한을 시각적으로 설정하기 편하다."
        ]
      },
      {
        title: "API",
        paragraphs: [
          "Supabase도 DB schema에서 REST API를 자동 생성하고 RLS와 결합한다. Directus도 REST/GraphQL API를 자동 제공한다. 따라서 API 때문에 Directus가 반드시 필요한 것은 아니다."
        ]
      }
    ],
    remember: [
      "Directus가 NocoDB보다 무조건 상위 도구는 아니다.",
      "현재 day-to-day 데이터 운영은 NocoDB가 더 잘 맞을 수 있다.",
      "고객 보안과 데이터 원천은 Supabase 중심으로 유지할 수 있다."
    ],
    later: [
      "팀원이 생기고 CMS workflow와 세밀한 권한이 필요해지면 Directus를 다시 평가한다.",
      "NocoDB가 실제 Clinic 100~1,000개 운영에서 계속 편한지 검증한다."
    ],
    tools: ["Supabase", "NocoDB", "Directus"],
    references: [
      { label: "Supabase Data API", href: "https://supabase.com/docs/guides/api" },
      { label: "Supabase RLS", href: "https://supabase.com/docs/guides/database/postgres/row-level-security" },
      { label: "Directus API", href: "https://docs.directus.io/reference/introduction" }
    ]
  },
  {
    slug: "page-designer-experiment",
    index: 8,
    title: "NocoDB 안에서 Wiki Viewer까지 만들 수 없을까?",
    subtitle: "Gallery, Expanded Record, Page Designer를 실제로 써보고 한계를 확인한 실험",
    category: "DATA & CMS",
    questions: [
      "이게 훨씬 간편하긴 한데 뷰어 형태로 구축하려면 어떻게 해야 할까?",
      "Page Designer 안에 필드를 넣었더니 이렇게 나오는데, 이걸 언제 디자인해 ㅜㅜ"
    ],
    why: "NocoDB Admin UX가 마음에 들었기 때문에 별도 frontend를 만들지 않고 같은 도구 안에서 읽기 좋은 Treatment Wiki까지 해결할 수 있는지 확인하고 싶었다.",
    confusion: "Page Designer라는 이름 때문에 자동으로 record를 멋진 Wiki layout으로 만들어줄 것으로 기대했다.",
    simpleAnswer: "Page Designer는 정적인 report/document layout에는 유용하지만, 계속 탐색하고 읽는 Wiki Viewer를 자동으로 만들어주는 도구는 아니었다.",
    sections: [
      {
        title: "실제로 해본 순서",
        bullets: [
          "Grid — 대량 row 관리에는 매우 편리",
          "셀 Long Text editor — 한 field만 크게 편집",
          "Expanded Record — 한 row 전체를 세로 Form으로 보기",
          "Page Designer — field를 캔버스에 직접 배치",
          "Rich Text 시도 — External Data Source + Schema Edit OFF로 field property 변경 제한"
        ]
      },
      {
        title: "왜 여기서 멈췄나",
        paragraphs: [
          "Page Designer에서 각 field의 위치와 크기를 직접 잡아야 했고 Markdown이 기대한 Wiki 형태로 자동 렌더링되지 않았다.",
          "Admin을 예쁜 Viewer로 억지로 만들기보다, Viewer는 read-only frontend로 얇게 만드는 편이 전체 effort가 더 작다고 판단했다."
        ]
      }
    ],
    remember: [
      "NocoDB의 강점은 Data Admin이다.",
      "Viewer를 억지로 Admin 툴 안에 구현하면 오히려 시간이 더 들 수 있다.",
      "실패한 실험도 다음 구조 결정을 위한 요구사항 정의다."
    ],
    later: [
      "Clinic 운영에는 Grid/Gallery/Kanban 등 NocoDB View를 적극 활용한다.",
      "긴 Intel을 읽는 경험은 custom frontend에서 해결한다."
    ],
    tools: ["NocoDB", "Page Designer", "Rich Text"]
  },
  {
    slug: "html-viewer-breakthrough",
    index: 9,
    title: "그냥 HTML + CSS Viewer를 만들면 되잖아 — 첫 번째 화면이 모든 걸 정리했다",
    subtitle: "같은 RF Skin Tightening 데이터가 Viewer 하나로 완전히 다른 제품처럼 느껴진 순간",
    category: "FRONTEND",
    questions: [
      "HTML+CSS가 훨씬 좋은 것 같은데? 사실 난 그걸 기대했거든.",
      "여기서 보기 좋게 나오면 굳이 시간 들여서 HTML 위키 구축은 안 해도 되는데, 안 되면 그냥 만들면 되는 거지?"
    ],
    why: "Directus와 NocoDB에서 같은 Treatment Content를 봤지만 모두 데이터 관리 도구의 느낌이 강했다.",
    confusion: "데이터가 이미 잘 구조화되어 있는데 왜 읽는 경험만 이렇게 나쁜지 의문이었다.",
    simpleAnswer: "DB 데이터와 화면 디자인은 별개다. 같은 데이터를 custom HTML/CSS로 렌더링하면 읽기 경험은 완전히 달라진다.",
    sections: [
      {
        title: "첫 프로토타입에서 확인한 것",
        bullets: [
          "왼쪽 Treatment navigation",
          "중앙의 긴-form Intel document",
          "오른쪽 record summary + 목차",
          "Patient Experience card",
          "Market Intelligence와 Founder Take의 시각적 분리"
        ]
      },
      {
        title: "이 화면이 중요한 이유",
        paragraphs: [
          "이제 frontend의 역할을 추상적으로 설명할 필요가 없어졌다. NocoDB에서 같은 데이터를 관리하고, Viewer에서는 읽기 좋은 방식으로 표현하면 된다.",
          "이 구조는 나중에 실제 고객용 Treatment/Clinic 페이지에도 그대로 확장할 수 있다."
        ]
      },
      {
        title: "목표 데이터 흐름",
        code: "NocoDB에서 수정\n  ↓\nSupabase에 저장\n  ↓\nFrontend가 읽음\n  ↓\nHTML/CSS UI로 렌더링"
      }
    ],
    remember: [
      "Frontend는 DB를 예쁘게 꾸미는 것이 아니라 데이터를 사용자 경험으로 변환한다.",
      "Admin과 Viewer를 분리하니 각 툴이 잘하는 일을 맡길 수 있다.",
      "이 내부 Viewer는 실제 MVP frontend의 축소판이다."
    ],
    later: [
      "Supabase live data를 연결해 NocoDB 수정 → Viewer 반영을 확인한다.",
      "Treatment에서 Clinic/Device/Learning Wiki로 같은 frontend pattern을 확장한다."
    ],
    tools: ["HTML", "CSS", "Supabase", "NocoDB"]
  },
  {
    slug: "code-files-folders-project",
    index: 10,
    title: "웹사이트는 코딩만 하면 되는 거 아니야? — 코드, 파일, 폴더, 프로젝트",
    subtitle: "Next.js ZIP을 보고 가장 먼저 생긴 근본적인 질문",
    category: "FOUNDATIONS",
    questions: [
      "애시당초 왜 폴더 또는 파일이 필요한지 모르겠어. 그냥 웹사이트는 코딩만 하면 구현되는 거 아니야?",
      "코딩할 줄 알면 그냥 HTML CSS 코딩해서 GitHub에 올리면 끝 아니냐고."
    ],
    why: "처음에는 단일 HTML prototype을 봤는데 Next.js 프로젝트로 옮기자 app, components, lib, package.json 같은 파일과 폴더가 갑자기 늘어났다.",
    confusion: "코드와 파일을 별개 개념으로 생각하지 않았고, 프로젝트 폴더가 웹사이트의 필수 기술처럼 느껴졌다.",
    simpleAnswer: "코드는 내용이고, 파일은 코드를 저장하는 단위이며, 폴더는 여러 파일을 정리하는 구조다. 프로젝트는 한 제품을 이루는 파일 전체를 부르는 이름이다.",
    sections: [
      {
        title: "한 파일로도 웹페이지는 된다",
        code: "index.html\n└─ HTML + <style> CSS + <script> JavaScript 를 한 파일에 모두 넣을 수도 있음"
      },
      {
        title: "왜 나누기 시작하나",
        bullets: [
          "코드가 길어지면 찾고 수정하기 어려움",
          "Sidebar, Card 같은 UI를 여러 페이지에서 재사용",
          "데이터 가져오는 로직과 화면 코드를 분리",
          "여러 사람이 또는 Codex가 특정 기능을 안전하게 수정하기 쉬움"
        ]
      },
      {
        title: "프로젝트의 의미",
        code: "decode-skin-intel-viewer/\n├─ app/            페이지\n├─ components/     재사용 UI\n├─ lib/            데이터/로직\n├─ package.json    프로젝트 의존성/명령 설명\n└─ ..."
      }
    ],
    remember: [
      "파일이 많아서 웹사이트가 되는 것이 아니다.",
      "웹사이트가 커지기 때문에 코드를 파일로 나눠 관리한다.",
      "Repository와 project folder는 거의 같은 코드 묶음을 로컬/온라인에서 보는 관점 차이다."
    ],
    later: [
      "Codex가 파일을 수정하는 모습을 보면서 각 폴더의 역할을 실제로 익힌다.",
      "작은 변경을 Git history로 비교해 파일 분리의 이점을 체감한다."
    ],
    tools: ["HTML", "CSS", "JavaScript", "Next.js"]
  },
  {
    slug: "html-css-js",
    index: 11,
    title: "HTML, CSS, JavaScript만으로도 진짜 웹사이트가 되나?",
    subtitle: "프레임워크 이전에 브라우저가 실제로 이해하는 기본 언어",
    category: "FRONTEND",
    questions: [
      "그냥 HTML CSS만 있으면 끝난다며 웹페이지는?",
      "옛날엔 Next.js 이런 거 없었잖아. 그럼 뭘로 만들었어?"
    ],
    why: "React와 Next.js가 등장하면서 이것들이 웹사이트의 필수 구성인지, 아니면 기본 웹 기술 위에 추가된 선택지인지 구분할 필요가 생겼다.",
    confusion: "HTML/CSS/JavaScript, React, Next.js가 모두 같은 레벨의 대체 기술처럼 들렸다.",
    simpleAnswer: "브라우저가 최종적으로 사용하는 기본은 HTML, CSS, JavaScript다. React와 Next.js는 이 기본 기술을 더 체계적으로 다루기 위한 도구다.",
    sections: [
      {
        title: "세 가지 기본 역할",
        bullets: [
          "HTML — 제목, 문단, 버튼, 카드 같은 구조와 의미",
          "CSS — 색, 여백, 폰트, 레이아웃, 반응형 디자인",
          "JavaScript — 클릭, 데이터 요청, 화면 변경 같은 동작"
        ]
      },
      {
        title: "RF Viewer에 대입",
        code: "HTML → Overview / Mechanism / Patient Experience 구조\nCSS → 네이비 sidebar / card / typography\nJavaScript → Supabase에서 Treatment 데이터를 가져와 화면에 반영"
      },
      {
        title: "옛날 웹과 현재 웹의 차이",
        paragraphs: [
          "초기의 많은 사이트는 서버가 HTML을 만들거나 정적인 HTML/CSS/JS 파일을 그대로 제공했다. 지금도 이 방식은 유효하다.",
          "React/Next.js는 웹이 앱처럼 복잡해지면서 코드 재사용, routing, rendering, 데이터 흐름을 관리하기 위해 등장한 상위 도구다."
        ]
      }
    ],
    remember: [
      "React/Next.js를 써도 HTML/CSS/JavaScript가 사라지는 것은 아니다.",
      "작은 사이트는 framework 없이도 충분히 만들 수 있다.",
      "decode.skin은 복잡한 서비스로 성장할 예정이므로 framework를 연습할 가치가 있다."
    ],
    later: [
      "Next.js 안의 JSX와 CSS가 실제 HTML/CSS와 어떻게 연결되는지 비교한다.",
      "Browser DevTools에서 최종 렌더링된 HTML을 확인해본다."
    ],
    tools: ["HTML", "CSS", "JavaScript"]
  },
  {
    slug: "react-why",
    index: 12,
    title: "HTML/CSS면 되는데 React는 왜 생겼지?",
    subtitle: "복잡한 UI를 재사용 가능한 Component로 다루는 이유",
    category: "FRONTEND",
    questions: [
      "Next.js 말고 웹사이트를 만드는 방식이 또 있어? React로 만드는 거야 뭐야?",
      "React가 좋든 Next.js가 좋든 둘 중 더 좋은 걸로 decode.skin을 만들어야지."
    ],
    why: "수업에서도 React와 Next.js를 배우기 때문에 둘의 관계를 실제 decode.skin 구조에 대입해 이해하고 싶었다.",
    confusion: "React와 Next.js를 서로 경쟁하는 두 개의 웹 제작 방식으로 생각했다.",
    simpleAnswer: "React는 UI를 Component라는 재사용 가능한 부품으로 만드는 JavaScript library다. Next.js는 React를 기반으로 실제 웹서비스 전체를 구성하는 framework다.",
    sections: [
      {
        title: "왜 Component가 필요한가",
        code: "반복해서 필요한 UI\n├─ <ClinicCard />\n├─ <TreatmentCard />\n├─ <VerifiedBadge />\n├─ <Sidebar />\n└─ <ConcernSelector />"
      },
      {
        title: "React 없이도 가능하지만",
        paragraphs: [
          "HTML/JavaScript로 같은 화면을 만들 수 있다. 다만 Treatment 수백 개, Clinic 수천 개, 상태 변화와 사용자 인터랙션이 늘어나면 같은 UI 로직을 반복해서 관리하기 어렵다.",
          "React는 UI를 작은 Component로 분해하고 데이터가 바뀌면 화면을 다시 그리는 방식을 표준화한다."
        ]
      },
      {
        title: "decode.skin에서 React가 잘 맞는 이유",
        bullets: [
          "Clinic/Treatment 카드 반복",
          "Verified Badge 상태 표시",
          "Compare selection 상태",
          "검색/필터 결과 갱신",
          "Saved items와 Account UI",
          "Internal Wiki의 반복되는 문서 layout"
        ]
      }
    ],
    remember: [
      "React ≠ Next.js의 경쟁자.",
      "React는 UI library, Next.js는 React framework.",
      "Next.js를 쓰는 것은 React도 쓰는 것이다."
    ],
    later: [
      "현재 Viewer에서 Sidebar를 별도 React Component로 분리해본다.",
      "ClinicCard를 하나 만들어 props가 무엇인지 체감한다."
    ],
    tools: ["React", "JavaScript", "JSX"],
    references: [
      { label: "React docs", href: "https://react.dev/" },
      { label: "React Components", href: "https://react.dev/learn/your-first-component" }
    ]
  },
  {
    slug: "nextjs-why",
    index: 13,
    title: "React가 있는데 Next.js는 왜 또 필요한 거야?",
    subtitle: "React로 실제 서비스의 페이지·데이터·렌더링 구조를 만들기 위한 framework",
    category: "FRONTEND",
    questions: [
      "왜 Next.js가 또 나타나는 거야?",
      "Next.js에 들어가서 뭐 해야 되는 거 아니야? 난 Next.js가 뭔지도 몰라."
    ],
    why: "단일 HTML prototype을 실제 여러 Treatment와 Supabase data로 확장하려고 하면서 Next.js 프로젝트가 등장했다.",
    confusion: "NocoDB나 Vercel처럼 Next.js도 로그인해서 쓰는 SaaS라고 느껴졌고, React와 역할이 겹치는 것처럼 보였다.",
    simpleAnswer: "Next.js는 접속해서 쓰는 SaaS가 아니라 내 코드 프로젝트 안에 설치되는 React framework다. Routing, rendering, data fetching, build 같은 웹서비스 구조를 제공한다.",
    sections: [
      {
        title: "React만으로 시작하면 직접 결정해야 하는 것들",
        bullets: [
          "페이지 URL과 routing",
          "서버/브라우저 중 어디서 데이터를 가져올지",
          "SEO와 metadata",
          "공통 layout",
          "build와 production 배포 구조"
        ]
      },
      {
        title: "Next.js가 제공하는 틀",
        code: "app/\n├─ page.tsx                 → /\n├─ treatments/\n│  └─ [slug]/page.tsx       → /treatments/rf-skin-tightening\n└─ learning/\n   └─ [slug]/page.tsx       → /learning/react-why"
      },
      {
        title: "decode.skin에 Next.js를 추천하는 이유",
        paragraphs: [
          "decode.skin은 Treatment, Clinic, Learning, Compare, Account처럼 URL이 많은 콘텐츠/서비스형 제품으로 확장될 가능성이 높다.",
          "그래서 React만 조립하는 것보다 Next.js를 사용해 routing과 server rendering 구조까지 함께 가져가는 편이 장기적으로 자연스럽다."
        ]
      }
    ],
    remember: [
      "Next.js를 쓰면 React도 함께 쓴다.",
      "Next.js는 SaaS가 아니라 code framework다.",
      "현재 프로젝트의 app 폴더 구조가 URL 구조와 연결된다."
    ],
    later: [
      "[slug] dynamic route가 Treatment 여러 개를 한 template으로 보여주는 과정을 확인한다.",
      "Supabase data fetching이 server component에서 어떻게 실행되는지 본다."
    ],
    tools: ["Next.js", "React", "Node.js", "npm"],
    references: [
      { label: "Next.js docs", href: "https://nextjs.org/docs" },
      { label: "React Foundations — Next.js", href: "https://nextjs.org/learn/react-foundations/what-is-react-and-nextjs" }
    ]
  },
  {
    slug: "vscode-codex",
    index: 14,
    title: "VS Code는 또 뭐고 Codex는 뭐가 다른 거야?",
    subtitle: "웹사이트 기술이 아니라 코드를 다루는 작업 도구와 개발 에이전트",
    category: "DEVELOPMENT",
    questions: [
      "VS Code도 그때 막 언급하더라고. 저건 또 뭔가 새로운 게 튀어나와서 너무 헷갈렸어.",
      "난 코딩은 Codex에서 한다고 생각했어."
    ],
    why: "React/Next.js 프로젝트를 실제로 실행하려고 하자 수업에서는 VS Code를 쓰고, 대화에서는 Codex를 쓰자는 이야기가 동시에 나왔다.",
    confusion: "VS Code와 Codex가 React/Next.js처럼 웹사이트의 일부인지, 둘 중 하나를 골라야 하는지 헷갈렸다.",
    simpleAnswer: "VS Code는 사람이 코드 파일을 직접 열고 수정하는 code editor이고, Codex는 코드베이스를 읽고 수정·실행하는 coding agent다. 둘 다 사이트의 일부가 아니라 개발 작업 도구다.",
    sections: [
      {
        title: "같은 프로젝트를 다루는 두 방식",
        code: "사람이 직접\nVS Code → page.tsx 열기 → 코드 수정 → 실행\n\nAgent에게 맡기기\nCodex → 프로젝트 읽기 → 관련 파일 찾기 → 수정/테스트"
      },
      {
        title: "왜 수업에서는 VS Code를 배우나",
        paragraphs: [
          "개발자는 오랫동안 editor/IDE에서 코드를 직접 읽고 쓰는 방식으로 일해왔다. VS Code는 코드 편집, 검색, terminal, Git, debugging 같은 기능을 한 작업공간에 제공한다.",
          "Codex를 써도 결과를 검토하거나 직접 작은 수정을 할 때 code editor를 이해하면 큰 도움이 된다."
        ]
      },
      {
        title: "왜 Codex가 유용한가",
        paragraphs: [
          "Codex는 단순히 코드 한 줄을 생성하는 것보다 프로젝트 전체에서 관련 파일을 찾고 기능을 구현하거나 버그를 수정하는 작업에 적합하다."
        ]
      }
    ],
    remember: [
      "VS Code와 Codex는 frontend framework가 아니다.",
      "VS Code = code editor / 작업대.",
      "Codex = 프로젝트를 실제로 작업하는 coding agent."
    ],
    later: [
      "Codex가 수정한 diff를 직접 보면서 코드 리뷰 습관을 익힌다.",
      "필요할 때 VS Code로 프로젝트 구조를 눈으로 확인한다."
    ],
    tools: ["VS Code", "Codex"],
    references: [
      { label: "VS Code overview", href: "https://code.visualstudio.com/docs/getstarted/overview" },
      { label: "OpenAI Codex", href: "https://openai.com/codex/" }
    ]
  },
  {
    slug: "git-github-codex",
    index: 15,
    title: "Codex가 파일을 수정하면 내가 다시 올려야 해? — Git과 GitHub",
    subtitle: "로컬 프로젝트, repository, commit, push와 Codex Cloud를 한 그림으로 이해하기",
    category: "DEVELOPMENT",
    questions: [
      "Codex가 로컬에 있는 파일이나 폴더의 코드를 건들 텐데, 그럼 다시 내가 올려야 해? 어디다?",
      "그냥 Codex가 GitHub에 들어가서 하면 안 되는 거야?"
    ],
    why: "코드가 내 Mac에도 있고 GitHub에도 있을 수 있다는 설명에서 '진짜 원본이 어디인지'와 변경사항이 어떻게 이동하는지 궁금해졌다.",
    confusion: "GitHub를 웹사이트 실행 장소처럼 생각하기도 했고, 로컬 파일을 수정할 때마다 수동으로 다시 업로드해야 하는지 걱정했다.",
    simpleAnswer: "Git은 파일 변경 이력을 기록하고 동기화하는 시스템이고 GitHub는 repository를 온라인에 보관하는 서비스다. Codex는 로컬 프로젝트를 수정할 수도 있고 GitHub repository 기반 cloud 작업을 할 수도 있다.",
    sections: [
      {
        title: "Repository의 가장 쉬운 정의",
        paragraphs: [
          "Repository는 한 프로젝트의 파일·폴더와 각 파일의 변경 이력을 함께 관리하는 공간이다. 로컬에도 Git repository가 있을 수 있고 GitHub에는 그 온라인 원격 저장소가 있을 수 있다."
        ]
      },
      {
        title: "로컬 Codex 방식",
        code: "Mac project\n  ↕ Codex가 파일 수정\nGit commit\n  ↓ push\nGitHub repository\n  ↓\nVercel"
      },
      {
        title: "Codex Cloud / repository 방식",
        code: "GitHub repository\n  ↕\nCodex cloud task\n  ↓ 변경 제안 / PR / merge\nGitHub\n  ↓\nVercel"
      }
    ],
    remember: [
      "파일을 매번 브라우저로 하나씩 재업로드하는 방식이 기본 workflow는 아니다.",
      "Git은 변경을 기록하고 GitHub와 동기화한다.",
      "Codex는 local codebase와 repository 기반 workflow 모두에 참여할 수 있다."
    ],
    later: [
      "첫 GitHub repo를 만들고 commit 하나가 실제로 무엇을 저장하는지 확인한다.",
      "Codex가 만든 변경사항을 pull request 형태로 검토하는 workflow를 연습한다."
    ],
    tools: ["Git", "GitHub", "Codex"],
    references: [
      { label: "GitHub — About Git", href: "https://docs.github.com/en/get-started/using-git/about-git" },
      { label: "GitHub — About repositories", href: "https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories" },
      { label: "OpenAI Codex", href: "https://openai.com/codex/" }
    ]
  },
  {
    slug: "vercel-deployment",
    index: 16,
    title: "GitHub에 코드가 있는데 Vercel은 왜 또 필요하지?",
    subtitle: "코드를 저장하는 것과 실제 인터넷 서비스로 배포하는 것의 차이",
    category: "DEPLOYMENT",
    questions: [
      "그냥 코드 짜서 GitHub에 붙이면 웹사이트가 구현되는 거 아니야?",
      "Vercel은 또 왜 필요한 거야?"
    ],
    why: "코드가 GitHub에 올라가면 인터넷에 있으니 곧바로 웹사이트가 되는 것처럼 느껴졌다.",
    confusion: "코드 보관과 실행/호스팅의 차이가 보이지 않았다.",
    simpleAnswer: "GitHub는 코드와 history를 보관한다. Vercel은 그 repository를 가져와 build하고 인터넷에서 접속 가능한 deployment로 실행한다.",
    sections: [
      {
        title: "실제 흐름",
        code: "Codex / VS Code\n  ↓ 코드 변경\nGitHub repository\n  ↓ Vercel이 build\nVercel deployment\n  ↓\nhttps://...vercel.app\n  ↓\nBrowser"
      },
      {
        title: "왜 Next.js와 Vercel 조합을 쓰나",
        paragraphs: [
          "Vercel은 Next.js 프로젝트를 자동 감지해 build/deploy 설정을 적용할 수 있고, Git repository와 연결하면 새로운 commit마다 deployment를 만들 수 있다."
        ]
      },
      {
        title: "Render와 비교",
        bullets: [
          "Vercel — Next.js/frontend 배포에 매우 자연스러운 선택",
          "Render — Directus처럼 지속 실행되는 web service 또는 Docker image 실행에 사용"
        ]
      }
    ],
    remember: [
      "GitHub = 저장/협업, Vercel = build/배포/호스팅.",
      "코드가 존재하는 것과 서비스가 실행 중인 것은 다르다.",
      "Git push → 자동 deployment가 연결되면 운영이 매우 단순해진다."
    ],
    later: [
      "Intel Viewer를 실제 Vercel URL로 처음 배포한다.",
      "환경변수를 Vercel에 설정해 Supabase live data를 연결한다."
    ],
    tools: ["GitHub", "Vercel", "Next.js"],
    references: [
      { label: "Vercel Deployments", href: "https://vercel.com/docs/deployments/overview" },
      { label: "Next.js on Vercel", href: "https://vercel.com/docs/frameworks/full-stack/nextjs" }
    ]
  },
  {
    slug: "supabase-api-auth-rls",
    index: 17,
    title: "Frontend가 Supabase 데이터를 읽는다는 건 정확히 무슨 뜻이지?",
    subtitle: "Database를 직접 노출하는 것이 아니라 API와 권한을 통해 데이터를 전달하는 구조",
    category: "DATA & CMS",
    questions: [
      "NocoDB에서 수정한 값이 어떻게 Viewer에 바로 나오는 거야?",
      "Directus의 API나 권한 기능이 없으면 고객 사이트는 위험하지 않아?"
    ],
    why: "Internal Viewer에서 Supabase live data를 읽는 다음 단계로 넘어가기 전에 frontend와 DB가 실제로 어떻게 통신하는지 이해할 필요가 생겼다.",
    confusion: "웹페이지가 DB 파일을 직접 열어보는 것처럼 느껴질 수 있지만 실제로는 API request와 접근 권한이 사이에 있다.",
    simpleAnswer: "Supabase는 PostgreSQL schema에서 Data API를 제공하고, Auth + Row Level Security를 사용해 누가 어떤 row를 읽거나 수정할 수 있는지 DB 수준에서 제한할 수 있다.",
    sections: [
      {
        title: "Internal Viewer의 단순 흐름",
        code: "Next.js\n  ↓ HTTP request\nSupabase Data API\n  ↓ policy 확인\nPostgreSQL\n  ↓ 결과\nNext.js → HTML 렌더링"
      },
      {
        title: "NocoDB 수정이 반영되는 이유",
        paragraphs: [
          "NocoDB도 같은 Supabase PostgreSQL row를 수정하고 Viewer도 같은 row를 읽기 때문에 별도 sync copy가 필요하지 않다."
        ]
      },
      {
        title: "미래 고객 사이트에서는",
        bullets: [
          "Public treatment/clinic 정보 — 공개 가능한 row/field만",
          "Customer saved items/cases — 로그인한 자기 데이터만",
          "Internal founder notes/audits — public API에서 차단"
        ]
      }
    ],
    remember: [
      "Frontend는 DB와 API를 통해 통신한다.",
      "Supabase RLS는 고객별 데이터 접근을 DB에서 강제할 수 있다.",
      "Internal/Public data boundary는 frontend 디자인보다 DB 권한에서 먼저 지켜야 한다."
    ],
    later: [
      "Internal Viewer는 먼저 read-only public-safe data로 연결한다.",
      "고객 기능을 만들 때 Supabase Auth/RLS를 별도 학습한다."
    ],
    tools: ["Supabase", "REST API", "Auth", "RLS"],
    references: [
      { label: "Supabase Data REST API", href: "https://supabase.com/docs/guides/api" },
      { label: "Supabase Auth", href: "https://supabase.com/docs/guides/auth" },
      { label: "Supabase RLS", href: "https://supabase.com/docs/guides/database/postgres/row-level-security" }
    ]
  },
  {
    slug: "all-tools-map",
    index: 18,
    title: "Tool Map — 지금까지 등장한 모든 소프트웨어와 SaaS는 어디에 쓰였나",
    subtitle: "새로운 이름이 나올 때마다 다시 길을 잃지 않기 위한 decode.skin 기술 도구 사전",
    category: "TOOLS",
    questions: [
      "왜 이렇게 어려운 것과 껴있는 것들이 많은지 모르겠어.",
      "이 툴/SaaS들이 achieve 하려는 단 하나의 공동목표와 서로의 관계를 한 번에 보고 싶어."
    ],
    why: "실제 제품을 만들다 보니 한 도구가 모든 것을 해주는 게 아니라 전문화된 여러 도구가 파이프라인을 이루는 구조가 반복해서 등장했다.",
    confusion: "SaaS, framework, library, editor, database, hosting, agent 같은 소프트웨어 종류를 구분하지 않으면 모든 이름이 같은 레벨로 느껴진다.",
    simpleAnswer: "도구의 브랜드명을 외우지 말고 '무엇을 저장하는가 / 누가 사용하는가 / 언제 실행되는가'로 분류한다.",
    sections: [
      {
        title: "Data / Backend",
        bullets: [
          "PostgreSQL — 관계형 DB 엔진",
          "Supabase — 관리형 Postgres + Auth/API/Storage 등 backend platform",
          "REST / GraphQL — frontend와 backend가 데이터를 주고받는 API 방식",
          "RLS — row 단위 데이터 접근 규칙"
        ]
      },
      {
        title: "Admin / CMS / Knowledge",
        bullets: [
          "NocoDB — spreadsheet-like database admin / operations",
          "Directus — headless CMS + Data Studio + permissions/API",
          "WordPress — 콘텐츠 편집 + template/theme 기반 publishing",
          "Notion — architecture/policy/schema의 사람용 source of truth"
        ]
      },
      {
        title: "Frontend",
        bullets: [
          "HTML — 문서/화면 구조",
          "CSS — presentation/style",
          "JavaScript — 동작과 데이터 처리",
          "React — component 기반 UI library",
          "Next.js — React 기반 web application framework"
        ]
      },
      {
        title: "Coding / Development",
        bullets: [
          "VS Code — source code editor",
          "Codex — coding agent",
          "Git — version control",
          "GitHub — online repository / collaboration",
          "Node.js — JavaScript runtime used by development/build tooling",
          "npm — JavaScript package manager / script runner"
        ]
      },
      {
        title: "Hosting / Infrastructure",
        bullets: [
          "Vercel — frontend/Next.js deployment platform",
          "Render — web service / Docker app hosting",
          "Docker — application runtime environment를 image/container로 패키징",
          "localhost — 내 컴퓨터 자신을 가리키는 주소"
        ]
      },
      {
        title: "Design / Prototype / Content",
        bullets: [
          "Figma — UI design/prototype/design handoff",
          "v0 — prompt에서 UI/code를 생성하는 Vercel의 AI coding/design workflow",
          "Gamma — presentation/document/webpage를 빠르게 생성·공유",
          "ChatGPT — 제품 구조, 기획, 리서치, 학습, 의사결정 지원"
        ]
      }
    ],
    remember: [
      "모든 도구를 다 쓸 필요는 없다.",
      "같은 역할을 하는 도구는 실제 workflow에서 비교한 뒤 하나를 주력으로 고른다.",
      "현재 핵심 spine은 Supabase → NocoDB → Next.js → GitHub → Vercel이다."
    ],
    later: [
      "실제 MVP 개발 단계마다 Tool Map의 Current / Future 상태를 업데이트한다.",
      "비용과 팀 규모가 커지면 각 도구의 대체 가능성을 다시 평가한다."
    ],
    tools: ["PostgreSQL", "Supabase", "NocoDB", "Directus", "WordPress", "Notion", "HTML", "CSS", "JavaScript", "React", "Next.js", "VS Code", "Codex", "Git", "GitHub", "Node.js", "npm", "Vercel", "Render", "Docker", "Figma", "v0", "Gamma", "ChatGPT"],
    references: [
      { label: "React", href: "https://react.dev/" },
      { label: "Next.js", href: "https://nextjs.org/docs" },
      { label: "Supabase", href: "https://supabase.com/docs" },
      { label: "NocoDB", href: "https://nocodb.com/docs/product-docs" },
      { label: "Directus", href: "https://docs.directus.io/" },
      { label: "GitHub", href: "https://docs.github.com/en/repositories" },
      { label: "Vercel", href: "https://vercel.com/docs" },
      { label: "Docker", href: "https://docs.docker.com/get-started/docker-overview/" },
      { label: "VS Code", href: "https://code.visualstudio.com/docs/getstarted/overview" },
      { label: "Codex", href: "https://openai.com/codex/" },
      { label: "Notion", href: "https://www.notion.com/help" },
      { label: "Figma", href: "https://www.figma.com/prototyping/" },
      { label: "v0", href: "https://vercel.com/docs/v0" },
      { label: "Gamma", href: "https://gamma.app/" }
    ]
  }
];

export function getLearningPage(slug: string) {
  return learningPages.find((page) => page.slug === slug) ?? null;
}

export const learningGroups = [
  { label: "FOUNDATIONS", pages: learningPages.filter((p) => p.category === "FOUNDATIONS") },
  { label: "DATA & CMS", pages: learningPages.filter((p) => p.category === "DATA & CMS") },
  { label: "FRONTEND", pages: learningPages.filter((p) => p.category === "FRONTEND") },
  { label: "DEVELOPMENT", pages: learningPages.filter((p) => p.category === "DEVELOPMENT") },
  { label: "DEPLOYMENT", pages: learningPages.filter((p) => p.category === "DEPLOYMENT") },
  { label: "TOOLS", pages: learningPages.filter((p) => p.category === "TOOLS") },
];
