import axios from 'axios';

const res = await axios.get('/api/courses');
console.log(res.data);
