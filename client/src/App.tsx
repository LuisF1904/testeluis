import { useEffect, useState } from 'react';
import './App.css';

// Definição da interface para os dados de viaturas
interface Viatura {
  ID: number;
  Marca: string;
  Tipo: string;
  Nomenclatura: string;
  Imagem?: string; // Opcional
}

function App() {
  const [viaturas, setViaturas] = useState<Viatura[]>([]); // Estado para armazenar os dados das viaturas
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros

  // Função para buscar viaturas do backend
  const fetchViaturas = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/viaturas'); // URL corrigida
      if (!response.ok) {
        throw new Error(`Erro ao buscar viaturas: ${response.statusText}`);
      }

      const data: Viatura[] = await response.json();
      setViaturas(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro desconhecido ao buscar as viaturas.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Executa a requisição ao carregar a página
  useEffect(() => {
    fetchViaturas();
  }, []);

  return (
    <div className="App">
      <h1>Listagem de Viaturas</h1>

      {/* Exibir mensagem de carregamento */}
      {loading && <p>Carregando...</p>}

      {/* Exibir erro, se houver */}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      {/* Verifica se há dados e renderiza a tabela */}
      {!loading && !error && viaturas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Nomenclatura</th>
              <th>Imagem</th>
            </tr>
          </thead>
          <tbody>
            {viaturas.map((viatura) => (
              <tr key={viatura.ID}>
                <td>{viatura.ID}</td> {/* Corrigido: Exibir o ID corretamente */}
                <td>{viatura.Marca}</td>
                <td>{viatura.Tipo}</td>
                <td>{viatura.Nomenclatura}</td>
                <td>
                  {viatura.Imagem ? (
                    <img
                      src={viatura.Imagem}
                      alt={`Imagem de ${viatura.Marca}`}
                      width="100"
                    />
                  ) : (
                    'Sem imagem'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>Nenhuma viatura encontrada.</p>
      )}
    </div>
  );
}

export default App;
