import { Injectable } from '@nestjs/common';
import {
  SubmitPaymentDTO,
  RejectPaymentDTO,
  RequestAdvancePayoutDTO,
  DisbursePayoutDTO,
  ConfirmPayoutReceiptDTO,
} from '@siklo/shared-schemas';
import { PaymentsSubmissionService } from './services/payments-submission.service';
import { PaymentsManagementService } from './services/payments-management.service';
import { PaymentsScheduleService } from './services/payments-schedule.service';
import { PaymentsPayoutService } from './services/payments-payout.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsSubmissionService: PaymentsSubmissionService,
    private readonly paymentsManagementService: PaymentsManagementService,
    private readonly paymentsScheduleService: PaymentsScheduleService,
    private readonly paymentsPayoutService: PaymentsPayoutService,
  ) {}

  async submitPayment(dto: SubmitPaymentDTO, userId: string) {
    return this.paymentsSubmissionService.submitPayment(dto, userId);
  }

  async verifyPayment(paymentId: string, organizerUserId: string) {
    return this.paymentsSubmissionService.verifyPayment(
      paymentId,
      organizerUserId,
    );
  }

  async rejectPayment(
    paymentId: string,
    dto: RejectPaymentDTO,
    organizerUserId: string,
  ) {
    return this.paymentsSubmissionService.rejectPayment(
      paymentId,
      dto,
      organizerUserId,
    );
  }

  async getPendingPayments(groupId?: string, organizerUserId?: string) {
    return this.paymentsManagementService.getPendingPayments(
      groupId,
      organizerUserId,
    );
  }

  async markMemberPaid(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
    cycleNumber?: number,
    referenceNumber?: string,
    proofUrl?: string,
  ) {
    return this.paymentsManagementService.markMemberPaid(
      groupId,
      memberUserId,
      organizerUserId,
      cycleNumber,
      referenceNumber,
      proofUrl,
    );
  }

  async markMemberRejected(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
    reason?: string,
    cycleNumber?: number,
    rejectionProofUrl?: string,
  ) {
    return this.paymentsManagementService.markMemberRejected(
      groupId,
      memberUserId,
      organizerUserId,
      reason,
      cycleNumber,
      rejectionProofUrl,
    );
  }

  async getNearestUnpaidContribution(userId: string) {
    return this.paymentsScheduleService.getNearestUnpaidContribution(userId);
  }

  async requestAdvancePayout(dto: RequestAdvancePayoutDTO, userId: string) {
    return this.paymentsPayoutService.requestAdvancePayout(dto, userId);
  }

  async disbursePayout(dto: DisbursePayoutDTO, organizerUserId: string) {
    return this.paymentsPayoutService.disbursePayout(dto, organizerUserId);
  }

  async confirmPayoutReceipt(
    dto: ConfirmPayoutReceiptDTO,
    recipientUserId: string,
  ) {
    return this.paymentsPayoutService.confirmPayoutReceipt(
      dto,
      recipientUserId,
    );
  }
}
