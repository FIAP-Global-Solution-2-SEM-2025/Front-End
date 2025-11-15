// src/components/rh/VagaCard.tsx - VERSÃO COM TAGS FORTES
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
    <Card hover={true} className="mb-4 card-differential">
      <CardContent className="p-6">
        {/* Cabeçalho com título e ações */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
              {vaga.titulo}
            </h3>
            <div className="flex items-center mt-1 text-sm opacity-80">
              <span className="font-medium">{vaga.empresa}</span>
              <span className="mx-2">•</span>
              <span>📍 {vaga.localizacao}</span>
            </div>
          </div>
          
          {/* Salário (se existir) */}
          {vaga.salario && (
            <div className="text-right ml-4">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                R$ {vaga.salario.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm opacity-70">mensal</p>
            </div>
          )}
        </div>

        {/* Tags e badges - AGORA COM CORES FORTES NO LIGHT MODE */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="tag-blue text-xs font-medium px-3 py-1 rounded-full">
            {vaga.tipo}
          </span>
          <span className="tag-green text-xs font-medium px-3 py-1 rounded-full">
            {vaga.nivel}
          </span>
          <span className="tag-purple text-xs font-medium px-3 py-1 rounded-full">
            💼 {vaga.requisitos.length} requisitos
          </span>
          <span className="tag-orange text-xs font-medium px-3 py-1 rounded-full">
            ⚡ Ativa
          </span>
        </div>

        {/* Descrição resumida */}
        <p className="opacity-90 mb-4 line-clamp-2">
          {vaga.descricao}
        </p>

        {/* Requisitos principais */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 opacity-90">
            Requisitos Principais:
          </h4>
          <div className="flex flex-wrap gap-2">
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

        {/* Rodapé com ações e metadata */}
        <div className="flex justify-between items-center pt-4 border-t border-opacity-20">
          {/* Metadata */}
          <div className="flex items-center text-sm opacity-70">
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
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Candidatar-se
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}