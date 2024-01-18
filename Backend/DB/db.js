require("dotenv").config();
const mongoose = require("mongoose");

const ticketStatus = ["New", "Assigned", "Resolved"];

const TicketSchema = new mongoose.Schema({
  topic: { type: String, required: [true, "Please enter ticket topic..!!"] },
  description: {
    type: String,
    required: [true, "Please enter ticket description..!!"],
  },
  dateCreated: {
    type: Date,
    required: [true, "Please enter ticket date creation..!!"],
  },
  severity: {
    type: String,
    required: [true, "Please enter ticket severity..!!"],
  },
  type: {
    type: String,
    required: [true, "Please enter ticket type..!!"],
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    enum: ticketStatus,
    default: "New",
  },
  resolvedOn: { type: Date },
});

const agentSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter agent name..!!"] },
  email: { type: String, required: [true, "Please enter agent email..!!"] },
  phone: { type: String, required: [true, "Please enter agent phone..!!"] },
  description: {
    type: String,
    required: [true, "Please enter agent description..!!"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  dateCreated: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", TicketSchema);
const Agent = mongoose.model("Agent", agentSchema);

module.exports = {
  Agent,
  Ticket,
};
