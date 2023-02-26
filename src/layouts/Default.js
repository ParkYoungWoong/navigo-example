import TheHeader from '~/src/components/TheHeader'
import TheFooter from '~/src/components/TheFooter'

const el = document.createElement('div')
el.classList.add('default-layout')
el.innerHTML = /* html */ `
  <router-view></router-view>
`
el.prepend(TheHeader)
el.append(TheFooter)

export default el