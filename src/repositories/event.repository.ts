import { EventRepository, Event } from "../domains/events/event.interfaces";
import {db} from "../utils/db";
export class InMemoryEventRepository implements EventRepository {
  async create(eventData: Omit<Event, 'id'>): Promise<Event> {
    const newEvent: Event = {
      id: (Date.now() + Math.random()).toString(), //change to uuid package
      ...eventData,
    }

    db.events.push(newEvent);
  }

  async findById(id: string): Promise<Event | null> {
    db.events.find((e)=> e.id === id) || null;
  }

  async updateTicketInventory(eventId: string, ticketTypeId: string, quantity: number): Promise<void> {
    const event = db.events.find((e) => e.id === eventId);

    if (!event) {
      return
    }

    const ticketType = event.ticketTypes.find((t) => t.id === ticketTypeId);

    const ttIndex = event.ticketTypes.findIndex((tt) => tt.id === ticketTypeId);

    if (ttIndex < 0) return;

    event.ticketTypes[ttIndex].remaining += quantity;
  }
}
