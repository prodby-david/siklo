import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

type SendEmail = {
  to: string;
  subject: string;
  html: string;
};

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const api = this.configService.getOrThrow('RESEND_API_KEY');
    const email = this.configService.getOrThrow('RESEND_FROM_EMAIL');

    this.resend = new Resend(api);
    this.fromEmail = email;
  }

  async sendEmail({ to, subject, html }: SendEmail) {}
}
