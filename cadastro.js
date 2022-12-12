function createLabel(text, forOfLabel) {
  const label = document.createElement('label')
  label.htmlFor = forOfLabel
  label.innerText = text
  return label
} // criando uma função label para facilitar a criação de um label posteriomente

function createInput(id, value, name, type = 'text', placeholder = '') {
  const input = document.createElement('input')
  input.id = id
  input.value = value
  input.name = name
  input.type = type
  input.placeholder = placeholder
  return input
} // criando uma função input para facilitar a criação de um input posteriomente


const tecName = document.getElementById('tecName') // pegando o botão com o id
const form = document.getElementById('form-cadastro') // pegando o formulário com o id
const devs = []

let inputLines = 1 // foi criado para diferenciar os names dos inputs a cada linha pulada


// acrescentando um evento no botão
tecName.addEventListener('click', function (ev) {
  ev.preventDefault()// não deixa o evento atualixar a página
  const stackInputs = document.getElementById('stackInputs') //pegando a <ul> pelo id

  const newLine = document.createElement('li') // criando uma <li>
  const lineIndex = inputLines // aqui dando o valor do inputLines igual ao lineIndex
  inputLines++ // toda vez que chamar a variavel lineIndex ele vai somar +1, mostrando assim, números diferentes
  newLine.id = 'inputLine-' + lineIndex
  newLine.className = "inputLine"

  const expLabel = createLabel('Experiencia: ') // título do grupo de botões

  //grupo de botões com <label> e <input>
  const expRadioInput1 = createInput('expRadio-' + lineIndex, '0-2 anos', 'tecExp ' + lineIndex, 'radio')
  const expLabel1 = createLabel('0-2 anos', 'expRadio-' + lineIndex)
  const expRadioInput2 = createInput('expRadio-' + lineIndex, '3-4 anos', 'tecExp ' + lineIndex, 'radio')
  const expLabel2 = createLabel('3-4 anos', 'expRadio-' + lineIndex)
  const expRadioInput3 = createInput('expRadio-' + lineIndex, '5+ anos', 'tecExp ' + lineIndex, 'radio')
  const expLabel3 = createLabel('5+ anos', 'expRadio-' + lineIndex)

  const tecNameLabel = createLabel('Nome da tecnologia:', 'tecName-' + lineIndex) // criando a label que vai aparecer junto com o input da tecnologia 
  const tecInput = createInput('techName-' + lineIndex, null, 'tecName') // criando o input

  const removeLineButton = document.createElement('button') // criamos o botão para remover uma linha/Dev
  removeLineButton.type = 'button'
  removeLineButton.innerText = 'remover'
  removeLineButton.addEventListener('click', function () { // criando o evento: Vai acontecer quando eu clicar no botão
    stackInputs.removeChild(newLine) // assim que eu clicar ele vai ir na <ul> e remover a criança(<li>) newLine que está no pai(<ul>) stackInput
  })

  newLine.append(
    tecNameLabel, tecInput,
    expLabel,
    expRadioInput1, expLabel1,
    expRadioInput2, expLabel2,
    expRadioInput3, expLabel3,
    removeLineButton) // colocando as labels e os inputs no <li>
  stackInputs.appendChild(newLine) // colocando a <li> dentro da <ul>
})



//Não entendi muito bem!
form.addEventListener('submit', function (ev) {
  ev.preventDefault()

  const nameDev = document.getElementById('name') // pegando os nomes pelo id
  const inputLines = document.querySelectorAll('.inputLine') // pegando as linhas selecionando todas as linhas com a mesma classe via NodeList (querySelectorAll)

  let tecnologias = []
  inputLines.forEach(function (line) {

    const tecnologiaName = document.querySelector('#' + line.id + ' input[name="tecName"]').value // lineId input [name="tecName"] - estamos pegando o input que está na linha especifica e com o name igual a tecName
    const tecnologiaExp = document.querySelector('#' + line.id + ' input[type="radio"]:checked').value // pegando os inputs com o tipo igual a radio marcados

    tecnologias.push({ name: tecnologiaName, exp: tecnologiaExp }) //adicionando um objeto com uma propriedade name e exp, agora temos um objeto com as informações de cada uma das linhas do formulário

  })
  const newDev = { nameDev: nameDev.value, tecnologias: tecnologias }

  devs.push(newDev)
  alert('dev cadastrado.')

  nameDev.value = ''
  inputLines.forEach(function (line) {
    line.remove()
  })
  console.log(devs)
})

