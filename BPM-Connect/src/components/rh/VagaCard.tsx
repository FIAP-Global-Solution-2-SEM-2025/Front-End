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
    <Card hover={true} className="mb-4 card-consistent">
      <CardContent className="p-4 sm:p-6">
        {/* Cabeçalho com título e ações*/}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors line-clamp-2">
              {vaga.titulo}
            </h3>
            <div className="flex items-center mt-1 text-sm opacity-80 flex-wrap gap-1">
              <span className="font-medium">{vaga.empresa}</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span className="sm:ml-0">📍 {vaga.localizacao}</span>
            </div>
          </div>
          
          {/* Salário (se existir) */}
          {vaga.salario && (
            <div className="text-right">
              <p className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400">
                R$ {vaga.salario.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs sm:text-sm opacity-70">mensal</p>
            </div>
          )}
        </div>

        {/* Tags e badges*/}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          <span className="tag-blue text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
            {vaga.tipo}
          </span>
          <span className="tag-green text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
            {vaga.nivel}
          </span>
          <span className="tag-purple text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
            💼 {vaga.requisitos.length} req.
          </span>
          <span className="tag-orange text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
            ⚡ Ativa
          </span>
        </div>

        {/* Descrição resumida */}
        <p className="opacity-90 mb-4 line-clamp-2 text-sm sm:text-base">
          {vaga.descricao}
        </p>

        {/* Requisitos principais */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 opacity-90">
            Requisitos Principais:
          </h4>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {vaga.requisitos.slice(0, 3).map((requisito, index) => (
              <span 
                key={index}
                className="tag-gray text-xs px-2 py-1 rounded"
              >
                {requisito}
              </span>
            ))}
          </div>
        </div>

        {/* Rodapé com ações */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-opacity-20 gap-3">
          {/* Metadata */}
          <div className="flex items-center text-xs sm:text-sm opacity-70 flex-wrap gap-1">
            <span>🕒 2 dias</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span>👥 15 cand.</span>
          </div>

          {/* Ações - Botões lado a lado no mobile */}
          <div className="flex space-x-2 sm:space-x-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleVerDetalhes}
              className="px-3 sm:px-4 text-xs sm:text-sm"
            >
              Detalhes
            </Button>
            <Button 
              size="sm"
              onClick={handleCandidatar}
              className="px-4 sm:px-6 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Candidatar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}