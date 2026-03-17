import { useState } from 'react';

export default function IletisimFormu() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(null);

  const validate = (currentForm) => {
    const newErrors = [];

    if (!currentForm.name || currentForm.name.length < 5) {
      newErrors.push('Hata: ad en az 5 karakter olmalıdır.');
    }

    if (!currentForm.surname) {
      newErrors.push('Hata: soyad gereklidir.');
    }

    if (!currentForm.email) {
      newErrors.push('Hata: email gereklidir.');
    } else if (!currentForm.email.includes('@')) {
      newErrors.push('Hata: email geçerli bir email adresi olmalıdır.');
    }

    return newErrors;
  };

  const validateField = (fieldName, value) => {
    if (fieldName === 'name') {
      if (!value || value.length < 5) {
        return ['Hata: ad en az 5 karakter olmalıdır.'];
      }
      return [];
    }

    if (fieldName === 'surname') {
      if (!value) {
        return ['Hata: soyad gereklidir.'];
      }
      return [];
    }

    if (fieldName === 'email') {
      if (!value) {
        return ['Hata: email gereklidir.'];
      }
      if (!value.includes('@')) {
        return ['Hata: email geçerli bir email adresi olmalıdır.'];
      }
      return [];
    }

    return [];
  }; 

  const handleChange = (e) => {
    const nextForm = { ...form, [e.target.name]: e.target.value };
    setForm(nextForm);
    setErrors(validateField(e.target.name, e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      setSubmitted(form);
    }
  };

  return (
    <div>
      {/* ✅ TEST 2 için */}
      <h1>iletişim formu</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ad</label>
        <input
          id="name"
          name="name"
          data-testid="name"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="surname">Soyisim</label>
        <input
          id="surname"
          name="surname"
          data-testid="surname"
          value={form.surname}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          data-testid="email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="message">Mesaj</label>
        <textarea
          id="message"
          name="message"
          data-testid="message"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit">Gönder</button>
      </form>

      {errors.map((err, i) => (
        <p key={i} data-testid="error">
          {err}
        </p>
      ))}

      {submitted && (
        <div>
          <p>{submitted.name}</p>
          <p>{submitted.surname}</p>
          <p>{submitted.email}</p>
        </div>
      )}
    </div>
  );
}
