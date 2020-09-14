export const required = value => (value ? undefined : 'Este campo es requerido');
export const validateID = value => value && (value.length >= 7 && value.length <= 10) ? undefined : 'Número de identificación invalido.';
export const validDigit = value => (!value || (value && !isNaN(Number(value)) && /^[0-9]+$/.test(value))) ? undefined : 'Debe digitar solo valores numericos';