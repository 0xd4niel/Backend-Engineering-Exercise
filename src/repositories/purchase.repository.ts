import {Checkout, CheckoutStatus, PurchaseRepository} from "../domains/checkout/checkout.interfaces";
import {db} from "../utils/db";

export class InMemoryPurchaseRepository implements PurchaseRepository {
  async create(purchaseData: Omit<Checkout, "id">): Promise<Checkout> {
    const newCheckout: Checkout = {
      id: (Date.now() + Math.random()).toString(), // replace with uuid package
      ...purchaseData,
    };

    db.checkouts.push(newCheckout);

    return newCheckout;
  }

  async findById(id: string): Promise<Checkout | null> {
    return db.checkouts.find((p) => p.id === id) || null;
  }

  async update(id: string, purchase: Partial<Checkout>): Promise<Checkout> {
    const index = db.checkouts.findIndex((p) => p.id === id);

    if (index < 0) {
      throw new Error(`Checkout with ID ${id} not found`);
    }

    db.checkouts[index] = {
      ...db.checkouts[index],
      ...purchase,
    };

    return db.checkouts[index];
  }

  async findPendingByEventId(eventId: string): Promise<Checkout[]> {
    return db.checkouts.filter(
      (p) => p.eventId === eventId && p.status === CheckoutStatus.PENDING
    );
  }
}
