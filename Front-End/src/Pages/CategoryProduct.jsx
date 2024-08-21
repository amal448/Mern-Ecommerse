import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const params=useParams()
    console.log(params.category);
  return (
    <div>{params.category}</div>
  )
}

export default CategoryProduct