const { Router } = require("express");
const { Ticket, Agent } = require("../DB/db");
const zod = require("zod");
const router = Router();

const emailSchema = zod.string().email(); //used to check email format
const stringSchema = zod.string();
const phoneSchema = zod.string().length(10);

router.post("/api/support-agents", async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;

    const checkEmail = emailSchema.safeParse(email);
    const checkName = stringSchema.safeParse(name);
    const checkDesctiption = stringSchema.safeParse(description);
    const checkPhone = phoneSchema.safeParse(phone);
    if (
      !checkEmail.success ||
      !checkName.success ||
      !checkDesctiption.success ||
      !checkPhone.success
    ) {
      res.status(404).json({ message: "Please enter a valid details" });
    }

    const checkDuplicateEmail = await Agent.findOne({ email });
    if (checkDuplicateEmail) {
      res.status(400);
      throw new Error("Email already registered");
    }
    const agentObject = {
      name,
      email,
      phone,
      description,
      active: true,
      dateCreated: new Date(),
    };
    const result = await Agent.create(agentObject);
    if (result) {
      res
        .status(200)
        .json({ msg: `Agent ${name} with ${email} successfully created` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
