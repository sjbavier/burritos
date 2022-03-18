import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Space, Alert, Spin } from 'antd';
import { Burrito } from './components/Burrito';
import { Ingredients } from './components/Ingredients';
import { Ingredient, IngredientResponse } from './models/Ingredient';
import { client } from './lib/client';


const { Title } = Typography


function App() {
  const [makingBurrito, setMakingBurrito] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const addedIngredients: Ingredient[] = ingredients.filter((item: Ingredient) => item.added === true)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    setErr('')

    client.fetchMe<IngredientResponse>('GET', '/api/v1/ingredients')
      .then((data) => mounted ? setIngredients(data.data) : null)
      .catch(err => setErr(client.prettyError(err)))
      .finally(() => setIsLoading(false))

    return () => {
      mounted = false
    } // prevent memory leak

  }, []) // only run once


  function resetBurrito(): void {
    setMakingBurrito(!makingBurrito)
    setErr('')
    setMsg('')
    // create new object instead of mutation
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

  function submitBurrito(): void {
    if (!isSubmitting) { // prevent resubmitting
      setIsSubmitting(true)
      setMsg('')
      client.fetchMe<{ message: string }>('POST', '/api/v1/burrito', addedIngredients)
        .then((response) => {
          setErr('')
          setMsg(response.message)
        })
        .catch(err => setErr(client.prettyError(err)))
        .finally(() => setIsSubmitting(false))
    }
  }

  return (
    <div className='App'>
      <Layout className='layout_wrapper'>
        <div className='img_layer' />

        <Title style={{ textAlign: 'center', marginTop: '2rem' }}>Burrito Maker 3000</Title>

        <div className='flex_wrapper' >
          {!makingBurrito && (
            <button className='btn_launch_burrito' onClick={() => setMakingBurrito(!makingBurrito)}>Create Burrito!</button>
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
            <Burrito addedIngredients={addedIngredients} />
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

        <Space direction={'vertical'}>
        </Space>
        <Space direction={'vertical'}>
          {msg && (<Alert message={msg} type="success" />)}
          {err && (<Alert message={err} type="error" />)}
          {isLoading && (
            <Spin tip="Loading...">
              <Alert
                description="Module is loading"
                type="info"
              />
            </Spin>
          )}
          {isSubmitting && (
            <Spin tip="Making Burritos!">
              <Alert
                description="Sending burrito info"
                type="info"
              />
            </Spin>
          )}
        </Space>

      </Layout>
    </div>
  );
}


export default App;
