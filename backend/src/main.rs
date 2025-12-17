
use axum::{
    Json, Router, extract::Query, http::StatusCode, routing::get
};
use dotenvy::dotenv;
// use serde_json::json;
// todo:fix error
use tower_http::cors::{CorsLayer,Any};


use std::collections::HashMap;







async fn get_weather(Query(parms):Query<HashMap<String,String>>)->(StatusCode,Json<serde_json::Value>){



let city=parms.get("city").unwrap_or(&"Riyadh".to_string()).to_string();

let key =std::env::var("api").expect("error with api key");

let url =format!("https://api.openweathermap.org/data/2.5/weather?q={}&appid={}&units=metric",city,key);
// let jsons =reqwest::get(url)
// .await.
// unwrap()
// .json::<serde_json::Value>()
// .await
// .unwrap();

// Json(jsons)

let res=match reqwest::get(url).await {
    Ok(e)=>e,
    Err(_)=>{
        return(
            StatusCode::BAD_GATEWAY,
            Json(serde_json::json!({
                "error":"connection fail"
            }))
            );
        
    }
};


if res.status().as_u16() == StatusCode::NOT_FOUND{
    return(
        StatusCode::NOT_FOUND,
        Json(serde_json::json!({
            "error":"not found this city"
        }))
    );
};

 if !res.status().is_success(){
    return(
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(serde_json::json!({
            "error":"error "
        }))
    );
 }

 let json =res.json::<serde_json::Value>().await.unwrap();

 (StatusCode::OK,Json(json))

}

#[tokio::main]
async fn main() {
    //read .env file n
    dotenv().ok();




    let app =Router::new()
    .route("/weather", get(get_weather))
    .layer(CorsLayer::new().allow_origin(Any).allow_methods(Any))
    ;


let listner =tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
println!("the server work on this path {}",listner.local_addr().unwrap());

axum::serve(listner,app).await.unwrap();












}
