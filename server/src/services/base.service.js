class BaseService {
   constructor(repository) {
      this.repository = repository;
   }

   findAll = async () => {
      return await this.repository.findAll();
   };

   findById = async (id) => {
      return await this.repository.findById(id);
   };

   create = async (data) => {
      return await this.repository.create(data);
   };

   update = async (id, data) => {
      return await this.repository.update(id, data);
   };

   delete = async (id) => {
      return await this.repository.delete(id);
   };
}

module.exports = BaseService;
