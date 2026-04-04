class BaseRepository {
   constructor(model, defaultOrder = [['createdAt', 'DESC']]) {
      this.model = model;
      this.defaultOrder = defaultOrder;
   }

   async findAll(options = {}) {
      return await this.model.findAll({
         order: this.defaultOrder,
         ...options,
      });
   }

   async findById(id, options = {}) {
      return await this.model.findByPk(id, options);
   }

   async findOne(where, options = {}) {
      return await this.model.findOne({ where, ...options });
   }

   async create(data) {
      return await this.model.create(data);
   }

   async update(id, data) {
      const record = await this.findById(id);
      if (!record) return null;
      return await record.update(data);
   }

   async delete(id) {
      const record = await this.findById(id);
      if (!record) return null;
      return await record.destroy();
   }
}

module.exports = BaseRepository;
