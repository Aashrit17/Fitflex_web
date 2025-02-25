const FitnessTips: React.FC = () => {
    const tips = [
      "Stay hydrated to boost performance.",
      "Include strength training at least twice a week.",
      "Get 7-9 hours of sleep every night for recovery.",
      "Mix up your routine to prevent boredom.",
    ];
  
    return (
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">
        <h2 className="text-xl text-purple-300 font-semibold mb-4">🏋️‍♀️ Fitness Tips</h2>
        <ul className="text-sm text-gray-300">
          {tips.map((tip, index) => (
            <li key={index} className="mb-2">- {tip}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FitnessTips;
  