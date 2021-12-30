### Example

```
 const { ref: container, isActive } = useMove(({ x }) => console.log(x), {
    onScrubStart: () => console.log('onScrubStart'),
    onScrubEnd: () => console.log('onScrubEnd'),
  })
```
