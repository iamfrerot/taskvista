const alldevs = async () => {
 const res = await fetch(
  "https://pmt-server-x700.onrender.com/api/v1/auth/get-all-developers"
 );
 const data = await res.json();
 return data;
};

export default alldevs;
