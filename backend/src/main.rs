use axum::{
    Json, Router, routing::get
};
use serde::Serialize;

#[derive(Serialize)]
struct Res{
    message:String
}

async fn hello() ->Json<Res>{
    Json(Res { message: "this is from rust".to_string() })
}

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new().route("/", get(hello));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("the server work in this address : http://{}",listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();


}
