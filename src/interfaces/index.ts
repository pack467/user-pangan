export interface ImageInput {
  file: File;
  fileReader: string | ArrayBuffer | null;
}

export interface ChargeResp {
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  fraud_status: string;
  permata_va_number?: string;
  merchant_id: string;
  masked_card?: string;
  signature_key: string;
  status_code: string;
  transaction_id: string;
  transaction_status: TransactionStatus;
  status_message: string;
  va_numbers: {
    bank: string;
    va_number: string;
  }[];
  expiry_time: string;
}

export type TransactionStatus =
  | "authorize"
  | "capture"
  | "settlement"
  | "deny"
  | "pending"
  | "cancel"
  | "refund"
  | "partial_refund"
  | "chargeback"
  | "partial_chargeback"
  | "expire"
  | "failure";

export interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
