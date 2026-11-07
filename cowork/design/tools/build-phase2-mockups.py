#!/usr/bin/env python3
"""Phase 2 시안 생성기 (22번 → 25번). 생성물: site/about.html, site/index.html, system/search-index.js

데이터 원본은 현재 구현의 src/app/about/page.tsx(경력, 문장은 그대로)와 posts/*.md, content/series.yaml이다.
시안은 이 스크립트의 결과물이다. 고칠 때는 이 파일을 고치고 다시 실행한다.

  python3 cowork/design/tools/build-phase2-mockups.py

index.html은 이전 결과의 head·header·footer·팔레트와 글 목록(.home__list)을 빌려 쓴다(글 목록은 손으로 관리).
"""
import html
import json
import pathlib
import re

HERE = pathlib.Path(__file__).resolve().parent
DESIGN = HERE.parent
REPO = DESIGN.parent.parent
SITE = DESIGN / "site"

esc = html.escape

# ---------------------------------------------------------------- about ----
src = (REPO / "src/app/about/page.tsx").read_text()
block = src[src.index("const experiences: Experience[]"):src.index("const activities: Activity[]")]

# 구현(PR-18 데이터 이전) 전까지 src/app/about/page.tsx를 고치지 않고 시안에서만 덮어쓰는 문구(30번 D-15 ②)
ROLE_OVERRIDE = {"CLASS 101": "Software Engineer"}
COMPANIES = []
for chunk in block.split("company: ")[1:]:
    name = re.search(r'"(.*?)"', chunk).group(1)
    role = re.search(r'role: "(.*?)"', chunk).group(1)
    period = re.search(r'period: "(.*?)",\n\s*projects', chunk).group(1)
    projects = []
    for m in re.finditer(r'title: "(.*?)",\s*description: "(.*?)",\s*period: "(.*?)",\s*points: \[(.*?)\],\s*\}', chunk, re.S):
        points = re.findall(r'^\s*"(.*)",?\s*$', m.group(4), re.M)
        projects.append({"title": m.group(1), "description": m.group(2), "period": m.group(3), "points": points})
    role = ROLE_OVERRIDE.get(name, role)
    COMPANIES.append({"name": name, "role": role, "period": period, "projects": projects})
assert [len(c["projects"]) for c in COMPANIES] == [14, 7], [len(c["projects"]) for c in COMPANIES]

# 프로젝트 id(데이터 키). 앵커로는 쓰지 않는다(회사 바로가기만 앵커). 제안값이며 개발이 experience.yaml에서 확정한다
IDS = [
    "oauth2-proxy-zero-trust", "argo-workflows", "cloudflare", "okta-sso", "k8s-operator", "keycloak", "vpc-peering",
    "eks-networking", "temporal", "istio-zero-trust", "kafka-stability", "kafka-event-driven", "cloud-native-msa", "security-ops",
    "rebuild-auth", "promo-code", "gdpr-withdrawal", "adult-verification", "employee-service", "class101-plus-app", "platform-stability",
]
for p, i in zip([p for c in COMPANIES for p in c["projects"]], IDS):
    p["id"] = i
COMPANY_IDS = {"CJ Olive Young": "cj-oliveyoung", "CLASS 101": "class101"}

SKILLS = [
    ("platform", ["Kubernetes", "EKS", "Karpenter", "Helm", "Docker", "Kubernetes Operator", "Istio", "Cilium", "Hubble", "Kiali"]),
    ("cloud · iac", ["AWS", "Cloudflare", "Terraform"]),
    ("ci/cd · workflow", ["GitHub Actions (ARC)", "Argo Workflows", "Argo CD", "GitOps", "Temporal"]),
    ("data · messaging", ["Kafka", "Kafka Connect", "Debezium", "Schema Registry", "MongoDB", "PostgreSQL", "MySQL"]),
    ("auth · security", ["Keycloak", "Okta", "OAuth 2.0 / OIDC", "JWT", "OAuth2 Proxy", "External Secrets Operator"]),
    ("backend", ["Kotlin", "Spring Boot"]),
    ("observability", ["Datadog"]),
]
CREDLY = "https://www.credly.com/badges/476460b7-b5dc-4918-804e-ea3a169435d2/public_url"
CERTS = [
    ("HashiCorp Certified: Terraform Associate (004)", "HashiCorp", "2026.04", CREDLY),
    ("정보처리기사 (Engineer Information Processing)", "HRDK", "2021.06", None),
    ("정보보안산업기사 (Industrial Engineer Information Security)", "KISA", "2021.06", None),
]
OSS = [
    ("Schema Registry helm chart contribution", "2025.08", "SASL_SSL 인증 과정에서 mTLS 인증이 필수인 부분을 선택적으로 변경하는 데 기여했습니다.", "https://github.com/bitnami/charts/pull/35772"),
    ("kafbat-ui contribution", "2025.07", "kafbat-ui의 일부 문구를 수정하여 UX를 개선하는 데 기여했습니다.", "https://github.com/kafbat/kafka-ui/pull/1205"),
]
SIDE = ("Lomeone", "2024.01 ~ now",
        "개인 Side Project를 진행하는 organization. Infrastructure를 AWS로 구축하고 Terraform을 사용하여 IaC를 적용해서 Infrastructure를 관리하고 있습니다.",
        "https://github.com/lomeone")
COURSEWORK = ["Data Structures", "Algorithms", "Database Design", "Computer Networks", "Software Engineering", "Security"]
BOB = ("BoB (Best of the Best) 10기", "2021.07 ~ 2022.03",
       "보안제품개발트랙에 참여하여 Host 기반 네트워크 제어 솔루션(ARP Spoofing 기반 네트워크 관제도구)을 개발했습니다. (Top 30)")
INTRO = [
    "단순히 시스템을 구축하는 것을 넘어, 동료들이 복잡한 인프라 구조에 구애받지 않고 비즈니스 로직에만 몰입할 수 있는 환경을 설계하는 데 가치를 둡니다.",
    "안정적인 시스템 운영을 위한 아키텍처를 고민하며, 다양한 직군과의 원활하게 소통하기 위해 기술적 지식을 넘어 도메인 전반을 이해하려고 노력합니다. 최선의 해결책을 찾기 위해 기록하고 공유하며 팀과 함께 성장하는 문화를 지향합니다.",
]
HEADLINE = "개발과 운영의 경계를 좁혀 비즈니스의 <strong>연속성</strong>을 만드는 엔지니어입니다."


def fmt_period(p):
    """'2026.03 ~ 2026.03' → '2026.03', 'Present' → 'now'. 기간이 여러 개면 쉼표로 이어 쓴다."""
    out = []
    for part in [x.strip() for x in p.split(",") if x.strip()]:
        a, _, b = part.partition("~")
        a, b = a.strip(), b.strip()
        b = "now" if b.lower() == "present" else b
        out.append(a if (not b or a == b) else f"{a} ~ {b}")
    return ", ".join(out)


ICON = {
    "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    "down": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
}
EXT = '<span class="sr-only"> (새 창에서 열림)</span>'


def ext_link(href, label, cls="link-arrow link-arrow--mute"):
    return f'<a class="{cls}" href="{href}" target="_blank" rel="noopener noreferrer">{label}{EXT}</a>'


# ------------------------------------------------------------------ posts ----
def load_posts():
    posts = []
    for f in sorted((REPO / "posts").glob("*.md")):
        text = f.read_text()
        fm, _, body = text[3:].partition("\n---")
        if re.search(r"^draft:\s*true", fm, re.M):
            continue
        g = lambda k: (re.search(rf'^{k}:\s*"?(.*?)"?\s*$', fm, re.M) or [None, ""])[1]
        lst = lambda k: [x.strip() for x in re.search(rf"^{k}:\s*\[(.*?)\]", fm, re.M).group(1).split(",")] if re.search(rf"^{k}:", fm, re.M) else []
        heads, fence = [], False
        for line in body.splitlines():
            if line.strip().startswith("```"):
                fence = not fence
            elif not fence and re.match(r"^#{2,3} ", line):
                heads.append(re.sub(r"^#+\s*", "", line).strip())
        posts.append({"slug": f.stem, "t": g("title"), "desc": g("description"), "d": g("date"), "c": lst("categories"), "tags": lst("tags"),
                      "series": g("series"), "h": heads, "u": "post.html"})
    return sorted(posts, key=lambda p: p["d"], reverse=True)


def write_search_index(posts):
    data = [{k: p[k] for k in ("t", "desc", "d", "c", "tags", "h", "u")} for p in posts]
    (DESIGN / "system/search-index.js").write_text(
        "/* 시안용 검색 인덱스(생성물: tools/build-phase2-mockups.py). 글 " + str(len(data)) + "편, draft 제외. 실제 구현은 빌드 때 /search-index.json */\n"
        "window.SEARCH_INDEX = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")


# ------------------------------------------------------------------ shell ----
SEARCH_PLACEHOLDER = "제목, 태그, 소제목으로 글 검색"


def normalize_chrome(s):
    """모든 시안 공통: 검색은 글만(D-10), 검색 버튼의 접근 가능한 이름은 보이는 글자(search)를 포함한다."""
    s = re.sub(r'placeholder="[^"]*"( autocomplete="off")', f'placeholder="{SEARCH_PLACEHOLDER}"\\1', s)
    s = s.replace('data-palette-open aria-label="검색 (⌘K)"', 'data-palette-open aria-label="검색 (search)" aria-keyshortcuts="Meta+K Control+K"')
    return s


def shell(page_title, description, current, source="index.html"):
    s = (SITE / source).read_text()
    head = s[: s.index('<main id="main">')]
    tail = s[s.index("</main>"):]
    tail = re.sub(r'\s*<details class="mockbar".*?</details>\n?', '\n', tail, flags=re.S)  # 홈 전용 비교 도구는 빌리지 않는다
    head = re.sub(r"<title>.*?</title>", f"<title>{page_title}</title>", head, count=1)
    head = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{description}">', head, count=1)
    head = head.replace(' aria-current="page">posts</a>', ">posts</a>")
    if current == "posts":
        head = head.replace('<a class="nav__link" href="index.html">posts</a>', '<a class="nav__link" href="index.html" aria-current="page">posts</a>')
    if current == "about":
        head = head.replace('<a class="nav__link" href="about.html">about</a>', '<a class="nav__link" href="about.html" aria-current="page">about</a>')
    return head, tail


# ------------------------------------------------------------------ about ----
def about():
    head, tail = shell("about · 최한수 · Comstering", "클라우드 네이티브 엔지니어 최한수의 경력, 기술, 연락처", "about")
    o = ['<main id="main">', '<div class="read">']
    o.append('  <nav class="path" aria-label="현재 위치" style="padding-top:var(--s-4)"><a href="index.html">~</a><span class="path__sep">/</span><span aria-current="page">about</span></nav>')
    o.append(f'''
  <section class="intro" aria-labelledby="me">
    <img class="avatar" src="../../../public/profile.png" alt="최한수 프로필 사진" width="112" height="112">
    <div>
      <h1 class="intro__name" id="me">최한수 <small>Choi Hansu</small></h1>
      <p class="intro__role"><span class="nowrap">DevOps · 클라우드 네이티브 엔지니어</span> <span aria-hidden="true">·</span> <span class="nowrap">경력 4년+</span></p>
      <p class="print-only about__contacts">comstering@gmail.com · github.com/comstering · linkedin.com/in/hansu-choi-05775a244</p>
    </div>
    <div class="intro__contact btn-row">
      <a class="btn btn--primary" href="mailto:comstering@gmail.com">{ICON["mail"]} email</a>
      <a class="btn btn--secondary" href="resume.pdf" download>{ICON["down"]} resume.pdf</a>
      <a class="btn btn--ghost" href="https://github.com/comstering" target="_blank" rel="noopener noreferrer"><span class="icon-arrow link-arrow--ext" style="gap:6px">github</span>{EXT}</a>
      <a class="btn btn--ghost" href="https://www.linkedin.com/in/hansu-choi-05775a244" target="_blank" rel="noopener noreferrer"><span class="icon-arrow link-arrow--ext" style="gap:6px">linkedin</span>{EXT}</a>
    </div>
    <p class="intro__headline">{HEADLINE}</p>
    <div class="intro__body">{"".join(f"<p>{esc(t)}</p>" for t in INTRO)}</div>
  </section>
''')
    o.append('  <section class="section" aria-labelledby="exp-title">\n    <h2 class="sec-head" id="exp-title"><span class="sec-head__label">experience</span></h2>')
    o.append('    <nav class="jump" aria-label="경력 바로가기"><a href="#cj-oliveyoung">CJ 올리브영</a><a href="#class101">클래스101</a><a href="#open-source">오픈소스</a></nav>')
    o.append('    <div class="timeline">')
    for c in COMPANIES:
        now = ' <span class="badge badge--accent">now</span>' if "Present" in c["period"] else ""
        o.append(f'      <div class="tl-org" id="{COMPANY_IDS[c["name"]]}">\n        <p class="tl-org__period">{fmt_period(c["period"])}</p>\n        <div>\n          <h3 class="tl-org__name">{esc(c["name"])}{now}</h3>\n          <p class="tl-org__role">{esc(c["role"])}</p>\n          <div class="proj-list">')
        for p in c["projects"]:
            per = f'<span class="proj__period">{fmt_period(p["period"])}</span>' if p["period"] else ""
            pts = "".join(f"<li>{esc(x)}</li>" for x in p["points"])
            o.append(f'''            <article class="proj" id="{p["id"]}">
              <div class="proj__head"><h4 class="proj__title">{esc(p["title"])}</h4>{per}</div>
              <p class="proj__desc">{esc(p["description"])}</p><ul class="proj__points">{pts}</ul>
            </article>''')
        o.append("          </div>\n        </div>\n      </div>")
    o.append("    </div>\n  </section>\n")

    o.append('  <section class="section" id="open-source" aria-labelledby="oss-title">\n    <h2 class="sec-head" id="oss-title"><span class="sec-head__label">open source · side</span></h2>\n    <div class="oss-list">')
    for title, per, desc, url in OSS:
        o.append(f'      <div class="oss-row"><span class="oss-row__title">{esc(title)}</span><span class="oss-row__aside">{per}</span><p class="oss-row__sub">{esc(desc)}</p><div class="oss-row__act"><span class="badge badge--accent">merged</span>{ext_link(url, "pull request")}</div></div>')
    t, per, desc, url = SIDE
    o.append(f'      <div class="oss-row"><span class="oss-row__title">{t}</span><span class="oss-row__aside">{per}</span><p class="oss-row__sub">{esc(desc)}</p><div class="oss-row__act">{ext_link(url, "github")}</div></div>')
    o.append("    </div>\n  </section>\n")

    o.append('  <section class="section" aria-labelledby="skills-title">\n    <h2 class="sec-head" id="skills-title"><span class="sec-head__label">skills</span></h2>\n    <dl class="skills">')
    for g, items in SKILLS:
        o.append(f'      <div><dt>{g}</dt><dd class="stack-list">{"".join(f"<span class=stack-token>{esc(i)}</span>" for i in items)}</dd></div>')
    o.append("    </dl>\n  </section>\n")

    o.append('  <section class="section" aria-labelledby="cert-title">\n    <h2 class="sec-head" id="cert-title"><span class="sec-head__label">certifications</span></h2>\n    <ul class="def-list">')
    for name, issuer, date, url in CERTS:
        act = f'<span class="def-list__action">{ext_link(url, "verify")}</span>' if url else ""
        o.append(f'      <li><span class="def-list__title">{esc(name)}</span><span class="def-list__aside num">{date}</span><span class="def-list__sub">{issuer}</span>{act}</li>')
    o.append("    </ul>\n  </section>\n")

    o.append('  <section class="section" aria-labelledby="edu-title">\n    <h2 class="sec-head" id="edu-title"><span class="sec-head__label">education · activity</span></h2>\n    <ul class="def-list">')
    o.append(f'      <li><span class="def-list__title">공주대학교 (Kongju National University)</span><span class="def-list__aside num">2016.03 ~ 2022.02</span><span class="def-list__sub">Computer Science, Bachelor of Engineering (B.E.). {esc(", ".join(COURSEWORK))}</span></li>')
    t, per, desc = BOB
    o.append(f'      <li><span class="def-list__title">{esc(t)}</span><span class="def-list__aside num">{per}</span><span class="def-list__sub">{esc(desc)}</span></li>')
    o.append("    </ul>\n  </section>\n</div>\n")
    (SITE / "about.html").write_text(head + "\n".join(o) + tail)


# ------------------------------------------------------------------- home ----
TAGLINE = "실행해 본 것만 기록합니다"      # 확정(11-05 $ history + h2, 11-07 문구를 씁니다→기록합니다로 변경, 개발 site.yaml과 동일)
HERO_CMD = "history"
POPULAR_SAMPLE = ["karpenter", "eks-custom-networking", "introduce-cilium-cni", "install-karpenter", "terraform-associate-004-review"]


def home(posts):
    head, tail = shell("Comstering · 기술 노트", TAGLINE, "posts")
    cur = (SITE / "index.html").read_text()
    list_html = cur[cur.index('  <section class="home__list"'): cur.index("</main>")]
    by_slug = {p["slug"]: p for p in posts}

    pop = "".join(f'<li><a href="post.html"><span class="rank-list__n">{i}</span><span class="rank-list__t">{esc(by_slug[s]["t"])}</span></a></li>' for i, s in enumerate(POPULAR_SAMPLE, 1))
    series_titles = {}
    cur_key = None
    for line in (REPO / "content/series.yaml").read_text().splitlines():
        if re.match(r"^[a-z0-9-]+:\s*$", line):
            cur_key = line.rstrip(":")
        m = re.match(r"^\s+title:\s*(.*)$", line)
        if m and cur_key:
            series_titles[cur_key] = m.group(1).strip()
    series_rows = ""
    for key, title in series_titles.items():
        n = sum(1 for p in posts if p["series"] == key)
        series_rows += f'<div class="feat-row"><span class="feat-row__year">{n}편</span><span class="feat-row__title"><a href="post.html">{esc(key)}</a></span><span class="feat-row__metric">{esc(title)}</span></div>'
    counts = {}
    for p in posts:
        for t in p["tags"]:
            counts[t] = counts.get(t, 0) + 1
    top = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:10]
    tags = "".join(f'<a href="tag.html">#{esc(t)}<small>{n}</small></a>' for t, n in top)

    hero = f'''<div class="container home">
  <section class="home__hero hero" aria-labelledby="hero-title">
    <div data-hero-root><h1 class="hero__title hero__title--term" id="hero-title"><span class="sr-only">Comstering's Dev Notes</span><span aria-hidden="true"><span class="term__prompt">$</span> {HERO_CMD}<span class="cursor-blink"></span></span></h1><p class="hero__sub">{TAGLINE}</p></div>
  </section>

  <aside class="home__aside" aria-label="사이드바">
    <div class="home__aside-inner">
      <section class="section-block" data-popular>
        <h2 class="sec-head"><span class="sec-head__label">popular</span></h2>
        <ol class="rank-list">{pop}</ol>
      </section>
      <section class="section-block">
        <h2 class="sec-head"><span class="sec-head__label">series</span></h2>
        <div class="feat-list feat-list--stack">{series_rows}</div>
      </section>
      <section class="section-block">
        <h2 class="sec-head"><span class="sec-head__label">tags</span></h2>
        <div class="side-tags">{tags}</div>
      </section>
    </div>
  </aside>

'''
    body = '<main id="main">\n' + hero + list_html
    (SITE / "index.html").write_text(normalize_chrome(head + body + tail))


if __name__ == "__main__":
    posts = load_posts()
    write_search_index(posts)
    # 홈의 head·header·footer·팔레트가 about에도 쓰이므로 홈을 먼저 만들고 about을 만든다
    home(posts)
    about()
    for f in SITE.glob("*.html"):
        t = f.read_text()
        n = normalize_chrome(t)
        if n != t:
            f.write_text(n)
    print("wrote site/index.html, site/about.html, system/search-index.js:", len(posts), "posts,", sum(len(c["projects"]) for c in COMPANIES), "projects")
