import { Router } from "express";
import {getTickets,getTicketById, createTicket, resolveTicket} from '../controllers/tickets.js'
const router = Router();

router.get('/',getTickets);
router.post('/',createTicket)

router.get('/:oid',getTicketById)
router.put('/:oid',resolveTicket)

export default router;