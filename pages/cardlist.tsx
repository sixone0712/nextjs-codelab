import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Card from '../components/Card';
import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const fileInputReference = useRef(null);
  const imagePreviewReference = useRef(null);
  const [file, setFile] = useState(null);

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

  useEffect(() => {
    if (file) {
      const preview = imagePreviewReference.current;
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const onChageInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputValue({ ...inputVal, [name]: value });
    },
    [inputVal]
  );

  const onLButtonClick = (
    e: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedCard(index);
    // router
    //   .push({
    //     pathname: '/card_detail',
    //     query: {
    //       id: index
    //     }
    //   })
    //   .then(() => window.scrollTo(0, 0));

    //page주소는 /card_detail이지만, server에서 detail로 변경해줌.
    //router.push(`/card_detail?id=${index}`).then(() => window.scrollTo(0, 0));
    router.push(`/detail/${index}`).then(() => window.scrollTo(0, 0));
  };

  const onRButtonClick = (
    e: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
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
      // 서버에서 응답은 오지만 데이터에는 반영 안됨
      // 예제로 작성함..
      axios({
        url: `https://jsonplaceholder.typicode.com/users/${selectedCard}`,
        method: 'put',
        data: {
          name: inputVal.name,
          email: inputVal.email,
          website: inputVal.website
        }
      })
        .then(res => {
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
        })
        .catch(err => console.error(err));
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

    console.log(newValue);

    // 서버에서 응답은 오지만 데이터에는 반영 안됨
    // 예제로 작성함..
    axios({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'post',
      data: newValue
    })
      .then(res => {
        setCardList(cardList.concat(newValue));
      })
      .catch(err => console.error(err));
    setSelectedCard(0);
    setInputValue({ name: '', email: '', website: '' });
  };

  const onDeleteCard = () => {
    if (selectedCard) {
      axios({
        url: `https://jsonplaceholder.typicode.com/users/${selectedCard}`,
        method: 'delete'
      })
        .then(res =>
          setCardList(cardList.filter(list => list.id !== selectedCard))
        )
        .catch(err => console.error(err));
    }
    setSelectedCard(0);
    setInputValue({ name: '', email: '', website: '' });
  };

  const onAddImage = () => {
    fileInputReference.current?.click();
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
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
        <button className={'btn-black'} onClick={onAddImage}>
          이미지 추가
        </button>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputReference}
          onChange={onChangeImage}
        />
        {file && <img ref={imagePreviewReference} />}
        <div className={'card-list'}>
          {cardList.map((list, idx) => (
            <Card
              {...list}
              key={idx}
              onLButtonClick={onLButtonClick}
              onRButtonClick={onRButtonClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardListPage;
