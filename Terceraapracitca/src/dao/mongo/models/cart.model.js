import { Schema, SchemaType, model } from "mongoose";

//Nombre de la nueva coleccion

const nameCollection = 'Cart'

const CartSchema = new Schema ({
    products: [{
        _id:false,
        id:{
            type:Schema.Types.ObjectId,
            ref: 'Producto'
        },
        quantity:{
            type:Number,
            required:[true, 'The quantity of the product is mandatory']
        }
    }
    ]
})

export const cartModel = model(nameCollection, CartSchema)