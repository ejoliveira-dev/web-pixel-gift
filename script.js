//somzinho
const audio = document.getElementById("bg-audio"); //audio: js tem acesso a música
const botaoSom = document.querySelector(".som"); //agora o js consegue "ver" o png do som





//criando a função
botaoSom.addEventListener("click", (e) => {
    e.stopPropagation(); // evita propagar clique para #palco ou document
    if(audio.paused) audio.play();
    else audio.pause();

});





//cartinhaaa

const carta = document.querySelector(".cartafechada");
const overlay = document.getElementById("overlay");
const innerContent = document.getElementById("overlay-inner");
const closeBtn = document.getElementById("overlay-close");

let estadoCarta = 0;

carta.addEventListener("click", (e) => {

    if (estadoCarta === 0) {
        // Passo 1: Muda para carta aberta no chão
        carta.classList.add("aberta");
        estadoCarta = 1;
    }
    else if (estadoCarta === 1) {
        // Passo 2: Mostra o seu PNG pronto com a mensagem no centro da tela
        innerContent.style.display = "block";
        innerContent.style.overflowY = "auto";
       
        innerContent.innerHTML = `
            <img src="imagens/papeldecarta.png" class="papeldecarta">
        `;
        overlay.style.display = "flex";
        estadoCarta = 2;
    }

});



// Botão de fechar o pop-up da carta

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    // Deixamos estadoCarta em 1 para que ela continue aberta no chão
    estadoCarta = 1;
});



closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.getElementById("overlay-inner").scrollTop = 0; // Reseta a carta para o topo ao fechar
    estadoCarta = 1;
});



carta.addEventListener("click", () => {
    if (estadoCarta === 0) {
        carta.classList.add("aberta");
        estadoCarta = 1;
    } else if (estadoCarta === 1) {
        innerContent.style.display = "block";
        innerContent.style.overflowY = "auto"; // LIGA o scroll para a carta
        innerContent.innerHTML = `<img src="imagens/papeldecarta.png" class="papeldecarta">`;
        overlay.style.display = "flex";
        estadoCarta = 2;
    }

});



//fotinhaaas

const fotos = [
    "imagens/polaroidpreta.png",
    "imagens/polaroidroxo.png",
    "imagens/polaroidrosa.png",
    "imagens/polaroidvermelho.png",
    "imagens/polaroidamarelo.png",
    "imagens/polaroidverde.png",
    "imagens/polaroidazul.png"
];



const camera = document.querySelector(".camera");
let fotoAtual = 0; // começa na primeira foto; a de indice 0;

camera.addEventListener("click", () => {
    // sempre começa mostrando a primeira foto da lista 
    innerContent.style.display = "flex";
    innerContent.style.overflowY = "hidden"; // DESLIGA o scroll para as fotos
    fotoAtual = 0;
    mostrarFoto(fotoAtual);
});



//função principal pra inserir a foto e os botões no overlay
function mostrarFoto(indice) {
    overlay.style.display = "flex";// 1. abre o overlay

    // 2. cria o conteúdo (as fotos e os botões)
    innerContent.innerHTML = `
        <div id="polaroid-viewer">
            <img src="${fotos[indice]}" class="polaroid-imagem">
            <div class="navigation-buttons">
                ${indice > 0 ? '<button id="prev-photo" class="nav-button">◂ Voltar</button>' : '<div class="spacer"></div>'}
                ${indice < fotos.length - 1 ? '<button id="next-photo" class="nav-button">Próxima ▸</button>' : '<div class="spacer"></div>'}
            </div>
        </div>
    `;



    // 3. adiciona a lógica de clique aos novos botões
    if (document.getElementById("prev-photo")) {
        document.getElementById("prev-photo").addEventListener("click", () => {
            fotoAtual = (fotoAtual - 1);
            mostrarFoto(fotoAtual); // recarrega a função com a foto anterior
        });

    }



    if (document.getElementById("next-photo")) {
        document.getElementById("next-photo").addEventListener("click", () => {
            fotoAtual = (fotoAtual + 1);
            mostrarFoto(fotoAtual); // recarrega a função com a próxima foto
        });
    }
}

innerContent.addEventListener("click", (e) => e.stopPropagation());
overlay.addEventListener("click", () => {
    overlay.style.display = "none";
});