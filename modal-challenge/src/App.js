import './App.css';
import Modal from './components/Modal';
import { useState } from 'react';
import List from './components/List';
import NewGoodForm from './components/NewGoodForm';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [goods, setGoods] = useState([
    { title: 'god damn!', price: '45€', id: 1, date: '2022-09-18' },
    { title: 'jesus christ!', price: '12€', id: 2, date: '1978-07-10' },
    { title: 'holy crap!', price: '23€', id: 3, date: '2006-08-11' }
  ]);

  const addGood = (good) => {
    setGoods((prevGoods) => {
      return [...prevGoods, good]
    })
    setShowModal(false)
  }

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  }

  const deleteGood = (id) => {
    setGoods((prevState) => {
      return prevState.filter(good => {
        return id !== good.id
      })
    })
  }

  console.log('App rendered');

  return (
    <div className="App">
      <h1>This is a modal challenge</h1>
      <button onClick={toggleModal}>Add more goods!</button>
      <List list={goods} deleteGood={deleteGood} />
      {showModal && (
        <Modal handleClose={toggleModal}>
          <h2>Add goods</h2>
          <NewGoodForm addGood={addGood} />
        </Modal>
      )}
    </div>
  );
}

export default App;
