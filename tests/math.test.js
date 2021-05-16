const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;
const celsiusToFahrenheit = (temp) => temp * 1.8 + 32;

test('fahrenheitToCelsius', () => {
  const celsius = fahrenheitToCelsius(32);
  expect(celsius).toBe(0);
});
test('celsiusToFahrenheit', () => {
  const fahrenheit = celsiusToFahrenheit(0);
  expect(fahrenheit).toBe(32);
});
test('async test', (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 2000);
});
