import { mongoose } from 'mongoose';

const entrepreneurSchema = new mongoose.Schema({
    StartUp_Name:       {type: String, required: true},
    Problem_Statement:  {type: String, required: true},
    Founder_Name:       {type: String, required: true},
    Email_Id:           {type: String, required: true},
    Phone_Number:       {type: Number, required: true, minLength:10, maxLength:10},
    WhatHelpYouNeedFromiiit:  {type: String, required: false},
});

const Entrepreneur = mongoose.model("Entrepreneur", entrepreneurSchema);
export default Entrepreneur;
