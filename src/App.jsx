import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home.jsx';
import About from './routes/About.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Persons from './routes/Persons.jsx';
import Root from './routes/Root.jsx';
import axios from 'axios';
import Users from './routes/Users.jsx';
import Posts from './routes/Posts.jsx';



function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Margit', title: 'CEO', age: 29, location: 'Helsinki' },
    { id: 2, name: 'Kati', title: 'developer', age: 25, location: 'NY' },
    { id: 3, name: 'Karin', title: 'designer', age: 45, location: 'Tartu' },
  ]);

  const [users, setUsers] = useState([]); //default as an empty array

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });

  }, []) //empty array so it does not load in the background again again

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const setPublishedStatus = (id, published) => {
    const findPost = posts.find((post) => post.id === id); //find post by id
    const updateStatus = { ...findPost, published: !published }; //combine found post with changed published boolean status in a new object

    axios
      .put(`http://localhost:3000/posts/${id}`, updateStatus) //axios updates published status to a post by id
      .then((res) => {
        setPosts(
          posts.map((post) =>
            post.id === id ? { ...post, published: !published } : post //go through posts, if id found then go into post object and change published status
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/users', element: <Users users={users} /> },
        { path: '/posts', element: <Posts posts={posts} setPublishedStatus={setPublishedStatus} /> },
        { path: '/persons', element: <Persons persons={persons} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
