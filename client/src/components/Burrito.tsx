import { ReactElement } from "react"
import { List, Typography } from "antd"
import { Ingredient } from "../models/Ingredient"

const { Title } = Typography


export const Burrito = (props: any): ReactElement => {

    const addedIngredients: Ingredient[] = props.addedIngredients
    return (
        <div className='burrito_wrapper'>

            <List
                header={<Title level={3}>Your Burrito</Title>}
                bordered
                dataSource={addedIngredients}
                renderItem={item => (
                    <List.Item>
                        {item.name}
                    </List.Item>
                )}
            >

            </List>

        </div>
    )
}

