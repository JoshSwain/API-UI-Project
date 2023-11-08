export {}
// import React from 'react';
// import { TransactionType, TransactionListProps } from '../types/transactions';
// import { ItemLookup } from '../types/item';

// const NewTransactionList: React.FC<TransactionListProps> = ({ transactions, items }) => {
//   // Create a lookup object to map item IDs to item names
//   const itemLookup: ItemLookup = items.reduce((lookup, item) => {
//     lookup[item.id] = item.name;
//     return lookup;
//   }, {});

//   return (
//     <div>
//       <table className="table table-striped table-bordered table-hover">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Count</th>
//             <th>Direction</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction: TransactionType) => (
//             <tr key={transaction.id}>
//               <td>{itemLookup[transaction.item_id]}</td>
//               <td>{transaction.count}</td>
//               <td>{transaction.direction}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NewTransactionList;
