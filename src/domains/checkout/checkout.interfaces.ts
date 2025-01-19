interface Checkout {
  id: string;
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  status: CheckoutStatus;
  expiresAt?: Date;
}

enum CheckoutStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED'
}

interface PurchaseRepository {
  create(purchase: Omit<Checkout, 'id'>): Promise<Checkout>;
  findById(id: string): Promise<Checkout | null>;
  update(id: string, purchase: Partial<Checkout>): Promise<Checkout>;
  findPendingByEventId(eventId: string): Promise<Checkout[]>;
}

class SoldOutError extends TicketingError {
  constructor(eventId: string) {
    super(
      `Event ${eventId} is sold out`,
      'TICKETS_SOLD_OUT',
      400
    );
  }
}
