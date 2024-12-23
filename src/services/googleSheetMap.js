const sheetData = (data) => {
    const dataMap = data.map((item) => [
        item.fatura,                                                                                                    // Identificador
        '',                                                                                                             // Identificador externo
        item.cliente?.nome ?? "",                                                                                       // Nome
        item.cliente?.cnpj ? item.cliente?.cnpj : item.cliente?.user.cpf,                                               // CPF ou CNPJ
        item.cliente?.filial?.email_01 ?? "",                                                                           // e-mail
        item.cliente?.user.email_alternativo ?? "",                                                                     // e-mails adicionais
        item.cliente?.filial?.telefone_01 ?? "",                                                                        // Celular
        item.cliente?.filial?.telefone_02 ?? "",                                                                        // Fone
        item.tipo_cobranca == 'BOLETO' ? 'Boleto Bancário' : item.tipo_cobranca,                                        // Forma de pagamento
        itemDescricao(item),                                                                                            // Tipo de cobrança
        item.data_vencimento ?? "",                                                                                     // Vencimento
        item.data_vencimento ?? "",                                                                                     // Vencimento Original
        '',                                                                                                             // Data de Pagamento
        item.valor ?? "",                                                                                               // Valor
        '',                                                                                                             // Valor original
        item.valor_liquido ?? "",                                                                                       // Valor liquido
        item.status == 'OVERDUE' ? 'Vencida': item.status,                                                              // Status
        '',                                                                                                             // Numero
        item.descricao ?? "",                                                                                           // Descrição
    ]);

    return dataMap;
};

const itemDescricao = (item) => {
    return (item.descricao === 'Mensalidade Imobia' || item.descricao === 'Mensalidade Imobia.')                           
    ? 'Cobrança Recorrente' 
    : 'Cobrança Avulsa';
};

module.exports = sheetData;