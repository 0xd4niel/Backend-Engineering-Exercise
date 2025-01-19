import {TicketingError} from "../tickets/ticket.interfaces";
import { EventRepository } from "../events/event.interfaces";
import { PurchaseRepository, Checkout, CheckoutStatus} from "../checkout/checkout.interfaces";

class TicketService {
  constructor(
    private eventRepository: EventRepository,
    private purchaseRepository: PurchaseRepository
  ) {}

  /**
   * Attempt to create a pending checkout for the given event & ticket type
   * If successful, update the event's remaining ticket inventory.
   */
  async checkout(
    eventId: string,
    ticketTypeId: string,
    quantity: number
  ): Promise<Checkout> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new Error(eventId);
    }

    const ticketType = event.ticketTypes.find(t => t.id === ticketTypeId);

    if (!ticketType) {
      throw new TicketingError(
        `Ticket type ${ticketTypeId} not found for event ${eventId}`,
        "TICKET_TYPE_NOT_FOUND",
        404
      );
    }

    // we can change this error type to specific if frontend needs it
    if (ticketType.remaining < quantity) {
      throw new TicketingError(
        `Insufficient tickets remaining for event ${eventId}`,
        "TICKETS_SOLD_OUT",
        400
      );
    }

    const expiresInMinutes = 5;
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60_000);

    // we can add a mapper later to transform the data for the interface
    // it's not necessary to use Omit here because the create method's definition is already set,
    // but I did it for clarity.
    const checkoutData: Omit<Checkout, "id"> = {
      eventId,
      ticketTypeId,
      quantity,
      status: CheckoutStatus.PENDING,
      expiresAt,
    };

    const checkout = await this.purchaseRepository.create(checkoutData);

    await this.eventRepository.updateTicketInventory(
      eventId,
      ticketTypeId,
      ticketType.remaining - quantity
    );

    return checkout;

    // Implement purchase logic with proper error handling
    // Consider concurrent purchases
    // Handle inventory updates atomically
    // Implement reservation timeout
  }
}
