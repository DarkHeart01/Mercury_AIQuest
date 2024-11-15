import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/data')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Mercury</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.column_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

