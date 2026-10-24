// ===== CONSTANTES =====
const RENDIMENTO_SACO = 0.205; // m³ de contrapiso por saco de cimento


// ===== FUNÇÕES DE APOIO =====
function lerNumero(id) {
  return parseFloat(document.getElementById(id).value);
}

function mostrarResultado(id, html) {
  document.getElementById(id).innerHTML = html;
}

function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach(function (tela) {
    tela.classList.remove("ativa");
  });
  document.getElementById(id).classList.add("ativa");
  window.scrollTo(0, 0);
}


// ===== CERÂMICA =====
function calcularCeramica(largura, comprimento, altura, caixa, perda) {
  const areaPiso = largura * comprimento;
  const areaParedes = 2 * (largura + comprimento) * altura;
  const areaComPerda = areaPiso * (1 + perda / 100);
  const caixas = Math.ceil(areaComPerda / caixa);

  return { areaPiso, areaParedes, areaComPerda, caixas };
}

function mostrarCeramica() {
  const largura = lerNumero("largura");
  const comprimento = lerNumero("comprimento");
  const altura = lerNumero("altura");
  const caixa = lerNumero("caixa");
  const perda = lerNumero("perda");

  if ([largura, comprimento, altura, caixa, perda].some(isNaN)) {
    mostrarResultado("resultado", "Preencha todos os campos.");
    return;
  }

  const r = calcularCeramica(largura, comprimento, altura, caixa, perda);

  mostrarResultado("resultado", `
    <p>Área do piso: ${r.areaPiso.toFixed(2)} m²</p>
    <p>Área das paredes: ${r.areaParedes.toFixed(2)} m²</p>
    <p><strong>Cerâmica</strong></p>
    <p>Área com perda: ${r.areaComPerda.toFixed(2)} m²</p>
    <p>Caixas necessárias: ${r.caixas}</p>
  `);
}


// ===== CONTRAPISO =====
function calcularContrapiso(area, espessuraCm) {
  const volume = area * (espessuraCm / 100);
  const sacos = Math.ceil(volume / RENDIMENTO_SACO);
  const areia = sacos * 2;
  const seixo = sacos * 1;

  return { volume, sacos, areia, seixo };
}

function mostrarContrapiso() {
  const comprimento = lerNumero("cp-comprimento");
  const largura = lerNumero("cp-largura");
  const espessura = lerNumero("cp-espessura");

  if (!comprimento || !largura || !espessura) {
    mostrarResultado("resultado-contrapiso", "Preencha todos os campos.");
    return;
  }

  const area = comprimento * largura;
  const r = calcularContrapiso(area, espessura);

  mostrarResultado("resultado-contrapiso", `
    <p>Área: ${area.toFixed(2)} m²</p>
    <p>Volume: ${r.volume.toFixed(2)} m³</p>
    <p><strong>Cimento:</strong> ${r.sacos} sacos</p>
    <p><strong>Areia:</strong> ${r.areia} carrinhos</p>
    <p><strong>Seixo:</strong> ${r.seixo} carrinhos</p>
  `);
}


// ===== PAREDE (TIJOLO) =====
function calcularParede(comprimento, altura, vaos, tijolosPorM2) {
  const areaTotal = comprimento * altura;
  const areaUtil = Math.max(areaTotal - vaos, 0);
  const tijolos = Math.ceil(areaUtil * tijolosPorM2);

  return { areaTotal, areaUtil, tijolos };
}

function mostrarParede() {
  const comprimento = lerNumero("pa-comprimento");
  const altura = lerNumero("pa-altura");
  const vaos = lerNumero("pa-vaos") || 0;
  const tijolosPorM2 = lerNumero("pa-tijolos-m2");

  if (!comprimento || !altura || !tijolosPorM2) {
    mostrarResultado("resultado-parede", "Preencha comprimento, altura e tijolos por m².");
    return;
  }

  const r = calcularParede(comprimento, altura, vaos, tijolosPorM2);

  mostrarResultado("resultado-parede", `
    <p>Área total: ${r.areaTotal.toFixed(2)} m²</p>
    <p>Área a levantar: ${r.areaUtil.toFixed(2)} m²</p>
    <p><strong>Tijolos:</strong> ${r.tijolos} unidades</p>
  `);
}