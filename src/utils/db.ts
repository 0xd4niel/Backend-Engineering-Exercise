import {Checkout} from "../domains/checkout/checkout.interfaces";
import { Event } from "../domains/events/event.interfaces";

interface InMemoryDB {
  events: Event[],
  checkouts: Checkout[]
}

export const db: InMemoryDB = {
  events: [],
  checkouts: []
}
