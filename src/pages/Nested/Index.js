const el = document.createElement('div')
el.classList.add('page')
el.innerHTML = /* html */ `
  <h1>Nested page!</h1>
  <a href="/nested/apple" data-navigo>Apple</a>
  <a href="/nested/banana" data-navigo>Banana</a>
  <a href="/nested/cherry" data-navigo>Cherry</a>
  <div>
    <router-view></router-view>
  </div>
`

export default el