const Review = require("../models/Review");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Service = require("../models/Service");
const Staff = require("../models/Staff");
const { fn, col } = require("sequelize");

const addReview = async (userId, data) => {

    const appointment = await Appointment.findByPk(
        data.appointmentId
    );

    if (!appointment)
        throw new Error("Appointment not found");

    if (appointment.userId !== userId)
        throw new Error("Unauthorized");

    if (appointment.status !== "Completed")
        throw new Error(
            "Review allowed only after completed appointment"
        );

    const exists = await Review.findOne({
        where: {
            appointmentId: data.appointmentId
        }
    });

    if (exists)
        throw new Error(
            "Review already submitted"
        );

    return await Review.create({

        userId,

        appointmentId: data.appointmentId,

        serviceId: appointment.serviceId,

        staffId: appointment.staffId,

        rating: data.rating,

        review: data.review

    });

};

const getReviews = async (serviceId) => {

    return await Review.findAll({

        where: {
            serviceId
        },

        include: [
            User,
            Staff
        ],

        order: [
            ["createdAt", "DESC"]
        ]

    });

};

const replyReview = async (
    reviewId,
    reply
) => {

    const review = await Review.findByPk(
        reviewId
    );

    if (!review)
        throw new Error("Review not found");

    review.staffReply = reply;

    await review.save();

    return review;

};

const updateReview = async (
    reviewId,
    userId,
    data
) => {

    const review = await Review.findByPk(
        reviewId
    );

    if (!review)
        throw new Error("Review not found");

    if (review.userId !== userId)
        throw new Error("Unauthorized");

    review.rating = data.rating;
    review.review = data.review;

    await review.save();

    return review;

};

const deleteReview = async (
    reviewId,
    userId
) => {

    const review = await Review.findByPk(
        reviewId
    );

    if (!review)
        throw new Error("Review not found");

    if (review.userId !== userId)
        throw new Error("Unauthorized");

    await review.destroy();

};

const getAverageRating = async (serviceId) => {

    const result = await Review.findOne({

        attributes: [

            [fn("AVG", col("rating")), "averageRating"],

            [fn("COUNT", col("id")), "totalReviews"]

        ],

        where: {
            serviceId
        }

    });

    return result;

};

const getAllReviews = async () => {

    return await Review.findAll({

        include: [
            User,
            Staff,
            Service
        ],

        order: [
            ["createdAt", "DESC"]
        ]

    });

};

module.exports = {

    addReview,

    getReviews,

    updateReview,

    deleteReview,

    replyReview,

    getAverageRating,

    getAllReviews

};