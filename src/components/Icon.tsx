import React from "react";

export default (props:any)=>{
    const {name} = props

    try{
        const Icon = require(`./icons/${name}`).default
        return (<div><Icon {...props}/></div>)
    }catch{
        return <></>
    }
}