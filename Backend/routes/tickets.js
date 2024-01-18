const { Router } = require("express");
const { Ticket, Agent } = require("../DB/db");
const zod = require("zod");
const router = Router();

//zod schemas
const stringSchema = zod.string();
const dateSchema = zod.coerce.date();
const emailSchema = zod.string().email(); //used to check email format

const assignTicketToAgent = async () => {
  const agents = await Agent.find({ active: true }); // Retrieve active agents

  if (agents.length === 0) {
    // handle the case when there are no available agents
    console.error("No available agents");
    throw new Error("No available agents");
  }

  // determine next agent using round-robin
  const nextAgentIndex = await getNextAgentIndex();
  const nextAgent = agents[nextAgentIndex % agents.length];

  return nextAgent.email; // store agent email
};

const getNextAgentIndex = async () => {
  const lastAssignedTicket = await Ticket.find();
  console.log("lastAssignedTicket===>", lastAssignedTicket);
  if (!lastAssignedTicket) {
    // no ticket has been assigned yet, start from the first agent
    return 0;
  }
  let temp = lastAssignedTicket[lastAssignedTicket.length - 1];
  const lastAssignedAgentEmail = temp.assignedTo;
  const lastAssignedAgent = await Agent.findOne({
    email: lastAssignedAgentEmail,
  });

  if (!lastAssignedAgent) {
    // The agent associated with the last assigned ticket doesn't exist, start from the first agent
    return 0;
  }

  const activeAgents = await Agent.find({ active: true });
  const lastAssignedAgentIndex = activeAgents.findIndex(
    (agent) => agent.email === lastAssignedAgentEmail
  );

  if (lastAssignedAgentIndex === -1) {
    // The last assigned agent is not in the active agents list, start from the first agent
    return 0;
  }

  return (lastAssignedAgentIndex + 1) % activeAgents.length;
};
//create a ticket
router.post("/api/support-tickets", async (req, res) => {
  try {
    const {
      topic,
      description,
      dateCreated,
      severity,
      type,
      assignedTo,
      status,
      resolvedOn,
    } = req.body;
    const dc = new Date(dateCreated);
    const ro = new Date(resolvedOn);
    console.log("dc:", dc);
    console.log("Body: ", req.body);

    // type DateSchema = zod.infer<typeof dateSchema>;
    const checkDateCreated = dateSchema.safeParse(dc);
    const checkResolvedOn = dateSchema.safeParse(ro);
    const checkSeverity = stringSchema.safeParse(severity);
    const checkTopic = stringSchema.safeParse(severity);
    const checkDescription = stringSchema.safeParse(description);
    //
    if (
      !checkDateCreated.success ||
      !checkResolvedOn.success ||
      !checkSeverity.success ||
      !checkTopic.success ||
      !checkDescription.success
    ) {
      res.status(404).json({ msg: "Entered data is not valid" });
    }
    let ticketData = {};
    //round robin implementation only when there is not agent assigned
    if (assignedTo.length === 0) {
      console.log("RR ran=======>");
      const assignedAgentEmail = await assignTicketToAgent();
      // const assignedAgentEmail = "olo";
      if (assignedAgentEmail) {
        ticketData = {
          topic,
          description,
          dateCreated: dc,
          severity,
          type,
          assignedTo: assignedAgentEmail,
          status: "Assigned",
          resolvedOn: ro,
        };
      }
    } else {
      ticketData = {
        topic,
        description,
        dateCreated: dc,
        severity,
        type,
        assignedTo,
        status,
        resolvedOn: ro,
      };
    }
    //insert into DB
    const result = await Ticket.create(ticketData);

    if (result) {
      res.status(200).json({ msg: "Ticket successfully created" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// gets all the tickets in the DB
// Add filter, sort and pagination functionality as per OpenAPI specs -done
// Filter fields - Status, AssignedTo, Severity, Type
// Sort fields - resolvedOn, dateCreated

const globalStatus = ["New", "Assigned", "Resolved"];
router.get("/api/support-tickets", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const status = req.query.status || "";
    const assignedTo = req.query.assignedTo || "";
    const resolvedOn = req.query.resolvedOn || "ASE";
    const datecreated = req.query.datecreated || "ASE";

    if (assignedTo) {
      const checkAssignedTo = emailSchema.safeParse(assignedTo);
      if (!checkAssignedTo.success) {
        res.status(404).json({ msg: "Entered email is not in correct format" });
      }
    }

    const queryObject = {};
    queryObject.assignedTo = assignedTo;
    if (
      status &&
      (status == "New" || status == "Assigned" || status == "Resolved")
    )
      queryObject.status = status;
    if (assignedTo) {
      queryObject.assignedTo = assignedTo;
    }
    const sortQuery = {};
    if (resolvedOn && datecreated) {
      console.log("Both cant be used at once");
    } else if (resolvedOn) {
      resolvedOn === "ASE"
        ? (sortQuery.resolvedOn = 1)
        : (sortQuery.resolvedOn = -1);
    } else if (datecreated) {
      datecreated === "ASE"
        ? (sortQuery.datecreated = 1)
        : (sortQuery.datecreated = -1);
    }

    let result;
    // if(queryObject)
    result = await Ticket.find(queryObject)
      .sort(sortQuery)
      .skip(page * limit)
      .limit(limit);

    if (result) {
      res.status(200).json({ msg: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
