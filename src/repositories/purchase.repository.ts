import {Checkout, PurchaseRepository} from "../domains/checkout/checkout.interfaces";

export class InMemoryPurchaseRepository implements PurchaseRepository {
  async create(purchaseData: Omit<Checkout, 'id'>): Promise<Checkout> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Checkout | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, purchase: Partial<Checkout>): Promise<Checkout> {
    throw new Error('Method not implemented.');
  }

  async findPendingByEventId(eventId: string): Promise<Checkout[]> {
    throw new Error('Method not implemented.');
  }
}
