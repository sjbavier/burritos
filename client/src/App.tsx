import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { Burrito } from './components/Burrito';
import { Ingredients } from './components/Ingredients';
import { Ingredient } from './models/Ingredient';


const { Title } = Typography


function App() {
  const [makingBurrito, setMakingBurrito] = useState(false)
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'refried beans', added: false },
    { id: 2, name: 'blackbeans', added: false },
    { id: 3, name: 'cheese', added: false },
    { id: 4, name: 'rice', added: false },
    { id: 5, name: 'chili peppers', added: false },
    { id: 6, name: 'tomatoes', added: false },
    { id: 7, name: 'salsa', added: false },
    { id: 8, name: 'onion', added: false },
    { id: 9, name: 'sour cream', added: false }
  ])

  function resetBurrito(): void {
    setMakingBurrito(!makingBurrito)
    setIngredients(ingredients.map((item: Ingredient) => {
      if (item.added === true) {
        return Object.assign({}, item, {
          id: item.id,
          name: item.name,
          added: false
        })
      }
      else {
        return item
      }
    }))
  }

  function submitBurrito() {

  }

  return (
    <div className='App'>
      <Layout className='layout_wrapper'>
        <div className='img_layer'/>
        <Title style={{ textAlign: 'center', marginTop: '2rem' }}>Burrito Maker 3000</Title>
        <div className='flex_wrapper' >
          {!makingBurrito && (
            <Button onClick={() => setMakingBurrito(!makingBurrito)}>Create Burrito!</Button>
          )}
        </div>
        <div className='flex_wrapper' >
          {makingBurrito && (
            <div className='ingredient_wrapper'>
              <Space size={'middle'} direction='vertical'>
                <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
              </Space>
            </div>
          )}
          {makingBurrito && (
            <Burrito ingredients={ingredients} />
          )}
        </div>
        <div className='flex_wrapper' >
          {makingBurrito && (
            <Space>
              <Button onClick={submitBurrito} style={{ marginTop: '2rem' }} type={'primary'}>Make my burrito!</Button>
              <Button onClick={resetBurrito} danger style={{ marginTop: '2rem' }} type={'primary'}>Cancel my burrito!</Button>
            </Space>
          )}
        </div>

      </Layout>

    </div>
  );
}




function Hello() {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    fetch('/heading')
      .then((x) => {
        console.log({ x });
        return x.json();
      })
      .then((x) => {
        console.log({ x });
        return setMessage(x.burritos);
      });
  }, [setMessage]);

  return <div>Burritos. {message}</div>;
}

export default App;
