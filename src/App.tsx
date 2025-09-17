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

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nome = formData.get('nome') as string;
    const preco = parseFloat(formData.get('preco') as string);
    const urlfoto = formData.get('urlfoto') as string;
    const descricao = formData.get('descricao') as string;

    // Send POST request to add new product
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, preco, urlfoto, descricao })
    });

    if (response.ok) {
      // Refresh product list
      const newProduto = await response.json();
      setProdutos(prev => [...prev, newProduto]);
      form.reset();
    } else {
      alert('Erro ao cadastrar produto');
    }
  }

  return(
    <>
     <div>Cadastro de Produtos</div>
     <form onSubmit={handleForm}>
      <input type="text" name="nome" placeholder="Nome" />
      <input type="number" name="preco" placeholder="Preço" />
      <input type="text" name="urlfoto" placeholder="Url da Foto" />
      <input type="text" name="descricao" placeholder="Descrição" />
      <button type="submit">Cadastrar</button>

     </form>
    <div> Lista de Produtos </div>
      {produtos.map(produto => (
        <div key={produto._id}>
          <h2>{produto.nome}</h2>
          <p>Preço: {produto.preco}</p>
          <img src={produto.urlfoto} alt={produto.nome} />
          <p>{produto.descricao}</p>
        </div>
      ))}

    </>
  )
}

export default App
