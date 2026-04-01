export interface PaytabsTransaction {
  tran_ref: string;
  tran_type: string;
  cart_id: string;
  cart_description: string;
  cart_currency: string;
  cart_amount: string;
  payment_result?: {
    response_status: string;
    response_code: string;
    response_message: string;
  };
}

export interface PaytabsPaymentPage {
  tran_ref: string;
  redirect_url: string;
}

export interface PaytabsToken {
  token: string;
  tran_ref: string;
}

export interface PaytabsApiResponse {
  [key: string]: unknown;
}
