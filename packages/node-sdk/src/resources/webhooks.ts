import * as crypto from 'crypto';
import type { WebhookPayload } from '../types';

export class WebhooksResource {
  /**
   * Verify webhook signature
   */
  verify(payload: string | WebhookPayload, signature: string, secret: string): boolean {
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const expectedSignature = crypto
      .createHmac('sha512', secret)
      .update(body)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Parse and verify webhook
   */
  parseAndVerify(
    rawBody: string,
    signature: string,
    secret: string
  ): WebhookPayload | null {
    if (!this.verify(rawBody, signature, secret)) {
      return null;
    }

    try {
      return JSON.parse(rawBody) as WebhookPayload;
    } catch {
      return null;
    }
  }
}
