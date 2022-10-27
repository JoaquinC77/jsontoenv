const select = (selector) => document.getElementById(selector)
const clipboard = select('clipboard')
const jsonText = select('json')
const effectContainer = select('effectContainer')
const envVarTextArea = select('env-var')

const writeError = (text) => {
  effectContainer.innerHTML = `
    <p class="error-text">${text}</p>
  `

  setTimeout(() => {
    effectContainer.innerHTML = ""
  }, 3000);
}

const copyToClipboard = () => {
  const sucessDiv = select("success")
  envVarTextArea.select()
  envVarTextArea.setSelectionRange(0, 99999)

  navigator.clipboard.writeText(envVarTextArea.value)
    .then(() => {
      sucessDiv.classList.add('effect-true')
      
      setTimeout(() => {
        sucessDiv.classList.remove('effect-true')
      }, 5000)
    })
    .catch(() => {
      writeError('Error al Copiar')
    })
}

const isJSON = (string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return false
  }
}

const transformJsonToEnvVars = (string) => {
  const json = isJSON(string)

  if(!json){
    writeError('El texto ingresado no es JSON')
    return
  }

  const entries = Object.entries(json)
  entries.forEach((keyValueArray) => {
    const textEnv = envVarTextArea.value
    
    envVarTextArea.value = textEnv + keyValueArray.at(0) + '=' + keyValueArray.at(1) + '\n'
  })

  copyToClipboard()
}

clipboard.addEventListener('click', () => {
  transformJsonToEnvVars(jsonText.value)
})

window.electronAPI.onUpdateTheme((_event, theme) => {
  const root = document.documentElement
  root.style.setProperty('--scheme', theme)
})
