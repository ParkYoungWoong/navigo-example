# Navigo 라이브러리 사용법을 포함한 예제

https://github.com/krasimir/navigo

## 예제 시작

```bash
npm i
npm run dev
```

## 간단한 사용법

### 라이브러리 설치

```bash
npm i navigo
```

### 초기화

```js
import Navigo from 'navigo'

const router = new Navigo('/')
router.on({
  '/페이지1': () => {}
})
router.resolve()
```

### 핵심 메소드

주로 사용할 메소드는 다음과 같습니다.

```js
router.hooks()    // 페이지로 접근하기 전후, 페이지를 떠날 때 실행할 코드를 정의
router.on()       // 관리할 페이지를 정의
router.notFound() // 존재하지 않는 페이지로 접근했을 때, 실행할 코드를 정의
router.resolve()  // 현재 페이지에 맞는 정의한 코드를 실행
router.navigate() // 페이지를 이동
```

다음과 같이 체이닝 형태로 작성할 수도 있습니다.

```js
router
  .hooks()
  .on()
  .notFound()
  .resolve()
```

#### 페이지 훅

페이지 훅은 페이지로 접근하기 전후, 페이지를 떠날 때 실행할 코드를 정의합니다.

```js
router.hooks({
  before: (done, match) => {
    // 페이지로 접근하기 직전, 실행할 코드 작성
    done() // 마지막에 꼭 done 함수를 호출해야 함!
  },
  after: match => {
    // 페이지로 접근한 직후, 실행할 코드 작성
    // done 함수가 필요 없음!
  },
  leave: (done, match) => {
    // 페이지를 떠날 때, 실행할 코드 작성
    done() // 마지막에 꼭 done 함수를 호출해야 함!
  }
})
```

#### 관리할 페이지 정의

router 인스턴스의 on 메소드를 사용하여 관리할 페이지를 정의합니다.

```js
router.on({
  
  // 단순히 실행 코드만 있으면, 함수 형태로 정의
  '/페이지1': () => {
    // '/페이지1'로 접근했을 때, 실행할 코드 작성
  },
  
  // 만약 추가 옵션이 필요한 경우, 객체 형태로 정의
  '/페이지2': {
    uses: () => {
      // '/페이지2'로 접근했을 때, 실행할 코드 작성
    },
    // 개별 페이지의 훅을 정의할 수 있음!
    hooks: {
      before: done => {
        // '/페이지2'로 접근하기 전, 실행할 코드 작성
        done() // 마지막에 꼭 done 함수를 호출해야 함!
      }
    }
  }
})
```

#### 존재하지 않는 페이지 처리

존재하지 않는 페이지로 접근했을 때, 실행할 코드를 정의합니다.

```js
router.notFound(() => {
  // 존재하지 않는 페이지로 접근했을 때, 실행할 코드 작성
})
```

#### 페이지 이동

router 인스턴스의 navigate 메소드를 사용해 페이지를 이동할 수 있습니다.

```js
btnEl.addEventListener('click', () => {
  router.navigate('/페이지1')
})
```