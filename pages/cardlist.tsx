import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import Card from '../components/Card';

interface InputValue {
  name: string;
  email: string;
  website: string;
}

const CardListPage = () => {
  const [inputVal, setInputValue] = useState<InputValue>({
    name: '',
    email: '',
    website: ''
  });
  const [selectedCard, setSelectedCard] = useState(0);
  const [cardList, setCardList] = useState([]);

  const getPostDataByJson = () => {
    axios({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'get'
    })
      .then(res => setCardList(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getPostDataByJson();
  }, []);

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  const onChageInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputVal, [name]: value });
  };

  const onButtonClick = index => {
    setSelectedCard(index);
    const find = cardList.find(list => list.id === index);
    setInputValue({
      name: find.name,
      email: find.email,
      website: find.website
    });
  };

  const onEditCard = () => {
    if (selectedCard) {
      setCardList(
        cardList.map(list => {
          if (list.id === selectedCard) {
            return {
              ...list,
              name: inputVal.name,
              email: inputVal.email,
              website: inputVal.website
            };
          }
          return list;
        })
      );
    } else {
      alert('Please select a card!');
    }
    setSelectedCard(0);
    setInputValue({ name: '', email: '', website: '' });
  };

  const onAddCard = () => {
    // setCardList([
    //   ...cardList,
    //   {
    //     idx: cardList[cardList.length - 1].idx + 1,
    //     name: inputVal.name,
    //     job: inputVal.job
    //   }
    // ]);
    const newValue = {
      idx: cardList[cardList.length - 1].id + 1,
      name: inputVal.name,
      email: inputVal.email,
      website: inputVal.website
    };
    setCardList(cardList.concat(newValue));
    setSelectedCard(0);
    setInputValue({ name: '', email: '', website: '' });
  };
  const onDeleteCard = () => {
    if (selectedCard) {
      setCardList(cardList.filter(list => list.id !== selectedCard));
    }
    setSelectedCard(0);
    setInputValue({ name: '', email: '', website: '' });
  };

  return (
    <section className="card-list-container">
      <div className="card-list-container wrapper">
        <input
          type="text"
          className={'search-input'}
          name={'name'}
          value={inputVal.name}
          onChange={onChageInputValue}
          placeholder={'이름'}
        />
        <input
          type="text"
          className={'search-input'}
          name={'email'}
          value={inputVal.email}
          onChange={onChageInputValue}
          placeholder={'이메일'}
        />
        <input
          type="text"
          className={'search-input'}
          name={'website'}
          value={inputVal.website}
          onChange={onChageInputValue}
          placeholder={'웹사이트'}
        />
        <button className={'btn-black'} onClick={onAddCard}>
          추가
        </button>
        <button className={'btn-black'} onClick={onEditCard}>
          수정
        </button>
        <button className={'btn-black'} onClick={onDeleteCard}>
          삭제
        </button>
        <div className={'card-list'}>
          {cardList.map(list => (
            <Card {...list} key={list.id} onBtnClick={onButtonClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardListPage;
