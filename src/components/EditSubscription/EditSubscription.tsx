import { DatePick } from '../DatePicker/DatePicker';
import cancel from '../../assets/cancel.png';
import { useAppSelector, useAppDispatch } from '../../hooks/ReduxHooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
import { Spinner } from '../Spinner/Spinner';
import { validTypes } from '../utils/valitTypesImages';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { db, auth, storage } from '../../firebase';
import classes from './EditSubscription.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  validationSchema,
  currenciesOptions,
  paymentFrequencyOptions,
} from '../utils/validationSchema';
import { useState } from 'react';
import { NotificationDelete } from '../Notifications/NotificationDelete';
import { NotificationEdit } from '../Notifications/NotificationEdit';
import { AlertDeleteSubscription } from '../AlertDeleteSubscription/AlertDeleteSubscription';
export const EditSubscription = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { subscriptionId } = useParams();
  const { fetchedSubscriptions, loading } = useAppSelector((state) => state.subscriptionsList);

  const subscription = fetchedSubscriptions.find((el) => el.id === subscriptionId);

  useEffect(() => {
    dispatch(fetchSubscriptionsList());
    setImageUrl(subscription?.imageUrl);
  }, [fetchedSubscriptions.length]);

  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [disabledDelete, setDisabledDelete] = useState(false);
  const [disabledImageChanges, setDisabledImageIChanges] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState('Choose new image');
  const [imageUrl, setImageUrl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [subscriptionDelete, setSubscriptionDelete] = useState(false);
  const [subscriptionEdit, setSubscriptionEdit] = useState(false);
  const [deleteSubscription, setDeleteSubscription] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }, [file]);

  const handleChange = (ev) => {
    setFile(ev.target.files[0]);
  };

  const uploadImage = () => {
    setDisabledImageIChanges(true);
    setDisabledSubmit(true);
    if (!file) {
      setDisabledImageIChanges(false);
      setDisabledSubmit(false);
      setProgress('Image is missing');
      setImageUrl(null);
      return;
    } else if (!validTypes.includes(file.type.split('/')[1])) {
      setDisabledImageIChanges(false);
      setDisabledSubmit(false);
      setProgress('Invalid format');
      setFile(null);
      setImageUrl(null);
      return;
    }
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        progress === 100 ? setProgress('Upload is almost done') : setProgress('Uploading...');
        setFile(null);
      },
      (error) => {
        console.log(error);
        setDisabledImageIChanges(false);
        setDisabledSubmit(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setProgress('Image has been uploaded');
          setDisabledSubmit(false);
        });
      }
    );
  };

  useEffect(() => {
    if (deleteSubscription) {
      handleDeleteSubscription();
    }
  }, [deleteSubscription]);

  const handleClickDelete = () => {
    setOpenAlert(true);
  };

  const handleDeleteSubscription = async () => {
    setDisabledSubmit(true);
    const user = auth.currentUser;
    if (user && subscriptionId) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'subscriptions', subscriptionId));
        setSubscriptionDelete(true);
        setTimeout(() => {
          navigate('/active-subscriptions');
        }, 1000);
      } catch (e) {
        console.error('Error delete subscription: ', e);
      }
    }
  };

  const handleSubmit = async (values) => {
    setLoadingEdit(true);
    setDisabledDelete(true);
    setDisabledSubmit(true);
    const user = auth.currentUser;
    if (user && values.date) {
      const { name, price, currency, paymentFrequency, date, id } = values;
      try {
        await setDoc(
          doc(db, 'users', user.uid, 'subscriptions', id),
          {
            name,
            price: parseFloat(price),
            date,
            currency,
            paymentFrequency,
            imageUrl,
          },
          { merge: true }
        );
      } catch (e) {
        console.error('Error edit subscription: ', e);
      }
      setLoadingEdit(false);
      setSubscriptionEdit(true);
      setTimeout(() => {
        navigate('/active-subscriptions');
      }, 1000);
    }
  };

  const renderError = (message: string) => <p className={classes.error}>{message}</p>;
  const disabledInput = disabledImageChanges ? classes.inActiveUpload : classes.activeUpload;

  if (loading === 'pending') return <Spinner />;
  if (loading === 'failed') return <h2>Sorry, something went wrong, but we fix it</h2>;

  const initialValues = {
    name: '',
    price: '',
    currency: '',
    paymentFrequency: '',
    date: null,
    id: null,
  };

  return (
    <Formik
      initialValues={subscription ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue }) => (
        <section className={classes.container}>
          <h2 className={classes.header}>Edit your subscription</h2>
          <Form className={classes.form}>
            <div className={classes.field}>
              <label htmlFor='name'>Name</label>
              <Field
                className={classes.input}
                type='text'
                name='name'
                id='name'
                placeholder='Spotify'
              />
              <ErrorMessage name='name' render={renderError} />
            </div>
            <div className={classes.field}>
              <label htmlFor='price'>Price</label>
              <Field
                className={classes.input}
                type='text'
                name='price'
                id='price'
                placeholder='200'
              />
              <ErrorMessage name='price' render={renderError} />
            </div>
            <div className={classes.field}>
              <label htmlFor='datePicker'>Next payment</label>
              <DatePick setFieldValue={setFieldValue} values={values} />
            </div>
            <div className={classes.field}>
              <label htmlFor='currency'>Currency</label>
              <Field
                className={classes.input}
                type='text'
                as='select'
                name='currency'
                id='currency'
              >
                <option value={''}>Select currency</option>
                {currenciesOptions}
              </Field>

              <ErrorMessage name='currency' render={renderError} />
            </div>
            <div className={classes.field}>
              <label htmlFor='paymentFrequency'>Payment frequency</label>
              <Field
                className={classes.input}
                as='select'
                id='frequepaymentFrequencyncy'
                name='paymentFrequency'
              >
                <option value={''}>Select frequency</option>
                {paymentFrequencyOptions}
              </Field>
              <ErrorMessage name='paymentFrequency' render={renderError} />
            </div>
            <div className={classes.upload}>
              <label className={disabledInput} htmlFor='file'>
                <input
                  type='file'
                  id='file'
                  accept='image/*'
                  className={classes.inputImage}
                  onChange={handleChange}
                  name='file'
                  disabled={disabledImageChanges}
                />
                <div className={classes.text}>
                  {(file?.name && (
                    <div className={classes.imageContainer}>
                      <div>Preview</div>
                      <img src={preview} className={classes.image} alt='preview' />
                    </div>
                  )) ??
                    progress}
                </div>
              </label>
              <button
                type='button'
                onClick={uploadImage}
                className={classes.buttonUpload}
                disabled={disabledImageChanges}
              >
                Upload
              </button>
            </div>
            <button
              name='button'
              type='submit'
              className={classes.buttonSubmit}
              disabled={disabledSubmit}
            >
              {loadingEdit ? (
                <div className={classes.loaderContainer}>
                  Loading...
                  <div className={classes.loader}></div>
                </div>
              ) : (
                'Edit Your Subscription'
              )}
            </button>
            <button
              type='reset'
              className={classes.deleteSubscription}
              onClick={handleClickDelete}
              disabled={disabledSubmit}
            >
              <img src={cancel} alt='cancel' className={classes.cancel} />
              Cancel Subscription
            </button>
            <AlertDeleteSubscription
              openAlert={openAlert}
              setOpenAlert={setOpenAlert}
              setDeleteSubscription={setDeleteSubscription}
            />
            <NotificationDelete
              subscriptionDelete={subscriptionDelete}
              setSubscriptionDelete={setSubscriptionDelete}
            />
            <NotificationEdit
              subscriptionEdit={subscriptionEdit}
              setSubscriptionEdit={setSubscriptionEdit}
            />
          </Form>
        </section>
      )}
    </Formik>
  );
};
