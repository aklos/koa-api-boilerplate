import knex from "knex";
import configs from "../../knexfile";

const db = knex(configs[process.env.NODE_ENV || "development"]);

export default db;
