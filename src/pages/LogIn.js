const el = document.createElement('div')
el.classList.add('page')
el.innerHTML = /* html */ `
  <h1>LogIn page!</h1>
  <button>Simple Log In!</button>
  <div>
    <a href="/" data-navigo>Go to home</a>
  </div>
`

el
  .querySelector('button')
  .addEventListener('click', () => {
    localStorage.setItem('auth', true)
    location.href = '/'
  })

export default el