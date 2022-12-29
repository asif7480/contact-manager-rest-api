const router = require("express").Router();
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getSingleContact,
} = require("../controllers/contactController");

router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getSingleContact).put(updateContact).delete(deleteContact);

module.exports = router;
