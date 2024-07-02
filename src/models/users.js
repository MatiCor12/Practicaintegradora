import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

//Nombre de la nueva coleccion

const nameCollection = 'User'

const UserSchema = new Schema ({
    name: { type: String, required: [true, 'Name is required']},
    lastName: { type: String},
    email: { type: String, required: [true, 'Email is mandatory'], unique: true},
    age: { type:Number },
    password: { type: String, required: [true, 'Password is required']},
    rol: { type: String, default: 'user', enum:['user', 'admin']},
    status: { type: Boolean, default: true},
    image: {type: String},
    github: {type: Boolean, default: false},
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}
})

UserSchema.set('toJSON',{
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
})

export const userModel= model(nameCollection, UserSchema)