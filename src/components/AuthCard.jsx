export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-[#111] border border-[#1f1f1f] rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent mb-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
