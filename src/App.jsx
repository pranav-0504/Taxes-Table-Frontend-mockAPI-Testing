import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TaxTable from "./components/TaxTable";
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-500">
      <TaxTable />
    </div>
  );
}


// export default function App() {
//   return (
//     <div style={{ padding: 50, fontSize: 32, color: "blue" }}>
//       VITE + REACT WORKING ✅
//     </div>
//   );
// }
