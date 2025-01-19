import {Checkout} from "../domains/checkout/checkout.interfaces";

interface InMemoryDatabase {
  events: Event[],
  checkouts: Checkout[]
}

export const db: InMemoryDatabase = {
  events: [],
  checkouts: []
}
