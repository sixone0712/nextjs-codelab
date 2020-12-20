import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CardDetailPage = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    axios({
      url: `https://jsonplaceholder.typicode.com/users/${router.query.id}`,
      method: 'get'
    })
      .then(res => setCardData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {cardData && (
        <>
          <p>username: {cardData.username}</p>
          <p>name: {cardData.name}</p>
          <p>e-mail: {cardData.email}</p>
          <p>phone: {cardData.phone}</p>
          <p>website: {cardData.website}</p>
        </>
      )}
    </div>
  );
};

//query를 props에 주입해준다.
// CardDetailPage.getInitailProps = async context => {
//   const { query } = context;
//   return { query };
// };

export default CardDetailPage;
