import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { Subscription } from '../store/types';
export const getSubscriptions = async () => {
  const user = auth.currentUser;
  if (user) {
    return (await getDocs(collection(db, 'users', user.uid, 'subscriptions')).then(
      (querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      }
    )) as Array<Subscription>;
  }
};
