import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { PaymentsService } from './payments.service';
import {
  submitPaymentSchema,
  rejectPaymentSchema,
  markMemberPaidSchema,
  markMemberRejectedSchema,
  requestAdvancePayoutSchema,
  disbursePayoutSchema,
  confirmPayoutReceiptSchema,
  type SubmitPaymentDTO,
  type RejectPaymentDTO,
  type MarkMemberPaidDTO,
  type MarkMemberRejectedDTO,
  type RequestAdvancePayoutDTO,
  type DisbursePayoutDTO,
  type ConfirmPayoutReceiptDTO,
} from '@siklo/shared-schemas';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async submitPayment(
    @Body(new ZodValidationPipe(submitPaymentSchema)) body: SubmitPaymentDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.submitPayment(body, userId);
  }

  @Patch(':paymentId/verification')
  @UseGuards(JwtAuthGuard)
  async verifyPayment(
    @Param('paymentId') paymentId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.verifyPayment(paymentId, userId);
  }

  @Patch(':paymentId/rejection')
  @UseGuards(JwtAuthGuard)
  async rejectPayment(
    @Param('paymentId') paymentId: string,
    @Body(new ZodValidationPipe(rejectPaymentSchema)) body: RejectPaymentDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.rejectPayment(paymentId, body, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPendingPayments(
    @Query('groupId') groupId: string | undefined,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.getPendingPayments(groupId, userId);
  }

  @Get('nearest-due')
  @UseGuards(JwtAuthGuard)
  async getNearestUnpaidContribution(@CurrentUser('sub') userId: string) {
    return this.paymentsService.getNearestUnpaidContribution(userId);
  }

  @Post('manual')
  @UseGuards(JwtAuthGuard)
  async markMemberPaid(
    @Body(new ZodValidationPipe(markMemberPaidSchema))
    body: MarkMemberPaidDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.markMemberPaid(
      body.groupId,
      body.memberUserId,
      userId,
      body.cycleNumber,
      body.referenceNumber,
      body.proofUrl,
    );
  }

  @Post('manual-rejections')
  @UseGuards(JwtAuthGuard)
  async markMemberRejected(
    @Body(new ZodValidationPipe(markMemberRejectedSchema))
    body: MarkMemberRejectedDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.markMemberRejected(
      body.groupId,
      body.memberUserId,
      userId,
      body.reason,
      body.cycleNumber,
      body.rejectionProofUrl,
    );
  }

  @Post('payout-requests')
  @UseGuards(JwtAuthGuard)
  async requestAdvancePayout(
    @Body(new ZodValidationPipe(requestAdvancePayoutSchema))
    body: RequestAdvancePayoutDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.requestAdvancePayout(body, userId);
  }

  @Post('disbursements')
  @UseGuards(JwtAuthGuard)
  async disbursePayout(
    @Body(new ZodValidationPipe(disbursePayoutSchema))
    body: DisbursePayoutDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.disbursePayout(body, userId);
  }

  @Post('receipts')
  @UseGuards(JwtAuthGuard)
  async confirmPayoutReceipt(
    @Body(new ZodValidationPipe(confirmPayoutReceiptSchema))
    body: ConfirmPayoutReceiptDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.confirmPayoutReceipt(body, userId);
  }
}
