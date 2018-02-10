// vim: ft=css
module.exports = `
html {
  background-color: #fbfbfb;
}

body {
  padding: 16px;
  font-family: sans-serif;
  color: #36454F;
}

main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  justify-content: center;
}

article {
  margin: 8px;
  box-shadow: 2px 2px 4px #999;
  transition: .2s ease-in-out transform, .2s ease-in-out box-shadow;
  display: flex;
  flex-direction: column;
  padding: 8px;
  max-width: 300px;
}

article:hover, article:active, article:focus {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);
  transform: translate(1px, -3px);
}

article img {
  max-width: 80%;
}

a {
  text-decoration: none;
  color: #454f3e;
}

a:hover, a:focus, a:active {
  color: #594f61;
}

article small {
  text-align: right;
}

/* override tags embedded in posts */
b, i, strong, em {
  font-weight: normal;
  font-style: normal;
}
`
