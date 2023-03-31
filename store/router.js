const url = process.env.NODE_ENV == 'development' ? process.env.URL_API_DEV + '/' : process.env.URL_API + '/';
export default {
  register: url + 'register', 
  type: url + 'income-expense-type/',
  group: url + 'income-expense-group/',
  income_expense: {
    lists: url + 'income-expense/',
    info: url + 'income-expense/{:id}',
    create: url + 'income-expense/',
    update: url + 'income-expense/{:id}',
    delete: url + 'income-expense/{:id}',
  }
}