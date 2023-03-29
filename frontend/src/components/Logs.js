import moment from "moment";

const Logs = async (action) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    //get date and time
    const currentDate = new Date();
    const date_added = moment(currentDate, "MM/DD/YYYY, HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

    const userLocal = localStorage.getItem('user');
    const userData = JSON.parse(userLocal);
    const user = userData.name;

    try {
      const response = await fetch(apiUrl + "log", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user, action, date_added }),
      });
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export default Logs;