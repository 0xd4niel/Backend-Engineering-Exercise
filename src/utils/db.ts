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

// seed data
db.events.push({
  id: "1",
  name: "squid game",
  date: new Date(),
  venue: "seoul",
  ticketTypes: [
    {
      id: "0",
      name: "VIP",
      price: 100,
      capacity: 5,
      remaining: 1,
    },
    {
      id: "1",
      name: "poor man",
      price: 0,
      capacity: 456,
      remaining: 50,
    },
  ],
});
