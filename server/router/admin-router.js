const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddlware = require("../middlewares/admin-middleware");

router
  .route("/users")
  .get(authMiddleware, adminMiddlware, adminController.getAllUsers);
router
  .route("/contacts")
  .get(authMiddleware, adminMiddlware, adminController.getAllContacts);
router;
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminController.deleteContact);
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddlware, adminController.getUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminController.deleteUser);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddlware, adminController.updateUserById);

router
  .route("/projects")
  .get(authMiddleware, adminMiddlware, adminController.getAdminProjects);

router
  .route("/projects/add")
  .post(authMiddleware, adminMiddlware, adminController.addProject);

router
  .route("/projects/delete/:id")
  .delete(authMiddleware, adminMiddlware, adminController.deleteProject);
router
  .route("/projects/:id")
  .get(authMiddleware, adminMiddlware, adminController.getProjectById);

router
  .route("/projects/update/:id")
  .patch(authMiddleware, adminMiddlware, adminController.updateProjectById);

module.exports = router;
