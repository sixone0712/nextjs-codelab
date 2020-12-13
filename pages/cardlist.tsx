import { ChangeEvent, useEffect, useState } from 'react';
import Card from '../components/Card';

interface InputValue {
  name: string;
  job: string;
}

const CardListPage = () => {
  const [inputVal, setInputValue] = useState<InputValue>({ name: '', job: '' });
  const [selectedCard, setSelectedCard] = useState(0);
  const [cardList, setCardList] = useState([
    {
      idx: 1,
      name: '박찬호',
      job: '프로그래머'
    },
    {
      idx: 2,
      name: '박찬호2',
      job: '프로그래머'
    },
    {
      idx: 3,
      name: '박찬호3',
      job: '프로그래머'
    },
    {
      idx: 4,
      name: '박찬호4',
      job: '프로그래머'
    }
  ]);

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  const onChageInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputVal, [name]: value });
  };

  const onButtonClick = index => {
    setSelectedCard(index);
    const find = cardList.find(list => list.idx === index);
    setInputValue({ name: find.name, job: find.job });
  };

  const onEditCard = () => {
    if (selectedCard) {
      setCardList(
        cardList.map(list => {
          if (list.idx === selectedCard) {
            return {
              ...list,
              name: inputVal.name,
              job: inputVal.job
            };
          }
          return list;
        })
      );
    } else {
      alert('Please select a card!');
    }
    setSelectedCard(0);
    setInputValue({ name: '', job: '' });
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
      idx: cardList[cardList.length - 1].idx + 1,
      name: inputVal.name,
      job: inputVal.job
    };
    setCardList(cardList.concat(newValue));
    setSelectedCard(0);
    setInputValue({ name: '', job: '' });
  };
  const onDeleteCard = () => {
    if (selectedCard) {
      setCardList(cardList.filter(list => list.idx !== selectedCard));
    }
    setSelectedCard(0);
    setInputValue({ name: '', job: '' });
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
          name={'job'}
          value={inputVal.job}
          onChange={onChageInputValue}
          placeholder={'직업'}
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
            <Card {...list} key={list.idx} onBtnClick={onButtonClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardListPage;
