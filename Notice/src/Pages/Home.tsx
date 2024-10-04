import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';

// Tipos para as notícias da API
interface Noticia {
  id: string;
  titulo: string;
  introducao: string;
  link: string;
}

const Home: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //Requisição de dados da API
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}`);
        setNoticias(response.data.items); // Atualiza o estado com as notícias
      } catch (error) {
        setError('Erro ao buscar as notícias');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="noticias-container">
      <h1>Notícias do IBGE</h1>
      <ul>
        {noticias.map((noticia) => (
          <li key={noticia.id}>
            <h2>{noticia.titulo}</h2>
            <p>{noticia.introducao}</p>
            <a href={noticia.link} target="_blank" rel="noopener noreferrer">
              Leia mais
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;