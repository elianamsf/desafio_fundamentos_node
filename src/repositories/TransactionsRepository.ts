import Transaction from '../models/Transaction';

interface Balance {
  income: number;

  outcome: number;

  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcome = this.transactions
    .filter((transaction)=>transaction.type === 'outcome')
    .reduce((sum: number, t :Transaction)=>sum + t.value,0);

    const income: number = this.transactions
    .filter((transaction)=>transaction.type === 'income')
    .reduce((sum: number, t :Transaction)=>sum + t.value,0);

    const total: number = income - outcome;

    const balance: Balance = {
      outcome,
      income,
      total,
    };
    return balance;
  }

  public create({title, type, value}:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, type, value});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
