const calculadora = require("../models/calculadora");

test("somar 2 + 2", () => {
  const resultado = calculadora.sum(2, 2);
  expect(resultado).toBe(4);
});

test("somar 5 + 100", () => {
  const resultado = calculadora.sum(5, 100);
  expect(resultado).toBe(105);
});

test("somar 'banana' + 100 retornar 'Error'", () => {
  const resultado = calculadora.sum("banana", 100);
  expect(resultado).toBe("Error");
});
