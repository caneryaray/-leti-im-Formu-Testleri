import { afterEach, beforeEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import fs from 'fs';
import path from 'path';

// ✅ eksik import
import IletisimFormu from './IletisimFormu';

beforeEach(() => {
  render(<IletisimFormu />);
});

test('[1] hata olmadan render ediliyor', () => {
  render(<IletisimFormu />);
  expect(true).toBe(true);
});

test('[2] iletişim formu headerı render ediliyor', () => {
  const header = screen.getByText(/iletişim formu/i);

  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/iletişim formu/i);
});

test('[3] kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
  const nameInput = screen.getByLabelText(/ad/i);

  await userEvent.type(nameInput, 'abc');

  const errors = await screen.findAllByTestId('error');

  expect(errors).toHaveLength(1);
});

test('[4] kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
  const button = screen.getByRole('button');

  await userEvent.click(button);

  const errors = await screen.findAllByTestId('error');

  expect(errors).toHaveLength(3);
});

test('[5] kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
  const name = screen.getByTestId('name');
  const surname = screen.getByTestId('surname');

  await userEvent.type(name, 'Caner');
  await userEvent.type(surname, 'Yılmaz');

  const button = screen.getByRole('button');
  await userEvent.click(button);

  const errors = await screen.findAllByTestId('error');

  expect(errors).toHaveLength(1);
});

test('[6] geçersiz bir mail girildiğinde "Hata: email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  const email = screen.getByTestId('email');

  await userEvent.type(email, 'abc');

  const error = screen.getByTestId('error');

  expect(error).toHaveTextContent(
    'Hata: email geçerli bir email adresi olmalıdır.'
  );
});

test('[7] soyad girilmeden gönderilirse "Hata: soyad gereklidir." mesajı render ediliyor', async () => {
  const name = screen.getByTestId('name');
  const email = screen.getByTestId('email');

  await userEvent.type(name, 'Caner');
  await userEvent.type(email, 'test@test.com');

  const button = screen.getByRole('button');
  await userEvent.click(button);

  const error = await screen.findByText('Hata: soyad gereklidir.');

  expect(error).toBeInTheDocument();
});

test('[8] ad, soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
  const name = screen.getByTestId('name');
  const surname = screen.getByTestId('surname');
  const email = screen.getByTestId('email');

  await userEvent.type(name, 'Caner');
  await userEvent.type(surname, 'Yılmaz');
  await userEvent.type(email, 'test@test.com');

  const button = screen.getByRole('button');
  await userEvent.click(button);

  const errors = screen.queryAllByTestId('error');

  expect(errors).toHaveLength(0);
});

test('[9] form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
  const name = screen.getByTestId('name');
  const surname = screen.getByTestId('surname');
  const email = screen.getByTestId('email');

  await userEvent.type(name, 'Caner');
  await userEvent.type(surname, 'Yılmaz');
  await userEvent.type(email, 'test@test.com');

  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(await screen.findByText('Caner')).toBeInTheDocument();
  expect(await screen.findByText('Yılmaz')).toBeInTheDocument();
  expect(await screen.findByText('test@test.com')).toBeInTheDocument();
});

//

//

// BURADAN SONRASINA DOKUNMAYIN //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const testFile = fs
  .readFileSync(path.resolve(__dirname, './IletisimFormu.test.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');
const tests = testFile.split("test('[");

test('Kontrol: IletisimFormu componenti import edilmiş.', async () => {
  expect(tests[0]).toContain('importIletisimFormufrom');
});

test('Kontrol: test[1] için render metodu kullanılmış', async () => {
  expect(tests[1]).toContain('render(<IletisimFormu');
});

test('Kontrol: test[2] için screen.getByText(...) kullanılmış', async () => {
  expect(tests[2]).toContain('screen.getByText(');
});

test('Kontrol: test[2] için .toBeInTheDocument() ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toBeInTheDocument()');
});

test('Kontrol: test[2] için .toBeTruthy() ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toBeTruthy()');
});

test('Kontrol: test[2] için .toHaveTextContent(...) ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toHaveTextContent(');
});

test('Kontrol: test[3] için screen.getByLabelText(...) kullanılmış', async () => {
  expect(tests[3]).toContain('screen.getByLabelText(');
});

test('Kontrol: test[3] için screen.findAllByTestId(...) kullanılmış', async () => {
  expect(tests[3]).toContain('screen.findAllByTestId(');
});

test('Kontrol: test[3] için findAllByTestId await ile kullanılmış', async () => {
  expect(tests[3]).toContain('awaitscreen.findAllByTestId');
});

test('Kontrol: test[3] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[3]).toContain('.toHaveLength(1)');
});

test('Kontrol: test[4] için .getByRole(...) kullanılmış ', async () => {
  expect(tests[4]).toContain('screen.getByRole(');
});

test('Kontrol: test[4] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[4]).toContain('.toHaveLength(3)');
});

test('Kontrol: test[5] için .getByTestId(...) kullanılmış', async () => {
  expect(tests[5]).toContain('screen.getByTestId(');
});

test('Kontrol: test[5] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[5]).toContain('.toHaveLength(1)');
});

test('Kontrol: test[6] için .getByTestId(...) kullanılmış', async () => {
  expect(tests[6]).toContain('screen.getByTestId(');
});

test('Kontrol: test[6] için .toHaveTextContent(...) ile kontrol edilmiş', async () => {
  expect(tests[6]).toContain(').toHaveTextContent(');
});

test('Kontrol: test[7] için .findByText(...) await ile kullanılmış', async () => {
  expect(tests[7]).toContain('awaitscreen.findByText(');
});

test('Kontrol: test[7] için .toBeInTheDocument() ile kontrol edilmiş', async () => {
  expect(tests[7]).toContain(').toBeInTheDocument()');
});

test('Kontrol: tüm testlerde(test1 hariç) iletişim formu ayrı ayrı render edilmesi yerine beforeEach hooku kullılarak, render içinde yapılmış.', async () => {
  expect(tests[0]).toContain('beforeEach(()=>{');
  expect(tests[0]).toContain('render(<IletisimFormu/>)');
});
