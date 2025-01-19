import {TicketingError} from "../tickets/ticket.interfaces";
import { EventRepository } from "../events/event.interfaces";
import {PurchaseRepository, Checkout, CheckoutStatus, SoldOutError} from "../checkout/checkout.interfaces";

export class TicketService {
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
      throw new Error(
        `Event ${eventId} not found`);
    }

    // I would also add a search for the same running process here like:

    // const [
    //     pending_request,
    // ] = await db.query('get_waiting_request', {
    //     id: eventId,
    // }, {
    //     traceId: this.req.traceId,
    // });
    //
    // if (pending_request) {
    //     checkout = pending_request;
    // } else {
    //     all that stuff that I wrote below
    // }

    // basically I would like to use event driven architecture here
    // so I would set a listener to know when the status changes to "completed" or "expired"

    const ticketType = event.ticketTypes.find(tt => tt.id === ticketTypeId);

    if (!ticketType) {
      throw new TicketingError(
        `Ticket type ${ticketTypeId} not found for event ${eventId}`,
        "TICKET_TYPE_NOT_FOUND", // this should be a constant
        404
      );
    }

    // we can change this error type to specific if frontend needs it
    if (ticketType.remaining < quantity) {
      throw new SoldOutError(eventId)
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
  }
}
