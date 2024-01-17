const { Router } = require("express");
const { Ticket, Agent } = require("../DB/db");
const zod = require("zod");
const router = Router();

//zod schemas
const stringSchema = zod.string();
const dateSchema = zod.coerce.date();
const emailSchema = zod.string().email(); //used to check email format

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


    //round robin implementation




    
    const ticketData = {
      topic,
      description,
      dateCreated: dc,
      severity,
      type,
      assignedTo,
      status,
      resolvedOn: ro,
    };
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
    result = await Ticket.find()
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
