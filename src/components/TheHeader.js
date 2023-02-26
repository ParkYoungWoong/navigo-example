import './TheHeader.scss'

const el = document.createElement('header')
el.innerHTML = /* html */ `
  <h1>Navigo test!</h1>
  <ul>
    <li><a href="/" data-navigo>HOME</a></li>
    <li><a href="/about" data-navigo>ABOUT</a></li>
    <li><a href="/user" data-navigo>USER</a></li>
    <li><a href="/nested" data-navigo>NESTED</a></li>
    <li><a href="/movies" data-navigo>MOVIES</a></li>
  </ul>
  <div class="flex-space"></div>
`
toggleAuthBtn(el)

// 로그인 상태에 따라 로그인 버튼과 로그아웃 버튼을 토글하는 함수!
function toggleAuthBtn(el) {
  if (isLoggedIn()) {
    const logOutBtnEl = document.createElement('button')
    logOutBtnEl.textContent = 'Log out!'
    logOutBtnEl.addEventListener('click', () => {
      localStorage.removeItem('auth') // 심플하게 로그아웃 처리!
      location.assign('/') // 메인 페이지로 이동!
      logOutBtnEl.remove() // 로그아웃 버튼을 제거합니다.
      toggleAuthBtn() // 버튼을 다시 토글합니다.
    })
    el.append(logOutBtnEl)
  } else {
    const logInBtnEl = document.createElement('button')
    logInBtnEl.textContent = 'Log In!'
    logInBtnEl.addEventListener('click', () => {
      location.assign('/login') // 로그인 페이지로 이동!
    })
    el.append(logInBtnEl)
  }
}

function isLoggedIn() {
  return JSON.parse(localStorage.getItem('auth'))
}

export default el