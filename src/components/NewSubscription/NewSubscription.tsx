import { collection, addDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useState, useEffect, useRef } from 'react';
import classes from './NewSubscription.module.css';
import { DatePick } from '../DatePicker/DatePicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  validationSubscriptionSchema,
  currenciesOptions,
  paymentFrequencyOptions,
} from '../utils/validationSubscriptionSchema';
import { NotificationAdd } from '../Notifications/NotificationAdd';
import { validTypes } from '../utils/validTypesImages';

export const NewSubscription = () => {
  const windowWidth = useRef(window.innerWidth);
  const uploadText = windowWidth.current < 568 ? 'Upload' : 'Click to Upload';

  const handleSubmit = async (values, resetForm) => {
    setLoading(true);
    setDisabledSubmit(true);
    const user = auth.currentUser;
    if (user && values.date) {
      const { name, price, currency, paymentFrequency, date } = values;
      const creationTime = new Date().getTime();
      try {
        await addDoc(collection(db, 'users', user.uid, 'subscriptions'), {
          name,
          price: parseFloat(price),
          date,
          currency,
          paymentFrequency,
          creationTime,
          imageUrl,
          status: true,
        });
      } catch (e) {
        setDisabledSubmit(false);
        console.error('Error adding subscription: ', e);
      }
      setLoading(false);
      setSubscriptionAdded(true);
      setFile(null);
      setDisabledSubmit(false);
      setDisabledImageIChanges(false);
      setProgress('Choose an image');
      resetForm();
    }
  };
  const [disabledImageChanges, setDisabledImageIChanges] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState('Choose an image');
  const [imageUrl, setImageUrl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [subscriptionAdded, setSubscriptionAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
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
      return;
    } else if (!validTypes.includes(file.type.split('/')[1])) {
      setDisabledImageIChanges(false);
      setDisabledSubmit(false);
      setProgress('Invalid format');
      setFile(null);
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
          setProgress('Uploaded image');
          setDisabledSubmit(false);
        });
      }
    );
  };

  const initialValues = {
    name: '',
    price: '',
    currency: '',
    paymentFrequency: '',
    date: null,
    dayjs: null,
  };

  const renderError = (message: string) => <p className={classes.error}>{message}</p>;
  const disabledInput = disabledImageChanges ? classes.inActiveUpload : classes.activeUpload;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSubscriptionSchema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ values, setFieldValue, resetForm }) => (
        <section className={classes.container}>
          <h2 className={classes.header}>New Subscription</h2>
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
                    (imageUrl ? (
                      <div className={classes.imageContainer}>
                        {progress} <img src={preview} className={classes.image} alt='preview' />
                      </div>
                    ) : (
                      progress
                    ))}
                </div>
              </label>
              <button
                type='button'
                onClick={uploadImage}
                className={classes.buttonUpload}
                disabled={disabledImageChanges}
              >
                {uploadText}
              </button>
            </div>
            <button
              name='button'
              type='submit'
              className={classes.buttonSubmit}
              disabled={disabledSubmit}
            >
              {loading ? (
                <div className={classes.loaderContainer}>
                  Loading...
                  <div className={classes.loader}></div>
                </div>
              ) : (
                'Add new subscription'
              )}
            </button>
            <button type='reset' className={classes.clearButton} onClick={() => resetForm()}>
              <span>Clear all fields</span>
            </button>
            <NotificationAdd
              subscriptionAdded={subscriptionAdded}
              setSubscriptionAdded={setSubscriptionAdded}
            />
          </Form>
        </section>
      )}
    </Formik>
  );
};
