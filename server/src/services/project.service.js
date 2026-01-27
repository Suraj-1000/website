const projectRepository = require('../repositories/project.repo');

class ProjectService {
    async getAllProjects() {
        return await projectRepository.findAll();
    }

    async addProject(data) {
        return await projectRepository.create(data);
    }

    async updateProject(id, data) {
        return await projectRepository.update(id, data);
    }

    async deleteProject(id) {
        return await projectRepository.delete(id);
    }
}

module.exports = new ProjectService();
