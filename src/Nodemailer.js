import { createTransport } from "nodemailer";
import { mailerAuth } from "../Config/nodemailerEmail.js";

export const gmailSender = createTransport({
  service : "gmail",
  port : 586,
  auth : mailerAuth
})