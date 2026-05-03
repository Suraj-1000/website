const BaseService = require('./base.service');
const profileRepository = require('@/repository/profile.repo');

/**
 * Service for handling profile-related business logic.
 * Extends BaseService to utilize common database operations.
 */
class ProfileService extends BaseService {
    constructor() {
        super(profileRepository);
    }

    /**
     * Retrieves the primary profile.
     * Since the portfolio expects only one profile, this returns the first found record.
     * @returns {Promise<Object|null>} The profile object or null if not found.
     */
    async getProfile() {
        const profiles = await this.findAll();
        return profiles[0] || null;
    }

    /**
     * Updates an existing profile or creates a new one if none exists.
     * @param {Object} data - The profile data to upsert.
     * @returns {Promise<Object>} The created or updated profile.
     */
    async upsertProfile(data) {
        const existing = await this.getProfile();
        if (existing) {
            return await this.update(existing.id, data);
        }
        return await this.create(data);
    }
}

module.exports = new ProfileService();
