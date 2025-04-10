
const AssessmentStep = ({ title, description, children }) => {
  return (
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-white mb-1">{title}</h2>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
      {children}
    </div>
  )
}

export default AssessmentStep