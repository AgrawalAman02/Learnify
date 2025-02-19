import crypto from "crypto";

export const validateWebhookSignature = (rawBody, signature, secret) => {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return expectedSignature === signature; 
};

