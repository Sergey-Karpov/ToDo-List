
export function createBtnToSwitchServer() {
  let btn = document.createElement('button')
  btn.classList.add('btn', 'btn-secondary', 'btn-to-switch-server')

  btn.addEventListener('click', () => {
    let isLocal = JSON.parse(localStorage.getItem('isLocal'))
    isLocal = !isLocal
    localStorage.setItem('isLocal', isLocal)
    location.reload()
  })

  return btn
}

