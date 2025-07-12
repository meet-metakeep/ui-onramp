/**
 * @notice Fetches a quote from the Coinbase Onramp API for a given purchase/payment configuration
 * @param params The parameters for the quote request (see API docs)
 * @returns The parsed JSON response from the API
 */
export async function fetchCoinbaseOnrampQuote(params: {
  purchase_currency: string;
  payment_amount: string;
  payment_currency: string;
  payment_method: string;
  country: string;
  subdivision?: string;
  apiKey?: string; // Optional: for future use
}) {
  const apiUrl = 'https://api.developer.coinbase.com/onramp/v1/buy/quote';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${params.apiKey || 'plDkTh5QH83EDl6OixJY4zwbNcX9H6zq'}`,
  };
  const body: Record<string, any> = {
    purchase_currency: params.purchase_currency,
    payment_amount: params.payment_amount,
    payment_currency: params.payment_currency,
    payment_method: params.payment_method,
    country: params.country,
  };
  if (params.subdivision) {
    body.subdivision = params.subdivision;
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Failed to fetch quote: ${response.status}`);
  }
  return response.json();
} 