import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { PaymentsService } from './payments.service';
import {
  submitPaymentSchema,
  rejectPaymentSchema,
  updateMemberPaymentPreferenceSchema,
  markMemberPaidSchema,
  markMemberRejectedSchema,
  type SubmitPaymentDTO,
  type RejectPaymentDTO,
  type UpdateMemberPaymentPreferenceDTO,
  type MarkMemberPaidDTO,
  type MarkMemberRejectedDTO,
} from '@siklo/shared-schemas';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard)
  async submitPayment(
    @Body(new ZodValidationPipe(submitPaymentSchema)) body: SubmitPaymentDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.submitPayment(body, userId);
  }

  @Post(':paymentId/verify')
  @UseGuards(JwtAuthGuard)
  async verifyPayment(
    @Param('paymentId') paymentId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.verifyPayment(paymentId, userId);
  }

  @Post(':paymentId/reject')
  @UseGuards(JwtAuthGuard)
  async rejectPayment(
    @Param('paymentId') paymentId: string,
    @Body(new ZodValidationPipe(rejectPaymentSchema)) body: RejectPaymentDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.rejectPayment(paymentId, body, userId);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard)
  async getPendingPayments(
    @Query('groupId') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.paymentsService.getPendingPayments(groupId, userId);
  }

  @Get('nearest-due')
  @UseGuards(JwtAuthGuard)
  async getNearestUnpaidContribution(@CurrentUser('sub') userId: string) {
    return this.paymentsService.getNearestUnpaidContribution(userId);
  }

  @Post('mark-paid')
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

  @Post('mark-rejected')
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
}
