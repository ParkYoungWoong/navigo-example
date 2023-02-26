import Navigo from 'navigo'
import * as Layouts from '~/src/layouts'
import NotFound from '~/src/pages/NotFound'
import Home from '~/src/pages/Home'
import About from '~/src/pages/About'
import LogIn from '~/src/pages/LogIn'
import User from '~/src/pages/User'
import NestedMain from '~/src/pages/Nested'
import NestedApple from '~/src/pages/Nested/Apple'
import NestedBanana from '~/src/pages/Nested/Banana'
import NestedCherry from '~/src/pages/Nested/Cherry'
import Movies from '~/src/pages/Movies'

const router = new Navigo('/')
const rootEl = document.querySelector('#root') // 페이지를 출력할 최상위 요소!

router
  // 훅(hook)을 사용하여 페이지에 접속하기 전이나 후에 실행할 함수를 정의할 수 있습니다.
  .hooks({
    // 모든 페이지에 접속하기 전에 실행되는 함수!
    before(done, match) {
      console.log('match:', match)
      console.log(`/${match.url}`)
      window.currentRoute = match
      done()
    }
  })

  // 관리할 페이지를 정의합니다.
  .on({
    '/': () => {
      render(Home)
    },
    '/about': () => {
      render(About)
    },
    '/login': () => {
      render(LogIn, 'Empty')
    },
    '/user': { // hooks 같은 추가 옵션이 필요한 경우는 함수가 아닌 객체로 정의!
      uses: () => {
        render(User)
      },
      hooks: {
        // /user 페이지에 접속하기 전에만 실행되는 함수!
        before(done) {
          if (!isLoggedIn()) {
            // 로그인이 되어있지 않을 때, 로그인 페이지로 이동!
            router.navigate('/login', { 
              historyAPIMethod: 'replaceState' // 히스토리에 남기지 않고 페이지 이동!
            })
          }
          done()
        }
      }
    },
    '/nested': {
      uses: () => {}, // 사용하지 않더라도 필수로 정의해야 before 훅의 done() 함수를 사용할 수 있습니다.
      hooks: {
        before(done) {
          router.navigate('/nested/apple', {
            historyAPIMethod: 'replaceState'
          })
          done()
        }
      }
    },
    '/nested/apple': () => {
      // Navigo에서 별도의 중첩 라우트 기능을 지원하지 않는 것으로 보입니다,
      // 따라서 중첩 라우트를 위해서 부모 컴포넌트와 자식 컴포넌트를 따로 분류해 렌더링합니다.
      renderNested(NestedMain, NestedApple)
    },
    '/nested/banana': () => {
      renderNested(NestedMain, NestedBanana)
    },
    '/nested/cherry': () => {
      renderNested(NestedMain, NestedCherry)
    },
    '/movies': () => {
      render(Movies)
    },
    '/movies/:abc': async route => {
      // 현재 페이지의 라우트 정보를 '영화 상세 정보' 컴포넌트에서 사용하기 위해 전역 변수에 저장하고,
      window.navigoRoute = route
      // 동적 가져오기를 사용해 '영화 상세 정보' 컴포넌트를 전역 변수 저장 이후에 비동기로 가져옵니다.
      const component = await import('~/src/pages/Movies/Details')
      console.log('동적 가져오기 결과!', component) // 확인해보세요!
      // 가져온 컴포넌트를 페이지에 출력합니다.
      render(component.default)
    }
  })

  // .on() 에서 정의한 페이지가 없을 때, 처리할 내용을 추가합니다.
  .notFound(() => {
    render(NotFound, 'Empty')
  })

  // 페이지에 최초로 접속했을 때(예를 들어 새로고침 했을 때), 라우터를 초기화!
  // .resolve() 호출이 없을 때, /about 같은 특정 페이지에 접근해서 새로고침하면 차이를 이해할 수 있습니다.
  .resolve()


// 라우터 인스턴스를 외부에서 사용할 수 있도록(사용해야 하는 경우) 내보내기합니다.
// 현재 예제에서 'src/components/TheHeader.js'에서 사용하고 있습니다.
export {
  router
}

// 페이지를 출력하는 함수!
function render(component, layout = 'Default') {
  const layoutEl = Layouts[layout]
  const routerViewEl = layoutEl.querySelector('router-view')
  routerViewEl.innerHTML = ''
  routerViewEl.append(component)
  rootEl.innerHTML = ''
  rootEl.append(layoutEl)
}

// 중첩 페이지를 출력하는 함수!
function renderNested(parentComponent, component) {
  // 새로고침 등 직접 페이지로 접속했을 때, 부모 컴포넌트가 없다면 렌더링합니다.
  if (!document.body.contains(parentComponent)) {
    render(parentComponent)
  }
  const routerViewEl = parentComponent.querySelector('router-view')
  routerViewEl.innerHTML = ''
  routerViewEl.append(component)
}

// 로그인 상태를 확인하는 함수!
function isLoggedIn() {
  return JSON.parse(localStorage.getItem('auth'))
}