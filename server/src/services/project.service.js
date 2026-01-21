const projectRepository = require('../repositories/project.repo');

class ProjectService {
    async getAllProjects() {
        return await projectRepository.findAll();
    }

    async addProject(data) {
        return await projectRepository.create(data);
    }
}

module.exports = new ProjectService();
