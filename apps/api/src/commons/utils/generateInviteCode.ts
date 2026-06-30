import { randomBytes } from 'crypto';

export default function generateInviteCode() {
  return randomBytes(3).toString('hex').toUpperCase();
}
