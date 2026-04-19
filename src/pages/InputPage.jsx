import React, { useState } from 'react';
import MatrixInput from '../components/MatrixInput';
import WeightsInput from '../components/WeightsInput';
import ThresholdInput from '../components/ThresholdInput';
import { calculateElectreI } from '../LOGIC/electre';

const InputPage = () => {
  // États initiaux (1 ressource, 1 user, 3 tâches selon tes préférences habituelles)
  const [matrix, setMatrix] = useState([[0, 0, 0], [0, 0, 0]]);
  const [weights, setWeights] = useState([1, 1, 1]);
  const [types, setTypes] = useState(['max', 'max', 'max']);
  const [p, setP] = useState(0.7);
  const [q, setQ] = useState(0.3);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const data = calculateElectreI(matrix, weights, types, p, q);
    setResults(data);
    console.log("Résultats calculés :", data);
    // Ici, on pourra naviguer vers la page de l'étudiant 2 avec les résultats
  };

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-blue-900">Projet ELECTRE I - Groupe 3</h1>
        <p className="text-gray-600">Master 1-RSID | Aide Multicritère à la Décision</p>
      </header>

      <MatrixInput matrix={matrix} setMatrix={setMatrix} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeightsInput 
          weights={weights} 
          setWeights={setWeights} 
          types={types} 
          setTypes={setTypes} 
        />
        <ThresholdInput p={p} setP={setP} q={q} setQ={setQ} />
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={handleCalculate}
          className="bg-indigo-700 text-white text-xl font-bold px-12 py-4 rounded-full shadow-lg hover:bg-indigo-800 transform hover:scale-105 transition"
        >
          
        </button>
      </div>

      {results && (
        <div className="mt-8 p-6 bg-green-100 border-l-4 border-green-500 rounded shadow">
          <h3 className="text-lg font-bold text-green-800">Calcul réussi !</h3>
          <p>Le noyau a été extrait : <strong>{results.kernel.join(', ')}</strong></p>
          <p className="text-sm text-green-700 italic">Les matrices de concordance et discordance sont prêtes pour l'affichage.</p>
        </div>
      )}
    </div>
  );
};

export default InputPage;
