
use axum::{
    Json, Router, routing::get,extract::Query
};
use dotenvy::dotenv;


use std::collections::HashMap;







async fn get_weather(Query(parms):Query<HashMap<String,String>>)->Json<serde_json::Value>{



let city=parms.get("city").unwrap_or(&"Riyadh".to_string()).to_string();

let key =std::env::var("api").expect("error with api key");

let url =format!("https://api.openweathermap.org/data/2.5/weather?q={}&appid={}",city,key);
let jsons =reqwest::get(url)
.await.
unwrap()
.json::<serde_json::Value>()
.await
.unwrap();

Json(jsons)

}

#[tokio::main]
async fn main() {
    //read .env file n
    dotenv().ok();




    let app =Router::new()
    .route("/weather", get(get_weather));


let listner =tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
println!("the server work on this path {}",listner.local_addr().unwrap());

axum::serve(listner,app).await.unwrap();












}
