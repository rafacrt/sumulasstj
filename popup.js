const resultados = document.getElementById("resultados");
const info = document.getElementById("info");

chrome.storage.local.get("artigoDetectado", async ({ artigoDetectado }) => {
  if (!artigoDetectado) {
    info.innerText = "Nenhum artigo detectado.";
    return;
  }
  info.innerText = `Artigo detectado: ${artigoDetectado}`;

  const atualizacoes = await buscarDadosJuridicos(artigoDetectado);

  atualizacoes.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.tipo}: ${item.conteudo}`;
    resultados.appendChild(li);
  });
});

async function buscarAtualizacaoConstituicao(artigo) {
  try {
    const response = await fetch("https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const artigos = [...doc.querySelectorAll("p")];
    const resultados = [];

    const termo = artigo.toLowerCase().replace(/\./g, "").replace("º", "");

    artigos.forEach(p => {
      const texto = p.innerText.toLowerCase();
      if (texto.includes(termo)) {
        resultados.push({
          tipo: "Atualização Constitucional",
          conteudo: p.innerText.trim()
        });
      }
    });

    if (resultados.length === 0) {
      resultados.push({
        tipo: "Atualização Constitucional",
        conteudo: "Nenhum trecho correspondente encontrado."
      });
    }

    return resultados;
  } catch (e) {
    return [{ tipo: "Atualização Constitucional", conteudo: "Falha ao buscar dados do Planalto." }];
  }
}

async function buscarJurisprudenciaSTF(artigo) {
  try {
    const termo = encodeURIComponent(artigo);
    const url = `https://cors-anywhere.herokuapp.com/https://www.stf.jus.br/portal/jurisprudencia/listarJurisprudencia.asp?s1=${termo}`;
    
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const resultados = [];
    const julgados = doc.querySelectorAll("div.resultado-jurisprudencia");

    julgados.forEach((el, i) => {
      if (i < 3) {
        const titulo = el.querySelector("span.titulo")?.innerText.trim();
        const ementa = el.querySelector("span.ementa")?.innerText.trim();
        if (titulo) {
          resultados.push({
            tipo: "Julgado STF",
            conteudo: `${titulo} - ${ementa || 'Ementa não disponível'}`
          });
        }
      }
    });

    return resultados;
  } catch (e) {
    return [{ tipo: "Julgado STF", conteudo: "Não foi possível acessar a base do STF." }];
  }
}

async function buscarSumulasSTJ(artigo) {
  try {
    const termo = artigo.match(/\d+/)?.[0] || "";
    if (!termo) return [];

    const url = `https://cors-anywhere.herokuapp.com/https://www.stj.jus.br/sites/portalp/Paginas/sumulas/stj.aspx`;
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const sumulas = [...doc.querySelectorAll(".listagem-sumulas .item-sumula")];
    const resultados = [];

    sumulas.forEach(el => {
      const texto = el.innerText;
      if (texto.toLowerCase().includes(termo)) {
        resultados.push({
          tipo: "Súmula STJ",
          conteudo: texto.trim().replace(/\s+/g, " ")
        });
      }
    });

    if (resultados.length === 0) {
      resultados.push({
        tipo: "Súmula STJ",
        conteudo: "Nenhuma súmula relacionada ao artigo encontrada."
      });
    }

    return resultados;
  } catch (e) {
    return [{ tipo: "Súmula STJ", conteudo: "Erro ao acessar a base do STJ." }];
  }
}

async function buscarDadosJuridicos(artigo) {
  const resultados = [];

  const dadosConstituicao = await buscarAtualizacaoConstituicao(artigo);
  resultados.push(...dadosConstituicao);

  const dadosJurisSTF = await buscarJurisprudenciaSTF(artigo);
  resultados.push(...dadosJurisSTF);

  const dadosSumulas = await buscarSumulasSTJ(artigo);
  resultados.push(...dadosSumulas);

  return resultados;
}
