const Project = require('../models/Project');

class ProjectRepository {
    async findAll() {
        return await Project.findAll();
    }

    async create(data) {
        return await Project.create(data);
    }
}

module.exports = new ProjectRepository();
