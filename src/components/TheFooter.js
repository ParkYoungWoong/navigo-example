import './TheFooter.scss'

const el = document.createElement('footer')
el.innerHTML = /* html */ `
  (c)Copyright ${new Date().getFullYear()}
`

export default el
