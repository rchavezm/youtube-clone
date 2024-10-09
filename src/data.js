export const API_KEY = 'AIzaSyCYt8hmJJgyY1ck3ePWjV9IajxiQMI2yA0'

export const value_converter = (value) => {
    if(value >= 1000000) {
        return Math.floor(value/1000000) + "M";
    }
    else if(value >= 1000){
        return Math.floor(value/1000000) + "K";
    }
    else { 
        return value;
    }
}

