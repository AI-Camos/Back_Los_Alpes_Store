const getPool = require('../libs/postgres.pool');

class ProductsService {
  constructor() {
    this.products = [];
    this.pool = getPool();
    this.pool.on('error', (err) => console.error(err));
  }

  async create(datas) {
    let { name, description, price, image } = datas;
    const imageUrl = image || 'http://placeimg.com/640/480';
    const values = [name, description, price, imageUrl];
    const query =
      'INSERT INTO Products (name, description, price, image) VALUES ($1, $2, $3, $4)';
    const rta = await this.pool.query(query, values);
    console.log(rta);
    const queryId= 'SELECT last_value FROM products_id_seq';
    const { rows } = await this.pool.query(queryId);

    return {
      id: rows[0].last_value
    };
  }

  async find() {
    const query = 'SELECT * FROM Products';
    const rta = await this.pool.query(query);
    const alls = rta.rows.map(function(all){
      const name= all.name;
      const price = all.price;
      const image = all.image;
      return {
        name:name,
        price:price,
        image:image
      };
    })
    return alls;
  }

  async findOne(id) {
    const query = 'SELECT * FROM Products where id = $1';
    const rta = await this.pool.query(query, [id]);
    const rows = rta.rows;
    if (rows.length === 0) {
      throw new Error(`Producto con el id '${id}' no fue encontrado`);
    }

    const product = rows[0];
    return product;
  }

  async delete(id) {
    const query = 'DELETE FROM Products where id = $1';
    await this.pool.query(query, [id]);
    return { id };
  }
}

module.exports = ProductsService;
