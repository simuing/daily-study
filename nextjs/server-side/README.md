# Server side with React 18 and Next JS

<br/>

## Notes

### Creating an API route
```javascript
// pages/api/posts.js
import axios from 'axios';

const handler = async(req, res) => {
  if(req.method === 'GET') {
    try {
      const request = await axios.get('https://jsonplaceholder.typicode.com/posts');
      res.status(201).json({ posts: request.data });
    } catch(error) {
      res.status(401).json({ message: 'Sorry, try agin later' })
    }
  }
}
```

```javascript
// pages/index.js
import axios from 'axios';

export default function Home(props) {
  const getPosts = () => {
    axios.get('/api/posts').then(response => {
      console.log(response.data);
    });
  }
  // ...
}

export const getStaticProps = async() => {
  const request = await axios.get('http://localhost:3000/api/posts');
}
```

<br/>

### Form
#### formik
Formik is the world's most popular open source form library for React and React Native.
https://formik.org/docs/tutorial


#### bcrypt.js
A library to help you hash passwords.
https://www.npmjs.com/package/bcrypt

```javascript
// utils/tools.js
import bcrypt from 'bcryptjs';

export const passwordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
```
<br/>

### Check session and logout

```javascript
// next.config.js update

const nextConfig = {
  reactStrictMode: false,
}
```

```javascript
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session, status } = useSession();

  return <h1>Home</h1>
}

export default Home;
```

### Route guard
```javascript
// utils/guard/routeGuard.js

import { getSesstion } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const RouteGuard = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      if(!session) {
        router.push('/sign_in');
      } else {
        setLoading(false);
      }
    })
  }, []);

  if (loading) {
    return <div>...loading</div>
  }

  return (
    <>{props.children}</>
  )
}
```

```javascript
// pages/dashboard.js
import RouteGuard from '../utils/guard/routeGuard';

const Dashboard = () => {
  return (
    <RouteGuard>
      <h1>Dashboard</h1>
    </RouteGuard>
  )
}

export default Dashboard;
```

```javascript
// pages/admin.js
import { getSession } from 'next-auth/react';

const Admin = () => {
  return <h1>Admin</h1>
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/sign_in',
        permanent: false
      }
    }
  }

  return {
    props: {
      ifNeeded: session
    }
  }
}
```

### API Security

```javascript
// pages/api/posts.js
import { getSession } from 'next-auth/react';

async function Handler(req, res) {
  const session = await getSession({req: req});

  if(!session) {
    return res.status(401).json({ message: 'Bro, you need to be auth' });
  }

  return res.status(200).json({ message: 'Here are the admin post' });
}

export default Handler;
```