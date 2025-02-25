interface SleepTrackerProps {
  hoursSlept: number;
  setHoursSlept: React.Dispatch<React.SetStateAction<number>>;
}

const SleepTracker: React.FC<SleepTrackerProps> = ({ hoursSlept, setHoursSlept }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl text-purple-300 font-semibold mb-4">😴 Sleep Tracker</h2>
      <input
        type="number"
        value={hoursSlept}
        onChange={(e) => setHoursSlept(Number(e.target.value))}
        placeholder="Hours of Sleep"
        className="p-3 bg-gray-800 text-white rounded-lg w-full mb-2"
      />
      <p className="text-sm text-gray-300 mt-4">You slept for {hoursSlept} hours today.</p>
    </div>
  );
};

export default SleepTracker;
