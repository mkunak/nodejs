const fs = require('fs');
const path = require('path');
const { createServer } = require('http');

const server = createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    if (req.url === "/") {
      fs.readFile(
        path.join(__dirname, 'views', 'index.html'),
        'utf-8',
        (err, content) => {
          if (err) throw err;
          res.end(content);
        }
      );
    } else if (req.url === "/about") {
      fs.readFile(
        path.join(__dirname, 'views', 'about.html'),
        'utf-8',
        (err, content) => {
          if (err) throw err;
          res.end(content);
        }
      );
    } else if (req.url === "/users") {
      fs.readFile(
        path.join(__dirname, 'db', 'users.json'),
        'utf-8',
        (err, users) => {
          if (err) throw err;
          res.write(`
            <section style="padding: 1rem 10rem; background: #e07a5f; display: flex;">
              <a href="/" style="margin: 0; font-size: 24px; text-decoration: none; color: #f2cc8f">NodeJS Tutorial</a>
              <nav>
                <ul style="padding: 0 4rem; margin: 0; display: flex;">
                  <li style="list-style-type: none; padding-right: 1rem;">
                    <a style="text-decoration: none; color: #ffffff" href="/">Home</a>
                  </li>
                  <li style="list-style-type: none; padding-right: 1rem;">
                    <a style="text-decoration: none; color: #ffffff" href="/about">About</a>
                  </li>
                  <li style="list-style-type: none; padding-right: 1rem;">
                    <a style="text-decoration: none; color: #ffffff" href="/users">Users</a>
                  </li>
                </ul>
              </nav>
            </section>
          `);

          res.write(`
            <div style="padding-top: 2rem; 
            display: flex; flex-direction: column; align-items: center;">`);

          JSON.parse(users).forEach((user) => {
            res.write(`
              <div style="margin-top: 1rem; text-align: center; background: lightgrey; width: 20rem; border: 1px solid black; border-radius: 5px">
                <p>${user.name}</p>
                <p>${user.age}</p>
                <p>${user.job}</p>
              </div>
            `);
          });

          res.write(`</div>`);

          res.end();
        }
      );
    }
  } else if (req.method === "POST") {
    const body = [];

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    req.on('data', (data) => {
      body.push(Buffer.from(data));
    });

    req.on('end', () => {
      const formMessage = body.toString().split('=')[1];

      res.end(`
        <section style="padding: 1rem 10rem; background: #e07a5f; display: flex;">
          <a href="/" style="margin: 0; font-size: 24px; text-decoration: none; color: #f2cc8f">NodeJS Tutorial</a>
          <nav>
            <ul style="padding: 0 4rem; margin: 0; display: flex;">
              <li style="list-style-type: none; padding-right: 1rem;">
                <a style="text-decoration: none; color: #ffffff" href="/">Home</a>
              </li>
              <li style="list-style-type: none; padding-right: 1rem;">
                <a style="text-decoration: none; color: #ffffff" href="/about">About</a>
              </li>
              <li style="list-style-type: none; padding-right: 1rem;">
                <a style="text-decoration: none; color: #ffffff" href="/users">Users</a>
              </li>
            </ul>
          </nav>
        </section>
        <div>
          <div style="background: #f4f1de;">
            <h3 style="text-align: center; padding-top: 2rem; padding-bottom: 2rem; margin: 0">Chapter
              1. Introduction</h3>
            <div style="background: #f4f1de; margin: 0 10rem">
              <p>Description. A lot of text. A lot of text. A lot of text. A lot of text.</p>
              <p>End of chapter 1.</p>
              <a href="#">Goto next chapter</a>
            </div>
          </div>
        </div>
        <footer>
          <div style="background: #3d405b; color: white; padding: 2rem 0;">
            <h3 style="text-align: center;">Form</h3>
            <div style="display: flex; justify-content: center;">
              <form method="post" action="/">
                <input name="title" type="text" />
                <button type="submit">Send</button>
              </form>
            </div>
            <p style="text-align: center">Your message: ${formMessage}</p>
          </div>
        </footer>
      `);
    });
  }
});

server.listen(3000, () => {
  console.log('Server is on...');
});
