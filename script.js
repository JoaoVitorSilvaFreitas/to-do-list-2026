//declaração das constantes do projeto.
const formAdcTarefa = document.querySelector('.input_adcTarefa')
const btnAdcTarefa = document.querySelector('.btn_adcTarefa')
const img_trash = document.querySelector('.img_trash')
const btn_removeCompleto = document.querySelector('#dropdown_removeCompleto')
const btn_removeTodas = document.querySelector('#dropdown_removeTodos')
const listaCompleta = document.querySelector('.coluna_lista-tarefa')
const txt_listaTarefa = document.querySelector('.txt_lista-tarefa')
//Declaração dropdown
const navToggle = document.querySelector('.nav_toogle')
const dropdown = document.querySelector('.dropdown_container')
const burger = document.querySelector('.nav_burger')
//declaração da lista variavel
let minhaLista = []

    //Configurações do dropdown
    // Isso assume que você quer esconder um e mostrar o outro
    // Se estiver usando ícones sobrepostos, pode alternar a opacidade
    navToggle.addEventListener('click', () => {
    dropdown.classList.toggle('show-dropdown');
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show-dropdown');
        }
    });

    //Adiciona a nova tarefa
function adicionarNovaTarefa() {
    const checkLetras = formAdcTarefa.value
    const quantidadeLetras = checkLetras.length 

        //Verifica caso o campo de adição de tarefas está vazio.
    if(formAdcTarefa.value === ''){
        alert('O campo de tarefas está vazio.')
    }else if(minhaLista.length >= 15){
        //Verifica se a lista tem mais de 15 itens, se houver não adiciona mais tarefas.
        alert('Não é possivel adicionar mais tarefas, conclua alguma das tarefas acima.')
    }else if(quantidadeLetras > 35){
        alert('Sua tarefa é muito grande, consegue explicar em menos palavras?')
    }else{
        // aqui ele cria uma tarefa e também seleciona um status adicionando as chaves após o push.
        minhaLista.push({
            tarefa: formAdcTarefa.value,
            concluida: false
   })
    
    mostrarTarefa()
    }
}

function concluirTarefa(posicao){
    const desejaApagar = confirm("Você terminou a tarefa, deseja apaga-la ?")
    minhaLista[posicao].concluida = !minhaLista[posicao].concluida
    //mostrarTarefa()
    //Verifica se o usuário quer apagar a tarefa concluida.
    if(minhaLista[posicao].concluida === true){
        
        if(desejaApagar) {
            minhaLista.splice(posicao, 1)
        }
    }

    mostrarTarefa()
}
    //Deleta o item escolhido.
function deletarItem(posicao){
    const desejaApagar = confirm("Você terminou a tarefa, deseja apaga-la ?")
    //splice permite que eu delete qualquer coisa dentro do array com 2 parametros. qual posição, e quantos itens a partir da posição selecionada
    if(desejaApagar) {
            minhaLista.splice(posicao, 1)
        }
    //Depois de deletar, ele precisa chamar o mostrar tarefa para mostrar novamente os itens que ainda estavam na lista.
    mostrarTarefa()
}

function deletarConcluida(posicao){
    minhaLista = minhaLista.filter(item => !item.concluida)
    mostrarTarefa()
}


btn_removeCompleto.addEventListener('click', deletarConcluida)

function deletarTudo (posicao){
    // Aqui ele adiciona uma lista com o valor zerado a minha lista.
    minhaLista = []
    mostrarTarefa()
}

    /* Sempre que executar alguma adição ou deletar tem que exibir a função mostrar tarefa 
    pois ela sempre irá sobreescrever com o novo resultado o que for pedido.*/
function mostrarTarefa() {
    // Adiciona uma nova linha dentro da lista
    let novaLi = ''
    //o forEach percorre todos os itens do array
    //item também é conhecido como index. serve para localizar a posição do item dentro do vetor
    if(Array.isArray(minhaLista) && minhaLista.length >= 0){
        minhaLista.forEach((item, posicao) => {

        novaLi = novaLi + `
        <li class="linha_lista-tarefa ${item.concluida && "done"}">
        <img class="img_check" src="./img/checked.png" alt="finalizar tarefa" onclick="concluirTarefa(${posicao})">
        <p class="txt_lista">${item.tarefa}</p>
        <img class="img_edit" src="/img/edit.png" alt="editar tarefa" onclick="deletarItem(${posicao})">
        </li>
        `
    })
    }else{
        console.error("A lista está vazia")
    }
    //A lista irá receber o valor passado pelo usuario 
    listaCompleta.innerHTML = novaLi
    // O local storage vai converter o item para string para poder ser incluido na lista
    localStorage.setItem('lista', JSON.stringify(minhaLista))
    // Após as estapas acima, vai incluir um campo vazio para o usuário inserir uma nova tarefa
    formAdcTarefa.value = ''
}


function recarregarTarefas(){
    // captura o item dentro do local storage, passando o nome da lista para procurar.
    const tarefaDoLocalStorage = localStorage.getItem('lista')

    if(tarefaDoLocalStorage){
    //minha lista recebe os valores convertidos novamente com o .parse .
        minhaLista = JSON.parse(tarefaDoLocalStorage)
        //console.log(tarefaDoLocalStorage)
    }

    mostrarTarefa()
}

recarregarTarefas()

btnAdcTarefa.addEventListener('click', adicionarNovaTarefa)
btn_removeTodas.addEventListener('click', deletarTudo)
recarregarTarefas()

