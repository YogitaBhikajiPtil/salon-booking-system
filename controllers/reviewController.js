const reviewService = require("../services/reviewService");

exports.addReview = async (req, res) => {

    try {

        const review = await reviewService.addReview(
            req.user.id,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

exports.getReviews = async (req, res) => {

    try {

        const reviews = await reviewService.getReviews(
            req.params.serviceId
        );

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.updateReview = async (req, res) => {

    try {

        const review = await reviewService.updateReview(
            req.params.id,
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

exports.deleteReview = async (req, res) => {

    try {

        await reviewService.deleteReview(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

exports.replyReview = async (req, res) => {

    try {

        const review = await reviewService.replyReview(
            req.params.id,
            req.body.reply
        );

        res.status(200).json({
            success: true,
            message: "Reply added successfully",
            review
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAverageRating = async (req, res) => {

    try {

        const data =
            await reviewService.getAverageRating(
                req.params.serviceId
            );

        res.status(200).json({
            success: true,
            data
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAllReviews = async (req, res) => {

    try {

        const reviews =
            await reviewService.getAllReviews();

        res.status(200).json({

            success: true,

            reviews

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};