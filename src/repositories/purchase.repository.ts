import {Checkout, CheckoutStatus, PurchaseRepository} from "../domains/checkout/checkout.interfaces";
import {db} from "../utils/db";
import { v4 as uuidv4 } from "uuid";

export class InMemoryPurchaseRepository implements PurchaseRepository {
  // in a real-world scenario, concurrency is typically handled by database transactions or row-level locks.
  // but yeah, there's no true concurrency protection in this demo
  async create(purchaseData: Omit<Checkout, "id">): Promise<Checkout> {
    const newCheckout: Checkout = {
      id: uuidv4(),
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
