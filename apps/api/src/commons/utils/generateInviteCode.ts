import { randomBytes } from 'crypto';

export default function generateInviteCode() {
  return randomBytes(6).toString('hex').toUpperCase();
}
