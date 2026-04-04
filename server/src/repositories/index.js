const CategoryRepository = require("./category.repository");
const ReviewRepository = require("./review.repository");
const BusinessApprovalRepository = require("./business-approval.repository");
const BusinessRepository = require("./business.repository");
const ServiceRepository = require("./service.repository");

module.exports = {
   CategoryRepository,
   BusinessPromotionRepository: require("./business-promotion.repository"),
   AdminPromotionRepository: require("./admin-promotion.repository"),
   ReviewRepository,
   BusinessApprovalRepository,
   BusinessRepository,
   ServiceRepository,
};
