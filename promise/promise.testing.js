const PromiseA = require("./promise");

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
