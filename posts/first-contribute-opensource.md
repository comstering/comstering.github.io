---
title: "나의 첫 OpenSource Contribute (feat. 오타수정)"
description: "처음으로 Contribution 해본 경험"
date: "2025-07-21"
categories: [project, frontend]
tags: [project, kafka, open source, contribute]
thumbnail: "kafbat.png"
---

## 사용하다 보인 이상한 오타....

회사에서 Kafka UI Management로 [kafbat ui](https://ui.docs.kafbat.io/)를 사용하고 있었다.

평소처럼 사용하다가 괜히 보기싫은 이상한 오타를 발견했다.

![typo-error](/images/posts/contents/first-contribute-opensource/typo-error.png)

바로 Values 부분의 item 이름에 Key로 표시가 되어 있는 것...

그래서 이 부분을 고치면 좋겠다고 생각했고 바로 contribution을 하러 갔다.

## Contribution 하기

일단 해당 git repo에 들어가서 main branch를 먼저 확인했다. 현재 내가 사용하고 있는 버전에서는 문제가 있지만 main branch에서는 이미 고쳐졌을 수 있기 때문이다.

다행히(?)도 해당 오타는 수정되지 않은 상태로 main branch에 그대로 남아있었다.

![not-fixed-typo](/images/posts/contents/first-contribute-opensource/not-fixed-typo.png)

나는 바로 contribute 준비에 들어갔다.

### Repository Fork

일단 해당 repo에 branch를 만들거나 PR을 직접적으로 생성할 수는 없는 것 같아서 일단 해당 repo를 fork떠서 내 repo에 가져왔다.

![fork-repository](/images/posts/contents/first-contribute-opensource/fork-repository.png)

### Contribution 문서 읽어보기

대부분의 오픈소스들이 그렇겠지만 어떻게 해당 오픈소스에 기여하는지 문서로 작성되어 있다. kafbat ui도 당연하게 contribution을 어떻게 하는지 문서로 작성되어 있었다.

[kafbat contributing](https://ui.docs.kafbat.io/development/contributing)

내용은 크게 중요한 부분이 없었지만 조금 아쉬웠던건 본인들이 올려놓거나 만들어진 issue를 잡아서 진행하는 형태의 내용이 주였고 일반적으로 발생한 contribution은 어떻게 해야하는지 잘 나와있지는 않았다.

그래서 다른 부분은 다 의미 없었고 branch name 정도만 `feat/**` 형태로 만들었다.

### Fix & Pull Request

Fork 떠서 가져온 repo에서 branch를 만들어서 수정을 진행하고 contribute를 통해서 [PR](https://github.com/kafbat/kafka-ui/pull/1205)을 만들었다.

![pull-request](/images/posts/contents/first-contribute-opensource/pull-request.png)

그리고 뭐 간단하게 description을 작성하고 PR을 올렸다.

![pr-description](/images/posts/contents/first-contribute-opensource/pr-description.png)

## Contribute!!

시차가 있어서였는지 저녁 9시 조금 넘어서 해당 maintainer에게서 PR 리뷰가 들어왔고 PR 제목 등의 몇몇 수정을 진행한 뒤 approve를 받았다.

원래는 Test / Build가 정상적으로 끝난 뒤에 머지를 직접하는 형태인 것 같지만 kafbat 쪽에 issue가 있었는지 실패가 나는 상황이었고 Maintainer가 직접 바로 Merge를 해주었다.

![congratulation](/images/posts/contents/first-contribute-opensource/congratulation.png)

Merge 이후에 이렇게 Maintainer로 부터 축하 comment를 받고 다음 Release에 포함되게 되었다.

정말 간단한 오타 수정으로 한 Contribution이었지만 오픈소스라는 곳에 처음으로 내 커밋이 들어가봤다는게 신기했다.

![commit](/images/posts/contents/first-contribute-opensource/commit.png)

기회가 되면 이런 오픈소스들에 issue들을 하나 grab해서 contribution 해보는 경험을 해봐도 좋을 것 같다.
