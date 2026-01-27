const Project = require('../models/Project');

class ProjectRepository {
    async findAll() {
        return await Project.findAll({ order: [['createdAt', 'DESC']] });
    }

    async findById(id) {
        return await Project.findByPk(id);
    }

    async create(data) {
        return await Project.create(data);
    }

    async update(id, data) {
        const project = await this.findById(id);
        if (project) {
            return await project.update(data);
        }
        return null;
    }

    async delete(id) {
        const project = await this.findById(id);
        if (project) {
            return await project.destroy();
        }
        return null;
    }
}

module.exports = new ProjectRepository();
