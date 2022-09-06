import React from 'react'

export default function GoodsList({ list, deleteGood }) {

  const goodsList = list.map((good) => (
    <div className="good" key={good.id}>
      <h2 className="title">{good.title}</h2>
      <h4 className="date">{good.date}</h4>
      {good.location && <p className="location">{good.location}</p>}
      <p className="price">{good.price}</p>
      <button onClick={() => deleteGood(good.id)}>Delete me</button>
    </div>
  ));

  return (
    <div>
      {goodsList}
    </div>
  )
}
