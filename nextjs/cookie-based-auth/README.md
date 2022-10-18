## React Next.js - Cookie Based Secure Authentication System

https://www.udemy.com/course/react-cookie-based-authentication/

<br/>

## Certificate
![Certificate of completion](./Certificate.jpg)

<br/>

## Notes

### What is CSRF(Cross-site request forgery)?
https://portswigger.net/web-security/csrf

Cross-site request forgery (also known as CSRF) is a web security vulnerability that allows an attacker to induce users to perform actions that they do not intend to perform. It allows an attacker to partly circumvent the same origin policy, which is designed to prevent different websites from interfering with each other.

#### How does CSRF work?
- **A relevant action.** There is an action within the application that the attacker has a reason to induce. This might be a privileged action (such as modifying permissions for other users) or any action on user-specific data (such as changing the user's own password).
- **Cookie-based session handling.** Performing the action involves issuing one or more HTTP requests, and the application relies solely on session cookies to identify the user who has made the requests. There is no other mechanism in place for tracking sessions or validating user requests.
- **No unpredictable request parameters.** The requests that perform the action do not contain any parameters whose values the attacker cannot determine or guess. For example, when causing a user to change their password, the function is not vulnerable if an attacker needs to know the value of the existing password.

#### Preventing CSRF attacks
- Unpredictable with high entropy, as for session tokens in general.
- Tied to the user's session.
- Strictly validated in every case before the relevant action is executed.


### Exemple

```javascript
// resources/server/server.js

import csrf from "csurf";
import cookieParser from "cookie-parser";

const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(cookieParser());

// ...
```

```javascript
// resources/client/context/index.js

useEffect(() => {
  const getCsrfToken = async () => {
    const { data } = await axios.get("/api/csrf-token");
    // console.log("CSRF", data);
    axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
  };
  getCsrfToken();
}, []);
```

<br/>

### Verify token and get current user




