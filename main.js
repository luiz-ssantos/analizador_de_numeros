// Seleção de elementos do HTML
let butaoAdicionar = window.document.getElementById("butaoAdicionar");
let butaoFinalizar = window.document.getElementById("butaoFinalizar");
let butaoCancelar = window.document.getElementById("butaoCancelar");

let lista = window.document.getElementById("obtendoNumeros");
let resultado = window.document.getElementById("resultado");
let num = window.document.getElementById("addNumeros");
let valores = [];

let areaAviso = window.document.getElementById("areaAviso");

// Adiciona evento de clique para o botão Adicionar
butaoAdicionar.addEventListener("click", function (event) {
  funcaoAdicionar(event);
});

// Adiciona evento de clique para o botão Finalizar
butaoFinalizar.addEventListener("click", funcaoFinalizar);

// Adiciona evento de clique para o botão Cancelar
butaoCancelar.addEventListener("click", function () {
  // Reinicializa variáveis e esconde mensagens
  valores = [];
  resultado.style.display = "none";
  resultado.textContent = "";
  areaAviso.style.display = "none";
  areaAviso.textContent = "";

  // Limpa a lista de números
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  // Limpa o campo de entrada
  num.value = "";
  num.focus();
});

// Função para verificar se o valor é um número válido
function isNumero(n) {
  return Number(n) >= 1 && Number(n) <= 100;
}

// Função para verificar se o número já está na lista
function inLista(n, l) {
  return l.includes(Number(n));
}

// Função para adicionar um número à lista
function funcaoAdicionar() {
  event.preventDefault();

  resultado.style.display = "none";
  resultado.textContent = "";

  if (!isNumero(num.value)) {
    areaAviso.style.display = "block";
    areaAviso.style.background = "#ca1818";
    areaAviso.textContent = "Valor inválido. Digite um número entre 1 e 100.";
  } else {
    if (inLista(num.value, valores)) {
      areaAviso.style.display = "block";
      areaAviso.style.background = "#ca1818";
      areaAviso.innerHTML = `Valor ${num.value} já encontrado na lista.`;
    } else {
      valores.push(Number(num.value));

      let item = document.createElement("option");
      item.text = `O valor: ${num.value} foi adicionado.`;
      lista.appendChild(item);

      areaAviso.style.display = "block";
      areaAviso.style.background = "#4aca18";
      areaAviso.innerHTML = `Valor adicionado: ${num.value}`;
    }
  }
  num.value = "";
  num.focus();
}

// Função para finalizar e exibir resultados
function funcaoFinalizar() {
  if (valores.length === 0) {
    resultado.style.display = "block";
    resultado.textContent = "O campo está vazio";
  } else {
    let totalValores = valores.length;
    let maior = valores[0];
    let menor = valores[0];
    let soma = 0;
    let media = 0;

    for (let pos in valores) {
      soma = soma + valores[pos];

      if (valores[pos] > maior) {
        maior = valores[pos];
      }
      if (valores[pos] < menor) {
        menor = valores[pos];
      }
    }

    media = soma / totalValores;

    areaAviso.style.display = "none";
    resultado.style.display = "block";
    resultado.style.background = "#5ec8f2";
    resultado.innerHTML = "";
    resultado.innerHTML =
      resultado.innerHTML +
      `<p>Ao todo, temos ${totalValores} números cadastrados</p>`;
    resultado.innerHTML =
      resultado.innerHTML + `<p>O maior valor informado foi: ${maior}.</p>`;
    resultado.innerHTML =
      resultado.innerHTML + `<p>O menor número informado foi: ${menor}.</p>`;
    resultado.innerHTML =
      resultado.innerHTML + `<p>Somando todos os valores temos: ${soma}.</p>`;
    resultado.innerHTML =
      resultado.innerHTML +
      `<p>A média entre todos os valores foi: ${media}.</p>`;
  }
}
