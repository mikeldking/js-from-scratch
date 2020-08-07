class PromiseA extends Object {
  constructor(fn) {
    super();
    this.resolveFns = [];
    this.rejectFns = [];
    this.catchFns = [];
    const resolve = (val) => {
      this.val = val;
      this.resolveFns.forEach((fn) => {
        fn(val);
      });
    };
    const reject = (err) => {
      this.err = err;
      this.rejectFns.forEach((fn) => {
        fn(err);
      });
      this.catchFns.forEach((fn) => {
        fn(err);
      });
    };
    fn(resolve, reject);
  }

  then(resolve, reject) {
    if (this.val !== undefined) {
      resolve(this.val);
    } else if (this.err !== undefined) {
      reject(this.err);
    } else {
      this.resolveFns.push(resolve);
      this.rejectFns.push(reject);
    }
    return this;
  }

  catch(errorCallback) {
    if (this.err !== undefined) {
      errorCallback(this.err);
    } else {
      this.catchFns.push(errorCallback);
    }
  }

  static all(arrayOfPromises) {
    return new PromiseA((resolve, reject) => {
      let count = 0;
      const returnValue = [];
      arrayOfPromises.forEach((p, index) => {
        p.then((ret) => {
          returnValue[index] = ret;
          count++;
          if (count === arrayOfPromises.length) {
            resolve(returnVale);
          }
        });
      });
    });
  }
}

function testResolve(pr) {
  const p = new pr((resolve, reject) => {
    setTimeout(() => {
      console.log("executing the function");
      resolve("foo");
    }, 1000);
  });

  p.then((ret) => console.log(ret));
  p.then((ret) => console.log(ret + " the second time"));
}

function testCatch(pr) {
  const p = new pr((resolve, reject) => {
    setTimeout(() => {
      console.log("executing the function");
      reject(new Error("An error occurred"));
    }, 1000);
  });

  p.catch((err) => console.error(err));
  p.catch((err) => console.error(err));
}

function testReject(pr) {
  const p = new pr((resolve, reject) => {
    setTimeout(() => {
      console.log("executing the function");
      reject(new Error("An error occurred"));
    }, 1000);
  });

  p.then(
    () => {},
    (err) => console.error("reject 1 " + err)
  );
  p.then(
    () => {},
    (err) => console.error("reject 2 " + err)
  );
}

const tests = [testResolve, testCatch, testReject];

tests.forEach((test) => {
  test(PromiseA);
  test(Promise);
});
