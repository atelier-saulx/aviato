export default ({ head, body }) => {
  return `<!DOCTYPE html>
    <html>
        <head>${head}</head>
        <body>
            <div id="react"/>
            ${body}
        </body>
    </html>
  `
}
