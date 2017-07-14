import test from "tape";
import { h } from "../src/h";
import { EMPTYO, EMPTYAR } from "../src/utils";

test("empty vnode", assert => {
  assert.deepEqual(h("div"), {
    _vnode: true,
    type: "div",
    key: null,
    props: EMPTYO,
    content: EMPTYAR
  });
  assert.end();
});

test("empty vnode with props", assert => {
  assert.deepEqual(h("div", { className: "test", key: "key" }), {
    _vnode: true,
    type: "div",
    key: "key",
    props: { className: "test", key: "key" },
    content: EMPTYAR
  });
  assert.end();
});

test("vnode with text content", assert => {
  assert.deepEqual(h("div", null, "text content"), {
    _vnode: true,
    type: "div",
    key: null,
    props: EMPTYO,
    content: [{ _text: "text content" }]
  });
  assert.deepEqual(h("div", null, null), {
    _vnode: true,
    type: "div",
    key: null,
    props: EMPTYO,
    content: [{ _text: "" }]
  });
  assert.end();
});

test("vnode with single vnode content", assert => {
  assert.deepEqual(h("div", null, h("span", null, "span text")), {
    _vnode: true,
    type: "div",
    key: null,
    props: EMPTYO,
    content: [
      {
        _vnode: true,
        type: "span",
        key: null,
        props: EMPTYO,
        content: [{ _text: "span text" }]
      }
    ]
  });
  assert.end();
});

test("vnode with multiple vnode contents", assert => {
  assert.deepEqual(
    h(
      "div",
      null,
      h("span", null, "span text"),
      h("input", { type: "number" }),
      "raw text"
    ),
    {
      _vnode: true,
      type: "div",
      key: null,
      props: EMPTYO,
      content: [
        {
          _vnode: true,
          type: "span",
          key: null,
          props: EMPTYO,
          content: [{ _text: "span text" }]
        },
        {
          _vnode: true,
          type: "input",
          key: null,
          props: { type: "number" },
          content: EMPTYAR
        },
        { _text: "raw text" }
      ]
    }
  );
  assert.end();
});

test("vnode with single array content", assert => {
  assert.deepEqual(
    h("div", null, [
      h("span", null, "span text"),
      h("input", { type: "number" }),
      "raw text"
    ]),
    {
      _vnode: true,
      type: "div",
      key: null,
      props: EMPTYO,
      content: [
        {
          _vnode: true,
          type: "span",
          key: null,
          props: EMPTYO,
          content: [{ _text: "span text" }]
        },
        {
          _vnode: true,
          type: "input",
          key: null,
          props: { type: "number" },
          content: EMPTYAR
        },
        { _text: "raw text" }
      ]
    }
  );
  assert.end();
});

test("vnode with nested array content", assert => {
  const expected = {
    _vnode: true,
    type: "div",
    key: null,
    props: EMPTYO,
    content: [
      {
        _vnode: true,
        type: "span",
        key: null,
        props: EMPTYO,
        content: [{ _text: "span text" }]
      },
      { _text: "A" },
      {
        _vnode: true,
        type: "input",
        key: null,
        props: EMPTYO,
        content: EMPTYAR
      },
      { _text: "B" },
      { _text: "raw text" }
    ]
  };

  assert.deepEqual(
    h(
      "div",
      null,
      h("span", null, "span text"),
      ["A", h("input"), "B"],
      "raw text"
    ),
    expected
  );

  assert.deepEqual(
    h("div", null, [
      h("span", null, "span text"),
      ["A", h("input"), "B"],
      "raw text"
    ]),
    expected
  );
  assert.end();
});
