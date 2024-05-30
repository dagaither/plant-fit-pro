import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // replace <your-ec2-public-ip> with your actual EC2 instance IP address
});
