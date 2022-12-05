const express = require("express");
const router = express.Router();
const {
  getAllAttributes,
  createAttribute,
  deleteAttribute,
  updateAttribute,
} = require("../controllers/attributeController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/attributes").get(getAllAttributes);

router
  .route("/admin/attribute/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createAttribute);

router
  .route("/admin/attribute/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateAttribute)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAttribute);

module.exports = router;
