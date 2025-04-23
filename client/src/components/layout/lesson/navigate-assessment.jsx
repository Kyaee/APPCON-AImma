import CapyReading from "@/assets/lesson-assessment/CapyReading.png";

export default function NavigateAssessment({ name, onClick, disabled }) {
  return (
    <div className="flex pt-20 mt-20 border-t-3 border-foreground">
      <div>
        <h2 className="text-3xl font-semibold mb-5">Take Assessment</h2>
        <p className="p-6 mb-6 border-2 rounded-lg border-dashed border-foreground">
          Complete the assessment below to test your understanding of{" "}
          <span className="p-1 bg-yellow-400">"{name}"</span>. Earn rewards for
          completing the lesson successfully.
        </p>
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-2 px-4 mb-3 rounded-lg
                border border-foreground custom-shadow-50
                bg-card text-foreground hover:bg-light-brown 
                transition duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300
                "
        >
          Take Assessment
        </button>
      </div>
      <img src={CapyReading} className="w-80 h-auto self-end" />
    </div>
  );
}
