use axum::{
    Json, Router, routing::get,extract::Query
};
use dotenvy::dotenv;
use serde::{Serialize};

use std::collections::HashMap;
use std::env;
use std::{collections::hash_map};

#[derive(Serialize)]
struct Res{
    message:String
}

// async fn hello() ->Json<Res>{
//     Json(Res { message: "this is from rust".to_string() })
// }

async fn get_weather(Query(parms):Query<HashMap<String,String>>)->Json<serde_json::Value>{

let city=parms.get("city").unwrap_or(&"Riyadh".to_string()).to_string();
let key =std::env::var("api").expect("error with api key");
}

#[tokio::main]
async fn main() {
    //read .env file
    dotenv().ok();
    let api =env::var("api").unwrap();

    // let t =format!("https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}")
    println!("api is {}",api);
    // build our application with a single route















    // let app = Router::new().route("/", get(hello));










    // run our app with hyper, listening globally on port 3000
    // let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    // println!("the server work in this address : http://{}",listener.local_addr().unwrap());


    // axum::serve(listener, app).await.unwrap();


}
