## π Methodologies & Libraries

In Aviato-UI, we use a few methodologies and libraries.

π - [Stitches](https://stitches.dev/)

π - [React.forwardRef](https://blog.logrocket.com/cleaning-up-the-dom-with-forwardref-in-react/)

---

## πͺ‘ Stitches

Stitches is a CSS-in-JS framework with near-zero runtime, SSR, multi-variant support, and a best-in-class developer experience. It also supports theme tokens β aka. style variables or design tokens β out of the box. See [Tokens](https://stitches.dev/docs/tokens).

One benefit is being able to style a component the way you like.

Example:

```tsx
<IconButton
  type="primary"
  mode="filled"
  icon={randomIcon()}
  css={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
  }}
/>
```

---

## π React.forwardRef

React forwardRef is a method that allows parent components pass down (i.e., βforwardβ) refs to their children. Using forwardRef in React gives the child component a reference to a DOM element created by its parent component. This then allows the child to read and modify that element anywhere it is being used.

All UI components implements this, to facilitate developer experience (DX).

---

To see how to use our components, go to [Getting Started](./getting-started.md).
