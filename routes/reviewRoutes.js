const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const validateRequest =
require("../middleware/validateRequest");

const {
    reviewValidation
} = require("../validators/reviewValidator");

const reviewController =
require("../controllers/reviewController");

router.post(
    "/",
    auth,
    reviewValidation,
    validateRequest,
    reviewController.addReview
);

router.get(
    "/service/:serviceId",
    reviewController.getReviews
);

router.put(
    "/:id",
    auth,
    reviewController.updateReview
);

router.delete(
    "/:id",
    auth,
    reviewController.deleteReview
);

router.put(
    "/reply/:id",
    auth,
    admin,
    reviewController.replyReview
);

router.get(
    "/average/:serviceId",
    reviewController.getAverageRating
);

router.get(
    "/",
    auth,
    admin,
    reviewController.getAllReviews
);

module.exports = router;