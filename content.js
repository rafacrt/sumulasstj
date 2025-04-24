
async function carregarSumulas() {
  const response = await fetch(chrome.runtime.getURL("sumulas_mapeadas_stj.json"));
  const data = await response.json();
  return data.sumulas;
}

async function buscarSumulasRelacionadas(codigoSelecionado, artigoSelecionado, paragrafoSelecionado = "") {
  const sumulas = await carregarSumulas();
  const artigo = artigoSelecionado.replace(/[^\dA-Za-z]/g, "").toLowerCase();
  const paragrafo = paragrafoSelecionado.replace(/[^\dº]/g, "").toLowerCase();
  const codigo = codigoSelecionado.toLowerCase();

  const sumulasRelacionadas = sumulas.filter((s) =>
    s.referencias_legislativas.some((ref) => {
      const cod = ref.codigo.toLowerCase();
      const art = ref.artigo.replace(/[^\dA-Za-z]/g, "").toLowerCase();
      const par = ref.paragrafo.replace(/[^\dº]/g, "").toLowerCase();
      return cod.includes(codigo) && art === artigo && (paragrafo ? par === paragrafo : true);
    })
  );

  return sumulasRelacionadas;
}

document.addEventListener("mouseup", async () => {
  const texto = window.getSelection().toString();
  const match = texto.match(/art(?:\.||igo)?\s*(\d+[A-Za-z]?)(?:\s*,?\s*§\s*(\d+º))?/i);
  const codigo = detectarCodigo(texto);

  if (match && codigo) {
    const artigo = match[1];
    const paragrafo = match[2] || "";

    const sumulas = await buscarSumulasRelacionadas(codigo, artigo, paragrafo);
    if (sumulas.length > 0) {
      alert("Súmulas relacionadas encontradas:\n\n" + sumulas.map(s => `Súmula ${s.numero}: ${s.ementa}`).join("\n\n"));
    } else {
      alert("Nenhuma súmula relacionada encontrada.");
    }
  }
});

function detectarCodigo(texto) {
  const mapa = {
    "trânsito": "CTB",
    "penal": "CP",
    "civil": "CC",
    "processo civil": "CPC",
    "processo penal": "CPP",
    "constituição": "CF"
  };
  texto = texto.toLowerCase();
  for (const [chave, cod] of Object.entries(mapa)) {
    if (texto.includes(chave)) return cod;
  }
  return "Desconhecido";
}
