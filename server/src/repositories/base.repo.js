class BaseRepository {
   constructor(model, defaultOrder = [['createdAt', 'DESC']]) {
      this.model = model;
      this.defaultOrder = defaultOrder;
   }

   findAll = async (options = {}) => {
      return await this.model.findAll({
         order: this.defaultOrder,
         ...options,
      });
   };

   findById = async (id, options = {}) => {
      return await this.model.findByPk(id, options);
   };

   findOne = async (where, options = {}) => {
      return await this.model.findOne({ where, ...options });
   };

   create = async (data) => {
      return await this.model.create(data);
   };

   update = async (id, data) => {
      const record = await this.findById(id);
      if (!record) return null;
      return await record.update(data);
   };

   delete = async (id) => {
      const record = await this.findById(id);
      if (!record) return null;
      return await record.destroy();
   };
}

module.exports = BaseRepository;
