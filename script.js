// Definindo as classes:
// 1- Parquimetro
// 2- Pagamento

class Parquimetro{
    constructor(entrada, saida){
        this.horarioEntrada = entrada;
        this.horarioSaida = saida;
    }

    calcularTempo(){
    const [hEntrada, mEntrada] = this.horarioEntrada.split(":").map(Number);
    const [hSaida, mSaida] = this.horarioSaida.split(":").map(Number);

    const minutosEntrada = hEntrada * 60 + mEntrada;
    const minutosSaida = hSaida * 60 + mSaida;

    return minutosSaida - minutosEntrada;
    }
}
class Pagamento{
    constructor(valorPago, tempoMinutos){
        this.valorPago = Number(valorPago);
        this.tempoMinutos = tempoMinutos;
    }

    calcularValor(){
        if (this.tempoMinutos <= 30) return 1.00;
        if (this.tempoMinutos <= 60) return 1.75;
        if (this.tempoMinutos <= 120) return 3.00;
        return null
    }

    validarPagamento(valorCobrado){
        if (this.valorPago < 1) return "Valor Insuficiente";
        if (this.valorPago < valorCobrado) return "Pagamento Insuficiente";
        return "OK";
    }

    calcularTroco(valorCobrado){
        return (this.valorPago - valorCobrado).toFixed(2);
    }
}
function calcularTempo(){
    const entrada = document.getElementById("entrada").value;
    const saida = document.getElementById("saida").value;

    const infoTempo = document.getElementById("infoTempo");
    const infoValor = document.getElementById("infoValor");

    const parq = new Parquimetro(entrada,saida);

    tempoCalculado = parq.calcularTempo();

    if (tempoCalculado <= 0){
        infoTempo.textContent = "Horário Inválido";
        infoValor.textContent = "";
        return;
    }

    const pagamentoTemp = new Pagamento(0, tempoCalculado)
    valorCalculado = pagamentoTemp.calcularValor();

    if (valorCalculado === null){
        infoTempo.textContent = "Tempo máximo excedido (2 horas)";
        infoValor.textContent = "";
        return;
    }

    infoTempo.textContent = `Tempo: ${tempoCalculado} minutos`;
    infoValor.textContent = `Valor a pagar: R$ ${valorCalculado.toFixed(2)}`;
}
function realizarPagamento(){
    const valorPago = document.getElementById("valorPago").value;
    const resultado = document.getElementById("resultadoPagamento");
    
    const pagamento = new Pagamento(valorPago, tempoCalculado);

    const validacao = pagamento.validarPagamento(valorCalculado);

    if (validacao != "OK"){
        resultado.textContent = validacao;
        return;
    }

    const troco = pagamento.calcularTroco(valorCalculado);

    resultado.textContent = `Troco R$ ${troco}`;
}
                                                                                                               