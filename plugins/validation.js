// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ({ app }, inject) {
  inject('rule', {
    required(message = 'This field is required') {
      return [(v) => !!v || message]
    },
    arrayRequired(message = 'This field is required') {
      return [(v) => v.length > 0 || message]
    },
    email(message = 'Email must be valid') {
      return [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          message,
      ]
    },
    number(message = 'This field must be number') {
      return [(v) => /^\d+$/.test(v) || message]
    },
    digits(digits, message = `This field must be ${digits} digits`) {
      return [(v) => (v || '').length === digits || message]
    },
  })
}
