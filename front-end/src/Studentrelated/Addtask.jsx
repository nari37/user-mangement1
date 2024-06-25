import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  teacherName: Yup.string().required('Teacher name is required'),
  subject: Yup.string().required('Subject is required'),
  class: Yup.string().required('Class is required'),
  description: Yup.string().required('Description is required'),
  file: Yup.mixed().required('File is required'),
});

export default function AddTask() {
  const initialValues = {
    teacherName: '',
    subject: '',
    class: '',
    description: '',
    file: null,
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h2>Add Task:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="teacherName" >
                Teacher Name
              </label>
              <Field
                type="text"
                id="teacherName"
                name="teacherName"
                value={values.teacherName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
              />
              <ErrorMessage name="teacherName" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="subject">
                Subject
              </label>
              <Field
                type="text"
                id="subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
              />
              <ErrorMessage name="subject" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="class">
                Class
              </label>
              <Field
                type="text"
                id="class"
                name="class"
                value={values.class}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
              />
              <ErrorMessage name="class" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="description">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
              />
              <ErrorMessage name="description" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="file">
                Choose File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(event) => {
                  handleChange(event);
                  values.file = event.currentTarget.files[0];
                }}
                onBlur={handleBlur}
                style={{ marginBottom: '1rem' }}
              />
              <ErrorMessage name="file" component="div" style={{ color: 'red' }} />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: 'rgb(28, 66, 95)',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                borderRadius:'5px'
              }}
            >
              Add Task
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
