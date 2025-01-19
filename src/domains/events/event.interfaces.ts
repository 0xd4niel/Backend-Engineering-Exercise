import {TicketType} from "../tickets/ticket.interfaces";

export interface Event {
  id: string;
  name: string;
  date: Date;
  venue: string;
  ticketTypes: TicketType[];
}

// maybe it's a good idea to implemet this Repository from baseRepository with default create and etc. methods
export interface EventRepository {
  create(event: Omit<Event, 'id'>): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  updateTicketInventory(eventId: string, ticketTypeId: string, quantity: number): Promise<void>;
}
