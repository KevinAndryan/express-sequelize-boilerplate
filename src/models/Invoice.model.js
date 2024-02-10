module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define(
    "invoices",
    {
      name: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
    },
  );

  return Invoice;
}