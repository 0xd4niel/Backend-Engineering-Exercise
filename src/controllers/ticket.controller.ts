import {Checkout} from "../domains/checkout/checkout.interfaces";

export class ticketController {

  async checkout(eventId: string, ticketTypeId: string, quantity: number): Promise<Checkout> {
    throw new Error('Method not implemented.');
  }
}
