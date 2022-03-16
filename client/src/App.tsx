import React, { ReactElement, useEffect, useState } from 'react';
import { Layout, Typography, Form, Checkbox, Radio, Button, Space } from 'antd';
const { Title } = Typography

interface Ingredient {
  id: number,
  name: string,
  added: boolean
}


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

  return (
    <div className='App'>
      <Layout style={{ minHeight: '100vh' }}>
        <Title>Burrito Maker 1000</Title>
        {!makingBurrito && (<Button onClick={() => setMakingBurrito(!makingBurrito)}>Create Burrito!</Button>)}
        {makingBurrito && (
          <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
        )}
        {makingBurrito && (
          <Button onClick={() => setMakingBurrito(!makingBurrito)}>done with Burrito!</Button>
        )} 
      </Layout>

    </div>
  );
}

const Ingredients = (props: any): ReactElement => {


  function addItem(e: number) {
    props.setIngredients( props.ingredients.map((item: Ingredient) => {
      if (item.id === e){
        return Object.assign({}, item, {
          id: item.id,
          name: item.name,
          added: true
        })
      }
      else {
        return item
      }
    }))
  }

  function removeItem(e: number) {
    props.setIngredients( props.ingredients.map((item: Ingredient) => {
      if (item.id === e){
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
  
  return (
    <>
      {
        props.ingredients.map((item: Ingredient): ReactElement =>
        (
          <div className='ingredient' key={item.id}>
            <Title level={4}>{item.name}</Title>
            <Space size={'small'}>
              <Button disabled={item.added} onClick={() => addItem(item.id)} type={'primary'}>add</Button>
              <Button disabled={!item.added} onClick={() => removeItem(item.id)} type={'dashed'}>delete</Button>
            </Space>

          </div>
        )
        )
      }
    </>
  )

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
