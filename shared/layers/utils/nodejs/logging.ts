class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
  }
  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack
      }
    };
  }
}

const delayBySeconds = (second: number): Promise<void> => {
  return new Promise(resolve => {
    console.log('delay numbers of second(s): ', second);
    setTimeout(() => {
      resolve();
    }, second);
  });
};

export default { ValidationError, delayBySeconds };
