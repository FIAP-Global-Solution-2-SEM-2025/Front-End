import { Vaga } from '../../types/rh'
import { Button } from '../ui/Button'
import { Card } from '../ui/card'

interface VagaCardProps {
  vaga: Vaga
}

export const VagaCard = ({ vaga }: VagaCardProps) => {
  return (
    <Card hover={true}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{vaga.titulo}</h3>
          <p className="text-gray-600 mt-1">{vaga.empresa} • {vaga.localizacao}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {vaga.tipo}
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {vaga.nivel}
            </span>
            {vaga.salario && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                R$ {vaga.salario.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <Button size="sm">Candidatar</Button>
      </div>
    </Card>
  )
}