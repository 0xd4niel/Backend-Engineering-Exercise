import { EventRepository, Event } from "../domains/events/event.interfaces";
import {db} from "../utils/db";
import { v4 as uuidv4 } from "uuid";

export class InMemoryEventRepository implements EventRepository {
  async create(eventData: Omit<Event, 'id'>): Promise<Event> {
    const newEvent: Event = {
      id: uuidv4(),
      ...eventData,
    }

    db.events.push(newEvent);

    return newEvent
  }

  async findById(id: string): Promise<Event | null> {
    const result = db.events.find((e)=> e.id === id) || null;

    return result || null
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
