
const Utils =  {
   
    weatherDateParser: (dateTimeInSeconds: number, timeZoneOffSet: number): string => {
        let date: string = "";
        if(dateTimeInSeconds === undefined || timeZoneOffSet === undefined){
            date = new Date().toUTCString().replace("GMT", "");
            let dateArray = date.split(":");
            date = `${dateArray[0]}:${dateArray[1]}`;
            return date;
        }

        date = new Date(dateTimeInSeconds * 1000 + timeZoneOffSet * 1000).toUTCString().replace("GMT", "");
        let dateArray = date.split(":");
    
        return `${dateArray[0]}:${dateArray[1]}`;
    },
    forecastDateParser:(dateTimeSeconds: number, timzeZoneOffSet: number): string => {
        let date: string = "";
        if(dateTimeSeconds === undefined || timzeZoneOffSet === undefined){
            date = new Date().getUTCHours().toString();
            return `${date}:00`;
        }
        date = new Date(dateTimeSeconds * 1000 + timzeZoneOffSet * 1000).getUTCHours().toString();
    
        return `${date}:00`;
    }
}

export default Utils;