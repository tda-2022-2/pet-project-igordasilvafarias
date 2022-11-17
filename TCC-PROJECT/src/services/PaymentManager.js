import axios from 'axios';
//import edanBank from => Not impmemented

const generateCardToken = async (data) => {
  const response = await axios(`${edanBank.url}/cards/tokens`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': edanBank.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok)
    throw new Error('Não foi possível gerar o token do cartão.');

  return await response.json();
};

export const createTransaction = async (data) => {
  const cardToken = await generateCardToken({
    holder_name: data.holder_name,
    expiration_month: data.expiration_month,
    expiration_year: data.expiration_year,
    card_number: data.card_number,
    security_code: data.security_code,
  });

  const response = await axios(`${edanBank.url}/transactions`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': edanBank.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: cardToken.id,
      on_behalf_of: edanBank.merchantKey,
      amount: data.amount * 100,
      currency: data.currency,
      description: data.description,
      statement_descriptor: data.statement_descriptor,
      payment_type: data.payment_type,
    }),
  });

  if (!response.ok) throw new Error('Não foi possível efetuar o pagamento.');

  return await response.json();
};
