import { ReactElement } from "react"
import { Ingredient } from "../models/Ingredient"
import { Typography, Button } from "antd"

const { Title } = Typography

export const Ingredients = (props: any): ReactElement => {


    function addItem(e: number) {
        props.setIngredients(props.ingredients.map((item: Ingredient) => {
            if (item.id === e) {
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
        props.setIngredients(props.ingredients.map((item: Ingredient) => {
            if (item.id === e) {
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
                    <div className='ingredient' key={item.id} style={{ textAlign: 'right' }}>

                        <Title level={4} style={{ marginRight: '1.4rem', float: 'left' }}>{item.name}</Title>
                        <div style={{ float: 'right' }}>
                            <Button
                                disabled={item.added}
                                onClick={() => addItem(item.id)}
                                type={'primary'}
                            >+
                            </Button>
                            <Button
                                disabled={!item.added}
                                onClick={() => removeItem(item.id)}
                                danger
                            >&#8212;
                            </Button>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                )
                )
            }
        </>
    )

}
