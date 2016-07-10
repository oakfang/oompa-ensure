import test from 'ava';
import ensure from '.';

const payloadProxy = payload => new Proxy(payload, {
  has(target, name) {
    target.__propertyHases = (target.__propertyHases || 0) + 1;
    return name in target;
  }
});

test('Task should not be enforced', t => {
  const payload = {};
  const request = {
    type: 'FOO',
    payload: payloadProxy(payload),
  };
  const enforcer = ensure('BAR', 'meow');
  t.is(enforcer(request, () => 5), 5);
  t.is(payload.__propertyHases, undefined);
});

test('Task is enforced and is OK', t => {
  const payload = {
    meow: true,
  };
  const request = {
    type: 'FOO',
    payload: payloadProxy(payload),
  };
  const enforcer = ensure('FOO', 'meow');
  t.is(enforcer(request, () => 5), 5);
  t.is(payload.__propertyHases, 1);
});

test('Task is enforced and is not OK', t => {
  const payload = {
    buzz: true,
  };
  const request = {
    type: 'FOO',
    payload: payloadProxy(payload),
  };
  const enforcer = ensure('FOO', 'meow');
  try {
    enforcer(request, () => 5);
    t.fail('Should have thrown');
  } catch (err) {
    t.is(err.message,
         "Expected property 'meow' was not found in task of type 'FOO'");
  }
  t.is(payload.__propertyHases, 1);
});