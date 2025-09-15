import { useEffect, useState } from 'react'
import './App.css'

type ProdutoType = {
  _id: string;
  nome: string;
  preco: number;
  urlfoto:string;
  descricao: string;
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  useEffect(() => {
    fetch('/api/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data));
  }, []);

  return(
    <>
    
    <div>
      {produtos.map(produto => (
        <div key={produto._id}>
          <h2>{produto.nome}</h2>
          <p>Preço: {produto.preco}</p>
          <img src={produto.urlfoto} alt={produto.nome} />
          <p>{produto.descricao}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default App
