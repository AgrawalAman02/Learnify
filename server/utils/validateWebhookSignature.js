import crypto from "crypto";

export const validateWebhookSignature = (payload, signature, secret) => {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return expectedSignature === signature;
};

