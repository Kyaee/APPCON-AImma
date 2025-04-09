import { useState } from 'react';
import { 
  calculateGemsForLevel,
  createGemsRecord, 
  getUserGems, 
  updateGems,
  setGems,
  adjustGems,
  resetGems,
  deleteGemsRecord
} from '../api/updateGems';

const ApiTester = () => {
  const [userId, setUserId] = useState('');
  const [level, setLevel] = useState(1);
  const [gems, setGemsAmount] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async (testFunction, ...args) => {
    setLoading(true);
    try {
      const response = await testFunction(...args);
      setResult(response);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl mb-6 text-white font-bold">API Tester</h1>
      
      <div className="mb-4">
        <label className="block text-white mb-2">User ID:</label>
        <input 
          type="text" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Enter user ID"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-white mb-2">Level:</label>
        <input 
          type="number" 
          value={level} 
          onChange={(e) => setLevel(parseInt(e.target.value) || 1)} 
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          min="1"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-white mb-2">Gems:</label>
        <input 
          type="number" 
          value={gems} 
          onChange={(e) => setGemsAmount(parseInt(e.target.value) || 0)} 
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          min="0"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button 
          onClick={() => runTest(createGemsRecord, userId, gems)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          disabled={loading || !userId}
        >
          Create Record
        </button>
        
        <button 
          onClick={() => runTest(getUserGems, userId)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          disabled={loading || !userId}
        >
          Get Gems
        </button>
        
        <button 
          onClick={() => runTest(updateGems, userId, level)}
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
          disabled={loading || !userId}
        >
          Update Level & Gems
        </button>
        
        <button 
          onClick={() => runTest(setGems, userId, gems)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded"
          disabled={loading || !userId}
        >
          Set Gems Amount
        </button>
        
        <button 
          onClick={() => runTest(adjustGems, userId, gems)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
          disabled={loading || !userId}
        >
          Add Gems
        </button>
        
        <button 
          onClick={() => runTest(resetGems, userId)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded"
          disabled={loading || !userId}
        >
          Reset Gems
        </button>
        
        <button 
          onClick={() => {
            if (confirm('Are you sure you want to delete this user record?')) {
              runTest(deleteGemsRecord, userId);
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded col-span-2"
          disabled={loading || !userId}
        >
          Delete Record
        </button>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl text-white mb-2">Result:</h2>
        {loading ? (
          <div className="animate-pulse text-gray-400">Loading...</div>
        ) : result ? (
          <pre className="bg-gray-900 p-4 rounded overflow-auto max-h-60 text-green-400">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : (
          <div className="text-gray-400">No results yet</div>
        )}
      </div>
    </div>
  );
};

export default ApiTester;