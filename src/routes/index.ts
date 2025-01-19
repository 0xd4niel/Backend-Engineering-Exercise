import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";

const router = Router();

router.post("/checkout", TicketController.checkout);

export default router;
