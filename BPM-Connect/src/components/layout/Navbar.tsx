export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">BPM Connect RH</h1>
          </div>
          
          <div className="flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Início</a>
            <a href="/vagas" className="text-gray-700 hover:text-blue-600 font-medium">Vagas</a>
            <a href="/candidatos" className="text-gray-700 hover:text-blue-600 font-medium">Candidatos</a>
            <a href="/processos" className="text-gray-700 hover:text-blue-600 font-medium">Processos</a>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Entrar
          </button>
        </div>
      </div>
    </nav>
  )
}