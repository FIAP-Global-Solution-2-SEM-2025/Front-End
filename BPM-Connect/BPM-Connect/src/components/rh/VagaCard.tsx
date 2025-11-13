// src/components/rh/VagaCard.tsx
import { Vaga } from '../../types/rh'
import { Card, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'

interface VagaCardProps {
  vaga: Vaga
  onCandidatar?: (vagaId: string) => void
  onVerDetalhes?: (vagaId: string) => void
}

export const VagaCard = ({ 
  vaga, 
  onCandidatar,
  onVerDetalhes 
}: VagaCardProps) => {
  const handleCandidatar = () => {
    onCandidatar?.(vaga.id)
  }

  const handleVerDetalhes = () => {
    onVerDetalhes?.(vaga.id)
  }

  return (
    <Card hover={true} className="mb-4 transition-all duration-200">
      <CardContent className="p-6">
        {/* Cabeçalho com título e ações */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
              {vaga.titulo}
            </h3>
            <div className="flex items-center mt-1 text-gray-600">
              <span className="font-medium">{vaga.empresa}</span>
              <span className="mx-2">•</span>
              <span>📍 {vaga.localizacao}</span>
            </div>
          </div>
          
          {/* Salário (se existir) */}
          {vaga.salario && (
            <div className="text-right ml-4">
              <p className="text-lg font-bold text-green-600">
                R$ {vaga.salario.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-gray-500">mensal</p>
            </div>
          )}
        </div>

        {/* Tags e badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            {vaga.tipo}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            {vaga.nivel}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
            💼 {vaga.requisitos.length} requisitos
          </span>
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
            ⚡ Ativa
          </span>
        </div>

        {/* Descrição resumida */}
        <p className="text-gray-700 mb-4 line-clamp-2">
          {vaga.descricao}
        </p>

        {/* Requisitos principais */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Requisitos Principais:</h4>
          <div className="flex flex-wrap gap-2">
            {vaga.requisitos.slice(0, 3).map((requisito, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {requisito}
              </span>
            ))}
            {vaga.requisitos.length > 3 && (
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                +{vaga.requisitos.length - 3} mais
              </span>
            )}
          </div>
        </div>

        {/* Rodapé com ações e metadata */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {/* Metadata */}
          <div className="flex items-center text-sm text-gray-500">
            <span>🕒 Publicada há 2 dias</span>
            <span className="mx-2">•</span>
            <span>👥 15 candidaturas</span>
          </div>

          {/* Ações */}
          <div className="flex space-x-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleVerDetalhes}
              className="px-4"
            >
              Ver Detalhes
            </Button>
            <Button 
              size="sm"
              onClick={handleCandidatar}
              className="px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Candidatar-se
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}