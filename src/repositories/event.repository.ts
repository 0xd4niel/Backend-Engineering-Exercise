import { EventRepository, Event } from "../domains/events/event.interfaces";
export class InMemoryEventRepository implements EventRepository {
  async create(event: Omit<Event, 'id'>): Promise<Event> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Event | null> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Event[]> {
    throw new Error('Method not implemented.');
  }

  async updateTicketInventory(eventId: string, ticketTypeId: string, quantity: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
