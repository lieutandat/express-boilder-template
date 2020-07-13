const db = require('../database');

function getUsers() {
  return db.User.findAll({
    include: [
      {
        model: db.Blog,
        as: 'blogs',
      },
    ],
  });
}

function createUser(user) {
  return db.User.create(user);
}

async function updateUser(user) {
  const { id, email, ...data } = user;
  const options = [];
  if (id) {
    options.push({ id });
  }
  if (email) {
    options.push({ email });
  }
  const result = await db.User.update(
    { ...data },
    {
      where: {
        [db.Sequelize.Op.or]: options,
      },
    },
  );

  return result[0] > 0;
}

/**
 *
 * @param { String } name
 */
function findUserByName(name) {
  return db.User.findAll({
    where: {
      [db.Sequelize.Op.or]: [
        {
          firstName: {
            [db.Sequelize.Op.substring]: name,
          },
        },
        {
          lastName: {
            [db.Sequelize.Op.substring]: name,
          },
        },
      ],
    },
  });
}

/**
 *
 * @param {{email: String, id: String}} query
 */
function findUserBy(query) {
  return db.User.findOne({
    where: query,
  });
}

function deleteUser(query) {
  return db.User.destroy({
    where: query,
  });
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  findUserByName,
  findUserBy,
  deleteUser,
};
