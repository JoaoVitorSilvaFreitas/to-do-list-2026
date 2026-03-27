//declaração das constantes do projeto.
const formAdcTarefa = document.querySelector('.input_adcTarefa');
const btnAdcTarefa = document.querySelector('.btn_adcTarefa');
const listaCompleta = document.querySelector('.coluna_lista-tarefa');
const txt_listaTarefa = document.querySelector('.txt_lista-tarefa');

let minhaLista = []

function adicionarNovaTarefa() {
    //Adiciona a nova tarefa
   // minhaLista.push(formAdcTarefa.value)

   // aqui ele cria uma tarefa e também seleciona um status adicionando as chaves após o push.
   minhaLista.push({
    tarefa: formAdcTarefa.value,
    concluida: false
   })

    mostrarTarefa()
}

function deletarItem(posicao){
    //splice permite que eu delete qualquer coisa dentro do array com 2 parametros. qual posição, e quantos itens a partir da posição selecionada
    minhaLista.splice(posicao, 1)
    //Depois de deletar, ele precisa chamar o mostrar tarefa para mostrar novamente os itens que ainda estavam na lista.
    mostrarTarefa()
    console.log(posicao)
}

function concluirTarefa(posicao){
    minhaLista[posicao].concluida = !minhaLista[posicao].concluida

    mostrarTarefa();
}

function mostrarTarefa() {
    // Adiciona uma nova linha dentro da lista
    let novaLi = ''
    //o forEach percorre todos os itens do array
    //item também é conhecido como index. serve para localizar a posição do item dentro do vetor
    minhaLista.forEach((item, posicao) => {

        novaLi = novaLi + `
        <li class="linha_lista-tarefa ${item.concluida && "done"}">
        <img class="img_check" src="./img/checked.png" alt="finalizar tarefa" onclick="concluirTarefa(${posicao})">
        <p class="txt_lista">${item.tarefa}</p>
        <img class="img_edit" src="/img/edit.png" alt="editar tarefa" onclick="deletarItem(${posicao})">
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi


    /**/
}

btnAdcTarefa.addEventListener('click', adicionarNovaTarefa);

