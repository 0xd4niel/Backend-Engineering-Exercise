import {Checkout} from "../domains/checkout/checkout.interfaces";

import { Request, Response } from "express";
import { TicketService } from "../domains/tickets/ticket.service";
import { InMemoryEventRepository } from "../repositories/event.repository";
import { InMemoryPurchaseRepository } from "../repositories/purchase.repository";

const ticketService = new TicketService(
  new InMemoryEventRepository(),
  new InMemoryPurchaseRepository()
);

export class TicketController {
  // POST
  static async checkout(req: Request, res: Response) {
    try {
      const { eventId, ticketTypeId, quantity } = req.body;
      const checkoutResult = await ticketService.checkout(eventId, ticketTypeId, quantity);
      res.json(checkoutResult);
    } catch (err: any) {
      res.status(err.status || 500).json({
        code: err.code || "INTERNAL_ERROR", // change to const
        message: err.message,
      });
    }
  }
}
